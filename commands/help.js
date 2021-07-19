let {RichEmbed} = require('discord.js')
module.exports = {
    help: {
        name: 'help',
        aliases: ['?']
    },
    run: async (bot, message, args) => {
        let HelpEmbed = new RichEmbed()
        .setTitle('PteroCore Help')
        .setColor(bot.color)
        .setURL('')
        .addField(`Commands`, `${bot.prefix}help - Shows this embed
        ${bot.prefix}login - Sets your api token and host
        ${bot.prefix}logout - Removes your token and host from the database
        ${bot.prefix}start <serverid>- Starts the server
        ${bot.prefix}stop <serverid> - Stops the server
        ${bot.prefix}restart <serverid> - Restarts the server
        ${bot.prefix}kill <serverid> - Kills the server
        ${bot.prefix}sendcommand <serverid> <command> - Sends a command to the server
        ${bot.prefix}servers - Shows your servers
        ${bot.prefix}serverinfo <serverid> - Shows info about the server`)
        .setFooter(`Requested by ${message.author.tag}`)
        .setTimestamp()
        message.channel.send(HelpEmbed)
    }
}
