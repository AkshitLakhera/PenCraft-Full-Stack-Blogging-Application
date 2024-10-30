import pen from "../../assets/hero-pen.png";

export const AboutUs = () => {
  return (
    <div className="mt-12 flex flex-col max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <h1 className="text-center text-sm sm:text-base md:text-xl lg:text-3xl xl:text-5xl font-bold whitespace-nowrap">
        Crafting a World of Ideas
      </h1>
      <div className="flex flex-col sm:flex-row justify-center items-center mt-8">
        <div className="imagePart min-h-64 flex justify-center mb-5 sm:mb-0">
          <img
            className="object-contain w-3/4 rounded-2xl sm:w-1/2"
            src={pen}
            alt="image"
          />
        </div>
        <div className="textPart w-full sm:w-1/2 p-5 flex flex-col justify-center">
          <h3 className="text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center mb-5">
            Your voice, your platform.
          </h3>
          <p className="mb-5 text-xs sm:text-base md:text-base lg:text-base xl:text-lg">
            You hold the key to your stories, audience, and growth. With full
            creative control and zero intermediaries, you can publish content
            that reflects your vision and connects with readers on your terms.
          </p>
          <button className="before:ease relative h-12 w-40 overflow-hidden border border-black-500 bg-black-500 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-blue-500 hover:before:-translate-x-40">
            <span className="relative z-10">Start Your Blog →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
