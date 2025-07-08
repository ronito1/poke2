import { notFound } from "next/navigation";
import Link from "next/link";

interface Pokemon {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  moves: { move: { name: string } }[];
}

// Enable static generation for all 151 Pokemon
export async function generateStaticParams() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", { cache: "force-cache" });
  const data = await res.json();
  return data.results.map((pokemon: { url: string }) => {
    const id = pokemon.url.split("/").filter(Boolean).pop();
    return { id };
  });
}

export default async function PokemonDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { cache: "force-cache" });
  if (!res.ok) return notFound();
  const pokemon: Pokemon = await res.json();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto mt-10 border border-gray-200">
      <Link href="/" className="text-pink-600 hover:underline mb-4 inline-block font-medium text-sm">← Back to list</Link>
      <div className="flex flex-col sm:flex-row items-center gap-8">
        <div className="relative">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-36 h-36 bg-white rounded-full border-2 border-pink-200 shadow"
          />
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-pink-500 text-white text-xs font-semibold shadow">
            #{pokemon.id}
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold capitalize text-gray-800 mb-2 tracking-tight">{pokemon.name}</h2>
          <div className="mb-2">
            <span className="font-semibold text-gray-700">Types: </span>
            {pokemon.types.map((t) => (
              <span key={t.type.name} className="inline-block px-3 py-1 mr-2 mb-1 rounded-full bg-pink-100 text-pink-700 font-medium text-xs shadow-sm">
                {t.type.name}
              </span>
            ))}
          </div>
          <div className="mb-2">
            <span className="font-semibold text-gray-700">Abilities: </span>
            {pokemon.abilities.map((a) => (
              <span key={a.ability.name} className="inline-block px-3 py-1 mr-2 mb-1 rounded-full bg-blue-100 text-blue-700 font-medium text-xs shadow-sm">
                {a.ability.name}
              </span>
            ))}
          </div>
          <div className="mb-4">
            <span className="font-semibold text-gray-700">Stats:</span>
            <ul className="ml-2 mt-1 flex flex-wrap gap-2">
              {pokemon.stats.map((s) => (
                <li key={s.stat.name} className="text-xs text-gray-800 bg-gray-100 px-3 py-1 rounded-full font-medium shadow-sm">
                  <span className="capitalize">{s.stat.name.replace("-", " ")}: </span>{s.base_stat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <span className="font-semibold text-gray-700 block mb-2">Moves:</span>
        <div className="flex flex-wrap gap-2 mt-1 items-center">
          {pokemon.moves.slice(0, 12).map((m) => (
            <span key={m.move.name} className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-medium text-xs shadow-sm">
              {m.move.name.replace("-", " ")}
            </span>
          ))}
          {pokemon.moves.length > 12 && (
            <span className="text-xs text-gray-500 align-middle ml-2">and {pokemon.moves.length - 12} more…</span>
          )}
        </div>
      </div>
    </div>
  );
} 
// ;;