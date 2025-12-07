import { useParams, useNavigate } from 'react-router-dom';
import styles from './Todo.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../../components/Button/Button';
import { showSuccess, showError } from "../../utils/toast.js";


const Todo = () =>{
    const {id} = useParams();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title:"",
        description:"",
        completed:false
    });

    const fetchTodo = async ()=>{
        try {
            const response = await axios(`http://localhost:5000/todo/${id}`)
            setFormData({
                title:response.data.title,
                description:response.data.description,
                completed:response.data.completed
            })
        } catch (error) {
            console.log(error);
            showError(error)
        }
    }

    useEffect(()=>{
        fetchTodo();
    }, [id]);

    
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData(prev=>({
            ...prev,
            [name]:value
        }
        ))
        
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            if(formData.title==='' || formData.description === ''){
                showError('Title and description are required');
                return;
            }
            await axios.put(`http://localhost:5000/todo/${id}`, formData);
            setFormData({
                title: "",
                description:""
            })
            showSuccess('Todo has been updated');
            navigate('/');
        } catch (error) {
            showError('Failed to update Todo');
            navigate('/');
            console.log(error);
        }

    }
    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Edit You Task</h2>
            <form action="" className={styles.form}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="title">Title:</label>
                    <input type="text" className={styles.input} name="title" id="title" value={formData.title} onChange={handleChange} required/>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="description">Description:</label>
                    <input type="text" className={styles.input} name="description" id="description" value={formData.description} onChange={handleChange} required/>
                </div>

                <Button text="Save" onclick={handleSubmit}/>
            </form>
        </div>
    )
}

export default Todo;