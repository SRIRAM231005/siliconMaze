const pokemonData = [
    {
      name: "bulbasaur",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      cry: "https://pokemoncries.com/cries/1.mp3"
    },
    {
      name: "ivysaur",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
      cry: "https://pokemoncries.com/cries/2.mp3"
    },
    {
      name: "venusaur",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      cry: "https://pokemoncries.com/cries/3.mp3"
    },
    {
      name: "charmander",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
      cry: "https://pokemoncries.com/cries/4.mp3"
    },
    {
      name: "charmeleon",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
      cry: "https://pokemoncries.com/cries/5.mp3"
    },
    {
      name: "charizard",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
      cry: "https://pokemoncries.com/cries/6.mp3"
    },
    {
      name: "squirtle",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
      cry: "https://pokemoncries.com/cries/7.mp3"
    },
    {
      name: "wartortle",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
      cry: "https://pokemoncries.com/cries/8.mp3"
    },
    {
      name: "blastoise",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
      cry: "https://pokemoncries.com/cries/9.mp3"
    },
    {
      name: "caterpie",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
      cry: "https://pokemoncries.com/cries/10.mp3"
    },
    {
      name: "metapod",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png",
      cry: "https://pokemoncries.com/cries/11.mp3"
    },
    {
      name: "butterfree",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
      cry: "https://pokemoncries.com/cries/12.mp3"
    },
    {
      name: "weedle",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png",
      cry: "https://pokemoncries.com/cries/13.mp3"
    },
    {
      name: "kakuna",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png",
      cry: "https://pokemoncries.com/cries/14.mp3"
    },
    {
      name: "beedrill",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png",
      cry: "https://pokemoncries.com/cries/15.mp3"
    }
  ];
  
  console.log(pokemonData);
  

let elements = document.getElementById("body");
elements.innerHTML = '';

pokemonData.forEach(pokemon => {
    const poke = document.createElement('div');
    poke.classList.add('poke');
    poke.innerHTML = `<div class="${pokemon.name}">
                      <div>
                      <div class="pokeImg"><img src="${pokemon.image}" style="height: 100%; width: 100%;object-fit: cover;" onclick="fetchPokemonDetails('${pokemon.name}');"></div>
                      <div class="pokeDetails">
                        <div class="pokeName">${pokemon.name}</div>
                        <div class="pokeCry"><button class="pokemon-button" data-cry="${pokemon.cry}">PokeCry</button><button onclick=" message=document.querySelector('.${pokemon.name}');design(message , '${pokemon.name}' , '${pokemon.image}');" style="margin-left: 10px;">Battle</button></div>
                      </div>
                      </div>
                      </div>`;
    elements.appendChild(poke);
});
const buttons = document.querySelectorAll('.pokemon-button');

// Add event listeners to each button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the cry sound URL from the button's data attribute
        const cryUrl = button.getAttribute('data-cry');

        // Create a new audio object and play the sound
        const crySound = new Audio(cryUrl);
        crySound.play();
    });
});

// Function to fetch basic Pokémon data and additional details
async function fetchPokemonDetails(pokemonName) {
    console.log("hi");
    try {
        // Fetch basic Pokémon data
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        let pokemonData = await response.json();

        // Fetch additional species details for more information
        let speciesResponse = await fetch(pokemonData.species.url);
        let speciesData = await speciesResponse.json();

        // Extracting necessary details
        let details = {
            name: pokemonData.name,
            height: pokemonData.height / 10 + " meters",  // Convert decimeters to meters
            weight: pokemonData.weight / 10 + " kg",      // Convert hectograms to kilograms
            baseStats: {
                HP: pokemonData.stats[0].base_stat,
                Attack: pokemonData.stats[1].base_stat,
                Defense: pokemonData.stats[2].base_stat,
                Speed: pokemonData.stats[5].base_stat
            },
            abilities: pokemonData.abilities.map(ability => ability.ability.name),
            moves: pokemonData.moves.slice(0, 4).map(move => move.move.name), // Fetching first 4 moves
            color: speciesData.color.name,
            shape: speciesData.shape.name,
          // Location data can be fetched separately
            eggGroups: speciesData.egg_groups.map(group => group.name)
        };

        console.log(details);

        // this is dialogue where all the remaining ditails will be shown after clicking on the image
        let dialogue = document.querySelector('.d');
        if(! dialogue){
            const body = document.body;
            dialogue = document.createElement('dialog');
            dialogue.classList.add('d');
            body.appendChild(dialogue);
        }
        dialogue.innerHTML = `<div>
                                <ul>
                                    <li>${details.name}</li>
                                    <li>${details.height}</li>
                                    <li>${details.weight}</li>
                                    <li>${details.baseStats}
                                        <ul>
                                            <li>HP: ${details.baseStats.HP}</li>
                                            <li>Attack: ${details.baseStats.Attack}</li>
                                            <li>Defense: ${details.baseStats.Defense}</li>
                                            <li>Speed: ${details.baseStats.Speed}</li>
                                        </ul>
                                    </li>
                                    <li>${details.abilities}</li>
                                    <li>${details.moves}</li>
                                    <li>${details.color}</li>
                                    <li>${details.shape}</li>
                                    <li>${details.eggGroups}</li>
                                </ul>
                                <div style="display: flex; align-items: center;justify-content: space-between;">
                                    <button onclick="Close();">Close</button>
                                </div>
                              </div>`;
        dialogue.showModal();
    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
    }
}

// Example usage
//fun to showmodal
function showmodal(){
    document.querySelector('.d').showModal();
}
// function to close modal
function Close(){
    const dialogue = document.querySelector('.d');
    if(dialogue){
        dialogue.close();
    }
} 
//function to put the names of the selected pokemon in an array for the battle
let count = 0;
let namearray = [];
function design(message , name , image){
    if(count<2){
        namearray.push({Name: name,Image: image});
        message.style.border = '2px solid red';
        message.style.borderRadius = '20px';
        count++;
    }
    if(count == 2){
        localStorage.setItem('namearray', JSON.stringify(namearray));
        window.location.href = 'battle.html';
    }
}