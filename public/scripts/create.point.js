

function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados"
        ).then( (res) => {return res.json()}) //funcão vazia com return 
        .then( states => {
            for(const state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }            
        })
}
populateUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios
    `
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( (res) => {return res.json()}) //funcão vazia com return 
    .then( cities => {
        
            for(const city of cities){
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false            
        })
}

document
.querySelector("select[name=uf]")
.addEventListener("change",getCities)

// Itens de coleta
// Pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click",handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items")

//acrescentar valor no input Js

let selectedItems = []



function handleSelectedItem(event){
    // adicionar ou remover uma classe em javascript
    const itemLi = event.target
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    // console.log('ITEM ID', itemId)

    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados 
    const alreadySelected = selectedItems.findIndex(function(item){
        const itemFound = item == itemId  //retonara true ou false
        return itemFound
    })

    // se estiver selecionado, tirar da seleção
    if(alreadySelected >= 0){
        // tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else {
        // se não estiver selecionado, adicionar a seleção
        selectedItems.push(itemId)
    }

    // console.log('selectedItems: ', selectedItems)


    // atualiazar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems       
    
    
}

