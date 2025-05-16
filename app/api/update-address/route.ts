// app/api/update-address/route.ts

import { auth } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/backend";
import { NextResponse } from "next/server";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });

export async function POST(req: Request) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { address } = await req.json();

    try {
        await clerk.users.updateUser(userId, {
            publicMetadata: {
                address,
            },
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Error updating address:", err);
        return NextResponse.json({ error: "Failed to update address" }, { status: 500 });
    }
}
