import logo from "./logo.svg";
import Input from "./component/TextField";
import Btn from "./component/btns";
import TodoBtn from "./component/todoBtn";
import axios from "axios"
// import MediaCard from "./component/Card";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
const BASE_URI = "http://localhost:5000/post"

function App() {
  const [todo, setTodo] = useState([]);
  let [value, setValue] = useState("");
  // console.log(todo);
    
  ///GET API DATA////
  useEffect(()=>{
    axios.get("http://localhost:5000/")
    .then(res=>{
      res.data.map(val=>{
          todo.push(val.title)
          setTodo([...todo])
      })
    })
    .catch(err=>console.log(err))
  },[])


  ///SET INPUT VALUE ////
  const getInputValue = (e)=>{
    value  = e
    setValue(value) 
  }

  /////ADD TODO/////
  const addTodo = ()=>{
    if(value==""){
      alert("Please enter Todo")
    }  else{

      todo.push(value)
      setTodo([...todo])
      setValue("")
      const obj = {
        title: String(todo.slice(-1))
      }
      axios.post(BASE_URI,obj)
      .then(res=>console.log(res))
      .catch(err=>console.log(err))

    }
  
    }

    /////DELETE ALL///
    const delAll = ()=>{
      setTodo([])
      axios.delete("http://localhost:5000/")
      .then(res=>console.log(res))
      .catch(err=>console.log(err))
      
    }

    ////DEL ONE TODO///
    const del = (e)=>{
      todo.splice(e,1)
      setTodo([...todo])
    }

    ////EDIT TODO////
    const edit = (e)=>{
      const edit_value = prompt("Enter your Value",todo[e])
      todo.splice(e,1,edit_value)
      setTodo([...todo])
    }


  return (
    <div>
      <h1 style={{ textAlign: "center", margin: 10 }}>TODO APPLICATION</h1>

      <div className="header">
        <Input inpValue={value} value={getInputValue}/>
        <Btn btnValue="ADD TODO" color="primary" setFun={addTodo}/>
        <Btn btnValue="DELETE ALL" color="secondary"  setFun={delAll}  />
      </div>

      <section>
        <ul>
          {todo.map((val, ind) => {
            return (
              <li key={ind}>
                {val}
                <TodoBtn btnValue="EDIT" color="primary" indexNum={ind} setFun={edit}/>
                <TodoBtn btnValue="DEL TODO" color="secondary" indexNum={ind} setFun={del} />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default App;
