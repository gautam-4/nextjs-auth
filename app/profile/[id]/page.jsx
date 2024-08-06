"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function UserProfile({ params }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUserDetails = async () => {
        try {
            const res = await axios.post('/api/users/me');
            setUser(res.data.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
            toast.error('Failed to fetch user details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-white">Loading...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-white">User not found</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="bg-black border border-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-white">User Profile</h1>
                <div className="space-y-3">
                    <p className="text-gray-300"><span className="font-semibold">Username:</span> {user.username}</p>
                    <p className="text-gray-300"><span className="font-semibold">Email:</span> {user.email}</p>
                </div>
            </div>
        </div>
    );
}