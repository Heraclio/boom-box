const Discord = require('discord.js')
const config = require('./config.json')

const client = new Discord.Client({
  disableEveryone: true
});

client.on('ready', async () => {
  await client.user.setActivity('coyotl.tv', { type: 'WATCHING' });

  try {
    client.guilds.map(async guild => {
      const DEFAULT_ROLE_NAME = 'Boom-Box'

      let role = guild.roles.find(({ name }) => name === DEFAULT_ROLE_NAME);

      if (!role) {
        role = await guild.createRole({
          name: 'Boom-Box',
          color: 'PURPLE',
        })
      }

      const bot = guild.members.find(member => member.id === client.user.id)

      if (role && bot) {
        await bot.addRole(role);
      }
    })
  } catch (error) {
    console.log('An error has occured in assigning a default role to the bot.', error)
  }
});

client.on('guildMemberAdd', async member => {
  try {
    const channel = member.guild.channels.find(channel => channel.name === 'welcome');

    if (!channel) return;

    await channel.send(`Yo!!! Our very own ${member} just walked into the building!`)
  } catch (error) {
    console.log('Unable to send a message to guild.', error)
  }
});

client.login(config.token);
