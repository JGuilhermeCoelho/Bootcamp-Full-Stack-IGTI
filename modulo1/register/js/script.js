window.addEventListener("load", start);

var globalNames = ["Um", "Dois", "Três", "Quatro"];
var inputName = null;
var currentIndex = null;
var isEditing = false;

function start() {
  inputName = document.querySelector("#inputName");

  preventFormSubmit();
  activateInput();
  render();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmit);
}

function activateInput() {
  function insertName(newName) {
    globalNames.push(newName);
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName;
  }

  function handleTyping(event) {
    var hasText = !!event.target.value && event.target.value.trim() !== "";

    if (!hasText) {
      clearInput();
      return;
    }

    if (event.key === "Enter") {
      if (isEditing) {
        updateName(event.target.value.trim());
      } else {
        insertName(event.target.value.trim());
      }

      render();
      isEditing = false;

      var spanName = document.querySelector("span");
      spanName.textContent = "Nome:";
    }
  }

  inputName.addEventListener("keyup", handleTyping);
  inputName.focus();
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1);
      render();
    }
    var button = document.createElement("button");
    button.textContent = "X";
    button.classList.add("deleteButton");
    button.addEventListener("click", deleteName);
    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      var spanName = document.querySelector("span");
      spanName.textContent = "Editando";

      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }

    var span = document.createElement("span");
    span.classList.add("clickable");
    span.textContent = name;

    span.addEventListener("click", editItem);

    return span;
  }

  var divNames = document.querySelector("#names");
  var ul = document.createElement("ul");
  divNames.innerHTML = "";

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement("li");
    var button = createDeleteButton(i);
    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  inputName.value = "";
  inputName.focus();
}
