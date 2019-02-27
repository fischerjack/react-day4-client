import React, {Component} from 'react';
import AuthService from './auth-service';
import {Link} from 'react-router-dom';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.service = new AuthService();
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {username, password} = this.state;
    this.service.login(username, password)
      .then(res => {
        this.setState({
          username: '',
          password: ''
        });
        this.props.getUser(res);
      })
      .catch( err => {
        console.log(err);
      })
  }

  render(){
    return (
      <div>
        <form onSubmit={ e => this.handleFormSubmit(e)}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)}></input>
          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)}></input>
          <input type="submit" value='Login!'></input>
        </form>
        <p>Don't have an account?
          <Link to={'/signup'}> Signup!</Link>
        </p>
      </div>
    );
  }
}

export default Login;