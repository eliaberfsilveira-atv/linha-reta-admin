import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const [totalViagens, totalLeads, leadsNovos, viagensAtivas] = await Promise.all([
    prisma.viagem.count(),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NOVO" } }),
    prisma.viagem.count({ where: { ativa: true } }),
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Viagens" value={totalViagens} color="blue" />
        <KpiCard title="Viagens Ativas" value={viagensAtivas} color="green" />
        <KpiCard title="Total Leads" value={totalLeads} color="purple" />
        <KpiCard title="Leads Novos" value={leadsNovos} color="orange" />
      </div>
    </div>
  );
}

function KpiCard({ title, value, color }: { title: string; value: number; color: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    green: "bg-green-50 border-green-200 text-green-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
    orange: "bg-orange-50 border-orange-200 text-orange-700",
  };
  return (
    <div className={`border rounded-xl p-4 ${colors[color]}`}>
      <p className="text-sm font-medium opacity-75">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}