const fs = require( 'fs' );

module.exports = {
    /**
     * 
     * @param { String } filename caminho e nome do arquivo de destino
     * @param { Object } data Objeto contendo os dados a serem salvos
     * @returns { boolean } status da operação, se foi ou não bem sucedida
     */
    saveToFile : function( filename, data ){        
        let success;
        fs.writeFileSync( filename, JSON.stringify( data ), 'utf8', error => {
            if ( error ) {
                console.error( error )
                success = false
            }
            else {
                success = true;
            }
        });
        return success;       
    },

    /**
     * 
     * @param { String } filename caminho e nome do arquivo de origem
     */
    readFromFile: function( filename ){
        return fs.readFileSync( filename, 'utf-8' );
    }
}