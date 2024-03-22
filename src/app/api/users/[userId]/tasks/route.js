import { connectDb } from "@/helper/db"
import { getResponseMessage } from "@/helper/responseMessage"
import { Task } from "@/models/task"
import { NextResponse } from "next/server"


export async function GET(req,{params}){
    const {userId} = params
    try {
        await connectDb();
        const tasks = await Task.find({
            userId:userId
        });

        return NextResponse.json(tasks);

    } catch (error) {
        NextResponse.json({
            message:"Error",
            status:404
        },{
            success: false
        })
        // getResponseMessage("Failed to Get Tasks", 404, false)
        
    }
}