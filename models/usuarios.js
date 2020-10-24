const dataPath = './data/usuarios.json';
const jsonData = require( '../data/usuarios.json' );
const { saveToFile, readFromFile } = require( '../misc/helpers' );


module.exports = {
    create: function( data ){        
        data.id = jsonData.length <= 0 ? 1 : jsonData[ jsonData.length - 1].id + 1;
        jsonData.push( data );
        
        saveToFile( dataPath,  jsonData );
        return this.readById( data.id );
    },

    readAll: function(){
        return JSON.parse( readFromFile( dataPath ))      
    },
    readById: function( id ){
        const usuarios = JSON.parse( readFromFile( dataPath ));
        let match = usuarios.find( usuario => usuario.id == id );
        if( match ) return match
        else return null;        
    },

    update: function( id, data ){
        //verifica se existe um usuário com a id passada na base de dados
        const usuarios = JSON.parse( readFromFile( dataPath ));
        let index = usuarios.findIndex( user => user.id == id );
        
        if( index >= 0 ){
            //Se for encontrado, atualiza e salva o usuário
            for( let key in usuarios[index] ){
                if( data.hasOwnProperty( key )){
                    usuarios[index][ key ] = data[ key ];
                }                
            }
            saveToFile( './data/usuarios.json',  usuarios );
            return usuarios[ index ];
        } 
        else {
            return null;
        }
    },
    delete: function( id ){
        //carrega o arquivo contendo a lista de usuarios
        const usuarios = JSON.parse( readFromFile( dataPath ));

        //busca na lista um usuario com a id passada
        let index = usuarios.findIndex( user => user.id == id );

        //se existir na lista, apaga e retorna o usuario apagado
        if( index >= 0 ){
            //guarda o usuario em uma variável
            let userDeleted = usuarios[index];

            //remove da lista
            usuarios.splice( index, 1 );

            //salva a lista no arquivo
            saveToFile( dataPath, usuarios );

            //retorna o usuario que foi apagado 
            return userDeleted;
        }
        else {
            return null;
        }      
    }
}