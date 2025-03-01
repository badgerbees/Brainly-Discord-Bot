const { REST, Routes, SlashCommandBuilder } = require("discord.js");
const botID = "Put BotID here";
const serverID = "Put Server ID here";

const rest = new REST().setToken(process.env["token"]);

const slashRegister = async () => {
  try {
    await rest.put(Routes.applicationGuildCommands(botID, serverID), {
      body: [
        new SlashCommandBuilder()
          .setName("search")
          .setDescription("Search for answer!")
          .addStringOption(option => {
            return option
            .setName("question")
            .setDescription("Fill with Question")
            .setRequired(true)
          })
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

slashRegister();
