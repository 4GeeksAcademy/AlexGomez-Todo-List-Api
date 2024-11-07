import React,{useEffect,useState} from 'react';

const ListaTareas = (props) => {

  const [NuevaTarea, setNuevaTarea] = useState('');
  const [list, setList] = useState([]);

  const getList = async () => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/users/${props.user}`);
      if (response.ok) {
        const data = await response.json();
        setList(data.todos || []);
      } else {
        console.log('Error no encontro la lista o no usuario:', response.status, response.statusText);

      }
    } catch (error) {
      console.log('Fetch error:', error);
    }
  };

  const addTaskToAPI = async (task) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${props.user}`, {
        method: 'POST',
        body: JSON.stringify(task),
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

  const handleAgregarTarea = async (e) => {
    if (e.key === 'Enter' && NuevaTarea.trim()) {
      const NuevaTareaObj = {
        label: NuevaTarea,
        done: false,
      };
       await addTaskToAPI(NuevaTareaObj);
       getList();
       setNuevaTarea('');
    }
  };

  const handleBorrarTarea = async (id) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const newList = list.filter((element) => element.id !== id);
        setList(newList);
      } else {
        console.log('error borrando:', response.status, response.statusText);
      }
    } catch (error) {
      console.log('Fetch error:', error);
    }
  };

  useEffect(() => {
    getList();
  }, [props]);

return (

  <>
       <div className="container contenedor-card">
          <h2 className="text-center text-secondary my-3">Lista de Tareas</h2>
          <div className="paper d-flex flex-column justify-content-center align-items-start">
          <input
              type="text"
              value={NuevaTarea}
              onChange={(e) => setNuevaTarea(e.target.value)}
              onKeyDown={handleAgregarTarea}
              placeholder="Añadir tarea..."
          />
          <hr />
          <ul className="d-flex flex-column justify-content-between">
              {list.length === 0 ? (
              <>
                  <li className="pb-2">No hay tareas, añadir tareas</li>
                  <hr />
              </>
              ) : (
              list.map((element) => (
                  <li key={element.id}>
                  <li className="tarea-item">
                      ✍{element.label}
                      <span className="Borrar-icono" onClick={() => handleBorrarTarea(element.id)}>
                      <i className="fas fa-trash"></i>
                      </span>
                  </li>
                  <hr />
                  </li>
              ))
              )}
          </ul>
          <div className="footer d-flex justify-content-between w-100">
             <p>{list.length} Articulo{list.length !== 1 ? 's' : ''} Restantes</p> 
             
             <p className='floar-right'> {props.user} </p>
            
             
          </div>
          </div>
      </div>
  </>
  
)
}

export default ListaTareas;
