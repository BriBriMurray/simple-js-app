let pokemonRepository = (function () {

    let pokemonList = [
        { name: 'Bulbasaur', height: 2.4, types: ['grass, poison']},
        { name: 'Girafarig', height: 5, types: ['psychic']},
        { name: 'Hydrogenhydreigon', height: 6, types: ['dark']},
    ];
    pokemonList.forEach(function(pokemon) { 
        console.log(pokemon.name + 'Height:' + pokemon.height)
        if (pokemon.height > 5) {
            document.write ('WOW! That is big!');
        }
    });
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
    