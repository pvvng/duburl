import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DashBoard() {
  const session = await getSession();

  if (!session || !session.id) {
    return redirect("/");
  }

  return <div className="p-5 xl:p-16">ds</div>;
}
