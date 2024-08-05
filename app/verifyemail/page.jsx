"use client"

import { useEffect, useState } from "react"
import axios from "axios";
import { useRouter } from "next/router";

function VerifyEmail() {

    const router = useRouter()

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async() => {
        try {
            await axios.post('/api/verifyemail', {token});
            setVerified(true);
        } catch (error) {
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        const {query} = router;
        const urlToken = query.token;
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail()
        }
    }, [token]);

    return (
        <>

        </>
    )
}

export default VerifyEmail