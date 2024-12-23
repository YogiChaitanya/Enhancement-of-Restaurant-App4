import {Component} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Cart from './components/Cart'

import CartContext from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

// write your code here
class App extends Component {
  state = {
    cartList: [],
  }

  // this method adds the cart item to the cartList
  addCartItem = dish => {
    const {cartList} = this.state
    const dishObject = cartList.find(
      eachCartItem => eachCartItem.dishId === dish.dishId,
    )

    if (dishObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (eachCartItem.dishId === dishObject.dishId) {
            const updatedQuantity = eachCartItem.quantity + dish.quantity
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, dish]
      this.setState({cartList: updatedCartList})
    }
  }

  // this method removes the cart item from the cartList
  removeCartItem = dishId => {
    const {cartList} = this.state
    const updatedQuantity = cartList.filter(
      eachCartItem => eachCartItem.dishId !== dishId,
    )
    this.setState({cartList: updatedQuantity})
  }

  // this method is used to remove all the cart items in the cartList
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  // this method increases the quantity of a dish in the cartList
  incrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (dishId === eachCartItem.dishId) {
          const updatedQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  // this method decreases the quantity of a dish in the cartList
  decrementCartItemQuantity = dishId => {
    const {cartList} = this.state
    const dishItemObject = cartList.find(
      eachCartItem => eachCartItem.dishId === dishId,
    )

    // console.log(`checking2 dishItemObject has quantity or not?`)
    // console.log(dishItemObject)

    if (dishItemObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (eachCartItem.dishId === dishId) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(dishId)
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
