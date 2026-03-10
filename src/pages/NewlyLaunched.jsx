import WeddingGifts from "../assets/wedding-gifts.jpg";
import StunnigEvery from "../assets/stunning-every-ear.webp";
import FloralBloom from "../assets/floral-bloom-desktop.webp";

export default function NewlyLaunched() {
  return (
    <div className="w-full flex flex-col items-center py-10">
       <h2 className="text-4xl font-bold text-center text-[#330708] fraunce-font">
        Abhi Collections
      </h2>
      <p className="text-gray-500 text-2xl text-center mb-8 fraunce-font-light">
        Explore our newly launched collection
      </p>

      <div className="w-11/12 md:w-10/12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl overflow-hidden shadow-md">
          <img
            src={FloralBloom}
            alt="Floral Bloom"
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl overflow-hidden shadow-md">
            <img
              src={StunnigEvery}
              alt="Stunning Every Ear"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="rounded-xl overflow-hidden shadow-md">
            <img
              src={WeddingGifts}
              alt="Wedding Gifts"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
