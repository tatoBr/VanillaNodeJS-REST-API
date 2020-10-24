const http = require( 'http' ); 
const PORT = process.env.PORT || 8888;

const { HTTP_STATUS_CODE_LIST, PATH } = require( "./misc/variables" );

//importando routers
let usuarioRouter = require( './routers/usuarios' );
Object.freeze( usuarioRouter );


const server = http.createServer( ( req, res )=>{ 
    //**************ROTAS USUÁRIO*************
    if( req.url.match( new RegExp( `^${ PATH.usuarios }\/*` ))){
        if( usuarioRouter.hasOwnProperty( req.method )){        
            usuarioRouter[ req.method ]( req, res );
        }
        else{
            res.setHeader( 'Content-Type', 'application/json' );
            res.statusCode = HTTP_STATUS_CODE_LIST.BAD_REQUEST.codeNumber;
            res.end( JSON.stringify({ message: 'Verbo HTTP inválido para essa rota'}))
        }
    }       
    else{
        res.statusCode = HTTP_STATUS_CODE_LIST.OK.codeNumber;
        res.setHeader("Content-Type", "text/html");//content-type - descreve o tipo dos dados contido no corpo da resposta
        res.write( "<h1>Vanila Node.js Rest API</h1>" ); //escreve os dados no corpo da resposta
        res.end();//sinaliza para o servidor que todas as respostas (body e headers) já foram enviadas
    }
});

server.listen( PORT, ()=>console.log( `Servidor rodando na porta ${ PORT }` ));