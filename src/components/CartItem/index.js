import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value

      const {cartItemDetails} = props
      const {dishId, dishName, dishImage, dishPrice, quantity} = cartItemDetails

      const onClickPlusBtn = () => {
        incrementCartItemQuantity(dishId)
      }

      const onClickMinusBtn = () => {
        decrementCartItemQuantity(dishId)
      }

      const onRemoveCartItem = () => {
        removeCartItem(dishId)
      }

      const totalPrice = dishPrice * quantity

      return (
        <li className="cart-item">
          <img src={dishImage} alt={dishName} className="dish-image" />

          <div className="quantity-details-card">
            <p>{dishPrice}</p>

            <div className="plus-quantity-minus-btn-container">
              <button
                onClick={onClickMinusBtn}
                className="p-m-button"
                type="button"
              >
                -
              </button>
              <p className="quantity-label">{quantity}</p>
              <button
                onClick={onClickPlusBtn}
                className="p-m-button"
                type="button"
              >
                +
              </button>
            </div>

            <div className="total-price-remove-container">
              <p className="cart-total-price">${totalPrice}/-</p>
              <button
                onClick={onRemoveCartItem}
                className="remove-btn"
                type="button"
              >
                Remove
              </button>
            </div>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
