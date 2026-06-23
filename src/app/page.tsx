"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";

// Dynamically load the MediaPipe tracking and Origami display components with SSR disabled
const HolisticTracker = dynamic(() => import("@/components/HolisticTracker"), { ssr: false });
const OrigamiDisplay = dynamic(() => import("@/components/OrigamiDisplay"), { ssr: false });

export default function Home() {
  const fistProgress = useRef<number>(0);

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 h-screen w-full bg-[#0a0a0a] text-white overflow-hidden">
      {/* Left Column: Holistic Tracking Feed */}
      <section className="relative w-full h-[50vh] md:h-full overflow-hidden">
        <HolisticTracker fistProgress={fistProgress} />
      </section>

      {/* Right Column: Origami Interactive Display */}
      <section className="relative w-full h-[50vh] md:h-full overflow-hidden">
        <OrigamiDisplay fistProgress={fistProgress} />
      </section>
    </main>
  );
}
