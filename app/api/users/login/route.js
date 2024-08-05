import { connect } from '@dbConfig/dbConfig'
import User from '@models/userModel'
import { NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request){
    try {
        const reqBody = await request.json();
        const { username, password} = reqBody;
        //validation here
        console.log(reqBody)

        const user = await User.findOne({username});

        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        console.log("use exists");

        const validPassword = await bcryptjs.compare(password, user.password)

        if(!validPassword){
            return NextResponse.json({error: "Incorrect password"}, {status: 400})
        }

        if(!process.env.TOKEN_SECRET){
            return NextResponse.json({error: "Server error. Could not generate token."}, {status: 400})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: '1d'})

        const response = NextResponse.json({
            message: "Logged in successfully",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response;



    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}