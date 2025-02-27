import getSession from "@/lib/session";

export default async function Profile() {
  const session = await getSession();

  return <div>profile</div>;
}
