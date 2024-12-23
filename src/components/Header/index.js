import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineLogout} from 'react-icons/ai'
import {IoCartOutline} from 'react-icons/io5'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const {restaurantName} = props

  const renderCartIcon = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const count = cartList.length

        return (
          <div className="cart-icon-container">
            <p className="cart-count-badge">{count}</p>
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  const onClickLogoutBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onClickCartRoute = () => {
    const {history} = props
    history.push('/cart')
  }

  return (
    <nav className="header-container">
      <Link to="/" className="link-item">
        <h1 className="logo-heading">{restaurantName}</h1>
      </Link>

      <div className="orders-container-desktop">
        <p className="my-order-text">My Orders</p>

        <button
          type="button"
          data-testid="cart"
          className="link-item"
          onClick={onClickCartRoute}
        >
          {renderCartIcon()}
        </button>

        <button type="button" className="logout-btn" onClick={onClickLogoutBtn}>
          Logout
        </button>
      </div>

      <div className="orders-container-mobile">
        <button
          type="button"
          data-testid="cart"
          className="link-item"
          onClick={onClickCartRoute}
        >
          <IoCartOutline size={30} />
          {renderCartIcon()}
        </button>

        <button type="button" className="logout-btn" onClick={onClickLogoutBtn}>
          <AiOutlineLogout size={30} />
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
