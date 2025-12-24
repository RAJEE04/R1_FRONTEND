import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const CartIcon = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);

  return (
    <div
      className="relative"
    >
      <ShoppingCart size={28} />
      
      {cart.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          
          {cart.reduce((acc, item) => acc + item.qty, 0)}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
