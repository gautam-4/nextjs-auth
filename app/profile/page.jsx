"use client";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const logout = async () => {
        try {
            setIsLoading(true);
            await axios.get('/api/users/logout');
            toast.success('Logout successful');
            router.push('/login');
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.error || 'An error occurred during logout');
        } finally {
            setIsLoading(false);
        }
    };

    const getUserDetails = async () => {
        try {
            setIsLoading(true);
            const res = await axios.post('/api/users/me');
            if (res.data && res.data.data && res.data.data._id) {
                router.push(`/profile/${res.data.data._id}`);
            } else {
                toast.error('Unable to fetch user details');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.error || 'An error occurred while fetching user details');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-center text-white">Profile</h1>
                    <p className="mt-2 text-center text-gray-300">Manage your account</p>
                </div>
                
                <div className="space-y-4">
                    <button
                        onClick={getUserDetails}
                        disabled={isLoading}
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Loading...' : 'View Profile Details'}
                    </button>

                    <button
                        onClick={logout}
                        disabled={isLoading}
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Loading...' : 'Logout'}
                    </button>
                </div>
            </div>
        </div>
    );
}