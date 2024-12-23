import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
    showSubmitError: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    // cookies method
    // Cookies.set(cookiesName, cookiesValue, {expires: days})
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      errorMessage: errorMsg,
      showSubmitError: true,
    })
  }

  submitLoginDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const APIURL = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(APIURL, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  renderUsernameInput() {
    const {username} = this.state
    return (
      <div className="username-input-field">
        <label htmlFor="userNameID" className="input-label">
          USERNAME
        </label>
        <br />
        <input
          id="userNameID"
          type="text"
          className="input-field"
          value={username}
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  renderPasswordInput() {
    const {password} = this.state
    return (
      <div className="password-input-field">
        <label htmlFor="passwordID" className="input-label">
          PASSWORD
        </label>
        <br />
        <input
          id="passwordID"
          type="password"
          className="input-field"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  render() {
    const {showSubmitError, errorMessage} = this.state

    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.submitLoginDetails}>
          <h1>UNI Resto Cafe</h1>
          {this.renderUsernameInput()}
          {this.renderPasswordInput()}
          <button className="login-btn" type="submit">
            Login
          </button>

          {showSubmitError ? (
            <p className="error-message">{errorMessage}</p>
          ) : (
            ''
          )}
        </form>
      </div>
    )
  }
}

export default Login
