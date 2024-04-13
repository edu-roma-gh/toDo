const inputField = document.getElementById('noteInput')
const listContainer = document.getElementById('listContainer')
const addToDoButton = document.getElementById('addToDo')
const removeBtn = document.getElementById('removeBtn')
const displayTime = document.getElementById('displayTime')
id = 1;

let toDos = []
if (localStorage.getItem('toDo')) {
  toDos = JSON.parse(localStorage.getItem('toDo'))
  toDos.map(toDo => {
    renderTodo(toDo)
  })
}
function setTime() {
  let dayAndTime = new Date();
  displayTime.innerHTML = ` ${dayAndTime.toLocaleTimeString()}`
}
setTime()
setInterval(setTime, 1000);

function handleToggleCheck(e) {
  const todoId = e.target.id;
  const isChecked = e.target.checked;
  const h2 = document.getElementById(`title-${todoId}`);
  h2.classList.toggle('markedDone')
  const updatedTodosList = toDos.map(todo => {
    if (todoId == todo.id) {
      const updated = {...todo, done: isChecked}
      return updated
    }
    return todo;
  })
  localStorage.setItem('toDo', JSON.stringify(updatedTodosList))
}

function handleDeleteTodo(e) {
  e.target.parentNode.parentNode.remove()
  const input = e.target.parentNode.querySelector('input')
  const updatedTodos = toDos.filter(todo => {
    if (todo.id == input.id) {
      return false
    }
    return true
  })
  localStorage.setItem('toDo', JSON.stringify(updatedTodos))
}


function renderTodo(newTodo) {
  let postsCont = document.createElement('div');
  postsCont.classList.add('notesCont')
  let nameInfo = document.createElement('div')
  nameInfo.classList.add('nameInfo')
  postsCont.appendChild(nameInfo)
  let checkedH2 = document.createElement('h2')
  if (newTodo.done) {
    checkedH2.classList.add('markedDone')
  }
  checkedH2.classList.add('checked')
  checkedH2.id=`title-${newTodo.id}` 
  checkedH2.innerText = newTodo.title
  nameInfo.appendChild(checkedH2)
  let timeInfoDiv = document.createElement('div')
  timeInfoDiv.classList.add('timeInfo')
  nameInfo.appendChild(timeInfoDiv)
  let timeInfo = document.createElement('h3')
  timeInfo.id = 'currentTime'
  let d = new Date(newTodo.date);
  timeInfo.innerHTML = `<p>Posted On:</p> ${d.toLocaleTimeString()}`
  timeInfoDiv.appendChild(timeInfo)
  let checkAndDeleteDiv = document.createElement('div')
  checkAndDeleteDiv.classList.add('checkAndDelete')
  postsCont.appendChild(checkAndDeleteDiv)
  let checkboxInput = document.createElement('input')
  if (newTodo.done) {
    checkboxInput.checked = true
  }
  checkboxInput.type = 'checkbox'
  checkAndDeleteDiv.appendChild(checkboxInput);
  checkboxInput.id = newTodo.id;
  checkboxInput.addEventListener('click', handleToggleCheck)
  let deleteImg = document.createElement('img')
  deleteImg.src = './assets/pictures/deleteIcon.png'
  checkAndDeleteDiv.appendChild(deleteImg)
  deleteImg.addEventListener('click', handleDeleteTodo)
  listContainer.appendChild(postsCont);
}

function addToDo() {
  if (inputField.value === '') {
    addToDoButton.classList.add('errorBtn')
  } else {
    const toDo = {
      id: toDos.length > 0 ? +toDos[toDos.length - 1].id + 1 : 1,
      title: inputField.value,
      date: new Date(),
      done: false
    }
    renderTodo(toDo);
    
    toDos.push(toDo)
    localStorage.setItem('toDo', JSON.stringify(toDos));
    listContainer.scrollTo({behavior: "smooth", top: -1000})
    inputField.value = ''
  }
}
