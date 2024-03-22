import { User } from "@/models/user"
import mongoose from "mongoose"

const config = {
    isConnected: 0
}

export const connectDb = async() => {

    if(config.isConnected){
        return
    }
    
    console.log("hell");
    try{
        const {connection} = await mongoose.connect(process.env.MONGO_DB_URL, {
            dbName: "work_manager",
        })

        console.log("Connected")
        console.log(connection.readyState)
        config.isConnected = connection.readyState;
        // const user = new User({
        //     name:"Anan",
        //     email:"test@gmail.com",
        //     password:"testpassword",
        //     about:"this is testing"
        // });

        // await user.save();
        // console.log("user created")
        
    }

    catch(error){
        console.log("Error", error);
    }
}