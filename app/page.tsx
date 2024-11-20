import { redirect } from "next/navigation";

export default function Home() {
  redirect("/portal/api-keys");
}