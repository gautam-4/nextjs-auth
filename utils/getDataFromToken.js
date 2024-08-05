import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const getDataFromToken = (request) => {
    try {
        const token = request.cookies.get("token")?.value || "";

        if (!process.env.TOKEN_SECRET) {
            return NextResponse.json({ error: "Server error. Could not generate token." }, { status: 500 });
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        return decodedToken.id;

    } catch (error) {
        // Log the error and return a response instead of throwing a new Error
        return NextResponse.json({ error: "Invalid token." }, { status: 401 });
    }
}
