"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Signup } from "@/services/userService";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    profileURL:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.stack.imgur.com%2Fdr5qp.jpg&f=1&nofb=1&ipt=94c102da700bffb633e380cdfa85a3e137e2d1cacb8d1003eb44ea9460987d21&ipo=images",
  });

  const doSignUp = async (event) => {
    event.preventDefault();
    if (data.name.trim() === "" || data.name == null) {
      toast.warning("Name is Required", {
        position: "top-center",
      });
      return;
    }

    try {
      const res = await Signup(data);
      console.log(res);
      toast.success("User is registered", {
        position: "top-center",
      });

      setData({
        name: "",
        email: "",
        password: "",
        about: "",
        profileURL:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.stack.imgur.com%2Fdr5qp.jpg&f=1&nofb=1&ipt=94c102da700bffb633e380cdfa85a3e137e2d1cacb8d1003eb44ea9460987d21&ipo=images",
      });
    } catch (error) {
      console.log(error);
      toast.error("User is not added ", {
        position: "top-center",
      });
    }
  };

  const resetForm = () => {
    setData({
      name: "",
        email: "",
        password: "",
        about: "",
        profileURL:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.stack.imgur.com%2Fdr5qp.jpg&f=1&nofb=1&ipt=94c102da700bffb633e380cdfa85a3e137e2d1cacb8d1003eb44ea9460987d21&ipo=images",
    })
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4 col-start-5 borde">
        <div className="py-5">
          <h1 className="text-3xl text-center">Sign Up Here</h1>
          <form action="" className="mt-5" onSubmit={doSignUp}>
            <div className="mt-3">
              <label
                htmlFor="user_name"
                className="block text-sm font-medium mb-2 ps-2"
              >
                Username
              </label>
              <input
                type="text"
                name="user_name"
                className="w-full p-2.5 rounded-lg bg-gray-800 focus:ring-pink-900 border-pink-200"
                id="user_name"
                placeholder="Enter Here"
                onChange={(event) => {
                  setData({
                    ...data,
                    name: event.target.value,
                  });
                }}
                value={data.name}
              />
            </div>

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
                  setData({
                    ...data,
                    email: event.target.value,
                  });
                }}
                value={data.email}
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
                  setData({
                    ...data,
                    password: event.target.value,
                  });
                }}
                value={data.password}
              />
            </div>

            <div className="mt-3">
              <label
                htmlFor="user_about"
                className="block text-sm font-medium mb-2 ps-2"
              >
                About
              </label>
              <textarea
                type="text"
                name="user_about"
                className="w-full p-2.5 rounded-lg bg-gray-800 focus:ring-pink-900 border-pink-200"
                id="user_about"
                placeholder="Enter Here"
                rows={8}
                onChange={(event) => {
                  setData({
                    ...data,
                    about: event.target.value,
                  });
                }}
                value={data.about}
              />
            </div>

            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="bg-green-600 py-2 px-3 rounded-lg hover:bg-yellow-700"
              >
                Sign Up
              </button>
              <button type="button" className="bg-red-600 py-2 px-3 rounded-lg hover:bg-yellow-700 ms-3" onClick={resetForm}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
