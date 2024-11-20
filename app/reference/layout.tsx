import { redirect } from "next/navigation";

export default function ReferenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  redirect("/documentation/reference");
}