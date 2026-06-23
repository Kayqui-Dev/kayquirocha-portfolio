"use client";

import { useEffect, useRef, useState } from "react";
import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

interface HandTrackerProps {
  onHandMove: (x: number, y: number, isDetected: boolean, progress: number) => void;
  isActive: boolean;
}

export default function HandTracker({ onHandMove, isActive }: HandTrackerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const requestRef = useRef<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    let active = true;
    let stream: MediaStream | null = null;

    async function init() {
      try {
        setLoading(true);
        // Load vision resolver from CDN WASM files
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8/wasm"
        );

        // Load the landmarker model from Google storage CDN
        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numHands: 1,
          minHandDetectionConfidence: 0.6,
          minHandPresenceConfidence: 0.6,
          minTrackingConfidence: 0.6
        });

        if (!active) {
          landmarker.close();
          return;
        }

        landmarkerRef.current = landmarker;

        // Access user camera stream
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, frameRate: { ideal: 30 } },
          audio: false,
        });

        if (!active) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener("loadeddata", () => {
            setLoading(false);
            startDetectionLoop();
          });
        }
      } catch (err: any) {
        console.error("Error initializing HandTracker:", err);
        setError("Erro ao acessar câmera ou carregar o modelo de visão IA.");
        setLoading(false);
      }
    }

    const startDetectionLoop = () => {
      const detect = () => {
        const video = videoRef.current;
        const landmarker = landmarkerRef.current;

        if (video && landmarker && video.readyState >= 2) {
          const timestamp = performance.now();
          const results = landmarker.detectForVideo(video, timestamp);

          if (results.landmarks && results.landmarks.length > 0) {
            const firstHandLandmarks = results.landmarks[0];
            const indexFingerTip = firstHandLandmarks[8];
            
            // Calculate scale-invariant fist ratio
            const wrist = firstHandLandmarks[0];
            const middleMCP = firstHandLandmarks[9];
            const middleTip = firstHandLandmarks[12];
            
            let progress = 0;
            if (wrist && middleMCP && middleTip) {
              const L_palm = Math.sqrt(
                Math.pow(wrist.x - middleMCP.x, 2) +
                Math.pow(wrist.y - middleMCP.y, 2) +
                Math.pow(wrist.z - middleMCP.z, 2)
              );
              const L_tip = Math.sqrt(
                Math.pow(wrist.x - middleTip.x, 2) +
                Math.pow(wrist.y - middleTip.y, 2) +
                Math.pow(wrist.z - middleTip.z, 2)
              );
              
              if (L_palm > 0) {
                const ratio = L_tip / L_palm;
                // Normalization: 2.0 (open) -> 0.0, 1.2 (closed/fist) -> 1.0
                progress = (2.0 - ratio) / 0.8;
                progress = Math.max(0, Math.min(1, progress));
              }
            }

            if (indexFingerTip) {
              // Mirror the X coordinate for natural interaction
              const normalizedX = 1 - indexFingerTip.x;
              const normalizedY = indexFingerTip.y;

              // Map to viewport dimensions
              const x = normalizedX * window.innerWidth;
              const y = normalizedY * window.innerHeight;

              onHandMove(x, y, true, progress);
            } else {
              onHandMove(0, 0, false, 0);
            }
          } else {
            onHandMove(0, 0, false, 0);
          }
        }

        if (active) {
          requestRef.current = requestAnimationFrame(detect);
        }
      };

      requestRef.current = requestAnimationFrame(detect);
    };

    init();

    return () => {
      active = false;
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
        landmarkerRef.current = null;
      }
    };
  }, [isActive, onHandMove]);

  if (!isActive) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-auto">
      {/* Small loading indicator */}
      {loading && (
        <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-indigo-500/30 text-xs text-indigo-400 font-mono shadow-lg animate-pulse">
          Inicializando Visão IA...
        </div>
      )}

      {/* Error alert */}
      {error && (
        <div className="bg-red-950/80 backdrop-blur-md px-4 py-2 rounded-lg border border-red-500/30 text-xs text-red-300 font-mono shadow-lg max-w-xs">
          {error}
        </div>
      )}

      {/* Video Preview Frame */}
      {!loading && !error && showPreview && (
        <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.5)]">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{ transform: "scaleX(-1)" }} // Mirror effect
          />
          {/* Overlay Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_45%,rgba(0,0,0,0.4))] pointer-events-none" />
        </div>
      )}

      {/* Toggle Preview Button */}
      {!loading && !error && (
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="bg-black/60 hover:bg-black/90 text-[10px] uppercase tracking-wider font-semibold font-mono text-zinc-400 hover:text-zinc-200 border border-zinc-700/50 rounded-full px-3 py-1 shadow-md transition-colors pointer-events-auto cursor-pointer"
        >
          {showPreview ? "Ocultar Câmera" : "Mostrar Câmera"}
        </button>
      )}
    </div>
  );
}
