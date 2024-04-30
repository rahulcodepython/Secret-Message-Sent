import Connect from "@/server/database/connect";
import Secret from "@/server/model/secret";
import { NextResponse } from "next/server";

export async function POST(request, context) {
    try {
        const token = context.params.token;
        const { name, message } = await request.json();

        await Connect();

        const profile = await Secret.findOne({ token: token });

        if (!profile) {
            return NextResponse.json({ msg: "Invalid token" }, { status: 400 })
        }

        const messageObj = {
            name: name,
            msg: message,
            date: Date.now()
        }

        profile.message.push(messageObj);
        await profile.save();

        return NextResponse.json({}, { status: 200 })

    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}