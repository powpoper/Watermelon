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


});



const reactWithWatermelon = (msg) => {
    if (msg.content.toLowerCase().indexOf("watermelon") > -1) {
        msg.react('🍉');
      }
};
const botReply = (msg) => {
    if(msg.mentions.members.map(x => x.user.username).indexOf("Watermelon Farmer Bot") > -1) {
        msg.reply("looks like you asked for me. If you need me just type watermelon in a message.")
    }
};

const checkIfWatermelonRoleExists = (msg) => {
    let role = msg.guild.roles.cache.find(x => x.name === USER_ROLE);
    console.log(role)
    console.log(typeof role)
    if (role === undefined) {
        console.log(true)
        msg.guild.roles.create({
            data:{
            name:"Watermelon",
            color:"GREEN",
        },
        reason:"For people that like watermelon.",
        })
        .then(role => console.log(`Created new role with name ${role.name}`)) //What to do when it has been created
        .catch(console.error); //Handle an error
    } 
}
client.login(process.env.BOT_TOKEN);