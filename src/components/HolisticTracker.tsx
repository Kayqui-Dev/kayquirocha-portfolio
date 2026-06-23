"use client";

import { useEffect, useRef, useState } from "react";

interface HolisticTrackerProps {
  fistProgress: React.MutableRefObject<number>;
}

export default function HolisticTracker({ fistProgress }: HolisticTrackerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const holisticRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let videoStream: MediaStream | null = null;
    let animationFrameId: number;

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (typeof document === "undefined") {
          resolve();
          return;
        }
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.crossOrigin = "anonymous";
        script.onload = () => resolve();
        script.onerror = (e) => reject(new Error(`Failed to load script ${src}`));
        document.head.appendChild(script);
      });
    };

    async function initScriptsAndHolistic() {
      try {
        setLoading(true);
        // Load MediaPipe scripts sequentially to guarantee execution order and avoid race conditions
        // Note: We no longer load camera_utils.js because we use a native requestAnimationFrame loop.
        await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.3.1675466124/drawing_utils.js");
        await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5.1675471629/holistic.js");

        if (!active) return;

        const mpHolistic = (window as any).Holistic;
        if (!mpHolistic) {
          throw new Error("Holistic não foi encontrado no objeto global window.");
        }

        const holisticInstance = new mpHolistic({
          locateFile: (file: string) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
          }
        });

        holisticInstance.setOptions({
          modelComplexity: 0,
          smoothLandmarks: true,
          enableSegmentation: false,
          smoothSegmentation: false,
          refineFaceLandmarks: false,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        holisticInstance.onResults((results: any) => {
          if (!active) return;
          const canvas = canvasRef.current;
          if (!canvas) return;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          const video = videoRef.current;
          if (video && video.readyState >= 2) {
            if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
            }
          } else {
            return;
          }

          // 1. Calculate fist progress first (2D scale-invariant logic based on tip-to-knuckle distance)
          const calculateFistProgress = (landmarks: any) => {
            const wrist = landmarks[0];
            const middleMCP = landmarks[9];
            const indexTip = landmarks[8];
            const middleTip = landmarks[12];
            const ringTip = landmarks[16];
            const pinkyTip = landmarks[20];
            
            if (!wrist || !middleMCP || !indexTip || !middleTip || !ringTip || !pinkyTip) return 0;
            
            // 2D distance calculation (ignores noisy Z depth axis for high stability)
            const getDistance2D = (p1: any, p2: any) => {
              return Math.sqrt(
                Math.pow(p1.x - p2.x, 2) +
                Math.pow(p1.y - p2.y, 2)
              );
            };
            
            const L_palm = getDistance2D(wrist, middleMCP);
            if (L_palm <= 0) return 0;
            
            // Calculate distance of finger tips to their respective MCP (knuckle) joints
            const dIndex = getDistance2D(indexTip, landmarks[5]) / L_palm;
            const dMiddle = getDistance2D(middleTip, landmarks[9]) / L_palm;
            const dRing = getDistance2D(ringTip, landmarks[13]) / L_palm;
            const dPinky = getDistance2D(pinkyTip, landmarks[17]) / L_palm;
            
            const avgRatio = (dIndex + dMiddle + dRing + dPinky) / 4;
            
            // Open hand tip-to-knuckle ratio is around 1.25, closed hand (fist) ratio is around 0.45
            const maxRatio = 1.25;
            const minRatio = 0.45;
            const progress = (maxRatio - avgRatio) / (maxRatio - minRatio);
            return Math.max(0, Math.min(1, progress));
          };

          let leftProgress = 0;
          let rightProgress = 0;

          if (results.leftHandLandmarks) {
            leftProgress = calculateFistProgress(results.leftHandLandmarks);
          }
          if (results.rightHandLandmarks) {
            rightProgress = calculateFistProgress(results.rightHandLandmarks);
          }

          const currentMaxProgress = Math.max(leftProgress, rightProgress);
          fistProgress.current = currentMaxProgress;

          // 2. Draw canvas overlays
          ctx.save();
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const mpDraw = (window as any);
          if (results.faceLandmarks) {
            mpDraw.drawConnectors(ctx, results.faceLandmarks, mpHolistic.FACEMESH_TESSELATION, {
              color: "rgba(0, 163, 255, 0.15)",
              lineWidth: 0.5
            });
          }

          // Draw hand landmarks in bright neon green (#00FFC2) for visibility
          const isFistClosed = currentMaxProgress > 0.65;
          const handColor = "#00FFC2";
          const handWidth = isFistClosed ? 4.0 : 2.0;
          const pointColor = isFistClosed ? "#FFFFFF" : "#00FFC2";
          const pointRadius = isFistClosed ? 4 : 2;

          if (results.leftHandLandmarks) {
            mpDraw.drawConnectors(ctx, results.leftHandLandmarks, mpHolistic.HAND_CONNECTIONS, {
              color: handColor,
              lineWidth: handWidth
            });
            mpDraw.drawLandmarks(ctx, results.leftHandLandmarks, {
              color: pointColor,
              lineWidth: 1,
              radius: pointRadius
            });
          }

          if (results.rightHandLandmarks) {
            mpDraw.drawConnectors(ctx, results.rightHandLandmarks, mpHolistic.HAND_CONNECTIONS, {
              color: handColor,
              lineWidth: handWidth
            });
            mpDraw.drawLandmarks(ctx, results.rightHandLandmarks, {
              color: pointColor,
              lineWidth: 1,
              radius: pointRadius
            });
          }

          ctx.restore();
        });

        holisticRef.current = holisticInstance;
        await startCamera();
      } catch (err: any) {
        console.error("Error setting up Holistic:", err);
        setError("Não foi possível carregar o rastreador holístico.");
        setLoading(false);
      }
    }

    const startCamera = async () => {
      if (!active || !holisticRef.current) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            frameRate: { ideal: 30 }
          },
          audio: false
        });
        videoStream = stream;
        if (!active) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            if (!active) return;
            videoRef.current?.play().catch(e => console.error("Video play error:", e));
            setLoading(false);
            tick();
          };
        }
      } catch (err: any) {
        console.error("Camera access error:", err);
        if (active) {
          setError("Erro ao acessar a câmera. Verifique as permissões.");
          setLoading(false);
        }
      }
    };

    let isProcessing = false;
    const tick = async () => {
      if (!active) return;
      const video = videoRef.current;
      if (video && video.readyState >= 2 && holisticRef.current) {
        if (!isProcessing) {
          isProcessing = true;
          try {
            await holisticRef.current.send({ image: video });
          } catch (err) {
            console.error("Error processing frame:", err);
          } finally {
            isProcessing = false;
          }
        }
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    initScriptsAndHolistic();

    return () => {
      active = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
      if (holisticRef.current) {
        holisticRef.current.close();
        holisticRef.current = null;
      }
    };
  }, [fistProgress]);

  return (
    <div className="relative w-full h-full bg-zinc-950 overflow-hidden">
      {/* Native Video Stream */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover opacity-35 scale-x-[-1]"
      />
      {/* Drawing Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-x-[-1]"
      />

      {/* Sci-Fi Overlay info */}
      <div className="absolute top-6 left-6 z-10 font-mono text-xs text-[#00A3FF]/80 select-none tracking-widest flex flex-col gap-1.5 uppercase">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span>[ System Active: Holistic Tracking ]</span>
        </div>
        <div className="text-[10px] text-zinc-500">
          Model: Face Mesh + Hand Landmark detection
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
          <div className="text-center font-mono select-none">
            <div className="w-12 h-12 border-2 border-[#00A3FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <div className="text-xs text-[#00A3FF] uppercase tracking-widest animate-pulse">
              Carregando Rastreamento IA Holístico...
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-20">
          <div className="text-center font-mono max-w-sm px-6">
            <span className="text-red-500 text-3xl block mb-4">⚠️</span>
            <div className="text-sm text-red-400 uppercase tracking-widest mb-2 font-bold">
              Erro de Câmera/IA
            </div>
            <div className="text-xs text-zinc-500 leading-relaxed uppercase">
              {error}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
