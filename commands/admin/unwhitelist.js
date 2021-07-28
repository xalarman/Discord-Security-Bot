const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args, con) => {

        try {
            if(message.channel.type === "dm") return;

            if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You are missing the permission(s) \`ADMINISTRATOR\`.`).catch(e => {});

            if (!args[0]) return message.channel.send(`Please define a user ID to remove.`).then(msg => {
                msg.delete({ timeout: 12000 })
                message.delete()
            }).catch(e => { if (client.config.debugmode) return console.log(e); });

                var founduser; 
                    if (message.mentions.users.first()) {
                        founduser = await client.users.fetch(message.mentions.users.first().id);
                    } else if (!isNaN(args[0])) {
                        founduser = await client.users.fetch(args[0]);
                    } else {
                        return message.channel.send("Please provide a user for me to remove, it can be a mention or id.").then(msg => {
                            msg.delete({ timeout: 12000 })
                            message.delete()
                        }).catch(e => { if (client.config.debugmode) return console.log(e);});
                    };

                    if (founduser == undefined) return message.channel.send(`That user was not found.`).then(msg => {
                        msg.delete({ timeout: 12000 })
                        message.delete()
                    }).catch(e => { if (client.config.debugmode) return console.log(e);});

                    await con.query(`SELECT * FROM whitelist WHERE userid="${founduser.id}" AND guildid='${message.guild.id}'`, async (err, row) => {
                        if(!row.length) return message.channel.send(`That user is not whitelisted in the database.`).then(msg => {
                            msg.delete({ timeout: 12000 })
                            message.delete()
                        }).catch(e => { if (client.config.debugmode) return console.log(e); });

                        await con.query(`DELETE FROM whitelist WHERE userid="${founduser.id}" AND guildid='${message.guild.id}'`, async (err, row) => {
                            const embed = new MessageEmbed()
                            .setColor(client.config.colorhex)
                            .setTitle(`Whitelist Removed!`)
                            .setDescription(`**Member:** ${founduser.tag}\n**Enforced By:** ${message.author.tag}`)
                            .setThumbnail(`${client.user.displayAvatarURL()}`)
                            .setTimestamp()
                            .setFooter(`${client.config.copyright}`)

                            message.channel.send(embed).then(msg => {
                                msg.delete({ timeout: 12000 })
                                message.delete()
                            }).catch(e => { if (client.config.debugmode) return console.log(e); });
                        });
                    });

        } catch (e) {
            console.log(e)
        }
}

exports.info = {
    name: "unwhitelist",
    description: "This is a command for the owner of the bot...",
    useAliases: true,
    aliases: ['deletewhitelist', 'removewhitelist', 'revokewhitelist']
}