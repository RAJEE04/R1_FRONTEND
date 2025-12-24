import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ORDER_API = "http://localhost:5000/api/orders";

/* ================= TYPES ================= */

interface OrderItem {
  productId?: string;
  productName: string;
  price: number;
  quantity: number;
  category?: string;
  total?: number;
}

interface Order {
  _id: string;
  orderId: string;

  // NEW
  items?: OrderItem[];

  // OLD (flat)
  productName?: string;
  price?: number;
  quantity?: number;
  category?: string;

  customerName: string;
  address: string;
  totalPrice: number;
  paymentMethod: string;
  createdAt: string;
}

/* ================= COMPONENT ================= */

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(ORDER_API, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(res.data.order || res.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* ================= NORMALIZER ================= */

  const getDisplayItems = (order: Order): OrderItem[] => {
    // NEW schema
    if (order.items && order.items.length > 0) {
      return order.items.map((item) => ({
        ...item,
        total:
          item.total ??
          item.price * item.quantity,
      }));
    }

    // OLD schema (flat)
    if (
      order.productName &&
      order.price !== undefined &&
      order.quantity !== undefined
    ) {
      return [
        {
          productName: order.productName,
          price: order.price,
          quantity: order.quantity,
          category: order.category,
          total: order.price * order.quantity,
        },
      ];
    }

    return [];
  };

  /* ================= RENDER ================= */

  return (
    <>
      <Navbar setSearch={() => {}} setMenu={() => {}} />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const displayItems = getDisplayItems(order);

              return (
                <div
                  key={order._id}
                  className="border rounded-xl p-5 bg-white shadow"
                >
                  {/* HEADER */}
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="font-semibold">Order ID</p>
                      <p className="text-sm text-gray-600">{order.orderId}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="font-bold text-green-700">
                        ₹{order.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* ITEMS */}
                  <div className="space-y-3">
                    {displayItems.length > 0 ? (
                      displayItems.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between border-b pb-2"
                        >
                          <div>
                            <p className="font-medium">
                              {item.productName}
                            </p>
                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity} × ₹{item.price}
                            </p>
                            {item.category && (
                              <p className="text-xs text-gray-500">
                                Category: {item.category}
                              </p>
                            )}
                          </div>

                          <p className="font-semibold">
                            ₹{item.total?.toFixed(2)}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        No product details available
                      </p>
                    )}
                  </div>

                  {/* CUSTOMER INFO */}
                  <div className="mt-4 text-sm text-gray-700">
                    <p>
                      <span className="font-semibold">Customer:</span>{" "}
                      {order.customerName}
                    </p>
                    <p>
                      <span className="font-semibold">Address:</span>{" "}
                      {order.address}
                    </p>
                    <p>
                      <span className="font-semibold">Payment:</span>{" "}
                      {order.paymentMethod}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Orders;
