'use client'
import userContext from '@/context/UserContext'
import { DeleteTask } from '@/services/taskService'
import { getTasksOfUser } from '@/services/userService'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Task from './Task'

const ShowTasks = () => {

    const [tasks, setTasks] = useState([])

    const context = useContext(userContext);


        async function loadTasks(userId){

            try {
               const tasks = await getTasksOfUser(userId)
               setTasks([...tasks])
               console.log(tasks);
            } catch (error) {
                console.log(error)
            }

        }

        useEffect(()=>{
            if(context.user){
                loadTasks(context.user._id);
            }
            
        },[context.user])

        async function deleteTaskParent(taskId){
            try {
                const res = await DeleteTask(taskId)
                console.log(res);
                const newTasks = tasks.filter((item)=> item._id != taskId)
                setTasks(newTasks)
                toast.success("Deleted Successfully",{
                    position:"top-center"
                })
            } catch (error) {
                console.log(error);
                toast.error("Error in deleting task",{
                    position:"top-center"
                })
            }
        }
      
    
  return (
    <div className='grid grid-cols-12 mt-3 '>
        <div className='col-span-6 col-start-4'>
            <h1 className='text-3xl text-center mb-3'>Your Tasks ({tasks.length})</h1>
            {
                tasks.map((task) =>(
                    <Task task={task} key={task._id} deleteTaskParent={deleteTaskParent}/>
                ))
            }
        </div>
    </div>
  )
}

export default ShowTasks