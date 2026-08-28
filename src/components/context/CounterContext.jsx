import {createContext, useState} from 'react';

 export let CounterContext = createContext();

 export function CounterContextProvider(Props){

    const [counter, setcounter] = useState(10);
    function changeCount(){
   setcounter(  Math.random())
    }

    return<CounterContext.Provider value={{  counter , setcounter, changeCount}}>
         {Props.children}
    </CounterContext.Provider>
    
}
















// import {createContext, useState} from 'react';

// export let CounterContext = createContext();

// export function CounterContextProvider({children}){
    
//     const [count, setcount] = useState(10);

// return <CounterContext.Provider  value ={{count, setcount}}>
//     {children} 
// </CounterContext.Provider>

// }

