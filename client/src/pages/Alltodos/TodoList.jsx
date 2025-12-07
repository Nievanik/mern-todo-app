import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styles from './TodoList.module.css'
import Button from "../../components/Button/Button.jsx";
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.jsx'
import { showSuccess, showError } from "../../utils/toast.js";

const TodoList = () =>{
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const fetchTodos = async ()=>{
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/todo');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
            // setError("Failed to load todos");
            showError("Unable to load todos")
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchTodos()
    }, [])

    const handleDone = async (id)=>{
       try {
            setLoading(true);
            setTodos((prevTodos)=>(
                prevTodos.map((todo)=>todo._id==id? {...todo, completed:!todo.completed}: todo)
            ))
            await axios.put(`http://localhost:5000/todo/${id}`, {
                completed: !todos.find(t =>t._id == id).completed
            })
       } catch (error) {
            console.log(error);
            // setError("Error editing todos");
            showError("Unable to update status")
            fetchTodos()
       }finally{
            setLoading(false);
       }
    }
    const handleEdit = (id)=>{
        navigate(`/edit-todo/${id}`)
    }
    const handleDelete = async (id)=>{
            try {
            setLoading(true);
            setTodos((prevTodos)=>(
                prevTodos.filter((todo)=>todo._id !== id)
            ))
            await axios.delete(`http://localhost:5000/todo/${id}`);
            showSuccess("Todo has been deleted")
       } catch (error) {
            setLoading(false);
            console.log(error);
            // setError("Error deleting todos");
            showError("Unable to delete")
            fetchTodos()
       } finally{
            setLoading(false);
       }
    }
    const handleAdd = ()=>{
        navigate("/new-todo")
    }

    
    if (loading) return <LoadingSpinner/>
    // if (error) return <p style={{textAlign:'center'}}>{error}</p>

    return (
        
        <div className={styles.container}>
            
            {todos.length>0?(
                
                <ul className={styles.lists}>
                    {todos.map((todo)=>(
                        <li className={`${styles.item} ${todo.completed && styles.completed}`} key={todo._id}>
                            <h2 className={styles.title}>{todo.title}</h2>
                            <div className="buttons">
                                <Button text={todo.completed?"Undo":"Done"} onclick={()=>handleDone(todo._id)} varient="done"/>
                                <Button text="Edit" onclick={()=>handleEdit(todo._id)} />
                                <Button text="Delete" onclick={()=>handleDelete(todo._id)} varient="delete"/>
                            </div>
                        </li>
                    ))}
                </ul>
            ):("Empty")}
            <Button text="Add Todos" onclick={handleAdd}/>
        </div>
    )
}

export default TodoList