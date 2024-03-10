

export const Landing = () => {
  return (
    <div>
        <TypewriterEffectSmoothDemo/>
    </div>
  )
}
"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
    const words = [
      {
        text: "Crafting",
        className: "text-white"
      },
      {
        text: "Inspiring",
        className: "text-white"
      },
      {
        text: "Blogging",
        className: "text-white"
      },
      {
        text: "Experiences With",
        className: "text-white"
      },
      {
        text: "PenCraft.",
        className: "text-blue-500 dark:text-blue-500",
      },
    ];
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base">
          Unlock Your Creativity Here
        </p>
        <TypewriterEffectSmooth words={words} />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-white text-white text-sm">
            Join now
          </button>
          <button className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm">
            Signup
          </button>
        </div>
      </div>
    );
  }
  