'use client'

import { logout } from "@/services/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React,{useContext} from "react";
import { toast } from "react-toastify";
import UserContext from '../context/UserContext';

const Navbar = () => {

  const context = useContext(UserContext)
  const router = useRouter()
  console.log(context)

  async function doLogout(){
      try {
        const res = await logout();
        console.log(res);
        context.setUser(undefined)
        router.push("/")

      } catch (error) {
        toast.error("Logout Error",{
          position:"top-center"
        })
      }
  }

  return (
    <div>
      <nav className="bg-blue-600 text-white h-12 py-2 px-3 flex justify-between items-center">
        <div className="brand">
          <h1 className="text-2xl font-extrabold">
            <a href="/">Work Manager</a>
          </h1>
        </div>
        <div>
            <ul className="flex space-x-5">
            {
              context.user && (
                <>
                <li>
                   <Link href={'/'} className="hover:text-red-500">Home</Link>
                </li>
                <li>
                    <Link href={'/add-task'}>Add Task</Link>
                </li>
                <li>
                    <Link href={'/show-tasks'}>Show Tasks</Link>
                </li>
                </>
              )
            }
               
            </ul>
        </div>
        <div>
            <ul className="flex space-x-5">
            {
              context.user && (
                <>
                  <li><Link href={'/'}>{context.user.name}</Link></li>
                  <li><button onClick={doLogout}>Logout</button></li>
                </>
              )
            }

            {
              !context.user && (
                <>
                <Link href={'/login'}>Login</Link>
                  <Link href={'/signup'}>Sign Up</Link>
                </>
              )
            } 
            </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
