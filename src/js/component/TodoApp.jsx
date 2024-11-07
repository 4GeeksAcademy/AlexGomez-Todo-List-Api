import React, { useEffect, useState } from 'react';
import ListaUsuarios from './ListaUsuarios.jsx';
import ListaTareas from './ListaTareas.jsx';

const TodoApp = () => {

  return (
    
    <>
    <div >
        <h1 className="text-center text-secondary mt-5 mx-auto w-100">ToDO list</h1>
       <div className=" my-0 mx-auto w-100">
       <ListaUsuarios />
      
      </div>

    </div>
     
      
    </>
  
  );
}

export default TodoApp;
