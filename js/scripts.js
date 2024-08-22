let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150' ;

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'detailsUrl' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('pokemon not found');
        }
    }
    function getAll() {
        return pokemonList;
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

        function loadList() {
            return fetch(apiUrl).then(function (response) {
                return response.json();
            }).then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
            }).catch(function (e) {
                console.error(e);
            })
        }
    return{
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList
    };
    })();

    pokemonRepository.add({ name: 'Bulbasaur', height: 2.4, types: ['grass, poison'] });

    // console.log(pokemonRepository.getAll())
    
    pokemonRepository.loadList().then(function() { 
        pokemonRepository.getAll().forEach(function (pokemon) {
            pokemonRepository.addListItem(pokemon);
    }); 
    });
