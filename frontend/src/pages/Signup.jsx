import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useSelector } from 'react-redux';


const Signup = () => {
  const history = useNavigate();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  if(isLoggedIn === true){
    history("/")
  }
   
   const [Data, setData] = useState({
    username:"",
    email:"",
    password:"",
   })

   const change = (e)=>{
       const {name,value} = e.target;
       setData({...Data,[name]:value});
   }
   const submit  = async()=>{
    try {
      if(Data.username === "" || Data.email === "" || Data.password ===""){
        alert("All fields are required");
      }else{
       const response =  await axios.post("http://localhost:1000/api/v1/sign-in",Data)
       setData({
        username:"",
        email:"",
        password:"",
       })
       history("/login")
      }
    } catch (error) {
      alert(error.response.data.message);
      
    }
   }

  return (
    <div className='h-[98vh] flex items-center justify-center'>
      <div className=' p-4 w-2/6 rounded bg-gray-800'>
       <div className=' text-2xl font-semibold'>Signup</div>
       <input type='username'  placeholder='username' name='username'
       className=' bg-gray-700 px-3 py-2 my-3 w-full rounded'
       value={Data.username}
       required
        onChange={change}
        />
        <input type='email'  placeholder='Email Id' name='email'
       className=' bg-gray-700 px-3 py-2 my-3 w-full rounded'
       value={Data.email}
       required
       onChange={change}
        />
        <input type='password'  placeholder='Password' name='password'
       className=' bg-gray-700 px-3 py-2 my-3 w-full rounded'
       value={Data.password}
       required
       onChange={change}
        />
         <div className=' w-full flex items-center justify-between'>
      <button className=' bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded'
      onClick={submit}
      >SignUp</button>
      <Link to="/login" className=' text-gray-400 hover:text-gray-200'>Already have account? login here!</Link>
      </div>
      </div>
    </div>
  )
}

export default Signup