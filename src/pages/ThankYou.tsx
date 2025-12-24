import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ThankYou = () => {
  const { state } = useLocation();
  const order = state?.order;
  const navigate = useNavigate();

  if (!order) {
    return (
      <div className="text-center mt-20">
        <p>No order found.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar setSearch={() => {}} setMenu={() => {}} />

      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="bg-white p-6 shadow rounded-lg max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-green-600">Thank You!</h1>
          <p>Your order has been placed successfully.</p>

          <div className="mt-4 border p-4 rounded text-left">
            <p><strong>Order ID:</strong> {order.orderId}</p>

            {order.items.map((item: any, idx: number) => (
              <p key={idx}>
                <strong>Product:</strong> {item.productName} (Qty: {item.quantity})
              </p>
            ))}

            <p><strong>Total:</strong> ₹{order.totalPrice}</p>
            <p><strong>Payment:</strong> {order.paymentMethod}</p>

            <h2 className="text-lg font-semibold mt-2">Customer Details</h2>
            <p><strong>Name:</strong> {order.customerName}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Address:</strong> {order.address}</p>
          </div>

          <button
            onClick={() => navigate("/receipt", { state: { order } })}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded"
          >
            View Receipt
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ThankYou;
