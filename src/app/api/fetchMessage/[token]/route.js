import Connect from "@/server/database/connect";
import Secret from "@/server/model/secret";
import { NextResponse } from "next/server";

export async function GET(request, context) {
    try {
        const token = context.params.token;
        await Connect();

        const profile = await Secret.findOne({ token: token });

        if (profile) {
            return NextResponse.json({ message: profile.message })
        }

        return NextResponse.json("No Token Found", { status: 500 })

    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}