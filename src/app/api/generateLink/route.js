import Connect from "@/server/database/connect";
import Secret from "@/server/model/secret";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { name } = await request.json();
        await Connect();

        const validateToken = async () => {
            const token = Math.random().toString(36).substring(7);
            const secrets = await Secret.findOne({ token });

            if (secrets) {
                validateToken();
            }

            return token;
        }

        const token = await validateToken();
        const link = `${process.env.DOMAIN_NAME}/secret/${token}`;
        const message = []
        await Secret.create({ name, link, token, message })

        return NextResponse.json({ msg: "Your record is accepted.", link: link, token: token })
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}