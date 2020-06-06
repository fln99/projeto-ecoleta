function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]');

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(res => res.json())
    .then(states => {
        for(state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }
    });
}

populateUFs();

function getCities(event) {
    const citySelect = document.querySelector('[name=city]');
    const stateInput = document.querySelector('[name=state]');

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
    
    citySelect.innerHTML = '<option value>Selecione a cidade</option>';
    citySelect.disabled = true;

    fetch(url)
    .then(res => res.json())
    .then(cities => {
        for(city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
        }

        citySelect.disabled = false;
    });
}

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities);

// Itens de coleta.
// Recolhe todos os li's.
const itemsToCollect = document.querySelectorAll('.items-grid li');

for(item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem);
}

const collectedItems = document.querySelector('[name=items]');

let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target;
    
    // Remove ou adiciona uma classe, caso haja ou não.
    itemLi.classList.toggle('selected');

    const itemId = itemLi.dataset.id;

    console.log('Item ID: ', itemId);

    // Verifica se há itens selecionados, caso haja, recolhe o item selecionado:
    const alreadySelected = selectedItems.findIndex(item => item == itemId);

    // Se já estiver selecionado:
    if(alreadySelected >= 0) {
        // Remove da seleção;
        const filteredItems = selectedItems.filter(item => {
            const itemIsDiferent = item != itemId;
            return itemIsDiferent;
        });

        selectedItems = filteredItems;

    } else {
        // Caso contrário, será adicionado na seleção.
        selectedItems.push(itemId);
    }

    console.log('Selected Items: ', selectedItems);

    // Atualiza o input hidden com os itens selecionados (o que vai levar a informação ao backend).
    collectedItems.value = selectedItems;
}