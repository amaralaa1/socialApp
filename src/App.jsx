// import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layouts/Layout';
import Home from './components/Home/Home';
import Profile from './components/profile/Profile';
import Login from './components/Auth/login/Login';
import Register from './components/Auth/Register/Register';
import Notfound from './components/Notfound/Notfound';
// import { CounterContextProvider } from './components/context/Countercontext';
import { UserDataProvider } from './components/context/UserData';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Postdetails from './components/postdetails/Postdetails';
import { ToastContainer } from 'react-toastify';


let queryClient =new QueryClient();

let routing = createBrowserRouter([
 { path: "",  element: <Layout />, children:
   [
      { path: 'home',element: (<ProtectedRoute><Home /></ProtectedRoute>)},
      { path: 'home/postdetails/:id', element: ( <ProtectedRoute><Postdetails/></ProtectedRoute>)},
      {path: 'profile',element: (<ProtectedRoute><Profile /></ProtectedRoute>)},
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Notfound /> },
   ]
 }
])
  
     
       
         
           
         
       
    
    
      
        
        
     
     



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserDataProvider>
        <ToastContainer/>
        <RouterProvider router={routing} />
      </UserDataProvider>
    </QueryClientProvider>
  );
}

export default App;


// <CounterContextProvider>
//     <RouterProvider router={X}></RouterProvider>
//   </CounterContextProvider>