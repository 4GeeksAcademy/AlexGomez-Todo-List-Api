import React,{ useState, useEffect } from 'react';
import List from './ListaTareas.jsx';
const ListaUsuarios = () => {
   
  const [NuevoUsuario, setNuevoUsuario] = useState('');
  const [list, setList] = useState([]);  
  const [usuario, setUsuario] = useState('');

  const getList = async () => {
      try {
          const response = await fetch(`https://playground.4geeks.com/todo/users`);
          if (response.ok) {
              const data = await response.json();
              setList(data.users || []);  
          } else {
              console.log('Error no encontro la lista o no usuario:', response.status, response.statusText);
          }
      } catch (error) {
          console.log('Fetch error:', error);
      }
  };

  const addUserrToAPI = async (Userr) => {

      try {
          const response = await fetch(`https://playground.4geeks.com/todo/users/${Userr.label}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          if (response.ok) {
              const data = await response.json();
              return data;
          } else {
              console.log('error enviando:', response.status, response.statusText);
              return { error: { status: response.status, statusText: response.statusText } };
          }
      } catch (error) {
          console.log('Fetch error:', error);
      }
  };

  const handleAgregarUsuario = async (e) => {
      if (e.key === 'Enter' && NuevoUsuario.trim()) {
          const NuevoUsuarioObj = {
              label: NuevoUsuario,
              done: false,
          };
          await addUserrToAPI(NuevoUsuarioObj);
          getList();
          setNuevoUsuario('');
      }
  };

  const handleBorrarUsuario = async (userName) => {
      try {
          const response = await fetch(`https://playground.4geeks.com/todo/users/${userName}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          if (response.ok) {
              const newList = list.filter((element) => element.name !== userName);
              setList(newList);
              setUsuario("")
          } else {
              console.log('error borrando:', response.status, response.statusText);
          }
      } catch (error) {
          console.log('Fetch error:', error);
      }
  };
  const VerListTask = (user)=>{

      setUsuario(user);
      console.log(usuario);
      
  }
  useEffect(() => {
      getList();
  }, []);

  return (
      <> 
   <div className='query '>


   
      <div className="container contenedor-card">
          <h2 className="text-center text-secondary my-3">Lista de Usuarios</h2>
          <div className="paper d-flex flex-column justify-content-center align-items-start">
              <input
                  type="text"
                  value={NuevoUsuario}
                  onChange={(e) => setNuevoUsuario(e.target.value)}
                  onKeyDown={handleAgregarUsuario}
                  placeholder="Añadir usuarios..."
              />
              <hr />
              <ul className="d-flex flex-column justify-content-between">
                  {list.length === 0 ? (
                      <>
                          <li className="pb-2">No hay Usuarios, añadir Usuarios</li>
                          <hr />
                      </>
                  ) : (
                      list.map((element) => (
                          <>
                              <li className="tarea-item" key={element.id}>
                                  {"✍"+element.name}
                                  <div>
                                      <span className="Borrar-icono" onClick={() => handleBorrarUsuario(element.name)}>
                                             <i className="fas fa-trash text-danger"></i>
                                       </span>
                                       <button className="btn btn-success mx-2 Borrar-icono" onClick={() => VerListTask(element.name)}>
                                      Ver Tareas
                                      </button>
                                  </div>
                                  
                              
                              </li>
                              <hr />
                          </>
                      ))
                  )}
              </ul>
              <p className="footer">
                  {list.length} Usuario{list.length !== 1 ? 's' : ''} Restantes
                  
              </p>
          </div>
      </div>
      <List user={usuario} /></div>
      </>
      
  );
}
export default ListaUsuarios;
