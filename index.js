"use strict";
const ytdl = require('ytdl-core');
var opus = require('opusscript');
var fs = require('fs');
const Discord = require('discord.js');

const bot = new Discord.Client();
const client = new Discord.Client();

var nb_play = 0;
var nb_stop = 0;

var commandList = fs.readFileSync('Storage/commands.txt', 'utf8');
var user_without_command = [];

bot.login('MzU2NzAzMjU3MjQwMDEwNzUy.DJfOww.r6rVGaf6B0oWnJlmc5aVGONwCHU');

bot.on('ready', () => {
  bot.user.setPresence({game: {name:'ON M\'APPELLE L\'OVNI', type: 0}});
  console.log('OVNI est prêt!');
});

bot.on('message', message => {
	var mess = (message.content).split(" ")
	var i = 0
	for(i; i<mess.length; i++){
		// On vérifie que l'auteur du message n'est pas le bot lui même, cela évite que le bot ne se réponde à lui même.
		if(message.author != "EL OVNI."){

			if (mess[i].toLowerCase() === 'damn') {
				message.channel.send('Pouaille aïe aïe')
				message.channel.send('https://media.giphy.com/media/UJW0Z1VH42rcs/giphy.gif')
			}

			if (mess[i].toLowerCase() === 'wtf') {
				message.channel.send('WHAT THE FUCK ARE YOU DOING ? Je dois supprimer le serveur, c\'est ça ?')
				message.channel.send('https://media.giphy.com/media/LyJ6KPlrFdKnK/giphy.gif')
			}
		}
	}

	if (message.content.charAt(0) == '!')
	{
		// On récupère les arguments de la commande 
	    let args = message.content.split(' ')
		if(message.content.startsWith('!play') || message.content.startsWith('!stop'))
        {
        	nb_play += 1
			// On récupère l'id du channel dans lequel se trouve l'utilisateur ayant fait appel à la commande.
			var voiceChannelID = message.author.lastMessage.member.voiceChannelID
			var mess = message.content
			var split_mess = mess.split(" ")
			var commande = split_mess[0]
			var author = message.author
			message.delete()
			// On récupère le channel dans lequel on souhaite envoyer le message d'historique de commande.
			var channel = message.guild.channels.get("356708051073368064")
			channel.send("L'utilisateur " + author + "  a utilisé la commande " + commande)
		    // On récupère le channel audio dans lequel se trouve l'utilisateur ayant lancé la commande, afin que le bot se connecte au bon channel audio.
		    let voiceChannel = message.guild.channels.get(voiceChannelID)
		    // On rejoint le channel audio
		    if(voiceChannel != undefined)
		    {
			    voiceChannel
			      .join()
			      .then(function (connection) {
			      	if(mess.startsWith('!stop')){
			        	connection.disconnect();
			        	nb_play = 0;
			        	return;
			        }
			        // On instancie la variable stream pour créer la connexion avant utilisation.
			        let stream
			        // On attribue le bon url en fonction de la commande lancée.
		        	if(args[1] == "gay")
		        	{
		        		stream = ytdl("https://www.youtube.com/watch?v=YaG5SAw1n0c", {filter : 'audioonly'})
		        	}
		        	else if(args[1] == "defused")
		        	{
		        		stream = ytdl("https://www.youtube.com/watch?v=7kueKnFVmKQ", {filter : 'audioonly'})
		        	}
		        	else if(args[1] == "planted")
		        	{
		        		stream = ytdl("https://www.youtube.com/watch?v=llCmtgvIqcY", {filter : 'audioonly'})
		        	}
		        	else if(args[1] == "connerie")
		        	{
		        		stream = ytdl("https://www.youtube.com/watch?v=ZMKB7KUq7zE", {filter : 'audioonly'})
		        	}
		        	else if(args[1] == "defusing")
		        	{
		        		stream = ytdl("https://www.youtube.com/watch?v=rEBjIfe7yjI", {filter : 'audioonly'})
		        	}
		        	else
		        	{
		        		stream = ytdl(args[1], {filter : 'audioonly'})
		        	}
		        	// Message d'erreur.
			        stream.on('error', function () {
			          message.reply("Je n'ai pas réussi à lire ta vidéo, sale fils de pute. Fait un effort, t'as été bercé trop près du mur ou quoi ?")
			          // Si erreur il y a, il faut couper la connexion.
			          connection.disconnect()
			        })
			        // On envoie le stream au channel audio
			        if(nb_play == 1){
				        connection
				          .playStream(stream)
				          .on('end', function () {
				          	// Ne pas oublier de couper la connexion à la fin du stream.
				            connection.disconnect()
				            // On repasse le nb_play à zéro pour remettre en route la possibiltié d'utiliser la commande.
				            // Voir pour mettre en place une file d'attente.
				            nb_play = 0;
				          })
				    }
				    else{
				    	message.channel.send('' + author + " une lecture est déjà en cours, fils de pute. Attends la fin, c'est terrible ça, t'es con ou quoi ?")
				    }
		    	})
			}
			else
			{
				message.channel.send("Putain mais t'as une case en moins ? T'es connecté à aucun channel audio, comment tu veux que je lances ton truc la, hein ?");
				nb_play = 0;
				return;
			}
        }
        else if(message.content.startsWith('!help') || message.content.startsWith('!help.'))
		{
			message.delete()
			message.channel.send(commandList);
		}
    }
});
	