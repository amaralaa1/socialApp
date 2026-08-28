import React, { useContext, useState } from 'react'
import { Button, Input } from '@heroui/react';
import { useForm } from 'react-hook-form';
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../context/Userdata';



export default function Login() {
  

 let{Token,setToken} =useContext(UserData)



  let navigate = useNavigate();
 

  let [loading, setloading]=useState(false);
  let [errMsg, seterrMsg]=useState(null);
 
 
  let schema = z.object({
    email: z.email(),
      password: z.string().regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/,
      "Invalid Password"),
} )

 let {register, handleSubmit , formState}  = useForm({
    defaultValues:{
      email : "",
      password : "",
    },
    resolver : zodResolver(schema)
   })

  

  function submitForm( values){
    setloading(true)
  axios.post(`https://route-posts.routemisr.com/users/signin`, values)
 .then((res) => {

  console.log(res.data.data);

  if (res.data.message === "signed in successfully") {

    localStorage.setItem(
      "userToken",
      res.data.data.token
    );

    console.log("Token =", res.data.data.token);

    setToken(res.data.data.token);

    setloading(false);

    navigate("/home");
  }

})
   .catch((err)=>{

  setloading(false)

  if(err.response){

    console.log(err.response.data.message)

    seterrMsg(err.response.data.message)

  }else{

    seterrMsg("Network Error")
  }
})
  }


  
  return < div className='bg-gray-200 text-black p-5 w-[75%] mx-auto my-5 rounded-2xl'>
 <h2> Login Now!</h2>
 { errMsg !== null?<h5 className='text-red-600 text-center rounded-2xl'>{errMsg}</h5> :""}
  <form onSubmit = {handleSubmit( submitForm)}>
  
    <div>
      <Input {...register('email')} name='email' aria-label="email" className="w-full my-3" placeholder="Enter your Email" />
       {formState.errors.email?<p className='text-red-800'>{formState.errors.email.message}</p> : ""}
   </div>

 <div>
      <Input {...register('password')} name='password' aria-label="password" className="w-full my-3" placeholder="Enter your Password" />
        {formState.errors.password?<p className='text-red-800'>{formState.errors.password.message}</p> : ""}
   </div>

<Button type="submit" className="w-full">
{loading ==true? <i className='fa fa-spin fa-spinner'></i>:'Login' }

  
</Button>



   
  </form>
  
  </div>
}

 