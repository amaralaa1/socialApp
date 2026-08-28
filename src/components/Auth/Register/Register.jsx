import React, { useState } from 'react'
import { Button, Input } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {

  let navigate = useNavigate();

  let [loading, setloading]=useState(false);
  let [errMsg, seterrMsg]=useState(null);

  let schema = z.object({
    name : z.string().min(2, 'at leats 2 chars').max(10, 'max chars is 10'),

    username : z.string().regex(/^[a-z0-9_]{3,30}$/ , 'ex.ammar123'),

    email: z.email(),

    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/ , 'Invalid Date').refine((date)=>{
      let userDate = new Date(date)
      let todayDate = new Date()

      todayDate.setHours(0,0,0,0)

      return userDate < todayDate
    } , 'Invalid Date'),

    gender: z.enum(['male' , 'female'], {
      message : 'Gender Required'
    }),

    password: z.string().regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/,
      "Invalid Password"
    ),

    rePassword : z.string()

  }).refine((obj)=>{
    return obj.password == obj.rePassword
  },{
    message : "pass & repass Not Same",
    path : ['rePassword']
  })

  let {register, handleSubmit , formState} = useForm({
    defaultValues:{
      name : "",
      username : "",
      email : "",
      dateOfBirth : "",
      gender : "",
      password : "",
      rePassword : "",
    },
    resolver : zodResolver(schema)
  })

  function submitForm(values){

    setloading(true)

   axios.post(`https://route-posts.routemisr.com/users/signup`, values)

    .then((res)=>{

      console.log(res.data.message)

      if(res.data.message == 'account created'){

        setloading(false)

        navigate('/login')
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

  return <div className='bg-gray-200 text-black p-5 w-[75%] mx-auto my-5 rounded-2xl'>

    <h2> Register Now!</h2>

    {errMsg !== null ?
      <h5 className='text-red-600 text-center rounded-2xl'>
        {errMsg}
      </h5>
      :""
    }

    <form onSubmit={handleSubmit(submitForm)}>

      <div>
        <Input {...register('name')} name='name' aria-label="Name" className="w-full my-3" placeholder="Enter your name" />

        {formState.errors.name ?
          <p className='text-red-800'>{formState.errors.name.message}</p>
          : ""
        }
      </div>

      <div>
        <Input {...register('username')} name='username' aria-label="username" className="w-full my-3" placeholder="Enter your userName" />

        {formState.errors.username ?
          <p className='text-red-800'>{formState.errors.username.message}</p>
          : ""
        }
      </div>

      <div>
        <Input {...register('email')} name='email' aria-label="email" className="w-full my-3" placeholder="Enter your Email" />

        {formState.errors.email ?
          <p className='text-red-800'>{formState.errors.email.message}</p>
          : ""
        }
      </div>

      <div>
        <Input {...register('dateOfBirth')} type='date' name='dateOfBirth' aria-label="dateOfBirth" className="w-full my-3" />

        {formState.errors.dateOfBirth ?
          <p className='text-red-800'>{formState.errors.dateOfBirth.message}</p>
          : ""
        }
      </div>

      <div>
        <Input {...register('password')} type='password' name='password' aria-label="password" className="w-full my-3" placeholder="Enter your Password" />

        {formState.errors.password ?
          <p className='text-red-800'>{formState.errors.password.message}</p>
          : ""
        }
      </div>

      <div>
        <Input {...register('rePassword')} type='password' aria-label="repassword" className="w-full my-3" placeholder="Enter your Re-password" />

        {formState.errors.rePassword ?
          <p className='text-red-800'>{formState.errors.rePassword.message}</p>
          : ""
        }
      </div>

      <div>
        <input {...register('gender')} id='male' type='radio' value="male" name='gender' className="mx-2 my-2" />

        <label htmlFor='male'>Male</label>
      </div>

      <div>
        <input {...register('gender')} id='female' type='radio' value="female" name='gender' className="mx-2 my-2" />

        <label htmlFor='female'>female</label>
      </div>

      {formState.errors.gender ?
        <p className='text-red-800'>
          {formState.errors.gender.message}
        </p>
        : ""
      }

      <Button type="submit" className="w-full">

        {loading == true ?
          <i className='fa fa-spin fa-spinner'></i>
          :'Register'
        }

      </Button>

    </form>

  </div>
}