import React, { useEffect, useState } from 'react'
import { Typography, Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../App';
import axios from 'axios';
import API_URL from '../config';
import { useRecoilState } from 'recoil';
import { todoAtom } from '../store/atoms/todoAtom';


export default function Todos() {
    const navigate = useNavigate();

    const [todos, setTodos] = useRecoilState(todoAtom);

    const fetchData = async()=>{
        try {
            const res = await axios.get(`${API_URL}/todos/todo`, {
                headers:{
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
            const data = res.data;
            setTodos(data.todo || []);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    }

    useEffect(()=>{
        fetchData();
    },[]);

  return (
    <div>
        <div className='main-nav'>
            <div>
                <Typography variant={'h4'}>Notes</Typography>
            </div>
            <div className='right-nav'>
                <div>
                <Button variant='contained' fullWidth={true} style={{borderRadius: 8}} onClick={()=>{
                    navigate('/createtodo');
                }}>+ Create</Button>
                </div>
                <div>
                <Button variant='contained' fullWidth={true} style={{borderRadius: 8}} onClick={()=>{
                    navigate('/');
                    localStorage.removeItem('token');
                }}>Logout</Button>
                </div>
            </div>
        </div>
        <div >
        {todos.length === 0 ? (
                    <div className='main-content'>
                        <div className='main-content-div'>
                            <Typography style={{ color: 'gray' }} variant={'h6'}>No note added, create a new note</Typography>
                            <Button variant="outlined" onClick={() => {
                                navigate('/createtodo');
                            }}>+ Create</Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className='todo-container'>
                        {Array.isArray(todos) && todos.map((todo)=>{
                            return(
                                <div>
                                    <Card  style={{width: 500, height: 100, cursor: 'pointer'}}>
                                        <div className='todo-card' onClick={()=>{
                                            navigate(`/todos/todo/${todo._id}`)
                                        }}>
                                            <Typography variant={'h6'}>{todo.title}</Typography>
                                        </div>
                                    </Card>
                                </div>
                            )
                        })}
                    </div>
                    </div>
                )}
        </div>
    </div>
  )
}
