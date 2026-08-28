import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';


export default function CreateComment({id}) {

 let query =   useQueryClient();

 let {register, handleSubmit}  = useForm({
        defaultValues : {
            content :"",
            image : "",
        }
    })

    function addComment(){
        return axios.post(`https://route-posts.routemisr.com/posts/${id}/comments`, formdata , {
            headers :{
                Authorization :`Bearer ${localStorage.getItem('userToken')}`
            }
        })
    }

let {data , eror , isError, isPending , mutate}   = useMutation({
        mutationFn : addComment,
        onSuccess:()=>{
            query.invalidateQueries({queryKey:['getPosts']})
            toast.success('created successfully')

        },

        onError:()=>{
            toast.error('cannet crated')

        }
    })

    let formdata =new FormData();

    function handleComment(values){
        console.log(values);
        if(!values.content && !values.image) return
 if(values.content){
          formdata.append('content', values.content)
        }
 if(values.image){
      formdata.append('image' , values.image[0])
 }
    //  call Api 
    mutate()



}


  return<>
        <form onSubmit={handleSubmit(handleComment)}>
             <div className="flex items-center my-5">
    <label htmlFor='image' className='me-3' >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
 </label>
    <input {...register('image')} id='image' type='file'  hidden/>
  <input {...register('content')} type="text" id="input-9" className="w-full h-10 px-3 text-sm text-gray-700 border border-r-0 rounded-r-none border-blue-500 focus:outline-none rounded shadow-sm" placeholder="Comment" />
  <button className="h-10 px-4 text-sm bg-blue-500 border border-l-0 border-blue-500 rounded-r shadow-sm text-blue-50 hover:text-white hover:bg-blue-400 hover:border-blue-400 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>
  </button>
</div>
        </form>

  </>
}
