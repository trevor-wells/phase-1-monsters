const forward = document.getElementById("forward")
const backward = document.getElementById("backward")
const monsterForm = document.getElementById("monster-form")
const monsterContainer = document.getElementById("monster-container")
let pageNumber = 1
fetchMonsters()

monsterForm.addEventListener("submit", addNewMonster)

backward.addEventListener("click", () => {
    if (pageNumber > 1)
        pageNumber--
    fetchMonsters()
})
forward.addEventListener("click", () => {
    pageNumber++
    fetchMonsters()
})

function fetchMonsters(){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then(response => response.json())
    .then(data => {
        monsterContainer.innerHTML = ""
        data.forEach(createMonsterCard)
    })
}

function createMonsterCard(monster){
    const monsterCard = document.createElement("div")
    const monsterName = document.createElement("h1")
    const monsterAge = document.createElement("h3")
    const monsterDesc = document.createElement("p")
    monsterName.textContent = monster.name
    monsterAge.textContent = "Age: " + monster.age
    monsterDesc.textContent = monster.description
    monsterCard.append(monsterName,monsterAge,monsterDesc)
    monsterContainer.append(monsterCard)
}

function addNewMonster(event){
    event.preventDefault()
    const newMonster ={
        name: event.target.children[1].value,
        age: event.target.children[3].value,
        description: event.target.children[5].value
    }
    postNewMonster(newMonster)
}

function postNewMonster(newMonster){
    fetch(`http://localhost:3000/monsters` , {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newMonster)
    })  
}
