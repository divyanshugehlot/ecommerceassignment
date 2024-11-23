
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

interface HeaderProps{
    totalCartItems: number
}

const Header: React.FC<HeaderProps> = ({totalCartItems}) => {


  return (
    <header className="bg-gradient-to-r from-neutral-800 to-neutral-600 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        
        <Link
          to="/"
          className="text-3xl font-bold tracking-wide hover:text-gray-200 transition-colors"
        >
          MyShop
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <FiShoppingCart size={28} />
           
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalCartItems}
            </span>
          </Link>

         
        </div>
      </div>

     
    </header>
  );
};

export default Header;
