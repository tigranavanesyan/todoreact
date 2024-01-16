import React from "react";
const API_BASE= 'http://localhost:4001/to-do-app';

function TodoItem(props){
    const {name, id, completed, setItems} = props

    const deleteTodo = async(id) => {
        try{
            const response = await fetch(API_BASE + "/delete/" + id, {
                method: "DELETE",
            });
            if(!response.ok){
                throw new Error("Faild to delete a task")
            }
            const data = await response.json()
            setItems(items=> items.filter(item=> item._id !== data._id))
        }catch (error) {
            console.error("Error updating task status:", error);
        }
    }
    const updateTodo = async (id) => {
        console.log(API_BASE + "/update/" + id);
        try {
            const response = await fetch(API_BASE + "/update/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    completed: !completed,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update a task");
            }

            const data = await response.json();

            setItems((items) =>
                items.map((item) => (item._id === data._id ? {...data,completed:!completed} : item))
            );
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };



    return(
        <div className={"todo" + (completed ? " check-complete" : "")} key={id}>
            <div className="checkbox" onClick={()=>updateTodo(id)}></div>
            <div className="text">{name}</div>
            <div className="delete-todo" onClick={()=>deleteTodo(id)}><span >X</span></div>
        </div>
    )
}

export default TodoItem;