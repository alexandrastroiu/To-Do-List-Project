const allButton = document.getElementById("allButton");
const completedButton = document.getElementById("clearButton");
const activeButton = document.getElementById("activeButton");
const completedTasksButton = document.getElementById("completedButton");
const firstButton = document.getElementById("button1");

activeButton.addEventListener("click", showActive);
allButton.addEventListener("click", showAll);
completedTasksButton.addEventListener("click", showCompleted);
completedButton.addEventListener("click", removeCompleted);
firstButton.addEventListener("click", toggleFirstButton);

/**
 * The `toggleFirstButton` function toggles the first button placed in the to-do list header.
 * The button checks all the tasks in the to-do list when it is clicked or unchecks them if it was previously clicked once.
 */
function toggleFirstButton() {
  if (firstButton.classList.contains("clicked")) {
    firstButton.classList.remove("clicked");
    const taskList = document.querySelectorAll("li");

    for (let i = 0; i < taskList.length; i++) {
      const div = taskList[i].querySelector("div");
      let label = div.querySelector("label");
      let span = div.querySelector("span");

      if (label.classList.contains("completed")) {
        span.classList.remove("checked");
        span.classList.add("default");
        label.classList.remove("completed");
        label.classList.add("normal");
        counterNumber += 1;
        updateCounter();
        showButton();
      }
    }
  } else {
    firstButton.classList.add("clicked");
    const taskList = document.querySelectorAll("li");

    for (let i = 0; i < taskList.length; i++) {
      let label = taskList[i].querySelector("label");
      let span = taskList[i].querySelector("span");

      if (label.classList.contains("normal")) {
        span.classList.remove("default");
        span.classList.add("checked");
        label.classList.remove("normal");
        label.classList.add("completed");
        counterNumber -= 1;
        updateCounter();
        showButton();
      }
    }
  }
}

/**
 * The `selectFilter` function indicates the active filter between `All`, `Active` or `Completed` by removing and adding the `filter` class to the chosen element.
 * @param {*} filter - the element that is the new filter
 */
function selectFilter(filter) {
  allButton.classList.remove("filter");
  activeButton.classList.remove("filter");
  completedTasksButton.classList.remove("filter");
  filter.classList.add("filter");
}

/**
 * The `removeCompleted` function removes all the checked tasks from the to-do list.
 * The function also updates the footer of the to-do list and the visibility of two buttons after the removal of completed tasks.
 */
function removeCompleted() {
  const taskList = document.querySelectorAll("li");

  for (let i = 0; i < taskList.length; i++) {
    const currentSpan = taskList[i].querySelector("span");

    if (currentSpan.classList.contains("checked")) {
      taskList[i].remove();
      updateFooter();
      showButton();
      showFirstButton();
    }
  }
}

/**
 * The `showActive` function shows only the unchecked tasks when the `Active` button is clicked, the tasks are filtered by the criteria 'active'(unchecked).
 */
function showActive() {
  const taskList = document.querySelectorAll("li");

  selectFilter(activeButton);

  for (let i = 0; i < taskList.length; i++) {
    const currentSpan = taskList[i].querySelector("span");

    if (currentSpan.classList.contains("checked")) {
      taskList[i].style.display = "none";
    } else {
      taskList[i].style.display = "block";
    }
  }
}

/**
 * The `showAll` function shows all the tasks in the to-do list, whether they are completed or not, when the `All` button is clicked.
 * The tasks are filtered by the criteria `all`(checked or unchecked).
 */
function showAll() {
  const taskList = document.querySelectorAll("li");

  selectFilter(allButton);

  for (let i = 0; i < taskList.length; i++) {
    taskList[i].style.display = "block";
  }
}

/**
 * The function `showCompleted` shows only the completed tasks in the to-do list when the `Completed` button is clicked.
 * The tasks are filtered by the criteria `completed` (checked).
 */
function showCompleted() {
  const taskList = document.querySelectorAll("li");

  selectFilter(completedTasksButton);

  for (let i = 0; i < taskList.length; i++) {
    const currentSpan = taskList[i].querySelector("span");

    if (currentSpan.classList.contains("default")) {
      taskList[i].style.display = "none";
    } else {
      taskList[i].style.display = "block";
    }
  }
}

/**
 * The function `showButton` toggles the visibility of the `Clear completed` button.
 * The `Clear completed` button is visible when there are completed tasks in the to-do list, otherwise it is hidden.
 */
function showButton() {
  const taskList = document.querySelectorAll("span.checked");

  if (taskList.length > 0) {
    completedButton.style.visibility = "visible";
  } else if (taskList.length == 0) {
    completedButton.style.visibility = "hidden";
  }
}

/**
 * The `showFirstButton` function toggles the visibility of the button in the to-do list header.
 * The button is visible when there are tasks in the to-do list, otherwise it is hidden.
 */
function showFirstButton() {
  const taskList = document.querySelectorAll("li");

  if (taskList.length > 0) {
    firstButton.style.visibility = "visible";
  } else if (taskList.length == 0) {
    firstButton.style.visibility = "hidden";
  }
}

/**
 * The `highlightTask` function highlights the task in the to-do list when its checkbox is clicked.
 * @param {*} event
 */
function highlightTask(event) {
  let currentSpan = event.target;
  let currentTask = currentSpan.parentElement.parentElement;

  currentTask.style.boxShadow = "0 0 3px 2px #4488e1a8";
}

/**
 * The `normalTask` function removes the highlight from the task in the to-do list when the task is no longer in focus (the user clicks outside its checkbox).
 * @param {*} event
 */
function normalTask(event) {
  let currentSpan = event.target;
  let currentTask = currentSpan.parentElement.parentElement;

  currentTask.style.boxShadow = "none";
}

