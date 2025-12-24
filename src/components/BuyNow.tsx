import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/CartSlicet";
import type { CartItem } from "../redux/CartSlicet";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

/* ================= API ================= */
const ORDER_API = "http://localhost:5000/api/orders";

/* ================= VALIDATION SCHEMA ================= */
const CheckoutSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits"),
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  zip: Yup.string()
    .required("Zip code is required")
    .matches(/^[0-9]{6}$/, "Zip code must be 6 digits"),
  paymentMethod: Yup.string().required("Payment method is required"),
});

const BuyNow = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartFromState: CartItem[] = JSON.parse(
    localStorage.getItem("checkout_cart") || "[]"
  );
  const [cart] = useState<CartItem[]>(cartFromState);

  if (!cart || cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar setSearch={() => {}} setMenu={() => {}} />
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-xl font-semibold">Your cart is empty!</h1>
        </div>
        <Footer />
      </div>
    );
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePlaceOrder = async (values: any) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to place an order");
      navigate("/login");
      return;
    }

    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 999)}`;
    const orderPayload = {
      orderId,
      items: cart.map((item) => ({
        productId: item.id,
        productName: item.title,
        price: item.price,
        quantity: item.qty,
        total: item.price * item.qty,
        category: item.category,
      })),
      customerName: values.name,
      phone: values.phone,
      address: `${values.street}, ${values.city} - ${values.zip}`,
      totalPrice,
      paymentMethod: values.paymentMethod,
    };

    try {
      await axios.post(ORDER_API, orderPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(clearCart());
      localStorage.removeItem("checkout_cart");

      navigate("/thank-you", { state: { order: orderPayload } });
    } catch (error: any) {
      console.error("Order placement failed", error.response?.data || error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar setSearch={() => {}} setMenu={() => {}} />

      <div className="flex-1 max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ORDER SUMMARY */}
          <div className="p-6 border rounded-xl bg-white space-y-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p>₹{item.price} × {item.qty}</p>
                  <p className="font-bold text-green-700">₹{(item.price * item.qty).toFixed(2)}</p>
                </div>
              </div>
            ))}

            <h3 className="text-xl font-bold text-right">Grand Total: ₹{totalPrice.toFixed(2)}</h3>
          </div>

          {/* SHIPPING + PAYMENT */}
          <div className="p-6 border rounded-xl bg-white">
            <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

            <Formik
              initialValues={{
                name: "",
                phone: "",
                street: "",
                city: "",
                zip: "",
                paymentMethod: "COD",
              }}
              validationSchema={CheckoutSchema}
              onSubmit={handlePlaceOrder}
            >
              {({ values, setFieldValue }) => (
                <Form className="space-y-4">
                  {["name", "phone", "street", "city", "zip"].map((field) => (
                    <div key={field} className="flex flex-col">
                      <Field
                        name={field}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        className="w-full p-2 border rounded"
                      />
                      <ErrorMessage
                        name={field}
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  ))}

                  <h2 className="text-xl font-semibold mt-6 mb-2">Payment Method</h2>
                  <div className="space-y-2">
                    {["COD", "UPI", "Card"].map((method) => (
                      <label key={method} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={values.paymentMethod === method}
                          onChange={() => setFieldValue("paymentMethod", method)}
                        />
                        <span>{method === "COD" ? "Cash on Delivery" : method}</span>
                      </label>
                    ))}
                    <ErrorMessage
                      name="paymentMethod"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Place Order
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BuyNow;
