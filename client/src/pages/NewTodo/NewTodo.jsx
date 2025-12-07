import { useState } from 'react';
import axios from 'axios';
import styles from './NewTodo.module.css'
import Button from '../../components/Button/Button';
import { useNavigate} from 'react-router-dom';
import { showSuccess, showError } from "../../utils/toast.js";

const NewTodo = ()=>{
    const [formData, setFormData] = useState({
        title: "",
        description:""
    })
    const navigate = useNavigate();

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
            await axios.post('http://localhost:5000/todo', formData);
            setFormData({
                title: "",
                description:""
            })
            navigate('/');
            showSuccess('New Todo added');
        } catch (error) {
            showError('Failed to add todo');
            console.log(error);
            navigate('/')
        }

    }


    return( <div className={styles.container}>
        <h2 className={styles.header}>Add You Task</h2>
        <form action="" className={styles.form}>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="title">Title:</label>
                <input type="text" className={styles.input} name="title" id="title" value={formData.title} onChange={handleChange} required/>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="description">Description:</label>
                <input type="text" className={styles.input} name="description" id="description" value={formData.description} onChange={handleChange} required/>
            </div>

            <Button text="Add" onclick={handleSubmit}/>
        </form>
    </div>)
}

export default NewTodo;

