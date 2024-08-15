let pokemonRepository = (function () {

    let repository = [
        { name: 'Bulbasaur', height: 2.4, types: ['grass, poison']},
        { name: 'Girafarig', height: 5, types: ['psychic']},
        { name: 'Hydrogenhydreigon', height: 6, types: ['dark']},
    ];
    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'height' in pokemon &&
            'types' in pokemon
        ) {
            repository.push(pokemon);
        } else {
            console.log('pokemon not found');
        }
    }
    function getAll() {
        return repository;
    }

    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button')
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
    }
    return{
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
    })();

    pokemonRepository.add({ name: 'Bulbasaur', height: 2.4, types: ['grass, poison'] });

    console.log(pokemonRepository.getAll())
    
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
