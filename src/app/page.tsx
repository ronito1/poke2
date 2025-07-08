import HomeClient from "./HomeClient";

interface PokemonListResult {
  name: string;
  url: string;
}

async function getPokemons(): Promise<PokemonListResult[]> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", { cache: "force-cache" });
  const data = await res.json();
  return data.results;
}

export default async function Home() {
  const pokemons = await getPokemons();
  return <HomeClient pokemons={pokemons} />;
}
