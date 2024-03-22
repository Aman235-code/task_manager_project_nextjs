import React from 'react'

async function test(){
    await new Promise((resolve)=>{
       
        setTimeout(resolve,3000);
    });
}

const Profile = async() => {
    await test();
    // throw new Error("error")
  return (
    <div>Profile</div>
  )
}

export default Profile