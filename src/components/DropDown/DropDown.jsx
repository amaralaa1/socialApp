import React, { useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {Button, Dropdown, Label} from "@heroui/react";
import axios from 'axios';
import { Modal} from "@heroui/react";



export default function DropDown({id}) {

  const [modalCase, setmodalCase]= useState(false);
  
 let query = useQueryClient()
 let body = useRef();
 let image = useRef();
 const [imgSrc,setimgSrc]= useState(null);

  
  function deletePost(){
    return axios.delete(`https://route-posts.routemisr.com/posts/${id}`, {
        headers:{
            Authorization:`Bearer ${localStorage.getItem('userToken')}`
        }
    })
  }

  let {data:delDataa, error:delErr , isError:delIsErr , mutate:delFn} = useMutation({
    mutationFn:deletePost,
    onSuccess:()=>{
      query.invalidateQueries({queryKey:['getPosts']})
    } 
  })

  console.log(delDataa)
  console.log(delErr)

    function previewImage(e){
        console.log(e.target.files[0]);
        setimgSrc( URL.createObjectURL(e.target.files[0]))
    }
     
    
    function closeImage(){
        setimgSrc(null)
    }
  
    function handlePostData(){
        let formData = new FormData();
        if(body.current.value){
          formData.append('body', body.current.value)
        }
        if(image.current.files[0]){
          formData.append('image', image.current.files[0])
        }
       return formData
        
    }

    function updatepost(){
     return axios.put(`https://route-posts.routemisr.com/posts/${id}` , handlePostData() ,{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('userToken')}`
        }
      } )
    }

  let {data:upData ,error:uperr ,isError:upisErr, mutate:updatefn}  = useMutation({
      mutationFn:updatepost ,
      onSuccess:()=>{
        query.invalidateQueries({queryKey:['getPosts']})
      }
    })

  return <>
   <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) =>{
   console.log(`Selected: ${key}`)
            if(key== "edit-file" ){
            setmodalCase(true)

           }
          }}>
          <Dropdown.Item id="edit-file" textValue="Edit file">
             <Button variant="secondary">Update Post</Button>
  
          </Dropdown.Item>
          <Dropdown.Item id="delete-file" textValue="Delete file" variant="danger">
            <button className='text-red-600' onClick={delFn}>Delete Post</button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>

      <Modal isOpen={modalCase} onOpenChange={setmodalCase}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Update Post</Modal.Heading>
            </Modal.Header>
             <Modal.Body>
                      <div className='flex gap-3 items-end'>
                         <textarea ref={body} className='border w-full p-4' rows='4' placeholder='Enter Your Post' id=''></textarea> 
                        <label htmlFor='Upload'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"> <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg></label>
                        <input ref={image} onChange={previewImage} id='Upload' type='file' hidden/>
                      </div>
                      {imgSrc &&(
                      <div className='relative'>
                         <img  className=' w-69 my-2' src={imgSrc} alt=''/>
                     <svg onClick={closeImage} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute top-0.5 right-10 text-gray-800 text-6xl">
             <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
           </svg>
           
                      </div>
                      )}
                    
                       </Modal.Body>
            <Modal.Footer>
              <Button onClick={updatefn} className="w-full" slot="close">
              update Post
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>

  </>
}
