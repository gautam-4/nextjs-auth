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
    })

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup', user);
            console.log("signup successful", response.data);
            router.push('/login')
        } catch (error) {
            console.log("signup failed")
            toast.error("Failed to signup")
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <>
            <div>
                <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                            Create an account
                        </h2>

                    </div>

                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-700">
                            <form className="space-y-6" action="#" method="POST">
                                <div className="flex gap-2">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                            First Name
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                required
                                                className="block w-full appearance-none rounded-md border input-field px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm bg-transparent border-gray-600"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                            Last Name
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="lastName"
                                                name="lastNmae"
                                                type="text"
                                                required
                                                className="block w-full appearance-none rounded-md border input-field px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm bg-transparent border-gray-600"
                                            />
                                        </div>
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
                                            autoComplete="current-password"
                                            required
                                            className="block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm bg-transparent border-gray-600"
                                        />
                                    </div>
                                </div>
                                <div className="mt-10">
                                    <button
                                        type="submit"
                                        className="button-primary flex w-full justify-center rounded-md py-2 px-4 text-sm font-medium shadow-sm"
                                    >
                                        Sign up
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
                                <Link href="/login" className="font-medium text-gray-500 hover:text-indigo-300">
                                    Already a user? Login here
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup