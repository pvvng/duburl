import MemeberNavbar from "@/components/member-navbar";

export default function MemberLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <MemeberNavbar />
      {children}
    </div>
  );
}
