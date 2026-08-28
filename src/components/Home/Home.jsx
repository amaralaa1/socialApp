import axios from 'axios'
// import React, { useEffect, useState } from 'react'
import Postcard from '../Postcard/Postcard';
import { ScaleLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import CreatePost from '../createpost/CreatePost';

export default function Home() {


   function getAllPost() {
    return axios.get(`https://route-posts.routemisr.com/posts`, {
      params : { sort:'-createdAt'},
    headers: {
      Authorization : `Bearer ${localStorage.getItem('userToken')}`
      
       }
     })

   }

  let {data , error, isError, isLoading, isFetched , isFetching} =useQuery({
    queryKey : ['getPosts'],
    queryFn : getAllPost ,
    refetchInterval : 3000,
    // staleTime : 3000 ,
    // retry : 4 ,
    // retryDelay : 300,

    select : (res) => res?.data.data.posts

   })

   console.log(data)

   if(isLoading){
    return <div className='h-screen flex justify-center items-center'>
       <ScaleLoader color='red'/>
    </div>

   }


  if(isError ){
    return <div className='h-screen flex justify-center items-center'>
      <h2>{error.message}</h2>
    </div>
  }

return <>

{/* create Post Box */}

< CreatePost/>


     {data?.map( ( Post )=>{
       return <Postcard key={ Post.id} Post = {Post}/>
     })}
    </>



}












































































//   const[allPosts  ,setallPosts] =useState(null);
//   const[ isloading ,setisloading] =useState(true);
//     const[ isError ,setisError] =useState(false);
//     const[ Error ,setError] =useState(false);

//   function getAllPosts() {
//     axios.get(`https://route-posts.routemisr.com/posts`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('userToken')}`
//       }
//     })
//       .then((res) => {
       
//         setisloading(false)
//         console.log(res.data.data.posts)
//         setallPosts(res.data.data.posts)
//       })
//       .catch((err) => {
//          setisError(true)
//         setisloading(false)
//         console.log(err.message)
//         setError(err.message)
//       })
//   }

//   useEffect(() => {
//     getAllPosts()
//   }, [])


//   if(isloading== true){
//     return <div className='h-screen flex justify-center items-center'>
//       <ScaleLoader  color='red'/>
//     </div>
//   }

//   if(isError == true){
//     return <div  className='h-screen flex justify-center items-center'>
//       <h2>{Error}</h2>
//     </div>

//   }

//   return <>
    
//     { allPosts?.map( ( Post )=>{
//       return <Postcard key={ Post.id} Post = {Post}/>
//     })}
//     </>
  
// }
























