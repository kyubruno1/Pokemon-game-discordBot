const fetch = require('node-fetch');
const PokemonDB = require('../models/Pokemon.js');

function dice() {
  return (Math.floor(Math.random() * 150) + 1).toString();
}

async function catchPokemon(userID) {
  const result = await fetch(`http://pokeapi.co/api/v2/pokemon/${dice()}/`);
  const pokemon = await result.json();

  await PokemonDB.create({ name: pokemon.name, pokemon_id: pokemon.id, PlayerDiscordId: userID });
  return pokemon;
}

async function pokemonEvo(pokemonID) {
  // const result = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokemonID}/`);
  // const pokemon = await result.json();
  console.table(pokemonID);
  //   console.log(pokemon.chain.evolves_to);
  //   console.log(pokemon.chain.evolves_to[0].species.url);
}

async function getAllPokemons(userID) {
  const pokemons = await PokemonDB.findAll({ where: { PlayerDiscordId: userID } });
  return pokemons;
}
module.exports = { catchPokemon, getAllPokemons };
