import React, { useContext } from 'react'
import Singelcomment from './../SingelComment/Singelcomment';
import { Link } from 'react-router-dom';
import CreateComment from '../createcomment/CreateComment';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import DropDown from '../DropDown/DropDown';
import { UserData } from './../context/UserData';


export default function Postcard( {Post}) {
    // console.log(Post)

   let {data:userrData} =useContext(UserData)
   console.log(userrData)

   let query =  useQueryClient()
     function LikePost(){
    return  axios.put(`https://route-posts.routemisr.com/posts/${Post.id}/like`, {} , {
        headers:{
       Authorization:`Bearer ${localStorage.getItem('userToken')}`
        
        }
      })
     }
     let {data:likepost , error:likeErr , isError:likeIsErr , mutate:likeFn} =useMutation({
      mutationFn:LikePost,
      onSuccess:()=>{
        query.invalidateQueries({queryKey:['getPosts']})
        query.invalidateQueries({queryKey:['userPosts']})
        toast.success('Liked')

      }
     })
     console.log(likepost?.data?.data?.liked);
    

  return <>
   <div className="bg-gray-300 text-black p-4 mb-8 my-3 rounded shadow w-1/2 mx-auto">
  
    <header className="flex justify-between items-center space-x-3 mb-3">
   <Link to= {`postdetails/${Post.id}`}>
  <div className='flex gap-3'>
     <img src= {Post.user.photo} className='w-10 h-10 rounded-full' alt='re'/>
    <div>
      <p className="font-semibold">{Post.user.name}</p>
      <p className="text-xs text-gray-500">{Post.createdAt}</p>
    </div>
  </div>
 </Link>
    <div>
      {  Post.user._id === userrData._id &&  <DropDown id={Post._id}/>  }   
    </div>
  </header>
  
 
  { Post.body && <p className="mb-3">{Post.body}</p>}
  {Post.image &&  <img src={Post.image} alt="Beach" className="rounded max-h-96 w-full object-cover mb-3" />}
  <div className="flex justify-between text-gray-600 text-sm font-semibold">
    <button onClick={likeFn}className={`flex items-center space-x-1 hover:text-blue-600 ${likepost?.data?.data?.liked ? "text-blue-600" : ""}`}>
      <i className="fas fa-thumbs-up" /><span> {Post.likesCount}Like</span>
    </button>
    <button className="flex items-center space-x-1 hover:text-blue-600">
      <i className="fas fa-comment" /><span>Comment</span>
    </button>
    <button className="flex items-center space-x-1 hover:text-blue-600">
      <i className="fas fa-share" /><span>Share</span>
    </button>
  </div>

 {/* start Add comment */}

   <CreateComment id ={Post.id}/>


{/* End comment */}

  {Post.topComment && <Singelcomment  comment ={Post.topComment}/>}
</div>
  </>
}