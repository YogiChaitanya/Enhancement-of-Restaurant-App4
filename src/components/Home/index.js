import {Component} from 'react'
import Header from '../Header'
import DishItem from '../DishItem'
import TabItem from '../TabItem'
import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    response: [],
    activeCategoryId: '',
    restaurantName: '',
  }

  componentDidMount() {
    this.fetchRestaurantApi()
  }

  getUpdatedData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }))

  fetchRestaurantApi = async () => {
    const api =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const apiResponse = await fetch(api)
    const data = await apiResponse.json()
    // console.log(data[0].table_menu_list)
    const updatedData = this.getUpdatedData(data[0].table_menu_list)
    // console.log(updatedData)

    const name = data[0].restaurant_name

    this.setState({
      response: updatedData,
      activeCategoryId: updatedData[0].menuCategoryId,
      isLoading: false,
      restaurantName: name,
    })
  }

  renderDishes = () => {
    const {response, activeCategoryId} = this.state

    const {categoryDishes} = response.find(
      eachCategory => eachCategory.menuCategoryId === activeCategoryId,
    )

    return (
      <ul className="dishes-list-container">
        {categoryDishes.map(eachDish => (
          <DishItem key={eachDish.dishId} dishDetails={eachDish} />
        ))}
      </ul>
    )
  }

  updatedData = menuCategoryId => {
    this.setState({
      activeCategoryId: menuCategoryId,
    })
  }

  renderSpinner = () => (
    <div className="loader-container">
      <div className="spinner-border" role="status" />
    </div>
  )

  render() {
    const {isLoading, response, activeCategoryId} = this.state
    const {restaurantName} = this.state

    return isLoading ? (
      this.renderSpinner()
    ) : (
      <>
        <Header restaurantName={restaurantName} />
        <div className="home-container">
          <ul className="tab-container">
            {response.map(eachCategory => (
              <TabItem
                key={eachCategory.menuCategoryId}
                tabDetails={eachCategory}
                clickedTab={this.updatedData}
                isActive={activeCategoryId === eachCategory.menuCategoryId}
              />
            ))}
          </ul>

          {this.renderDishes()}
        </div>
      </>
    )
  }
}

export default Home
