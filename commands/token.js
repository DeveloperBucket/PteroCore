const messagePrompt = require('../extra/messagePrompt.js')
module.exports = {
    help: {
        name: 'login',
        aliases: ['settoken']
    },
    run: async (bot, message, args) => {
        let msg1;
        let msg2;
        try {
            msg1 = await message.author.send            ({
                embed: {
                    description: `Please enter your host(panel url) below. You have 60 seconds!`,
                    color: bot.color
                }
            })
        } catch (error) {
            message.channel.send({
                embed: {
                    description: `There was an error trying to dm you. Please **__open your dms__** to login!`,
                    color: bot.color
                }
            })
        }
        let hostmsg = await messagePrompt(msg1.channel, message.author, 60)
        if(!hostmsg) return message.author.send(`You took too long to reply with the required information, or replied with invalid information! Please retry!`)
        try {
            msg2 = await message.author.send({
                embed: {
                    description: `Please enter your token below. You can get one at ${hostmsg.content}${hostmsg.content.endsWith('/')? 'account/api' : '/account/api'}. You have 60 seconds!`,
                    color: bot.color
                }
            })
        } catch (error) {
            message.channel.send({
                embed: {
                    description: `There was an error trying to dm you. Please **__open your dms___** to continue!`,
                    color: bot.color
                }
            })
        }
        let tokenmsg = await messagePrompt(msg2.channel, message.author, 60)
        if(!tokenmsg) return message.author.send(`You took too long to reply with the required information, or replied with invalid information! Please retry.`)
        let host = hostmsg.content
        let token = tokenmsg.content
        bot.nodeClient.login(host, token, (loggedIn, err) => {
            if (loggedIn) {
                msg2.channel.send({
                    embed: {
                        description: `Successfully logged!`,
                        color: bot.color
                    }
                })
                bot.db.tables.hosts.set(message.author.id, host)
                bot.db.tables.tokens.set(message.author.id, token)
            } else {
                msg.channel.send({
                    embed: {
                        description: `Host or Token you provided is invalid!`,
                        color: bot.color
                    }
                })
            }
        })

    }
}