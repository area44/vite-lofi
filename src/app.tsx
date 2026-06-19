import { MotionConfig } from "motion/react";

import MusicPlayer from "@/components/player";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <MusicPlayer />
    </MotionConfig>
  );
}
