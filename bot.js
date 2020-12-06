require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

const USER_ROLE = 'Watermelon';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    checkIfWatermelonRoleExists(msg);
    reactWithWatermelon(msg);
    botReply(msg);
    helpWatermelonFarmer(msg);
});

const helpWatermelonFarmer = (msg) => {    
    if(msg.content === '!help-watermelon-farmer') {
        const role = msg.guild.roles.cache.find(x => x.name === USER_ROLE);
        msg.member.roles.add(role);
        msg.reply("Thanks for helping me out! Now whenever you type watermelon in a message I'll share my harvest with you. 🍉")
    }
};

const reactWithWatermelon = (msg) => {
    const isWatermelonRole = msg.member.roles.cache.map(x => x.name).indexOf(USER_ROLE) > -1;
    
    if (isWatermelonRole && msg.content.toLowerCase().indexOf("watermelon") > -1) {
        msg.react('🍉');
    } 
};
const botReply = (msg) => {
    if(msg.mentions.members.map(x => x.user.username).indexOf("Watermelon Farmer Bot") > -1) {
        msg.reply("looks like you asked for me, but I'm a little busy right now. I can use your help though! Message '!help-watermelon-farmer' to help me harvest watermelons.")
    } 
};

const checkIfWatermelonRoleExists = (msg) => {
    const role = msg.guild.roles.cache.find(x => x.name === USER_ROLE);
    if (role === undefined) {
        msg.guild.roles.create({
            data:{
            name:"Watermelon",
            color:"GREEN",
        },
        reason:"For people that like watermelon.",
        })
        .then(role => console.log(`Created new role with name ${role.name}`)) 
        .catch(console.error); //Handle an error
    } 
}

client.login(process.env.BOT_TOKEN);