import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../auth/auth-service';

class Navbar extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      loggedInUser: null
    };
    this.service = new AuthService();
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({
      ...this.state,
      loggedInUser: nextProps['userInSession']
    });
  }

  logoutUser = () => {
    this.service.logout()
      .then(() => {
        this.setState({
          loggedInUser: null
        });
        this.props.getUser(null);
      });
  }
  
  render(){
    if(this.state.loggedInUser){
      return (
        <nav className='nav-style'>
          <ul style={{padding: '0'}}>
            <li>Welcome, {this.state.loggedInUser.username}</li>
            <li>
              <Link to='/projects'>Projects</Link>
            </li>
            <li>
              <Link to={'/'}>
                <button onClick={() => this.logoutUser()}>Logout</button>
              </Link>
            </li>
          </ul>
        </nav>
      );
    } else {
      return (
        <div>
          <nav className='nav-style'>
            <ul>
              <li><Link to='/'>Login</Link></li>
              <li><Link to='/signup'>Signup</Link></li>
            </ul>
          </nav>
        </div>
      );
    }

    

    // return (
    //   <nav className='nav-style'>
    //     <ul style={{padding: '0'}}>
    //       <li><Link to='/projects' style={{textDecoration: 'none'}}>Projects</Link></li>
    //     </ul>
    //   </nav>
    // );
  }
  
}

export default Navbar;