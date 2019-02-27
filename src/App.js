//Necessary react imports
import React, { Component } from 'react';
import {Switch, Route } from 'react-router-dom';

//Styling
import logo from './logo.svg';
import './App.css';

//My components
import Navbar from './components/navbar/Navbar';
import ProjectList from './components/projects/ProjectList';
import ProjectDetails from './components/projects/ProjectDetails';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/protected-route';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      loggedInUser: null
    };
  }


  fetchUser(){
    if(this.state.loggedInUser === null){
      this.service.loggedin()
        .then(res => {
          this.setState({
            loggedInUser: res
          });
        })
        .catch( err => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  }
  
  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    });
  }

  render() {
    if(this.state.loggedInUser){
      return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser}></Navbar>
          <Switch>
            <ProtectedRoute user={this.state.loggedInUser} exact path='/projects' component={ProjectList}></ProtectedRoute>
            <ProtectedRoute user={this.state.loggedInUser} exact path='/projects/:id' component={ProjectDetails}></ProtectedRoute>
          </Switch>
        </div>
      );  
    } else{
      return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <Navbar userInSession={this.state.loggedInUser}></Navbar>
          <Switch>
            <Route exact path='/signup'render={() => <Signup getUser={this.getTheUser} />} />
            <Route exact path='/' render={() => <Login getUser={this.getTheUser} />}/>
            <ProtectedRoute user={this.state.loggedInUser} exact path='/projects' component={ProjectList}></ProtectedRoute>
            <ProtectedRoute user={this.state.loggedInUser} exact path='/projects/:id' component={ProjectDetails}></ProtectedRoute>
          </Switch>
        </div>
      );  
    }
  }
}

export default App;
