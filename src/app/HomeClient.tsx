'use client';
import Link from "next/link";
import { useState } from "react";

interface PokemonListResult {
  name: string;
  url: string;
}

export default function HomeClient({ pokemons }: { pokemons: PokemonListResult[] }) {
  const [search, setSearch] = useState("");
  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#f0f9ff] to-[#dbeafe] p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-blue-600 tracking-tight leading-tight" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>Pokémon Explorer</h1>
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="w-full p-4 mb-10 rounded-2xl border border-blue-200 shadow focus:outline-none focus:ring-4 focus:ring-blue-300/40 text-lg transition-all duration-300 placeholder:text-blue-400 bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {filtered.map((pokemon) => {
            const id = pokemon.url.split("/").filter(Boolean).pop();
            return (
              <Link
                key={pokemon.name}
                href={`/pokemon/${id}`}
                className="group bg-white rounded-2xl shadow-md p-5 flex flex-col items-center border-2 border-transparent hover:border-blue-500 hover:shadow-lg transition-all duration-200 hover:scale-105"
                style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={pokemon.name}
                  className="w-24 h-24 mb-3 drop-shadow group-hover:scale-110 transition-transform"
                />
                <span className="capitalize font-semibold text-lg text-blue-700 group-hover:text-blue-500 tracking-wide">
                  {pokemon.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
} 