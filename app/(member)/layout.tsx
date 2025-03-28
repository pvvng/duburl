import MemeberNavbar from "@/components/member-navbar";

export default function MemberLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-neutral-100 min-h-screen dark:bg-neutral-900 dark:text-neutral-300">
      <MemeberNavbar />
      {children}
    </div>
  );
}
