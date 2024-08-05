"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
            setError(false);
        } catch (error) {
            setError(true);
            console.log(error);
        }
    }

    useEffect(() => {
        setError(false);
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        setError(false);
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-3xl font-bold text-center text-white">Verify Your Email</h1>
                <div className="mt-4 p-2 text-white text-center rounded-md">
                    {token ? `Token: ${token}` : "No token found"}
                </div>

                {verified && (
                    <div className="mt-6 text-center">
                        <h2 className="text-xl font-semibold text-green-500">Email Verified Successfully!</h2>
                        <Link href="/login">
                            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                                Go to Login
                            </button>
                        </Link>
                    </div>
                )}

                {error && (
                    <div className="mt-6 text-center">
                        <h2 className="text-xl font-semibold text-red-500">Verification Failed</h2>
                        <p className="mt-2 text-gray-400">There was an issue verifying your email. Please try again later.</p>
                    </div>
                )}
            </div>
        </div>
    );
}