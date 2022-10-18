const anxeb = require('anxeb-node');
const Server = anxeb.Server;

let server = new Server({
	name        : 'Simple Server',
	description : 'Simple Server Example',
	key         : 'server',
	settings    : {
		root : __dirname,
		log  : {
			identifier : '[server_name]'
		}
	},
	structure   : {
		services : '/services'
	}
});

server.start();