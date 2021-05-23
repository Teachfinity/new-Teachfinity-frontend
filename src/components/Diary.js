import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import { AddCircle, Edit, Cancel } from '@material-ui/icons';
import "../css/Diary.css";

class Diary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      task: [],
      button: 'Add',
      key: ''
    }
  }
  updatestate = event => {
    const {value}  = event.target;
    this.setState({ input: value })
  }
  addtask = () => {
    if (this.state.button === 'Update') {
   
      const t = this.state.task
      t[this.state.key] = this.state.input ;
      this.setState({task: t})
      this.setState({button: "Add"})
      this.setState({input: ""})
    }
    else if (this.state.input !== '') {
      this.setState({ task: [...this.state.task, this.state.input] })
      this.setState({ input: '' })
    }
  }
  removetask = (taskkey) =>{
    const remove = this.state.task.filter(taskd =>{
      return taskd!==taskkey
    });
    this.setState({task: [...remove]})
  }
  render() {
    return (
      <header className="bg" >
        <header className="bg-cover">
          <div className="dbox">
            <br></br><h1>My Diary</h1><br></br>
            <div>
              <TextField className="textfield" value={this.state.input} onChange={this.updatestate} label="Todo"  placeholder="add task..."></TextField>
              <Button onClick={() => this.addtask()} className="button"><AddCircle className="addicon"></AddCircle></Button>
            </div>
            <div>
              {this.state.task.map((task, index) => (
                <div className="TODO">
                  {index+1}) {task}
                  <div className="todoicons">
                  <Button onClick={() => this.setState({input: task, button: "Update", key: index})} className="button"><div className="todoicons"><Edit></Edit></div></Button>
                  <Button onClick={() => this.removetask(task)} className="button"><div className="todoicons"><Cancel></Cancel></div></Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>
      </header>
    )
  }
}

export default Diary;