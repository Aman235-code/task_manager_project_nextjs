"use client";
import userContext from "@/context/UserContext";
import { login } from "@/services/userService";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

const Login = () => {

  const router = useRouter();
  const context = useContext(userContext);

   const [logindata, setloginData] = useState({
        email:'',
        password:''
    });

    const loginFormSubmitted = async(event) => {
        event.preventDefault();
        console.log(logindata);
        if(logindata.email.trim() === "" || logindata.password.trim() === ""){
            toast.info("Invalid Data",{
                position:"top-center"
            })
            return
        }

        try {
          const res = await login(logindata);
          console.log(res);
          toast.success("Logged In",{
            position:"top-center"
          });

          context.setUser(res.user)

          router.push("/profile/user");


        } catch (error) {
          console.log(error);
          toast.error(error.response.data.message ,{
            position:"top-center"
          })
        }

    }
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 col-start-5 borde">
        <div className="py-5"></div>
        <h1 className="text-3xl text-center">Login Here</h1>
        <form onSubmit={loginFormSubmitted}>
          <div className="mt-3">
            <label
              htmlFor="user_email"
              className="block text-sm font-medium mb-2 ps-2"
            >
              User Email
            </label>
            <input
              type="email"
              name="user_email"
              className="w-full p-2.5 rounded-lg bg-gray-800 focus:ring-pink-900 border-pink-200"
              id="user_email"
              placeholder="Enter Here"
              onChange={(event) => {
                setloginData({
                  ...logindata,
                  email: event.target.value,
                });
              }}
              value={logindata.email}
            />
          </div>

          <div className="mt-3">
            <label
              htmlFor="user_password"
              className="block text-sm font-medium mb-2 ps-2"
            >
              User Password
            </label>
            <input
              type="password"
              name="user_password"
              className="w-full p-2.5 rounded-lg bg-gray-800 focus:ring-pink-900 border-pink-200"
              id="user_password"
              placeholder="Enter Here"
              onChange={(event) => {
                setloginData({
                  ...logindata,
                  password: event.target.value,
                });
              }}
              value={logindata.password}
            />
          </div>

          <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="bg-green-600 py-2 px-3 rounded-lg hover:bg-yellow-700"
              >
                Login
              </button>
              <button type="button" className="bg-red-600 py-2 px-3 rounded-lg hover:bg-yellow-700 ms-3"
            //    onClick={resetForm}
               >
                Reset
              </button>
            </div>

        </form>
      </div>
    </div>
  );
};

export default Login;
