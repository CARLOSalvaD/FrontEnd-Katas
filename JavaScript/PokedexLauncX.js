const pkmCard = document.querySelector('[data-pkmCard]');
const pokeName = document.querySelector('[data-pokeName]');
const pkmImg = document.querySelector('[data-pkmImg]');
const imgContainer = document.querySelector('[data-imgContainer]');
const pkmId = document.querySelector('[data-pkmId]');
const pkmTypes = document.querySelector('[data-pkmTypes]');
const pkmStats = document.querySelector('[data-pkmStats]');

const searchPokemon = event => {
    event.preventDefault();
    const {value} = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPkmData(response))
        .catch(err => renderNotFound())
}

const renderPkmData = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types } = data;

    pokeName.textContent = data.name;
    pkmImg.setAttribute('src', sprite);
    pkmId.textContent = `Nº ${data.id}`;
    setCardColor(types);
    renderPkmTypes(types);
    renderPokemonStats(stats);
}

const setCardColor = types => {
    const colorA = typeColors[types[0].type.name];
    const colorB = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pkmImg.style.background =  `radial-gradient(${colorB} 50%, ${colorA} 50%)`;
    pkmImg.style.backgroundSize = ' 5px 5px';
}

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#800080',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const renderPkmTypes = types =>{
    pkmTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pkmTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pkmStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pkmStats.appendChild(statElement);
    })
}

const renderNotFound = () => {
    pokeName.textContent = "No encontrado";
    pkmImg.setAttribute ('src', 'Cubone-pkm.png');
    pkmImg.style.background = '#DA627Df';

}