import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import AddProject from './AddProject';

class ProjectList extends Component{

  constructor(){
    super();
    this.state = {
      listOfProjects: []
    }
  }

  getAllProjects = () => {
    axios.get('http://localhost:5000/api/projects', {withCredentials: true})
      .then( resFromApi => {
        this.setState({
          listOfProjects: resFromApi.data
        })
      })
      .catch( err => {
        console.log(err)
      })
  }

  componentDidMount(){
    this.getAllProjects();
  }

  render(){
    return (
      <div>
        <div style={{width: '60%', float: 'left'}}>
          {this.state.listOfProjects.map((project, index) => {
            return(
              <div key={index}>
                <Link to={`/projects/${project._id}`}>
                  <h3>{project.title}</h3>
                </Link>
                <p style={{textAlign: 'center'}}>{project.description}</p>
              </div>
              
            );
          })}
        </div>
        <div style={{width: '40%', float: 'right'}}>
            <AddProject getData={() => this.getAllProjects()}></AddProject>
          </div>
      </div>
    );
  }

}


export default ProjectList;