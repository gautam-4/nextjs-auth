"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function UserProfile({ params }) {
    const [data, setData] = useState("loading...");

    const getUserDetails = async () => {
        const res = await axios.post('/api/users/me');
        console.log(res.data);
        setData(res.data.data);
    };
    useEffect(async() => {
        await getUserDetails();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <span className=" p-2 ml-2 rounded bg-white text-black">{data}</span>
        </div>
    )
}