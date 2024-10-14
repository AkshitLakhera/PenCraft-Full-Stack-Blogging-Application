import pen from "../../assets/hero-pen.png";
export const AboutUs = () => {
  return (
    <div className="mt-12 flex flex-col  border-2 border-red-600 p-5">
      <h1 className=" mb-2 text-3xl font-medium text-center tracking-wide">
        Crafting a World of Ideas
      </h1>
      <div className="flex justify-around border-2 border-red-600">
        <div className="imagePart w-1/2  min-h-64 border-2 border-pink-400">
          <img
            className=" object-contain w-3/4 rounded-2xl"
            src={pen}
            alt="image"
          />
        </div>
        <div className="textPart border-2 border-pink-400 w-1/2 p-5 flex flex-col  justify-center">
          <h3 className="text-lg text-center mb-4">
            Your voice, your platform.
          </h3>
          <p className="mb-4">
            You hold the key to your stories, audience, and growth. With full
            creative control and zero intermediaries, you can publish content
            that reflects your vision and connects with readers on your terms.
          </p>
          <button className="mb-4 font-semibold">Start Your Blog →</button>
        </div>
      </div>
    </div>
  );
};