/**
 * The `highlightTodosHeader` function highlights the to-do list header when the user wants to insert a new task (the input element is in focus).
 * @param {*} event
 */
function highlightTodosHeader(event) {
  let input = event.target;
  let todosHeader = input.parentElement;

  todosHeader.style.boxShadow = "0 0 5px 2px #4488e1a8";
}

/**
 * The `normalTodosHeader` function removes the highlight from the to-do list header when the input element loses focus (the user clicks outside the input element in the to-do list header).
 * @param {*} event
 */
function normalTodosHeader(event) {
  let input = event.target;
  let todosHeader = input.parentElement;

  todosHeader.style.boxShadow = "none";
}

/**
 * The `checkTask` function toggles the state of the task (checked or unchecked) when the its checkbox is clicked.
 * The function  updates the task counter and the visibility of the `Clear completed` button.
 * It also checks if any filters are applied (`Active` or `Completed`) and updates what tasks are shown accordingly.
 * @param {*} event
 */
function checkTask(event) {
  let currentButton = event.target;
  let currentTask = currentButton.parentElement;
  let taskLabel = currentTask.querySelector("label");

  if (currentButton.classList.contains("default")) {
    currentButton.classList.remove("default");
    currentButton.classList.add("checked");
    taskLabel.classList.remove("normal");
    taskLabel.classList.add("completed");

    counterNumber -= 1;
    updateCounter();
    showButton();

    if (activeButton.classList.contains("filter")) {
      showActive();
    }
  } else {
    currentButton.classList.remove("checked");
    currentButton.classList.add("default");
    taskLabel.classList.remove("completed");
    taskLabel.classList.add("normal");

    counterNumber += 1;
    updateCounter();
    showButton();

    if (completedTasksButton.classList.contains("filter")) {
      showCompleted();
    }
  }
}

const myCounter = document.querySelector("span.count");
let counterNumber = Number(myCounter.textContent);

/**
 * The `updateCounter` function updates the task counter text accordingly.
 */
function updateCounter() {
  if (counterNumber == 1) {
    myCounter.textContent = `${counterNumber} item left`;
  } else {
    myCounter.textContent = `${counterNumber} items left`;
  }
}

/**
 * The `updateFooter` function toggles the visibility of the to-do list footer.
 * If the to-do list is empty (there are no tasks left) the footer is not displayed, otherwise it is shown.
 */
function updateFooter() {
  const currentTasks = document.querySelectorAll("li");
  const footer = document.querySelector(".footer");

  if (currentTasks.length == 0) {
    footer.style.display = "none";
  } else {
    footer.style.display = "block";
  }
}

/**
 * The `removeTask` function removes the current task when the delete button is clicked.
 * The function also updates the to-do list footer, two buttons and the task counter after the removal.
 * @param {*} event
 */
function removeTask(event) {
  const button = event.target;
  const parentDiv = button.parentElement;
  const span = parentDiv.querySelector("span");
  const parentLi = parentDiv.parentElement;

  parentLi.remove();
  updateFooter();
  showButton();
  showFirstButton();

  if (span.classList.contains("default")) {
    counterNumber -= 1;
    updateCounter();
  }
}

const inputElement = document.getElementById("todos");
inputElement.addEventListener("keydown", createTask);
inputElement.addEventListener("focusin", highlightTodosHeader);
inputElement.addEventListener("focusout", normalTodosHeader);

/**
 * The `createTask` function creates a new task in the to-do list when the `Enter` key is pressed after the user inserted text in the input element in the to-do list header.
 * The function also updates the task counter, the task counter text, the footer and the visibility of the first button (the button in the to-do list header).
 * @param {*} event
 */
function createTask(event) {
  if (event.key === "Enter") {
    const inputText = inputElement.value;
    const myList = document.querySelector("ul.todoList");
    const newTask = document.createElement("li");
    const newDiv = document.createElement("div");
    const newSpan = document.createElement("span");

    newSpan.classList.add("default");
    newSpan.addEventListener("click", checkTask);
    newSpan.setAttribute("tabindex", "0");
    newSpan.addEventListener("focusin", highlightTask);
    newSpan.addEventListener("focusout", normalTask);

    const newLabel = document.createElement("label");
    newLabel.textContent = inputText;
    newLabel.classList.add("normal");

    const newButton = document.createElement("button");
    newButton.classList.add("delete");
    newButton.addEventListener("click", removeTask);

    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.classList.add("Mycheckbox");

    newDiv.appendChild(newCheckbox);
    newDiv.appendChild(newSpan);
    newDiv.appendChild(newLabel);
    newDiv.appendChild(newButton);
    newTask.appendChild(newDiv);
    myList.appendChild(newTask);

    /**
     * When the user double-clicks on the text (label) of a task in the to-do list, the text of the task can be modified.
     */
    newLabel.addEventListener("dblclick", (event) => {
      const label = event.target;
      newSpan.style.visibility = "hidden";

      const newInput = document.createElement("input");
      newInput.type = "text";
      newInput.value = label.textContent;
      newInput.classList.add("normal");
      newInput.style.border = "none";
      newInput.style.outline = "none";

      label.replaceWith(newInput);
      newInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          label.textContent = newInput.value;
          newInput.replaceWith(label);
          newSpan.style.visibility = "visible";
        }
      });
      newInput.addEventListener("mouseout", (event) => {
        label.textContent = newInput.value;
        newInput.replaceWith(label);
        newSpan.style.visibility = "visible";
      });
    });

    inputElement.value = "";
    counterNumber += 1;
    updateCounter();
    updateFooter();
    showFirstButton();
  }
}
