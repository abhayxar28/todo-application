import axios from 'axios';
import React, { useEffect, useState } from 'react'
import API_URL from '../config';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import Divider from '@mui/material/Divider';

export default function Todo() {
    const navigate = useNavigate();
    const {todoId} = useParams();
    const [todo, setTodo] = useState([]);
    const fetchData = async()=>{
        const res = await axios.get(`${API_URL}/todos/todo/${todoId}`,{
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        const data = res.data;
        setTodo(data.todo);
    }

    useEffect(()=>{
        fetchData();
    },[])

    const handleDelete = async()=>{
        const res = await axios.delete(`${API_URL}/todos/todo/${todoId}`,{
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        const data = res.data;
        navigate('/todos');
    }

  return (
    <div>
        <div className='todo-nav'>
            <div>
                <Typography variant={'h4'}>{todo.title}</Typography>
            </div>
            <div >
                <div className='todo-nav-button'>
                    <Button variant={'contained'} style={{background:'#3E976F'}} onClick={()=>{navigate(`/todos/todo/${todo._id}/edit`)}}>Edit</Button>
                    <Button variant={'contained'} style={{background:'#D7292E'}} onClick={handleDelete}>Delete</Button>
                    <Button variant={'contained'} style={{background:'#6882D7'}} onClick={()=>{navigate('/todos')}}>Back</Button>
                </div>
            </div>
        </div>
        <div style={{display:'flex', justifyContent: 'center', marginTop: '14px'}}>
            <Divider variant="middle" style={{borderColor: 'white', width: '94%'}}/>
        </div>
        <div className='todo-main'>
            <Typography variant={'h6'} style={{padding: 20}}>{todo.description}</Typography>
        </div>
    </div>
  )
}

