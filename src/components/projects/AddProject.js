import React, {Component} from 'react';
import axios from 'axios';

class AddProject extends Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      description: ''
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, description } = this.state;
    axios.post('http://localhost:5000/api/projects', {title, description}, {withCredentials: true})
      .then(() => {
        this.props.getData();
        this.setState({
          title: '',
          description: '',
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }


  render(){
    return (
      <div className='add-project'>
        <form onSubmit={(e) => this.handleFormSubmit(e)}>
          <label>Title: </label>
          <input type='text' name='title' value={this.state.title} onChange={(e) => this.handleChange(e)}></input>
          <label>Description: </label>
          <textarea name='description' value={this.state.description} onChange={(e) => this.handleChange(e)}></textarea>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    );
  }

}

export default AddProject;