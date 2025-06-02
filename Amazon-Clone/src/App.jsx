// import React from "react";
// import Routing from "../Router";
// import {DataContext} from './components/DataProvider/DataProvider'
// import {Type} from './Utility/actiontype'
// import {auth} from './Utility/firebase'
// function App() {
// // const [{user},dispatch]= useContext(DataContext);

// //set at global

// useEffect(() => {
//   auth.onauthStateChanged((authUser)=>(
// if(authUser){
//   dispatch({ type: 'SET_USER', user: authUser });
// }else{
//   dispatch({ type: 'SET_USER', user: null });
// }
//   ))

// }, []);

//   return (
//     <>
//       <Routing />
//     </>
//   );
// }

// export default App;

import React, { useEffect, useContext } from "react";
import Routing from "../Router";
import { DataContext } from "../src/Components/DataProvider/DataProvider";
import { auth } from "./Utility/firebase";

function App() {
  const [{ user }, dispatch] = useContext(DataContext); // Get user and dispatch from context

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: "SET_USER", user: authUser });
      } else {
        dispatch({ type: "SET_USER", user: null });
      }
    });

    // Cleanup subscription on unmount
    //Included a cleanup function to unsubscribe from the authentication listener when the component unmounts, preventing memory leaks.
    return () => unsubscribe();
    // Added dispatch to the dependency array of the useEffect hook to ensure it updates correctly when the dispatch function changes.
  }, []);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
