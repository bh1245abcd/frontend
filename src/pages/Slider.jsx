import React, { useState, useEffect } from "react";
// import banar1 from "../assets/banar1.png"
import banar2 from "../assets/banar2.jpg"
import banar3 from "../assets/banar3.png"
import banar4 from "../assets/banar4.png"
import banar6 from "../assets/banar6.jpg"
import banar7 from "../assets/banar7.jpg"
import banar8 from "../assets/banar8.jpg"


const Slider = () => {
    const images = [banar2, banar3, banar4, banar6, banar7, banar8];
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="relative w-full px-0 mx-0 overflow-hidden">

            <div
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`slide-${index}`}
                        className="w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[550px] object-cover flex-shrink-0"
                    />
                ))}
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`rounded-full transition-all duration-300 ${index === current
                            ? "bg-white w-3 h-3"
                            : "bg-gray-400 w-2 h-2"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
