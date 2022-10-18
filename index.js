//consts
const anxeb = require('anxeb-node');
const axios = require('axios');
require('dotenv').config();
// server
const data =  {
    "nombre": "raymond",
    "apellido" : "Gomez",
    "numero": "5",
    "curso" : "6toE",
    "contactos" :{
        "NumeroTel": "829-786-5060",
        "Correo": "semiglock123@gmail.com",
        "Github": ["1","2","3"]
    }
};
let server = new anxeb.Server({
	name        : 'Simple Server',
	description : 'Simple Server Example',
	key         : 'server',
	settings    : {
		root : __dirname,
		log  : {
			identifier : '[server_name]'
		}
	},
	services    : {
		api : {
			domain   : 'examples.anxeb.com',
			name     : 'Basic Service',
			key      : 'api',
			active   : true,
            version: '1.0.0',
			settings : {
				log     : {
					identifier : '[service_name]'
				},
				socket  : {
					host : '127.0.0.1',
					port : process.env.PORT || 8000
				},
				routing : {
					routes : {
						index : {
							url     : '/',
							access  : anxeb.Route.access.public,
							timeout : 1000,
							methods : {
								post : (context) => {
									axios.post('http://172.25.52.25:3000/users', data).then((response) => {
										console.log(response);
										context.send(response.data);
									}).catch((error) => {
										console.log(error);
										context.status(500).send(error);
									});
								}
							}
						},
						data : {
							url     : '/data',
							access  : anxeb.Route.access.public,
							timeout : 1000,
							methods : {
								get : (context) => {
									context.send(data);
								}
							}
						}
					}
				}
			}
		}
	}
});
server.start();