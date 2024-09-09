import React, { useState } from 'react'
import {Card, TextField, Button, Typography} from '@mui/material';
import API_URL from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../store/atoms/userAtom';

export default function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const userEmail = useSetRecoilState(userAtom);

    const handleClick = async()=>{
        const res = await axios.post(`${API_URL}/user/signup`,{
            username: username, 
            password: password
        }, {
            headers:{
                'Content-Type' : 'application/json'
            }
        })
        const data = res.data;
        localStorage.setItem('token', data.token);
        userEmail({
            username:username
        })
        navigate('/todos')
    }

  return (
    <div>
        <header>
            <Typography variant={'h4'}>Welcome to Sign up page.</Typography>
        </header>
        <div className='card-component'>
            <Card className="card">
                <TextField 
                    className="outlined-basic" 
                    label="Username" 
                    variant="outlined" 
                    fullWidth={true}
                    onChange={(e)=>{
                        setUsername(e.target.value)
                    }}/>
                <br /><br />
                <TextField 
                    className="outlined-basic" 
                    label="Password" 
                    variant="outlined" 
                    type='password'
                    fullWidth={true}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    />
                <br /><br />
                <Button variant="contained" onClick={handleClick}>signup</Button>
            </Card>
        </div>
    </div>
  )
}
