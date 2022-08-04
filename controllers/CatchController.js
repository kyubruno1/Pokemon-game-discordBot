import fetch from "node-fetch";

export function dice() {
  return (Math.floor(Math.random() * 150) + 1).toString();
}

export async function fetchPokemon() {
  const result = await fetch(`http://pokeapi.co/api/v2/pokemon/${dice()}/`);
  const pokemon = await result.json();
  return pokemon;
}

export async function pokemonEvo(pokemonID) {
  const result = await fetch(
    `https://pokeapi.co/api/v2/evolution-chain/${pokemonID}/`
  );
  const pokemon = await result.json();
  //   console.log(pokemon.chain.evolves_to);
  //   console.log(pokemon.chain.evolves_to[0].species.url);
}
