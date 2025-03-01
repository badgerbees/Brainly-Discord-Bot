const { Client, Events, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const token = process.env["token"];

const brainly = require("brainly-scraper");

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "search") {
    const textReceived = interaction.options.getString("question");

    try {
      const res = await brainly(textReceived);

      if (!res.data.length) {
        return interaction.reply({ content: "❌ No answers found.", ephemeral: true });
      }

      let replyContent = "**📖 Brainly Answers:**\n";
      res.data.slice(0, 3).forEach((item, index) => {
        replyContent += `\n**${index + 1}.**\n>>> ${item.jawaban[0].text}\n`;
      });

      interaction.reply({ content: replyContent, ephemeral: false });
    } catch (error) {
      console.error("Error fetching Brainly data:", error);
      interaction.reply({ content: "⚠️ Error fetching answers. Try again later.", ephemeral: true });
    }
  }
});

client.login(token);
