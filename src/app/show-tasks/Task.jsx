import userContext from "@/context/UserContext";
import React, { useContext } from "react";
import {RxCross1} from 'react-icons/rx'

const Task = ({ task, deleteTaskParent }) => {

  function deleteTask(taskId){

    deleteTaskParent(taskId);

  }

  const { user } = useContext(userContext);
  return (
    <div
      className={`shadow-lg mt-2 rounded-md ${
        task.taskStatus == "completed" ? "bg-green-800" : "bg-gray-800"
      }`}
    >
      <div className="p-5">
        <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">{task.title}</h1>
        <span onClick={()=>{
          deleteTask(task._id)
        }} className="shadow-lg hover:bg-slate-100 hover:text-yellow-900 bg-red-500 rounded font-bold w-7 h-7 flex justify-center items-center cursor-pointer">
        <RxCross1 />
        </span>
        
        </div>
        <p className="font-normal">{task.content}</p>
        <div className="flex justify-between mt-3">
          <p className="text-left">
            Status: <span className="font-bold">{task.taskStatus.toUpperCase()}</span>
          </p>
          <p className="text-right">
            Author: <span className="font-bold">{user?.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Task;
