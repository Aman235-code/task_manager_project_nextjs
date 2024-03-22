import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
    const {userId}  =  params
    const user = await User.findById(userId)
    return NextResponse.json(user)
}


export async function DELETE(req, {params}){
    // console.log(params.id)
    const {userId}  =  params
    try {
        await User.deleteOne({
            _id: userId
        });

        return NextResponse.json({
            message: "deleted",
            success:true
        },{status:201, statusText:"Heyy"})

    } catch (error) {
        return NextResponse.json({
            message: "Error User",
            success:false
        })
    }
}

export async function PUT(req, {params}){
    const {userId}  =  params
    const {name,password,about,profileURL} = await req.json()
    try {
        const user = await User.findById(userId)
        user.name = name
        user.password = password
        user.about = about
        user.profileURL = profileURL

        const updated = await user.save();
        return NextResponse.json(updated)

    } catch (error) {
        return NextResponse.json({
            message: "Updated Error User",
            success:false
        })
    }
}