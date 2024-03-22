import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import { connectDb } from "@/helper/db";



export async function POST(req){
    const {email,password} = await req.json();

    try {

        // get user
        await connectDb();
        const user = await User.findOne({
            email: email
        });

        // verify user
        if(user == null){
            throw new Error("User Not Found")
        }

        // verify password
        const match = bcrypt.compareSync(password, user.password)
        if(!match){
            throw new Error("Password Not Matched")
        }

        // generate jwt token
        const token = jwt.sign({
            _id: user._id,
            name: user.name
        },process.env.JWT_KEY)

        console.log(token);

        // add token in cookie
        const res  = NextResponse.json({
            message: "Login Success",
            success: true,
            user: user
        });

        res.cookies.set("authToken",token,{
            expiresIn:"1d",
            // httpOnly: false,
        })

        return res;
        
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false
        },{
            status: 500
        })
    }
}