let namear = JSON.parse(localStorage.getItem('namearray'));

console.log(namear);
let details = [];
let elements1 = document.getElementById("battleGround");
elements1.innerHTML = '';

// displayig pokemon cards
let count = 0;
namear.forEach(pokemon => {
    const poke = document.createElement('div');
    poke.classList.add('poke');
    let PokeinnerHTML = `<div class="${pokemon.Name}">
                      <div class="pokeImg"><img src="${pokemon.Image}" style="height: 100%; width: 100%;object-fit: cover;"></div>
                      <div class="pokeDetails">
                        <div class="pokeName">${pokemon.Name}</div>
                      </div>
                      </div>`;
    if(count == 0){
        PokeinnerHTML+=`<div style="margin-left:150px;"><img src="vs.png" style="height: 200px;width:200px;margin-left:150px;"></div>`;
        count++;
    } 
    poke.innerHTML = PokeinnerHTML;                 
    elements1.appendChild(poke);
    fetchPokemonDetails(pokemon.Name);
});

// fetching pokemon details
async function fetchPokemonDetails(pokemonName) {
    console.log("hi");
    try {
        // Fetch basic Pokémon data
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        let pokemonData = await response.json();

        let movese = await Promise.all(
            pokemonData.moves.slice(0, 4).map(async move => {
                // Fetch detailed information about each move
                let moveResponse = await fetch(move.move.url);
                let moveData = await moveResponse.json();
                return{
                    name: moveData.name,
                    power: moveData.power || 0, // Handle null or undefined power
                    accuracy: moveData.accuracy || 100, // Handle null or undefined accuracy
                    type: moveData.type.name
                };
            })
        );

        // Extracting necessary details
        details.push({
            name: pokemonData.name,
            HP: pokemonData.stats[0].base_stat,
            Attack: pokemonData.stats[1].base_stat,
            Defense: pokemonData.stats[2].base_stat,
            Speed: pokemonData.stats[5].base_stat,
            moves: movese
        });

    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
    }
}
//function to calculate damage
async function damage(details ,i,j){
    console.log(details[i].name);
    if(details[i].name === namear[i].Name){
        const Attack = details[i].Attack;
        const Defense = details[j].Defense;
        const Speed = details[i].Speed;
        const Level = 50;
        let Damage = 0;
        for(let k=1; k<=5; k++){
            let max = 4;
            let randomInt = Math.floor(Math.random() * max);
            const movesPower = details[i].moves[randomInt].power;
            console.log('movespow:',movesPower);
            const display = document.getElementById("display");
            const attack = document.createElement('div');
            attack.innerHTML = `${details[i].name} used ${details[i].moves[randomInt].name} move against the opponent`;
            display.appendChild(attack);
            const movesAccuracy = details[i].moves[randomInt].accuracy;
            Damage += ((((2*Level)/5)+2)*(Attack/Defense)*movesPower*2*movesAccuracy*(Speed/100));
            console.log('Damage:',Damage);
        }
        return Damage;
    }
}

let Damage1 = 0;//damage on pokemon1
let Damage2 = 0;//damage on pokemon2
let prom;


async function fetchAllDetails() {
    try{
        let fetchPromises = namear.map(pokemon => fetchPokemonDetails(pokemon.Name));
        await Promise.all(fetchPromises);
        console.log('Fetched details:', prom);
        await calc_Damage_and_Winner();
    }catch (error){
        console.error("Error fetching Pokémon data:", error);
    }
}

// Call the function to fetch all details
fetchAllDetails();

//deciding the winner
async function calc_Damage_and_Winner(){
        Damage2 = await damage(details,0,1);
        Damage1 = await damage(details,1,0);
        if(Damage2 > Damage1){
            console.log(`The winner is ${details[0].name} with a damage of ${Damage1}`);
            const display = document.getElementById("display");
            const winner = document.createElement('div');
            winner.classList.add('winner');
            winner.innerHTML = `<div style="color: orange;">The winner is ${details[0].name} with a damage of ${Damage1}</div>`;
            display.appendChild(winner);
            //changing the color for the winner
            const change = document.querySelector(`.${details[0].name}`);
            change.style.background = 'linear-gradient(to bottom , red, blue)';
        }else{
            console.log(`The winner is ${details[1].name} with a damage of ${Damage2}`);
            const display = document.getElementById("display");
            const winner = document.createElement('div');
            winner.classList.add('winner');
            winner.innerHTML = `<div style="color: orange;">The winner is ${details[1].name} with a damage of ${Damage2}</div>`;
            display.appendChild(winner);
            //changing the color for the winner
            const change = document.querySelector(`.${details[1].name}`);
            change.style.background = 'linear-gradient(to bottom , red, blue)';
        }
}
