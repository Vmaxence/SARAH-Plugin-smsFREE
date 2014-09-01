exports.action = function(data, callback, config, SARAH) {
 	// On récupère la config
	var request = require('request');
	var config  = config.modules.smsFREE;
	if (!config.user && config.user != 'empty'){
		callback({ 'tts': 'Vous devez configurer le' });
		return;
	}
	if (!config.pass && config.pass != 'empty'){
		callback({ 'tts': 'Vous devez configurer le mot de passe' });
		return;
	}
	var tts     = "";
	var message = "empty";
	
	if( data.val ) {
		switch(data.val) {
			/**	ICI LES COMMANDES **/
			case "intrusion" : message = 'Intusion detecté'; tts = "Message envoyé"; break;
		}
	}
	if (typeof data.tts !== 'undefined') {
		message = data.tts;
	}

	if(message != 'empty') { 
		var url = "https://smsapi.free-mobile.fr/sendmsg?user="+ config.user +"&pass="+ config.pass +"&msg="+ message ;
		process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; //hack for https see http://stackoverflow.com/questions/9440166/node-js-https-400-error-unable-to-verify-leaf-signature
		request({ 'uri' : url }, function (err, response, body){
			if (err || response.statusCode != 200) {
				console.log(err);
				callback({'tts': "Je n'arrive pas contacter l'API free SMS, merci de vérifier la connexion"});
				return;
			} else {
				callback({'tts': tts});		
			}
		});
  } else {
		tts = "Erreur de commande";
	}
  callback({'tts': tts});
	return;
}