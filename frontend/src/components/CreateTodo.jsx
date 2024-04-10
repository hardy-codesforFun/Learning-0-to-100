import { useState } from "react"

export function CreateTodo(){
    const[title,settitle]=useState('');
    const[description,setdescription]=useState('');
    const addTodo=()=>{
        fetch("http://localhost:3000/todo",{
            method:"POST",
            body:JSON.stringify({
                title:title,
                description:description
            }),
            headers:{
                "Content-type":"application/json"
            }
        })
        .then(async function(res){
            const json=await res.json();
            alert("TODO CREATED")
        })
    }
    return(
        <div>
            <input type="text" placeholder="Title" onChange={function(e){settitle(e.target.value);console.log(e.target.value)}} /><br />
            <input type="text" placeholder="Description" onChange={function(e){setdescription(e.target.value)}} /><br />
            <button onClick={addTodo}>Add todo </button>
        </div>
    )
}








