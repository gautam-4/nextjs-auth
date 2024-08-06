"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout successful');
            router.push('/login');
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        const res = await axios.post('/api/users/me');
        console.log(res.data);
        setData(res.data.data);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-3xl font-bold text-center text-white">Profile</h1>
                <hr className="mt-4 border-gray-700" />
                <p className="mt-2 text-center text-gray-300">Profile page</p>
                <h2 className="p-2 mt-4 rounded-md text-white text-center">
                    {data === 'nothing' ? "Nothing" : <Link href={`/profile/${data._id}`} className="text-blue-400 hover:text-blue-300">{data._id}</Link>}
                </h2>
                <hr className="mt-4 border-gray-700" />
                
                <button
                    onClick={logout}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full"
                >
                    Logout
                </button>

                <button
                    onClick={getUserDetails}
                    className="mt-4 bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-md w-full"
                >
                    Get User Details
                </button>
            </div>
        </div>
    );
}
