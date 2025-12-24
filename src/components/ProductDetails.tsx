import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProductBanner from "./ProductBanner";
import ReviewSection from "./Review";
import { addToCart } from "../redux/CartSlicet";
import type { CartItem } from "../redux/CartSlicet";
import Swal from "sweetalert2";


const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const prod = location.state?.prod;
  if (!prod) return <h1>No product selected.</h1>;

  const handleAddToCart = () => {
  const item: CartItem = {
    id: prod.id,
    title: prod.title,
    price: prod.price,
    qty: 1,
    image: prod.image,
    category: prod.category,
  };

  dispatch(addToCart(item));

  Swal.fire({
    icon: "success",
    title: "Added to cart",
    text: "Product added to cart successfully!",
    timer: 1500,
    showConfirmButton: false,
  });
};


  const handleBuyNow = () => {
    const checkoutItem: CartItem = {
      id: prod.id,
      title: prod.title,
      price: prod.price,
      qty: 1,
      image: prod.image,
      category: prod.category,
    };

    localStorage.setItem("checkout_cart", JSON.stringify([checkoutItem]));
    navigate("/buynow");
  };

  return (
    <>
      <Navbar setSearch={() => {}} setMenu={() => {}} />

      <div className="min-h-screen bg-gray-100 p-10 flex justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-[1200px]">
          <div className="grid grid-cols-2 gap-6">
            <img
              src={prod.image}
              className="w-160 h-160 object-contain bg-gray-100"
              alt={prod.title}
            />

            <div>
              <h1 className="text-2xl font-semibold">{prod.title}</h1>
              <p className="text-green-700 text-3xl font-bold mt-3">
                ₹{prod.price}
              </p>

              <p className="text-gray-600 mt-4">{prod.description}</p>

              <div className="flex gap-4 mt-6">
                <button
                  disabled={prod.stock === 0}
                  onClick={handleAddToCart}
                  className={`px-5 py-3 w-[300px] font-semibold rounded
                    ${prod.stock === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-500"}`}
                >
                  Add to Cart
                </button>

                <button
                  disabled={prod.stock === 0}
                  onClick={handleBuyNow}
                  className={`px-5 py-3 w-[300px] font-semibold rounded
                    ${prod.stock === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 text-white"}`}
                >
                  {prod.stock === 0 ? "Out of Stock" : "Buy Now"}
                </button>
              </div>

              <ReviewSection productId={prod.id} />
            </div>
          </div>

          <ProductBanner />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
