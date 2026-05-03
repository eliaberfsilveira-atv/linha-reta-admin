import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">Linha Reta Turismo</h2>
          <p className="text-xs text-gray-500">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            📊 Dashboard
          </Link>
          <Link href="/admin/viagens" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            ✈️ Viagens
          </Link>
          <Link href="/admin/leads" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            📋 Leads
          </Link>
          <Link href="/admin/configuracoes" className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
            ⚙️ Configurações
          </Link>
        </nav>
        <div className="p-4 border-t">
          <p className="text-sm text-gray-600 mb-2">{session.user?.name}</p>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/admin/login" }); }}>
            <button type="submit" className="text-sm text-red-600 hover:text-red-800">
              Sair
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}