import { NextResponse } from "next/server";

export async function POST(request){

    const res= NextResponse.json({
        message:"Logged Out",
        success: true
    })

    res.cookies.set("authToken","",{
        expires: new Date(0),
    });

    return res;
}