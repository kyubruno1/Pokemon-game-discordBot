import fetch from "node-fetch";

async function fetchPokemon() {
  const result = await fetch(`https://pokeapi.co/api/v2/evolution-chain/1/`);
  const pokemon = await result.json();
  //   console.log(pokemon);
  console.log(pokemon.chain.evolves_to);
  console.log(pokemon.chain.evolves_to[0].species.url);
}
fetchPokemon();
