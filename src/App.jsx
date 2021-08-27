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
  // const [getData , setGetData] = useState({})
  let [value, setValue] = useState("");
  // console.log(todo);

  // /GET API DATA////
  useEffect(() => {
    axios.get("http://localhost:5000/")
      .then(res => {
        res.data.map((val, ind) => {
          todo[ind] = { title: val.title, uId: val.uId }
          setTodo([...todo])
          console.log(todo);
        })
      }

      )
      .catch(err => console.log(err))
  }, [])
  useEffect(() => {

  }, [])


  // console.log(todo);

  ///SET INPUT VALUE ////
  const getInputValue = (e) => {
    value = e
    setValue(value)
  }

  /////ADD TODO/////
  const addTodo = () => {
    if (value == "") {
      alert("Please enter Todo")
    } else {

      console.log(value)

      const arrObj = {
        title: value,
        uId: todo.length
      }

      todo.push(arrObj)

      ////AXIOS ///
      axios.post(BASE_URI, arrObj)
        .then(res => {
          console.log(res)
        }


        )
        .catch(err => console.log(err))

      // setTodo([...todo])
      setTodo([...todo])
      setValue("")
    }

  }

  /////DELETE ALL///
  const delAll = () => {
    setTodo([])
    axios.delete("http://localhost:5000/")
      .then(res => console.log(res))
      .catch(err => console.log(err))

  }

  ////DEL ONE TODO///
  const del = (e) => {

    const todoId = {
      "uId": todo[e].uId
    }

    axios.post("http://localhost:5000/delOne", todoId)
      .then((res) => {
        console.log(res.data)
        todo.splice(e, 1)
        setTodo([...todo])

      })
      .catch(err => console.log(err))

    // console.log(todo[e].id);
    // todo.splice(e,1)
    setTodo([...todo])


  }

  ////EDIT TODO////
  const edit = (e) => {
    const edit_value = prompt("Enter your Value", todo[e].title)

    if (!(edit_value.length > 0)) {
      alert("Please Enter Edit Value...")


    } else {

      todo[e].title = edit_value
      const todoObj = {
        uId: todo[e].uId,
        updatedValue: todo[e].title
      }

      axios.put("http://localhost:5000/", todoObj)
        .then(res => console.log(res))
        .catch(err => console.log(err))
      setTodo([...todo])

    }


  }


  return (
    <div>
      <h1 style={{ textAlign: "center", margin: 10 }}>TODO APPLICATION</h1>

      <div className="header">
        <Input inpValue={value} value={getInputValue} />
        <Btn btnValue="ADD TODO" color="primary" setFun={addTodo} />
        <Btn btnValue="DELETE ALL" color="secondary" setFun={delAll} />
      </div>

      <section>
        <ul>
          {todo.map((val, ind) => {
            return (
              <li key={ind}>
                {val.title}
                <TodoBtn btnValue="EDIT" color="primary" indexNum={ind} setFun={edit} />
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
