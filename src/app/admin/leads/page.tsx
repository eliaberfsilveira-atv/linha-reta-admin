import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function LeadsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: { viagem: { select: { titulo: true } } },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Leads</h1>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Nome</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Telefone</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Viagem</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leads.map((l) => (
              <tr key={l.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{l.nome}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{l.email}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{l.telefone || "-"}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{l.viagem?.titulo || "-"}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {l.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {new Date(l.createdAt).toLocaleDateString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 && (
          <div className="text-center py-12 text-gray-500">Nenhum lead cadastrado</div>
        )}
      </div>
    </div>
  );
}