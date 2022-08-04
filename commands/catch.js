import { SlashCommandBuilder } from "@discordjs/builders";

const catchCommand = new SlashCommandBuilder()
  .setName("capturar")
  .setDescription("Capturar um pokémon");

export default catchCommand;
