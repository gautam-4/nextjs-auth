import { connect } from '@dbConfig/dbConfig';
import User from '@models/userModel';
import { NextResponse } from 'next/server';
import { getDataFromToken } from '@utils/getDataFromToken';

connect();

export async function POST(request) {
    const userId = await getDataFromToken(request);
    
    // Handle the case where getDataFromToken returns a NextResponse
    if (userId instanceof NextResponse) {
        return userId;
    }

    try {
        const user = await User.findOne({ _id: userId }).select("-password");
        
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User found",
            data: user
        });
    } catch (error) {
        return NextResponse.json({ error: "Server error." }, { status: 500 });
    }
}
