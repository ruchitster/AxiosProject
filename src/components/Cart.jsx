import { useCart } from '../contexts/CartContext.jsx';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty</h2>
        <p>Browse courses and add some to get started!</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart ({totalItems} items)</h1>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="cart-item-price">${item.price}</div>
            </div>
            <div className="cart-item-controls">
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="total">Total: ${totalPrice.toFixed(2)}</div>
        <button className="clear-cart-btn" onClick={clearCart}>
          Clear Cart
        </button>
        <button className="checkout-btn" disabled={totalItems === 0}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

