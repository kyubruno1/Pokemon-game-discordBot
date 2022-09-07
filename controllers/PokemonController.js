const fetch = require('node-fetch');
const PokemonDB = require('../models/Pokemon.js');
const { dice } = require('../helpers/dice');
/*
adicionar os metodos para gerenciar os pokemons
tipo buscar um, buscar todos, capturar um, evoluir, batalhar
*/

async function findWildPokemon() {
  const result = await fetch(`http://pokeapi.co/api/v2/pokemon/${dice(151)}/`);
  const pokemon = await result.json();

  return pokemon;
}
async function savePokemon(name, pokedex_id, PlayerDiscordId) {
  await PokemonDB.create({ name, pokedex_id, PlayerDiscordId });
}
async function getAllPokemons(userID) {
  const result = await PokemonDB.findAll({ where: { PlayerDiscordId: userID } });
  const pokemons = await result.json();
  console.log(result);
  return pokemons;
}

async function getOnePokemon(pokedex_id, PlayerDiscordId) {
  const pokemon = await PokemonDB.findOne({
    where: { pokedex_id, PlayerDiscordId },
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
module.exports = { findWildPokemon, savePokemon };
