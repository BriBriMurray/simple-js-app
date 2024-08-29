let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150' ;
    let modalContainer = document.querySelector('#modal-container');


        function showLoadingMessage() {
            let loadingMessageElement = document.getElementById('loading-message');
                loadingMessageElement.style.display = 'block';
        }

        function hideLoadingMessage() {
            let loadingMessageElement = document.getElementById('loading-message');
            loadingMessageElement.style.display = 'none';
        }

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
                    'Height: ' + pokemon.height,
                    pokemon.imageUrl
                   );
            });
        }

        function showModal(title, text, img) {
            modalContainer.innerHTML = '';
    
            let modal = document.createElement('div');
            modal.classList.add('modal');
    
            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = "Close";
            closeButtonElement.addEventListener('click', hideModal);
    
            let pokemonName = document.createElement('h1');
            pokemonName.innerText = title;
    
            let pokemonHeight = document.createElement('p');
            pokemonHeight.innerText = text;
    
            let pokemonImage = document.createElement('img');
            pokemonImage.setAttribute('src', img);
            pokemonImage.setAttribute("width", "100%");
            pokemonImage.setAttribute("height", "100%");
    
            modal.appendChild(closeButtonElement);
            modal.appendChild(pokemonName);
            modal.appendChild(pokemonHeight);
            modal.appendChild(pokemonImage);
            modalContainer.appendChild(modal);
    
            modalContainer.classList.add('is-visible');
    
            modalContainer.addEventListener('click', (e) => {
                let target = e.target;
                if (target === modalContainer) {
                    hideModal();
                }
            });
        }
    
        function hideModal() {
            modalContainer.classList.remove('is-visible');
        }
    
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                hideModal();
            }
        });

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
