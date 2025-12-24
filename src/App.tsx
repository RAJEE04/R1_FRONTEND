import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import ProductDetails from "./components/ProductDetails";
import CartPage from "./components/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BuyNow from "./components/BuyNow";
import ThankYou from "./pages/ThankYou";
import Receipt from "./pages/Receipt";
import Contact from "./pages/Contact";
import Error from "./components/Error";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import { useEffect } from "react";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Main />} />
        <Route path="/detail" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/buynow" element={<BuyNow />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error />} />
       
      </Routes>
    </Router>
  );
}

export default App;

