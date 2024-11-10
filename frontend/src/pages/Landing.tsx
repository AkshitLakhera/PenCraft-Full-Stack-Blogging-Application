export const Landing = () => {
  return (
    <div className="bg-black h-screen">
      <div className="sparkle">
        <SparklesPreview />
      </div>
      <div className="">
        <TypewriterEffectSmoothDemo />
      </div>
    </div>
  );
};
// Effect  auto complete text  ui acetetnity
("use client");
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { useNavigate } from "react-router-dom";
import { AboutUs } from "@/components/ui/AboutUs";
import { Explore } from "@/components/ui/Explore";
export function TypewriterEffectSmoothDemo() {
  const navigate = useNavigate();
  const handleSignin = () => {
    navigate("/signin");
  };
  const handleSignup = () => {

    navigate("/signup");
  };
  const words = [
    {
      text: "Crafting",
      className: "text-white",
    },
    {
      text: "Inspiring",
      className: "text-white",
    },
    {
      text: "Blogging",
      className: "text-white",
    },
    {
      text: "Experiences With",
      className: "text-white",
    },
    {
      text: "PenCraft.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-start h-4/6 bg-black ">
      <p className="text-neutral-600 dark:text-neutral-200 text-lg sm:text-base">
        Unlock Your Creativity Here
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row pb-4 space-x-0 space-y-2 md:space-y-0 md:space-x-4">
        <button
          onClick={handleSignin}
          className="w-40 h-10 rounded-xl bg-black border dark:border-white border-white text-white text-sm transition duration-300 ease-in-out hover:bg-white hover:text-black hover:border-black"
        >
          Sign In
        </button>
        <button
          onClick={handleSignup}
          className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm transition duration-300 ease-in-out hover:bg-black hover:text-white hover:border-white"
        >
          Signup
        </button>
      </div>
      <div>
        <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-blue-500/30" />
        <AboutUs />
      </div>
      <div>
        <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-blue-500/30" />
        <Explore />
      </div>
      <div>
        <FAQ/>
      </div>
    </div>
  );
}
//  Effect sparkel ui aceternity
("use client");
import { SparklesCore } from "@/components/ui/sparkles";
import FAQ from "@/components/ui/faq";

export function SparklesPreview() {
  return (
    <div className="h-1/3 w-full pt-[10vh] lg:pt-16 bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
        PenCraft
      </h1>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
