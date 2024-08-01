import React, { useEffect, useState } from 'react'

// const nestedArr = [1,2,3,[4,[5,6]],7,8]
const apiUrl = 'https://dummyjson.com/todos';
export default function Practice() {
  const [todoData, setTodoData] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [updatedTask, setUpdatedTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // function flattenArr(arr, flatArr){
  //     // let flatArr=[];

  //     // for(let item of arr){
  //     //     if (Array.isArray(item)){
  //     //         flatArr = flatArr.concat(flattenArr(item));
  //     //     } else {
  //     //         flatArr.push(item)
  //     //     }
  //     // }
  //     for(let i=0; i<arr.length; i++){
  //         if(typeof(arr[i])==='number'){
  //             flatArr.push(arr[i]);
  //         } else {
  //             flattenArr(arr[i], flatArr)
  //         }
  //     }
  //     return flatArr;
  // }

  // const result= flattenArr(nestedArr,[]);
  // console.log('Result::',flattenArr(nestedArr,[]));
  useEffect(() => {
    const fetchTodos1 = fetch('https://dummyjson.com/todos')
      .then((res) => res.json())
      .then(data => setTodoData(data.todos))
  }, [])


  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setTodoData(data.todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

 

  function addTodo() {
if(newTask.trim()!==''){
    const newTodo = {
      id: todoData.length + 1,
      todo: newTask,
      completed: false
    }
    // setTodoData(
    //   [newTodo, ...todoData]
    // )
    setTodoData((prevData)=>{
    return [newTodo,...prevData]
  })
    setNewTask('');
}
  }

  // const addTodo = async()=>{
  //   if(newTask.trim()){
  //     try {
  //       const response = await fetch(apiUrl, {
  //         method:'post',
  //         headers:{
  //           'content-type': 'application/json',
  //         },
  //         body: JSON.stringify({id: todoData.length + 1, todo: newTask, completed:false})
  //       });
  //         const newDataItem = await response.json();
  //         setTodoData([...newDataItem, ...todoData]);
  //         setNewTask('')
 
  //     } catch (error) {
  //       console.error('Error fetching todos:', error);
  //     }
  //   }
  // }

  // const addTodo = async () => {
  //   if (newTodo.trim()) {
  //     try {
  //       const response = await axios.post(apiUrl, { title: newTodo, completed: false });
  //       setTodos([...todos, response.data]);
  //       setNewTodo('');
  //     } catch (error) {
  //       console.error('Error adding todo:', error);
  //     }
  //   }
  // };


  const handleUpdate = (id, currentTodo) => {
    setIsEditing(true);
    setUpdatedTask(currentTodo);
    setEditingId(id);
  };

  const handleUpdateTask = (id) => {
    const updatedTodos = todoData.map(task => {
      if (task.id === id) {
        return { ...task, todo: updatedTask };
      }
      return task;
    });
    setTodoData(updatedTodos);
    setIsEditing(false);
    setEditingId(null);
    setUpdatedTask('');
  };
function handleDelete(id){
  const updatedData = todoData.filter((task)=>task.id != id);
  setTodoData(updatedData);
}

  return (
    <div>
      <h1>To Do List</h1>
      <div>
        <input placeholder='add new task here...' onChange={(e) => setNewTask(e.target.value)} value={newTask} />
        <button onClick={addTodo}>Add task</button>
      </div>

      <ul>
        {todoData.map((item, index) => (
          <div key={item.id}>
            <li>
              {isEditing && editingId === item.id ? (
                <input
                  value={updatedTask}
                  onChange={(e) => setUpdatedTask(e.target.value)}
                />
              ) : (
                <span>{item.todo}</span>
              )}
              <button onClick={() => handleDelete(item.id)}>Delete</button>
              <button onClick={() => isEditing && editingId === item.id ? handleUpdateTask(item.id) : handleUpdate(item.id, item.todo)}>
                {isEditing && editingId === item.id ? 'Done' : 'Update'}
              </button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  )
}
