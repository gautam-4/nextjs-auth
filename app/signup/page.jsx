"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"

function Signup() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onSignup = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup', user);
            console.log("signup successful", response.data);
            router.push('/login');
        } catch (error) {
            console.log("signup failed");
            toast.error("Failed to signup");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email && user.password && user.username) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                    Create an account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-700">
                    <form className="space-y-6" onSubmit={onSignup}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                                Username
                            </label>
                            <div className="mt-1">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={user.username}
                                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                                    required
                                    className="block w-full appearance-none rounded-md border input-field px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm bg-transparent border-gray-600"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    autoComplete="email"
                                    required
                                    className="block w-full appearance-none rounded-md border input-field px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm bg-transparent border-gray-600"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm bg-transparent border-gray-600"
                                />
                            </div>
                        </div>

                        <div className="mt-10">
                            <button
                                type="submit"
                                disabled={buttonDisabled || loading}
                                className={`flex w-full justify-center rounded-md py-2 px-4 text-sm font-medium shadow-sm ${loading || buttonDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                            >
                                {loading ? 'Signing up...' : 'Sign up'}
                            </button>

                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-700" />
                            </div>
                        </div>
                    </div>

                    <div className="text-sm flex justify-center pt-2">
                        <Link href="/login" className="font-medium text-gray-500 hover:text-blue-300">
                            Already a user? Login here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;