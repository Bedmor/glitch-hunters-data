"use server";

import { db } from "~/server/db";
import { revalidatePath } from "next/cache";
import { getSession } from "./auth";

export async function deleteGlitch(id: string) {
    const session = await getSession();
    if (session?.role !== "super_admin") {
        return { success: false, error: "Yetkisiz işlem" };
    }

    try {
        await db.$transaction([
            db.vote.deleteMany({ where: { glitchId: id } }),
            db.comment.deleteMany({ where: { glitchId: id } }),
            db.glitch.delete({ where: { id } })
        ]);

        revalidatePath("/dashboard");
        revalidatePath("/dashboard/reports");
        revalidatePath("/dashboard/map");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete glitch:", error);
        return { success: false, error: "Silme işlemi başarısız" };
    }
}

export async function updateGlitchStatus(id: string, status: string) {
  try {
    await db.glitch.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/dashboard");
    revalidatePath(`/dashboard/reports/${id}`);
    revalidatePath("/dashboard/reports");
    revalidatePath("/dashboard/map");
    return { success: true };
  } catch (error) {
    console.error("Failed to update status:", error);
    return { success: false, error: "Failed to update status" };
  }
}
