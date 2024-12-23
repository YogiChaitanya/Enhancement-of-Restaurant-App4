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
            <p>{dishName}</p>

            <div className="plus-quantity-minus-btn-container">
              <button
                data-testid="cart-minus-btn"
                onClick={onClickMinusBtn}
                className="p-m-button"
                type="button"
              >
                -
              </button>
              <p className="quantity-label">{quantity}</p>
              <button
                data-testid="cart-plus-btn"
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
                data-testid="remove-btn"
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
