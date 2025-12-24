import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import {
  increaseQty,
  decreaseQty,
  removeItem,
} from "../redux/CartSlicet";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CartPage = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBuyNow = () => {
    if (cart.length === 0) return;
    localStorage.setItem("checkout_cart", JSON.stringify(cart));
    navigate("/buynow");
  };

  return (
    <>
      <Navbar setSearch={() => {}} setMenu={() => {}} />

      <div className="min-h-screen bg-gray-100 p-10">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Cart is empty</p>
        ) : (
          <>
            <div className="space-y-5 max-w-4xl mx-auto">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 border rounded bg-white"
                >
                  <img
                    src={item.image}
                    className="w-20 h-20 object-contain"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p>Price: ₹{item.price}</p>
                    <p className="font-bold text-green-700">
                      Total: ₹{(item.price * item.qty).toFixed(2)}
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => dispatch(decreaseQty(item.id))}
                        className="px-3 py-1 bg-gray-300 rounded"
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => dispatch(increaseQty(item.id))}
                        className="px-3 py-1 bg-gray-300 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => dispatch(removeItem(item.id))}
                        className="ml-auto bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <button
                onClick={handleBuyNow}
                className="bg-green-600 text-white px-10 py-4 text-lg font-bold rounded"
              >
                Buy Now
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default CartPage;
