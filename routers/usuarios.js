const controller = require( '../controllers/usuarios' );
const { HTTP_STATUS_CODE_LIST, PATH } = require( '../misc/variables' );

const pathWithoutParamsRegExp = new RegExp( `^${ PATH.usuarios }\/{0,1}$` );
const pathWithIdRegExp = new RegExp( `^${ PATH.usuarios }\/[0-9]{1,16}$` );

module.exports = { 
    'POST': function( req, res ){        

        //@rota POST /api/usuario
        //@descrição Cria um novo usuario na bd
        if( req.url.match( pathWithoutParamsRegExp )){

            //invoca o controller para fazer a requisição na bd 
            controller.createUser( req, res );
        }
        else {
            res.setHeader( 'Content-Type', 'application/json' );
            res.statusCode = HTTP_STATUS_CODE_LIST.NOT_FOUND.codeNumber;
            res.end( JSON.stringify({ message: "Rota não encontrada"}));
        }
    },
    'GET': function( req, res ){   

        //@rota GET /api/usuarios  
        //@descrição Busca todos os usuários na base de dados
        if( req.url.match( pathWithoutParamsRegExp )){
            //invoca o controller para fazer a requisição na bd        
            controller.readUsers( req, res );
        }

        //@rota GET /api/usuarios/:id
        //@descrição busca um usuário na base de dados pelo número da ID
        else if( req.url.match( pathWithIdRegExp )){
            //invoca o controller para fazer a requisição na bd
            controller.readUserById( req, res );   
        }

        else {
            res.setHeader( 'Content-Type', 'application/json' );
            res.statusCode = HTTP_STATUS_CODE_LIST.NOT_FOUND.codeNumber;
            res.end( JSON.stringify({ message: "Rota não encontrada"}));
        }
    },
    'PATCH': function( req, res ){        

        //@rota PATCH /api/usuario
        //@descrição Atualiza um usuário na bd
        if( req.url.match( pathWithIdRegExp )){
            //invoca o controller para fazer a requisição na bd
            controller.updateUser( req, res ); 
        }
        else {
            res.setHeader( 'Content-Type', 'application/json' );
            res.statusCode = HTTP_STATUS_CODE_LIST.NOT_FOUND.codeNumber;
            res.end( JSON.stringify({ message: "Rota não encontrada"}));
        }
    },
    'DELETE': function( req, res ){        

        //@rota DELETE /api/usuario
        //@descrição Apaga um usuário na bd
        if( req.url.match( pathWithIdRegExp )){
            //extrai a id da url
            const id = req.url.split('/').pop();

            //invoca o controller para fazer a requisição na bd
            controller.deleteUser( req, res );
        }
        else {
            res.setHeader( 'Content-Type', 'application/json' );
            res.statusCode = HTTP_STATUS_CODE_LIST.NOT_FOUND.codeNumber;
            res.end( JSON.stringify({ message: "Rota não encontrada"}));
        }
    }    
} 