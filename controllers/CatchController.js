const fetch = require('node-fetch');
const PokemonDB = require('../models/Pokemon.js');
const { dice } = require('../helpers/dice');

// function dice() {
//   return (Math.floor(Math.random() * 150) + 1).toString();
// }

function catchPercentage(pokemonLevel) {
  let porcentagem = 95;
  let taxa = 1.8;
  let level = 0;
  // let countLevel = 72;

  while (level < pokemonLevel) {
    switch (level) {
      case 10:
        taxa = 2;
        // console.log(10, porcentagem.toFixed(2));
        break;
      case 20:
        taxa = 1.5;
        // console.log(20, porcentagem.toFixed(2));
        break;
      case 30:
        taxa = 1;
        // console.log(30, porcentagem.toFixed(2));
        break;
      case 40:
        taxa = 0.8;
        // console.log(40, porcentagem.toFixed(2));
        break;
      case 50:
        taxa = 0.8;
        // console.log(50, porcentagem.toFixed(2));
        break;
      case 60:
        taxa = 0.8;
        // console.log(60, porcentagem.toFixed(2));
        break;
      case 70:
        taxa = 0.4;
        // console.log(70, porcentagem.toFixed(2));
        break;
      case 80:
        taxa = 0.1;
        // console.log(80, porcentagem.toFixed(2));
        break;
      case 90:
        taxa = 0.1;
        // console.log(90, porcentagem.toFixed(2));
        break;
      case 100:
        // console.log(100, porcentagem.toFixed(2));

        break;
    }
    porcentagem = porcentagem - taxa;
    level++;

    // console.log(`Level: ${level}Porcentagem: ${porcentagem}`);
  }

  return porcentagem;
}

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
  catchPercentage,
};
