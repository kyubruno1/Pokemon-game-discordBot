const fetch = require('node-fetch');
const PokemonDB = require('../models/Pokemon.js');
const { dice } = require('../helpers/dice');

// function dice() {
//   return (Math.floor(Math.random() * 150) + 1).toString();
// }

async function catchPokemon(userID) {
  const result = await fetch(`http://pokeapi.co/api/v2/pokemon/${dice(150)}/`);
  const pokemon = await result.json();

  // await PokemonDB.create({ name: pokemon.name, pokedex_id: pokemon.id, PlayerDiscordId: userID });
  return pokemon;
}

async function getAllPokemons(userID) {
  const pokemons = await PokemonDB.findAll({ where: { PlayerDiscordId: userID } });
  return pokemons;
}

async function getOnePokemon(pokemonID, userID) {
  const pokemon = await PokemonDB.findOne({
    where: { pokedex_id: pokemonID, PlayerDiscordId: userID },
  });
  return pokemon;
}

async function evolvePokemon(pokemonID) {
  const result = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokemonID}/`);
  const pokemon = await result.json();
  console.table(pokemon);
  //   console.log(pokemon.chain.evolves_to);
  //   console.log(pokemon.chain.evolves_to[0].species.url);
  // if (evo.evolves_to[0].species.name === 'ivysaur') {
  //   console.log(evo.evolves_to[0].evolves_to);
  // }
}

async function starterPokemon(customId, userID) {
  const result = await fetch(`http://pokeapi.co/api/v2/pokemon/${customId}/`);
  const pokemon = await result.json();

  await PokemonDB.create({ name: pokemon.name, pokedex_id: pokemon.id, PlayerDiscordId: userID });
  return pokemon;
}

module.exports = {
  catchPokemon,
  getAllPokemons,
  getOnePokemon,
  evolvePokemon,
  starterPokemon,
};
