import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const serverId = params.serverId;
    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    const server = await db.server.delete({
      where: {
        id: serverId,
        profileId: profile.id,
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    console.log("CHANNELS_LEAVE", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
