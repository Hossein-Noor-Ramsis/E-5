// add the variables
const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const inputInvalid = document.getElementById("input-invalid");

const itemList = document.getElementById("item-list");
const item = document.getElementsByClassName("item");
const itemIcon = document.getElementsByClassName("bi-x");

const listCleaner = document.getElementById("list-cleaner");
const filterInput = document.getElementById("filter");

const formButton = document.getElementById("form-button");

// add the functions
// default function
function defaultFunction() {
  // the checkItemList() function needs to set this property before it can be called.
  if (localStorage.getItem("itemsKey") === null) {
    localStorage.setItem("itemsKey", JSON.stringify([]));
  } else {
    return;
  }
}
defaultFunction();

// create new item
function createNewItem(e) {
  const newItem = document.createElement("li");
  const newItemIcon = document.createElement("i");

  e.preventDefault();
  // validate the input
  function validateInput() {
    if (itemInput.value === "") {
      inputInvalid.innerText = "Please add an item";
      return;
    } else {
      inputInvalid.innerText = "";
    }
  }
  validateInput();

  // create new item
  function createNewItem() {
    newItemIcon.className = "bi bi-x fs-5 text-danger remove";
    newItem.className = "item";
    newItem.innerText = itemInput.value;
    newItem.appendChild(newItemIcon);
    itemList.appendChild(newItem);
  }
  createNewItem();

  // add the item to localStorage
  function addItemToLocalStorage() {
    let dataCollection;

    if (localStorage.getItem("itemsKey") === null) {
      dataCollection = [];
    } else {
      dataCollection = JSON.parse(localStorage.getItem("itemsKey"));
    }

    dataCollection.push(itemInput.value);

    localStorage.setItem("itemsKey", JSON.stringify(dataCollection));
    itemInput.value = "";
  }
  addItemToLocalStorage();
}
itemForm.addEventListener("submit", createNewItem);

// remove an item
function clickItem(e) {
  const clickTarget = e.target.classList.contains("remove");

  if (clickTarget) {
    e.target.parentElement.remove();
    const items = itemList.getElementsByTagName("li");
    const updateList = [];

    for (let i = 0; i < items.length; i++) {
      updateList.push(items[i].textContent);
    }

    localStorage.setItem("itemsKey", JSON.stringify(updateList));
  } else {
    return;
  }
}
itemList.addEventListener("click", clickItem);

// remove all items
function removeAllItems() {
  itemList.innerHTML = "";
  localStorage.setItem("itemsKey", JSON.stringify([]));
}
listCleaner.addEventListener("click", removeAllItems);

// remove list cleaner button and filter input and add them
function checkItemList() {
  const checkStorage = JSON.parse(localStorage.getItem("itemsKey"));
  if (checkStorage.length === 0) {
    listCleaner.style.display = "none";
    filterInput.style.display = "none";
  } else {
    listCleaner.style.display = "block";
    filterInput.style.display = "block";
  }
}
checkItemList();
itemForm.addEventListener("submit", checkItemList);
itemList.addEventListener("click", checkItemList);
listCleaner.addEventListener("click", checkItemList);

// filter the items
function filterItems(e) {
  const filterValue = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll("li");

  items.forEach((item) => {
    const itemValue = item.firstChild.textContent.toLowerCase();
    if (itemValue.indexOf(filterValue) !== -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}
filterInput.addEventListener("input", filterItems);

// show items from local storage
function localStorageItems() {
  const storageItems = JSON.parse(localStorage.getItem("itemsKey"));

  for (i = 0; i < storageItems.length; i++) {
    const newItem = document.createElement("li");
    const newItemIcon = document.createElement("i");

    newItemIcon.className = "bi bi-x fs-5 text-danger remove";
    newItem.className = "item";
    newItem.innerText = storageItems[i];
    newItem.appendChild(newItemIcon);
    itemList.appendChild(newItem);
  }
}
localStorageItems();

// edit an item
function editItem(e) {
  const clickTarget = e.target.classList.contains("item");

  // put the value of item into the form input
  function putItemTextInItemInput() {
    if (clickTarget) {
      const editedItem = e.target;
      const itemIcon = e.target.childNodes[1];
      const normalizeItem = document.getElementsByClassName("item");
      const normalizeIcon = document.getElementsByClassName("bi-x");

      itemInput.value = editedItem.textContent;

      for (let i = 0; i < normalizeItem.length; i++) {
        normalizeItem[i].className = "item";
        normalizeIcon[i].className = "bi bi-x fs-5 text-danger remove";
      }

      editedItem.className = "item disabled remove-after-update";
      itemIcon.className = "bi bi-x fs-5 text-danger";
    } else {
      return;
    }
  }
  putItemTextInItemInput();

  // change form button from add item to update item
  function changeFormButton() {
    if (clickTarget) {
      const buttonIcon = document.getElementById("button-icon");
      const buttonText = document.getElementById("button-text");

      itemForm.classList = "create-item mb-4 update-item";
      formButton.style.backgroundColor = "#0f6cff";
      buttonIcon.className = "bi bi-pencil-square";
      buttonText.innerText = "Update Item";
    } else {
      return;
    }
  }
  changeFormButton();
}
itemList.addEventListener("click", editItem);

// update an item
function updateItem(e) {
  const clickTarget = e.target.classList.contains("update-item");
  const removeAfterUpdate = document.getElementsByClassName("remove-after-update");

  if (clickTarget) {
    const items = itemList.getElementsByTagName("li");
    const updateList = [];

    for (let i = 0; i < removeAfterUpdate.length; i++) {
      removeAfterUpdate[i].remove();
    }

    for (let i = 0; i < items.length; i++) {
      updateList.push(items[i].textContent);
    }

    localStorage.setItem("itemsKey", JSON.stringify(updateList));
  } else {
    return;
  }

  function normalizeButton() {
    const buttonIcon = document.getElementById("button-icon");
    const buttonText = document.getElementById("button-text");
    
    itemForm.classList = "create-item mb-4";
    formButton.style.backgroundColor = "#212529";
    buttonIcon.className = "bi bi bi-plus";
    buttonText.innerText = "Add Item";
  }
  normalizeButton();
}
itemForm.addEventListener("submit", updateItem);
