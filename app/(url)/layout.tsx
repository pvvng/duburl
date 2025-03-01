import GuestNavbar from "@/components/guest-navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GuestNavbar />
      {children}
    </>
  );
}
