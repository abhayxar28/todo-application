import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';
import EditTodo from './components/EditTodo';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import {userAtom} from './store/atoms/userAtom';
import './App.css'
import axios from 'axios';
import API_URL from './config';
import { useEffect } from 'react';

function App() {
  return (
    <div>
      <RecoilRoot>
      <Router>
        <InitUser/>
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path='/login' element={<Signin/>}/>
          <Route path='/todos' element={<Todos/>}/>
          <Route path='/createtodo' element={<AddTodo/>}/>
          <Route path='/todos/todo/:todoId' element={<Todo/>}/>
          <Route path='/todos/todo/:todoId/edit' element={<EditTodo/>}/>
        </Routes>
      </Router>
      </RecoilRoot>
    </div>
  )
}

function InitUser(){
  const setUsername = useSetRecoilState(userAtom);

  const fetchData = async()=>{
    const res = await axios.get(`${API_URL}/user/me`,{
      headers:{
        'Content-Type' : 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })

    if(res.data.username){
      setUsername({
        username: res.data.username
      })
    }
    else{
      setUsername({
        username: null
      })
    }
  }

  useEffect(()=>{
    fetchData();
  },[])

  return(
    <div></div>
  )
}

export default App
