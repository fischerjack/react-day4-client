import React, {Component} from 'react';
import axios from 'axios';

class EditProject extends Component{
  constructor(props){
    super(props);
    this.state = {
      title: this.props.theProject.title,
      description: this.props.theProject.description
    }
  }

  handleFormSubmit = (event) => {
    const {title, description } = this.state;

    event.preventDefault();

    axios.put(`http://localhost:5000/api/projects/${this.props.theProject._id}`, {
      title,
      description
    },{
      withCredentials: true
    }
    )
      .then( () => {
        this.props.getTheProject();
      })
      .catch( err => {
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
      <div>
        <hr />
        <h3>Edit Form</h3>
        <form onSubmit={(e) => this.handleFormSubmit(e)}>
          <label>Title: </label>
          <input type="text" name="title" value={this.state.title} onChange={ (e) => this.handleChange(e)}></input>
          <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={ (e) => this.handleChange(e)}></textarea>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    );
  }
}

export default EditProject;