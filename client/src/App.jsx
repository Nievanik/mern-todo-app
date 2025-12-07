import TodoList from "./pages/Alltodos/TodoList"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewTodo from "./pages/NewTodo/NewTodo";
import Header from "./components/Header/Header";
import Todo from "./pages/Todo/Todo";
import {ToastContainer} from "react-toastify"

function App() {

  return (
    <BrowserRouter>
      <Header/>
        <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<TodoList/>}/>
        <Route path="/new-todo" element={<NewTodo/>}/>
        <Route path="/edit-todo/:id" element={<Todo/>}/>
      </Routes>
    </BrowserRouter>
  
  )
}

export default App
