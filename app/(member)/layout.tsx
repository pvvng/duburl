import MemeberNavbar from "@/components/member-navbar";

export default function MemberLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MemeberNavbar />
      {children}
    </>
  );
}
