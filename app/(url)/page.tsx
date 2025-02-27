import ConvertUrlForm from "@/components/convert-url-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "홈",
};

export default async function Home() {
  return (
    <div>
      <ConvertUrlForm />
    </div>
  );
}
