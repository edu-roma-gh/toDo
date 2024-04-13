const inputField = document.getElementById('noteInput')
const listContainer = document.getElementById('listContainer')
const addToDoButton = document.getElementById('addToDo')
const removeBtn = document.getElementById('removeBtn')
const displayTime = document.getElementById('displayTime')
id = 1;

let toDos = []
if (localStorage.getItem('toDo')) {
  toDos = JSON.parse(localStorage.getItem('toDo'))
  
}
console.log(toDos)

setInterval(() => {
  let dayAndTime = new Date();
  displayTime.innerHTML = ` ${dayAndTime.toLocaleTimeString()}`
}, 1000);

function addToDo(toDo) {
  if (inputField.value === '') {
    addToDoButton.classList.add('errorBtn')
  } else {

    let postsCont = document.createElement('div');
    postsCont.classList.add('notesCont')
    listContainer.appendChild(postsCont);

    let nameInfo = document.createElement('div')
    nameInfo.classList.add('nameInfo')
    postsCont.appendChild(nameInfo)
  
    let checkedH2 = document.createElement('h2')
    checkedH2.classList.add('checked')  
    checkedH2.innerText = inputField.value
    nameInfo.appendChild(checkedH2)
    inputField.value = ''
  
    let timeInfoDiv = document.createElement('div')
    timeInfoDiv.classList.add('timeInfo')
    nameInfo.appendChild(timeInfoDiv)
  
    let timeInfo = document.createElement('h3')
    timeInfo.id = 'currentTime'
    let d = new Date();
    timeInfo.innerHTML = `<p>Posted On:</p> ${d.toLocaleTimeString()}`
    timeInfoDiv.appendChild(timeInfo)
  
    let checkAndDeleteDiv = document.createElement('div')
    checkAndDeleteDiv.classList.add('checkAndDelete')
    postsCont.appendChild(checkAndDeleteDiv)
  
    let checkboxInput = document.createElement('input')
    checkboxInput.type = 'checkbox'
    checkAndDeleteDiv.appendChild(checkboxInput)
    checkboxInput.addEventListener('click', ()=>{
      checkedH2.style.textDecoration = 'line-through'
    })
  
    let deleteImg = document.createElement('img')
    deleteImg.src = './assets/pictures/deleteIcon.png'
    checkAndDeleteDiv.appendChild(deleteImg)
    deleteImg.addEventListener('click', () =>{
      const parent = postsCont.parentNode;
      parent.removeChild(postsCont)
    })

    const toDo = {
      id: id,
      title: checkedH2.innerText,
      time: timeInfo.innerText
    }
    id++
    toDos.push(toDo)
    localStorage.setItem('toDo', JSON.stringify(toDos))
    addToDo(toDo)

  }
}
  