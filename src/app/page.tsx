import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Header } from "@/components/header";
import { QRGenerator } from "@/components/qr-generator";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen">
      <Header userEmail={user.email ?? undefined} />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <QRGenerator />
      </main>
    </div>
  );
}
