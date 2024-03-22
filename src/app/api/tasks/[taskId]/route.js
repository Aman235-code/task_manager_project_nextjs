import { getResponseMessage } from "@/helper/responseMessage"
import { Task } from "@/models/task"
import { NextResponse } from "next/server"


export async function GET(req,{params}){
    const {taskId} = params
    try{
        await connectDb();
        const task = await Task.findById(taskId)
        return NextResponse.json(task)
    }
    catch(error){
        return getResponseMessage("Error in getting task",404,false)
    }   
}

export async function POST(){
    
}

export async function PUT(req,{params}){
    const {taskId}  =  params
    const {title,content,taskStatus} = await req.json()
    try {
        const task = await Task.findById(taskId)
        task.title = title;
        task.content=content;
        task.taskStatus = taskStatus;

        await connectDb();

        const updated = await task.save();
        return NextResponse.json(updated)

    } catch (error) {
        return NextResponse.json({
            message: "Updated Error Task",
            success:false
        })
    }
}

export async function DELETE(req,{params}){
    const {taskId}  =  params
    try {

        await connectDb();
        await Task.deleteOne({
            _id: taskId
        });

        return NextResponse.json({
            message: "deleted",
            success:true
        },{status:201, statusText:"Heyy"})

    } catch (error) {
        return NextResponse.json({
            message: "Error Task",
            success:false
        })
    }
}