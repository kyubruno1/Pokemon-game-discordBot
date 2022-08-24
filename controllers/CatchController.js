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

async function getAllPokemons(userID) {
  const pokemons = await PokemonDB.findAll({ where: { PlayerDiscordId: userID } });
  return pokemons;
}

async function getOnePokemon(pokemonID, userID) {
  console.log(pokemonID, userID);
  const pokemon = await PokemonDB.findOne({
    where: { pokemon_id: pokemonID, PlayerDiscordId: userID },
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

module.exports = { catchPokemon, getAllPokemons, getOnePokemon, evolvePokemon };
