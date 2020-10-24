const { HTTP_STATUS_CODE_LIST, PATH } = require( '../misc/variables' );
const model = require( '../models/usuarios' );

module.exports = {    
    createUser: function( req, res ){
        res.setHeader( 'Content-Type', 'application/json' );

        try {
            //extrai os dados do corpo da requisição
            let body = '';                        
            req.on( 'data', chunk => {
                body += chunk.toString();
            });           
            
            //valida os dados extraídos
            req.on( 'end', ()=>{                
                const { nome, email } = { ...JSON.parse( body )};
                if( !nome || !email ){
                    res.statusCode = HTTP_STATUS_CODE_LIST.BAD_REQUEST.codeNumber;
                    res.end( JSON.stringify({ message: "Existem dados inválidos na sua requisição" }));
                }
                else{
                    let user = model.create({ nome, email });
                    res.statusCode = HTTP_STATUS_CODE_LIST.CREATED.codeNumber;
                    res.end( JSON.stringify( user ));
                }
            });
        } catch ( error ) {
            console.error( error );
            res.statusCode = HTTP_STATUS_CODE_LIST.INTERNAL_SERVER_ERROR.codeNumber;
            res.end( JSON.stringify({ message: "Erro Interno do Servidos."}));
        }
    },

    readUsers: function( req, res ){
        res.setHeader( 'Content-Type', 'application/json' );

        try { 
            let data = model.readAll();
            res.statusCode = HTTP_STATUS_CODE_LIST.OK.codeNumber;
            res.end( JSON.stringify( data ));
        }
        catch ( error ) {
            console.error( error );
            res.statusCode = HTTP_STATUS_CODE_LIST.INTERNAL_SERVER_ERROR.codeNumber;
            res.end( JSON.stringify({ message: "Erro Interno do Servidos."}));          
        }
    },

    readUserById: function( req, res ){
        res.setHeader( 'Content-Type', 'application/json' );

        try{
            //extrai o id da url 
            const id = req.url.split('/').pop();

            //busca pelo usuário
            const user = model.readById( id );
            if( user === null ){
                res.statusCode = HTTP_STATUS_CODE_LIST.OK.codeNumber;
                res.end( JSON.stringify({ message: "Nenhum usuário encontrado" }));
            }
            else{
                res.statusCode = HTTP_STATUS_CODE_LIST.OK.codeNumber;
                res.end( JSON.stringify({ user }));
            }
        }
        catch( error ){
            console.error( error );
            res.statusCode = HTTP_STATUS_CODE_LIST.INTERNAL_SERVER_ERROR.codeNumber;
            res.end( JSON.stringify({ message: "Erro Interno do Servidos."})); 
        }
    },

    updateUser: function( req, res ){
        res.setHeader( 'Content-Type', 'application/json' );

        try {
            //extrai a id da url
            const id = req.url.split('/').pop();
            
            //extrai os dados do corpo da requisição
            let body = '';
            req.on( 'data', chunk => {
                body += chunk.toString();
            });
            
            //valida os dados extraídos
            req.on('end', ()=>{
                let data = { ...JSON.parse( body )}; 
                let updated = model.update( id, data );
                if( updated ){
                    res.statusCode = HTTP_STATUS_CODE_LIST.OK.codeNumber;
                    res.end( JSON.stringify( updated ));
                }
                else{
                    res.statusCode = HTTP_STATUS_CODE_LIST.BAD_REQUEST.codeNumber;
                    res.end( JSON.stringify( { message: "Nenhum usuário atualizado." }));
                }
            });        
        } catch (error) {
            console.log( error );
            res.statusCode = HTTP_STATUS_CODE_LIST.INTERNAL_SERVER_ERROR.codeNumber;
            res.end( JSON.stringify({ message: "Erro Interno do Servidos."})); 
        }
    },
    deleteUser: function( req, res ){
        res.setHeader( 'Content-Type', 'application/json' );

        //extrai a id da url
        const id = req.url.split('/').pop();

        let deleted = model.delete( id );
        if( deleted ){
            res.statusCode = HTTP_STATUS_CODE_LIST.OK.codeNumber;
            res.end( JSON.stringify({ message: "Usuário apagado com sucesso.", usuario: deleted }));
        }
        else{
            res.statusCode = HTTP_STATUS_CODE_LIST.BAD_REQUEST.codeNumber;
            res.end( JSON.stringify( { message: "Nenhum usuário deletado." }));
        }

    }
}