import { Link } from "react-router-dom";
import f from "../assets/facebook-svgrepo-com.svg";
import i from "../assets/instagram-svgrepo-com.svg";
import t from "../assets/twitter-svgrepo-com.svg";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="grid grid-cols-3 gap-10 px-10">

        {/* Company + Social Icons Section */}
        <div>
          <h1 className="text-xl font-semibold mb-4 text-gray-500">Flipkart</h1>
          <p className="text-sm mb-4">
            The best online store for fashion, electronics, and lifestyle products.
          </p>

          {/* Social Icons Under Flipkart */}
          <div className="flex gap-4 mt-4">
            <Link to="https://www.facebook.com/flipkart/"><img src={f} className="w-6 cursor-pointer invert brightness-200" /></Link>
            <Link to="https://www.instagram.com/flipkart/"><img src={i} className="w-6 cursor-pointer invert brightness-200" /></Link>
            <Link to="https://x.com/flipkart/"><img src={t} className="w-6 cursor-pointer invert brightness-200" /></Link>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="ml-35">
          <h2 className="text-lg font-semibold mb-3 text-gray-500">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/home" className="hover:text-white">Home</a></li>
            {/* <li><a href="/detail" className="hover:text-white">Products</a></li> */}
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="ml-15">
          <h2 className="text-lg font-semibold mb-3 text-gray-500">Contact</h2>
          <p className="text-sm">Email: support@flipkart.com</p>
          <p className="text-sm">Phone: +91 98765 43210</p>
          <p className="text-sm mt-2">
            ©2025 Flipkart. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
