const allButton  = document.getElementById("allButton");
const completedButton = document.getElementById("clearButton");
const activeButton = document.getElementById("activeButton");
const completedTasksButton = document.getElementById("completedButton");
const firstButton = document.getElementById("button1");

activeButton.addEventListener("click", showActive);
allButton.addEventListener("click", showAll);
completedTasksButton.addEventListener("click", showCompleted);
completedButton.addEventListener("click", removeCompleted);
firstButton.addEventListener("click", toggleFirstButton);

function toggleFirstButton()
{
    if(firstButton.classList.contains("clicked"))
    {
       firstButton.classList.remove("clicked");
       const taskList = document.querySelectorAll("li");

       for(let i = 0; i < taskList.length; i++)
       {
           const div = taskList[i].querySelector("div");
           let label = div.querySelector("label");
           let span = div.querySelector("span");

           if(label.classList.contains("completed"))
           {
              span.classList.remove("checked");
              span.classList.add("default");
              label.classList.remove("completed"); 
              label.classList.add("normal");
              counterNumber += 1;
              updateCounter();
              showButton();
           }
       }
    }
    else
    {
        firstButton.classList.add("clicked");
        const taskList = document.querySelectorAll("li");

        for(let i = 0; i < taskList.length; i++)
        {
            let label = taskList[i].querySelector("label");
            let span = taskList[i].querySelector("span");

            if(label.classList.contains("normal"))
            {
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

function selectFilter(filter)
{
    allButton.classList.remove("filter");
    activeButton.classList.remove("filter");
    completedTasksButton.classList.remove("filter");
    filter.classList.add("filter");
}

function removeCompleted() 
{
    const taskList = document.querySelectorAll("li");

    for(let i = 0; i < taskList.length; i++)
    {
           const currentSpan = taskList[i].querySelector("span");

            if(currentSpan.classList.contains("checked"))
            {
                taskList[i].remove();
                updateFooter();
                showButton();
                showFirstButton();
            }
    }
}

function showActive()
{
    const taskList = document.querySelectorAll("li");
    selectFilter(activeButton);

    for(let i = 0; i < taskList.length; i++)
    {
        const currentSpan = taskList[i].querySelector("span");

        if(currentSpan.classList.contains("checked"))
        {
            taskList[i].style.display = "none";
        }
        else
        {
            taskList[i].style.display = "block";
        }
    }
}

function showAll()
{
    const taskList = document.querySelectorAll("li");
    selectFilter(allButton);

    for(let i = 0; i < taskList.length; i++)
    {
          taskList[i].style.display = "block";
    }
}

function showCompleted()
{
    const taskList = document.querySelectorAll("li");
    selectFilter(completedTasksButton);

    for(let i = 0; i < taskList.length; i++)
    {
        const currentSpan = taskList[i].querySelector("span");

        if(currentSpan.classList.contains("default"))
        {
            taskList[i].style.display = "none";
        }
        else
        {
            taskList[i].style.display = "block";
        }
    }
}

function showButton()
{
    const taskList = document.querySelectorAll("span.checked");

    if(taskList.length > 0)
    {
        completedButton.style.visibility = "visible";
    }
    else if(taskList.length == 0)
    {
        completedButton.style.visibility = "hidden";
    }
}

function showFirstButton()
{
    const taskList = document.querySelectorAll("li");

    if(taskList.length > 0)
    {
        firstButton.style.visibility = "visible";
    }
    else if(taskList.length == 0 )
    {
        firstButton.style.visibility = "hidden";
    }
}

function highlightTask(event)
{
    let currentSpan = event.target;
    let currentTask = currentSpan.parentElement.parentElement;

    currentTask.style.boxShadow = "0 0 3px 2px #4488e1a8";
}

function normalTask(event)
{
    let currentSpan = event.target;
    let currentTask = currentSpan.parentElement.parentElement;

    currentTask.style.boxShadow = "none"
}

function highlightTodosHeader(event)
{
    let input = event.target;
    let todosHeader = input.parentElement;

    todosHeader.style.boxShadow = "0 0 5px 2px #4488e1a8";
}

function normalTodosHeader(event)
{
    let input = event.target;
    let todosHeader = input.parentElement;

    todosHeader.style.boxShadow = "none";

}

function checkTask(event)
{
    let currentButton = event.target;
    let currentTask = currentButton.parentElement;
    let taskLabel = currentTask.querySelector("label");

    if(currentButton.classList.contains("default"))
    {
       currentButton.classList.remove("default");
       currentButton.classList.add("checked");
       taskLabel.classList.remove("normal");
       taskLabel.classList.add("completed"); 
       counterNumber -= 1;
       updateCounter();
       showButton();
       if(activeButton.classList.contains("filter"))
       {
           showActive();
       }
    }
    else
    {
        currentButton.classList.remove("checked");
        currentButton.classList.add("default");
        taskLabel.classList.remove("completed");
        taskLabel.classList.add("normal");
        counterNumber += 1;
        updateCounter();
        showButton();
        if(completedTasksButton.classList.contains("filter"))
        {
            showCompleted();
        }
    } 
}

const myCounter = document.querySelector("span.count");
let counterNumber = Number(myCounter.textContent);

function updateCounter()
{
    if(counterNumber == 1)
    {
        myCounter.textContent = `${counterNumber} item left`;
    }
    else
    {
        myCounter.textContent = `${counterNumber} items left`;
    }
}

function updateFooter()
{
    const currentTasks = document.querySelectorAll("li");
    const footer = document.querySelector(".footer");

    if(currentTasks.length == 0)
    {
         footer.style.display = "none";
    }
    else
    {
        footer.style.display = "block";
    }
}

function removeTask(event)
{
    const button = event.target;
    const parentDiv = button.parentElement;
    const span = parentDiv.querySelector("span");
    const parentLi = parentDiv.parentElement;

    parentLi.remove();
    updateFooter();
    showButton();
    showFirstButton();

    if(span.classList.contains("default"))
    {
        counterNumber -= 1;
        updateCounter();
    }
}

const inputElement = document.getElementById("todos");
inputElement.addEventListener("keydown", createTask);
inputElement.addEventListener("focusin", highlightTodosHeader)
inputElement.addEventListener("focusout", normalTodosHeader)

function createTask(event)
{
    if (event.key === "Enter")
    {
       const inputText = inputElement.value;

       const myList = document.querySelector("ul.todoList");
       const newTask = document.createElement("li");

       const newDiv = document.createElement("div");

       const newSpan = document.createElement("span")
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

       newLabel.addEventListener("dblclick", (event) => {
       const label = event.target;
       newSpan.style.visibility = "hidden";
       const newInput = document.createElement("input");
       newInput.type = "text";
       newInput.value = label.textContent;
       newInput.classList.add("normal");
       newInput.style.border = "none";
       newInput.style.outline = "none"
       label.replaceWith(newInput);
       newInput.addEventListener("keydown", (event) => {
          if(event.key === "Enter")
          {
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