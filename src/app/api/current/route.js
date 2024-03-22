import { NextResponse } from "next/server";
import  jwt from "jsonwebtoken";
import { User } from "@/models/user";
import { connectDb } from "@/helper/db";

export async function GET(request){

    const authToken = request.cookies.get("authToken")?.value
    if(!authToken){
        return NextResponse.json({
            message:"User is not logged in"
        });
    }
    // console.log(authToken);
    const data = jwt.verify(authToken,process.env.JWT_KEY);
    // console.log(data);
    await connectDb();
    const user =await User.findById(data._id).select("-password")

    return NextResponse.json(user)
}