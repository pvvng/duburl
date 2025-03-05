import GuestConvertUrlForm from "@/components/form/guest-convert-url-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "홈",
};

export default async function Home() {
  return (
    <div>
      <GuestConvertUrlForm />
    </div>
  );
}
