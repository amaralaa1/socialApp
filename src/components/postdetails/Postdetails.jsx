import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import Singelcomment from '../SingelComment/Singelcomment';
import CreateComment from '../createcomment/CreateComment';

export default function Postdetails() {

   let {id} = useParams();

   function getAllComments(){
    return axios.get(`https://route-posts.routemisr.com/posts/${id}/comments?page=1&limit=10`,{
        headers :{
            Authorization : `Bearer ${localStorage.getItem('userToken')}`
        }
    })
   }

   
   let {data:comments}= useQuery({
        queryKey : ['getComments'],
        queryFn :getAllComments,
        select: (res)=> res?.data.data.comments
    })

    console.log(comments);
 
    function getPostDetails(){
        return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
            headers :{
                Authorization : `Bearer ${localStorage.getItem('userToken')}`
            }
        })
    }

   let {data , error , isError , isLoading}= useQuery({
        queryKey : ['postDetails'],
        queryFn : getPostDetails,
        select: (res)=> res?.data.data.post
    })

    console.log (data);


  return<>
   <div className="bg-gray-300 text-black p-4 mb-8 my-3 rounded shadow w-1/2 mx-auto">
    
      <header className="flex items-center space-x-3 mb-3">
     <img src= {data?.user.photo} className='w-10 h-10 rounded-full' alt='re'/>
      <div>
        <p className="font-semibold">{data?.user.name}</p>
        <p className="text-xs text-gray-500">{data?.createdAt}</p>
      </div>
    </header>
  
   
    { data?.body && <p className="mb-3">{data?.body}</p>}
    {data?.image &&  <img src={data?.image} alt="Beach" className="rounded max-h-96 w-full object-cover mb-3" />}
    <div className="flex justify-between text-gray-600 text-sm font-semibold">
      <button className="flex items-center space-x-1 hover:text-blue-600">
        <i className="fas fa-thumbs-up" /><span> {data?.likesCount}Like</span>
      </button>
      <button className="flex items-center space-x-1 hover:text-blue-600">
        <i className="fas fa-comment" /><span>Comment</span>
      </button>
      <button className="flex items-center space-x-1 hover:text-blue-600">
        <i className="fas fa-share" /><span>Share</span>
      </button>
    </div>

    <CreateComment  id={id}/>

    { comments?.map(( com )=>{
        return <Singelcomment key={com._id} comment ={com}/>
    }) }
  </div>
  </>
}
