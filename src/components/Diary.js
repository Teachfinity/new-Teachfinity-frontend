import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import { AddCircle, Edit, Cancel } from '@material-ui/icons';
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/userSlice";
import "../css/Diary.css";
import axios from 'axios'

function Diary() {
  const [input, setInput] = useState('')
  const [task, setTask] = useState([])
  const [button, setButton] = useState('Add')
  const [key, setKey] = useState('')
  const [del, setDel] = useState('')
  const [render, setRender] = useState(false)
  const user = useSelector(selectUser);

  const update = (taskk, indexx) => {
    setDel(taskk)
    setInput(taskk)
    setButton('Update')
    setKey(indexx)
  }
  const addtask = () => {
    if (button === 'Update') {
      axios.put('http://localhost:5000/users/updateuser/'+user.uid+'/removetask/'+del)
      .then(()=>{
        axios.put('http://localhost:5000/users/updateuser/'+user.uid+'/task/'+input)
        .then(()=>{
          setInput('')
          setRender(true)
        })
      })
    }
    else if (input !== '') {
      axios.put('http://localhost:5000/users/updateuser/'+user.uid+'/task/'+input)
      setInput('')
      setRender(true)
    }
  }
  const removetask = (taskk) =>{
    axios.put('http://localhost:5000/users/updateuser/'+user.uid+'/removetask/'+taskk)
    setRender(true)
  }
  useEffect(()=>{
    setRender(false)
    axios.get('http://localhost:5000/users/getusers/'+user.uid)
    .then((res)=>{
      console.log(res.data[0].diary)
      setTask(res.data[0].diary)
    })
  },[render])
    return (
      <header className="bg" >
        <header className="bg-cover">
          <div className="dbox">
            <br></br><h1>My Diary</h1><br></br>
            <div>
              <TextField className="textfield" value={input} onChange={event=> setInput(event.target.value)} label="Todo"  placeholder="add task..."></TextField>
              <Button onClick={addtask} className="button"><AddCircle className="addicon"></AddCircle></Button>
            </div>
            <div>
              {task.map((ttask, index) => (
                <div className="TODO">
                  {index+1}) {ttask.todo}
                  <div className="todoicons">
                  <Button onClick={() => update(ttask.todo, index)} className="button"><div className="todoicons"><Edit></Edit></div></Button>
                  <Button onClick={() => removetask(ttask.todo)} className="button"><div className="todoicons"><Cancel></Cancel></div></Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>
      </header>
    )
}

export default Diary;