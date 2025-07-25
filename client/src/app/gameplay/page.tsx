import Gameplay from "@/components/GamePlay";
import { Suspense } from "react";

export default function GameplayWrapperPage() {
  return (
    <Suspense fallback={<div>Loading game...</div>}>
      <Gameplay/>
    </Suspense>
  );
}
