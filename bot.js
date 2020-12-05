require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    reactWithWatermelon(msg);
    botReply(msg);
    if(msg.mentions.members.size){
        console.log(msg.mentions.members);
        console.log(msg.mentions.members.find(x => x.user === 'Watermelon Farmer Bot'))
    }
    const guild = new Discord.Guild(client,null);
});



const reactWithWatermelon = (msg) => {
    if (msg.content.toLowerCase().indexOf("watermelon") > -1) {
        msg.react('🍉');
      }
};
const botReply = (msg) => {
    if(msg.content.indexOf('<@Watermelon Farmer Bot>') > -1){
        msg.reply("Sorry I'm a little busy harvesting. Just you need me just say watermelon.")
    }
};
client.login(process.env.BOT_TOKEN);