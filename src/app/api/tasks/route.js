import { connectDb } from "@/helper/db";
import { Task } from "@/models/task";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";



export async function GET(req){
    let tasks = []
    try {
        await connectDb();
     
     tasks = await Task.find()
 
    } catch (error) {
     console.log(error)
     NextResponse.json("Failed to get Tasks",{
         success:false
     })
    }
 
 return NextResponse.json(tasks);
}

export async function POST(req){
    const {title, content, userId, taskStatus} = await req.json();

    const authToken = req.cookies.get("authToken")?.value
    // console.log(authToken);
    const data = jwt.verify(authToken,process.env.JWT_KEY);
    // console.log(data);
    const user =await User.findById(data._id).select("-password")
    console.log(user._id);
    try {
        const task = new Task({
            title,
            content,
            userId : user._id,
            taskStatus
        });

        await connectDb();

        const createdTask = await task.save();
        const response = NextResponse.json(createdTask,{
            status: 201
        })
        return response;
        
    } catch (error) {
        console.log("Error")
        NextResponse.json("Failed to create Task",{
            success:false
        });
    }
}

