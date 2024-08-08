let pokemonRepository = (function () {

    let pokemonList = [
        { name: 'Bulbasaur', height: 2.4, types: ['grass, poison']},
        { name: 'Girafarig', height: 5, types: ['psychic']},
        { name: 'Hydrogenhydreigon', height: 6, types: ['dark']},
    ];
    function getAll() {
        return pokemonList;
    }
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    return{
        getAll: getAll,
        add: add
    };
    })();
    
    pokemonRepository.getAll().forEach(funtion(pokemon) {
        document.write( pokemon.name + ' (height: ' + pokemon.height + ')');
        if (pokemon.height > 5) {
            document.write (' Wow! That\'s big!');
        }
    });



