import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function ViagensPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const viagens = await prisma.viagem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Viagens</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Nova Viagem
        </button>
      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Título</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Destino</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Preço</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Partida</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {viagens.map((v) => (
              <tr key={v.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{v.titulo}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{v.destino}</td>
                <td className="px-4 py-3 text-sm text-gray-600">R$ {v.preco.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {new Date(v.dataPartida).toLocaleDateString("pt-BR")}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${v.ativa ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {v.ativa ? "Ativa" : "Inativa"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {viagens.length === 0 && (
          <div className="text-center py-12 text-gray-500">Nenhuma viagem cadastrada</div>
        )}
      </div>
    </div>
  );
}