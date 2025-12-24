import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Receipt = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order || JSON.parse(localStorage.getItem("order") || "null");

  if (!order) {
    return (
      <div className="text-center mt-20">
        <p>No receipt data found.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Go Home
        </button>
      </div>
    );
  }

  const generatePDF = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.text("Order Receipt", 14, 20);

    pdf.setFontSize(12);
    pdf.text(`Order ID: ${order.orderId}`, 14, 30);
    pdf.text(`Payment Method: ${order.paymentMethod}`, 14, 38);

    const tableColumn = ["Product", "Qty", "Unit Price", "Total"];
    const tableRows: any[] = [];

    order.items.forEach((item: any) => {
      tableRows.push([
        item.productName,
        item.quantity.toString(),
        `Rs.${item.price}`,
        `Rs.${item.total}`,
      ]);
    });

    autoTable(pdf, {
      startY: 45,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    });

    const finalY = (pdf as any).lastAutoTable?.finalY || 60;

    pdf.text(`Grand Total: Rs.${order.totalPrice}`, 14, finalY + 10);
    pdf.text("Customer Details:", 14, finalY + 20);
    pdf.text(`Name: ${order.customerName}`, 14, finalY + 30);
    pdf.text(`Phone: ${order.phone}`, 14, finalY + 40);
    pdf.text(`Address: ${order.address}`, 14, finalY + 50);

    pdf.save(`Receipt-${order.orderId}.pdf`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar setSearch={() => {}} setMenu={() => {}} />

      <div className="mt-12 flex-1 p-6 max-w-lg mx-auto bg-white border rounded shadow">
        <h1 className="text-2xl font-bold mb-3">Order Receipt</h1>

        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>

        {order.items.map((item: any, idx: number) => (
          <p key={idx}>
            <strong>Product:</strong> {item.productName} (Qty: {item.quantity}) Rs.{item.total}
          </p>
        ))}

        <p><strong>Total Price:</strong> Rs.{order.totalPrice}</p>

        <h2 className="text-xl font-semibold mt-4 mb-2"><strong>Customer Details</strong></h2>
        <p><strong>Name:</strong> {order.customerName}</p>
        <p><strong>Phone:</strong> {order.phone}</p>
        <p><strong>Address:</strong> {order.address}</p>

        <button
          onClick={generatePDF}
          className="mt-5 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Receipt;
