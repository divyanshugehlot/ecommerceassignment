import { useEffect } from "react";
import { useCart } from "../../context/CartContext";

import "./Cart.css"

import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    cartTotalAmount,
    addToCart,
    decreaseCart,
    removeFromCart,
    getTotals,
  } =useCart()
  useEffect(() => {
    getTotals(); // Calculate totals whenever cart items change
  }, [cartItems, getTotals]);
  console.log(cartItems,"cart items")

  const handleAddToCart = (product: any) => {
    addToCart(product); // Add to cart
  };

  const handleDecreaseCart = (product: any) => {
    decreaseCart(product); // Decrease cart quantity
  };

  const handleRemoveFromCart = (product: any) => {
    removeFromCart(product); // Remove item from cart
  };
  

  return (
    <div className="cart-container">
    <h2>Shopping Cart</h2>
    {cartItems.length === 0 ? (
      <div className="cart-empty">
        <p>Your cart is currently empty</p>
        <div className="start-shopping">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    ) : (
      <div>
        <div className="titles">
          <h3 className="product-title">Product</h3>
          <h3 className="price">Price</h3>
          <h3 className="quantity">Quantity</h3>
          <h3 className="total">Total</h3>
        </div>
        <div className="cart-items">
          {cartItems.map((cartItem) => (
            <div className="cart-item" key={cartItem.id}>
              <div className="cart-product">
                <img src={cartItem.image} alt={"image"} />
                <div>
                  <h3 className=" font-semibold text-blue-600 " >{cartItem.title}</h3>
                  <p>{cartItem.description}</p>
                  <button onClick={() => handleRemoveFromCart(cartItem)}>
                    Remove
                  </button>
                </div>
              </div>
              <div className="cart-product-price">${cartItem.price}</div>
              <div className="cart-product-quantity">
                <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                <div className="count">{cartItem.cartQuantity}</div>
                <button onClick={() => handleAddToCart(cartItem)}>+</button>
              </div>
              <div className="cart-product-total-price">
                ${cartItem.price * cartItem.cartQuantity}
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <div className="cart-checkout">
            <div className="subtotal">
              <span>Subtotal</span>
              <span className="amount">${cartTotalAmount}</span>
            </div>
            <p>Taxes and shipping calculated at checkout</p>
            <button>Check out</button>
            <div className="continue-shopping">
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default Cart;