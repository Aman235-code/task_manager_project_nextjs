import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

import bcrypt from "bcryptjs"



export async function GET(req){
    let users = []
   try {

    await connectDb();
    
    users = await User.find().select("-password")

   } catch (error) {
    console.log(error)
    NextResponse.json("Failed to get Users",{
        success:false
    })
   }

return NextResponse.json(users);
}

export async function POST(req){

    const {name,email,password,about,profileURL} =await  req.json()

    const user = new User({
        name,
        email,
        password,
        about,
        profileURL
    });
     try {
        user.password = await bcrypt.hash(user.password,parseInt(process.env.BCRYPT_SALT));
        console.log(user);
        await connectDb();
        const createdUser = await user.save()
    const response = NextResponse.json(createdUser,{
        status: 201
    })

    return response;
     } catch (error) {
        // console.log("Error")
        NextResponse.json("Failed to create User",{
            success:false
        },{
            status: 500,
        })
     }
    

    // console.log(req.body)
    // console.log(req.method)
    // console.log(req.cookies)
    // console.log(req.headers)
    // console.log(req.nextUrl.pathname)
    // console.log(req.nextUrl.searchParams)

    // const jda= await req.json()
    // const jda= await req.text()
    // console.log(jda)


    // return NextResponse.json({
    //     "message":"posting"
    // })
}

// export function DELETE(req){
//     console.log("delete api")
//     return NextResponse.json({
//         message: "deleted",
//         status:true
//     },{status:201, statusText:"Heyy"})
// }

// export function PUT(){

// }