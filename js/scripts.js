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
        listItem.classList.add('list-group-item');

        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn', 'btn-primary', 'btn-fixed-width', 'btn-custom-color');
        pokemonButton.setAttribute('data-toggle', 'modal');
        pokemonButton.setAttribute('data-target', '#pokemonModal');
        
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        
        button.addEventListener('click', function(event) {
        pokemonRepository.showDetails(pokemon);
        })
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
                    console.log(pokemon)
                });
            }).catch(function (e) {
                console.error(e);
            })
        }

        function loadDetails(item){ 
            let url = item.detailsUrl;
            return fetch(url).then(function (response) {
                return response.json();
            }).then(function (details) {
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types;
            }).catch(function (e) {
                console.error(e);
            });
        }        

        function showDetails(pokemon) {
            loadDetails(pokemon).then(function () {
                showModal(
                    pokemon.name, 
                    `Height:  + ${pokemon.height}`,
                    pokemon.imageUrl
                   );
            });
        }

        function showModal(title, text, imageUrl) {
            let modalTitle = document.querySelector('.modal-title');
            let modalBody = document.querySelector('.modal-body');
            let modalImage = document.querySelector('.pokemon-image');
            let modalDetails = document.querySelector('.pokemon-details');
        
            modalTitle.innerText = title;
            modalImage.src = imageUrl;
            modalDetails.innerText = text;
          }


    return{
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
    })();

    pokemonRepository.loadList().then(function() { 
        pokemonRepository.getAll().forEach(function (pokemon) {
            pokemonRepository.addListItem(pokemon);
    }); 
    });
