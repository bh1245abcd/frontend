import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#330000] text-white py-10">
      <div className="container mx-auto px-6 md:px-20">
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            gap-10
            border-b
            border-gray-600
            pb-8
            text-center md:text-left
          "
        >
          {/* Useful Links */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Useful Links</h2>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-gray-300 cursor-pointer" onClick={()=>alert("coming soon")}>Delivery Information</li>
              <li className="hover:text-gray-300 cursor-pointer" onClick={()=>alert("coming soon")}>International Shipping</li>
              <li className="hover:text-gray-300 cursor-pointer" onClick={()=>alert("coming soon")}>Payment Options</li>
              <Link to="/orders"><li className="hover:text-gray-300 cursor-pointer mb-2">Your Orders</li></Link>
              <li className="hover:text-gray-300 cursor-pointer" onClick={()=>alert("coming soon")}>Returns</li>
              <li className="hover:text-gray-300 cursor-pointer" onClick={()=>alert("coming soon")}>Find a Store</li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Information</h2>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-gray-300 cursor-pointer" onClick={()=>alert("coming soon")}>Blog</li>
              <li className="hover:text-gray-300 cursor-pointer" onClick={()=>alert("coming soon")}>Offers & Contest Details</li>
              <li className="hover:text-gray-300 cursor-pointer" onClick={()=>alert("coming soon")}>Help & FAQs</li>
              <Link to="/about"><li className="hover:text-gray-300 cursor-pointer">About Tanishq</li></Link>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-sm mb-2">1800-266-0123</p>

            <h2 className="text-lg font-semibold mb-2">Chat With Us</h2>
            <p className="text-sm mb-4">+91 8147349242</p>

            {/* Icons */}
            <div className="flex justify-center md:justify-start space-x-4 text-xl">
              <FaWhatsapp className="cursor-pointer hover:text-gray-300" />
              <FaEnvelope className="cursor-pointer hover:text-gray-300" />
              <FaPhoneAlt className="cursor-pointer hover:text-gray-300" />
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-5 text-2xl mt-6">
          <FaFacebookF className="cursor-pointer hover:text-gray-300" />
          <FaTwitter className="cursor-pointer hover:text-gray-300" />
          <FaInstagram className="cursor-pointer hover:text-gray-300" />
          <FaYoutube className="cursor-pointer hover:text-gray-300" />
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-sm text-gray-400 mt-6 border-t border-gray-700 pt-4">
          <p>© 2025 Abhi Jewellers. All Rights Reserved.</p>

          <div className="flex flex-wrap justify-center gap-4 mt-3">
            <a href="#" className="hover:text-white">Terms & Conditions</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Disclaimer</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
