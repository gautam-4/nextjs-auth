import { connect } from '@dbConfig/dbConfig'
import User from '@models/userModel'
import { NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@utils/mailer';

connect();

export async function POST(request){
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        //validation here
        
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error: "user already exists"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({username, email, password: hashedPassword});
        const savedUser = await newUser.save();
        console.log(savedUser);

        //verficiation email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});
        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser
        })

    } 
    catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}