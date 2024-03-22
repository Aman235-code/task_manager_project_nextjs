'use client';
import { addTask } from '@/services/taskService';
import React, { useState } from 'react'
import { toast } from 'react-toastify';



const AddTask = () => {

  const [task,setTask] =useState({
    title:'',
    content:'',
    taskStatus:'none',
    userId:'65f86d45bf602050ba6cdf63'
  });

  const  handleAddTask = async(e) => {
      e.preventDefault();
      try {
        console.log(task)
       const res = await  addTask(task)
       console.log(res)
       toast.success("Your Task is Added ||,",{
        position: "top-center",
       });

       setTask({
          title:'',
          content:'',
          taskStatus:"none"
       })

      } catch (error) {
        console.log(error)
        toast.error("Task is not added ",{
          position: "top-center",
        })
      }
  }


  return (
    <div className='grid grid-cols-12 justify-center'>
        <div className='col-span-6 col-start-4 border-red-500 p-5 shadow-green-300 shadow  bg-slate-100 text-black'>
          <h1 className='text-3xl'>Add Your Task Here</h1>
          <form action="" onSubmit={handleAddTask}>
            <div className='mt-4'>
              <label htmlFor="task_title" className='block text-sm font-medium mb-2'>Title</label>
              <input type="text" className="w-full p-2.5 rounded-lg bg-blue-400 focus:ring-pink-900 border-pink-200"  id="task_title" name="task_title" onChange={(event)=>{
                  setTask({
                    ...task,
                    title: event.target.value
                  })
              }}
              value={task.title}
               />
            </div>

            <div className='mt-4'>
              <label htmlFor="task_content" className='block text-sm font-medium mb-2'>Content</label>
              <textarea type="text" name="task_content" className="w-full p-2.5 rounded-lg bg-blue-400 focus:ring-pink-900 border-pink-200"  id="task_content" rows="5" onChange={(event)=>{
                  setTask({
                    ...task,
                    content: event.target.value
                  })
              }}
              value={task.content} />
            </div>

            <div className='mt-4'>
              <label htmlFor="task_status" className='block text-sm font-medium mb-2'>Status</label>
              <select name="task_status" id="task_status" className="w-full p-2.5 rounded-lg bg-blue-400 focus:ring-pink-900 border-pink-200" onChange={(event)=>{
                  setTask({
                    ...task,
                    taskStatus: event.target.value
                  })
              }}
              value={task.taskStatus} >
                <option value="none" disabled>...Select Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="mt-4 flex justify-center">
              <button className='bg-green-600 py-2 px-3 rounded-lg hover:bg-blue-300'>Add Task</button>
              <button className='bg-red-600 py-2 px-3 rounded-lg hover:bg-blue-300 ms-3'>Clear</button>
            </div>
          </form>
        </div>
    </div>

  )
}

export default AddTask