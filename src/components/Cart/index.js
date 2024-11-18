import Header from '../Header'
import CartContext from '../../context/CartContext'
import CartItem from '../CartItem'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0

      const onClickRemoveAllBtn = () => {
        removeAllCartItems()
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <div className="empty-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                  alt="remove all"
                />
              </div>
            ) : (
              <div className="cart-content-container">
                <div className="remove-all-btn-container">
                  <button
                    onClick={onClickRemoveAllBtn}
                    className="remove-all-btn"
                    type="button"
                  >
                    Remove All
                  </button>
                </div>

                <ul className="cart-list-container">
                  {cartList.map(eachCartItem => (
                    <CartItem
                      key={eachCartItem.dishId}
                      cartItemDetails={eachCartItem}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
