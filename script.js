const input = document.querySelector('input')
const btn = document.querySelector('#btn')
const output = document.querySelector('#output')

const todo = []

function check(title, todo) {
  if (title === '') {
    input.value = ''
    return false
  }

  for (let i = 0; i < todo.length; i++) {
    if (todo[i].title == title) {
      alert('same task!!')
      input.value = ''
      return false
    }

  }
  return true
}

function delTask(i) {
  console.log(i)
  todo.splice(i, 1)
  console.log(todo)
  render(todo)
}


function doneTask(i) {
  console.log(i)
  todo[i].completed = !todo[i].completed
  console.log(todo)
  render(todo)

}

function render(todo) {
    output.innerHTML = '';
    for (let i = 0; i < todo.length; i++) {
        const container = document.createElement('div');
        container.setAttribute('class', 'container');

        const titleDiv = document.createElement('div');
        if (todo[i].completed === true) {
            titleDiv.classList.add('line');
        }
        titleDiv.textContent = todo[i].title;

        const doneBtn = document.createElement('button');
        doneBtn.textContent = 'Done';
        doneBtn.classList.add('done-btn');
        doneBtn.setAttribute('onclick', `doneTask(${i})`);

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.classList.add('del-btn');
        delBtn.setAttribute('onclick', `delTask(${i})`);
        
        container.appendChild(titleDiv);
        container.appendChild(doneBtn);
        container.appendChild(delBtn);

        output.appendChild(container);
    }
}

function add() {
  const inputValue = input.value.trim()
  if (check(inputValue, todo)) {
    todo.push({
      title: inputValue,
      completed: false
    })
    console.log(todo)
    input.value = ''
  }
  render(todo)

}

btn.addEventListener('click', add)

input.addEventListener('keydown', (e) => {
  if (e.key === "Enter") add()
}
)


