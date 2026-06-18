"use client";

export default function BackgroundContours() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden -z-10 select-none">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className="opacity-90">
        <defs>
          <pattern
            id="topographic-pattern"
            width="600"
            height="600"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-12) scale(1.3)"
          >
            {/* Peak 1 concentric paths */}
            <path
              d="M 150 50 C 220 50, 250 100, 250 150 C 250 200, 220 250, 150 250 C 80 250, 50 200, 50 150 C 50 100, 80 50, 150 50 Z"
              stroke="rgba(255,255,255,0.035)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 150 70 C 200 70, 230 110, 230 150 C 230 190, 200 230, 150 230 C 100 230, 70 190, 70 150 C 70 110, 100 70, 150 70 Z"
              stroke="rgba(0,163,255,0.02)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 150 90 C 180 90, 210 120, 210 150 C 210 180, 180 210, 150 210 C 120 210, 90 180, 90 150 C 90 120, 120 90, 150 90 Z"
              stroke="rgba(255,255,255,0.035)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 150 110 C 165 110, 190 130, 190 150 C 190 170, 165 190, 150 190 C 135 190, 110 170, 110 150 C 110 130, 135 110, 150 110 Z"
              stroke="rgba(0,163,255,0.02)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 150 130 C 158 130, 170 140, 170 150 C 170 160, 158 170, 150 170 C 142 170, 130 160, 130 150 C 130 140, 142 130, 150 130 Z"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
              fill="none"
            />

            {/* Peak 2 concentric paths */}
            <path
              d="M 450 300 C 550 300, 600 370, 600 450 C 600 530, 550 600, 450 600 C 350 600, 300 530, 300 450 C 300 370, 350 300, 450 300 Z"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 450 330 C 520 330, 570 380, 570 450 C 570 520, 520 570, 450 570 C 380 570, 330 520, 330 450 C 330 380, 380 330, 450 330 Z"
              stroke="rgba(0,163,255,0.02)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 450 360 C 500 360, 540 400, 540 450 C 540 500, 500 540, 450 540 C 400 540, 360 500, 360 450 C 360 400, 400 360, 450 360 Z"
              stroke="rgba(255,255,255,0.035)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 450 390 C 480 390, 510 420, 510 450 C 510 480, 480 510, 450 510 C 420 510, 390 480, 390 450 C 390 420, 420 390, 450 390 Z"
              stroke="rgba(0,163,255,0.02)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 450 420 C 462 420, 480 430, 480 450 C 480 470, 462 480, 450 480 C 438 480, 420 470, 420 450 C 420 430, 438 420, 450 420 Z"
              stroke="rgba(255,255,255,0.035)"
              strokeWidth="1"
              fill="none"
            />

            {/* Connecting Flowing Lines */}
            <path
              d="M 0 350 Q 150 320 300 300 T 600 250"
              stroke="rgba(255,255,255,0.025)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 0 380 Q 150 350 300 330 T 600 280"
              stroke="rgba(0,163,255,0.015)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 0 410 Q 150 380 300 360 T 600 310"
              stroke="rgba(255,255,255,0.025)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 0 440 Q 150 410 300 390 T 600 340"
              stroke="rgba(0,163,255,0.015)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 0 470 Q 150 440 300 420 T 600 370"
              stroke="rgba(255,255,255,0.02)"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M 0 500 Q 150 470 300 450 T 600 400"
              stroke="rgba(0,163,255,0.015)"
              strokeWidth="1"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topographic-pattern)" />
      </svg>
    </div>
  );
}
