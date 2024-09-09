import { useState } from 'react';
import { Typography, TextField, Button} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';
import {useRecoilState} from 'recoil';
import { todoAtom } from '../store/atoms/todoAtom';

export default function AddTodo() {
    const navigate = useNavigate();
        const [isActiveTitle, setIsActiveTitle] = useState(false);
        const [isActiveDescription, setIsActiveDescription] = useState(false);
        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');
        const [todos, setTodos] = useRecoilState(todoAtom);

        const handleFocus = (field) => {
            if(field === 'title'){
                setIsActiveTitle(true); 
            }else if(field === 'description'){
                setIsActiveDescription(true);
            }
        };
        
        const handleBlur = (field) => {
            if(field === 'title'){
                setIsActiveTitle(false); 
            }else if(field === 'description'){
                setIsActiveDescription(false);
            }
        };

        const handleClick = async()=>{
            const res = await axios.post(`${API_URL}/todos/todo`,{
                title: title,
                description: description
            },{
                headers:{
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            })
            const data = res.data;
            setTodos(data);
            navigate('/todos');
        }

  return (
    <div>
        <div className='main-nav'>
            <Typography variant={'h4'}>New Note</Typography>
        </div>
        <div className='main'>
            <div className='main-left'>
                <div className='main-left-content'>
                    <Typography variant={'h6'}>Title</Typography>
                    <TextField 
                        type="text" 
                        placeholder='enter your title...'
                        onFocus={()=>handleFocus('title')}
                        onBlur={()=>handleBlur('title')}
                        fullWidth
                        onChange={(e)=>{setTitle(e.target.value)}}
                        style={{
                            border: ` 4px solid ${isActiveTitle ? 'blue': 'black'}`, 
                            borderRadius: 12, 
                            outline: 'none',
                            background: 'white'
                        }}/>
                </div>
                <div className='main-left-content'>
                    <Typography variant={'h6'}>Description</Typography>
                    <TextField 
                        placeholder='enter your description...'
                        onFocus={()=>handleFocus('description')}
                        onBlur={()=>handleBlur('description')}
                        fullWidth
                        multiline 
                        minRows={14}
                        onChange={(e)=>{setDescription(e.target.value)}}
                        style={{
                            border: ` 4px solid ${isActiveDescription ? 'blue': 'black'}`, 
                            borderRadius: 12, 
                            outline: 'none',
                            backgroundColor: 'white'
                        }}/>
                    
                </div>
            </div>
            <div className='main-left'>
                <div className='main-left-content'>
                    <Typography variant={'h6'}>Markdown Preview</Typography>
                    <TextField 
                        fullWidth
                        multiline 
                        value={description}
                        slotProps={{
                          input: {
                            readOnly: true,
                          },
                        }}
                        minRows={20}
                        style={{
                            borderRadius: 12, 
                            backgroundColor: 'white'
                        }}/>
                    
                </div>
                <div className='todo-button'>
                    <Button variant="contained" onClick={handleClick} >Save</Button>
                    <Button variant="contained" onClick={()=>{
                        navigate('/todos');
                    }}>Cancel</Button>
                </div>
            </div>
        </div>
    </div>
  )
}
