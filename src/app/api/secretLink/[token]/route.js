import Connect from "@/server/database/connect";
import Secret from "@/server/model/secret";
import { NextResponse } from "next/server";

export async function GET(request, context) {
    try {
        const token = context.params.token;
        await Connect();

        const profile = await Secret.findOne({ token: token });

        if (profile) {
            return NextResponse.json({ link: profile.link, name: profile.name })
        }

        return NextResponse.json("No Token Found", { status: 400 })

    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}