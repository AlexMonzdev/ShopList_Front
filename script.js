import {
  getAllItemsFromAPI,
  postItemToAPI,
  deleteItemFromAPI,
  putItemToAPI,
} from "./api.services.js";

let items = [];
const shopListDOM = document.getElementById("listId");
const inputIdDOM = document.getElementById("inputId");
const addBtnId = document.getElementById("addBtnId");

async function printList() {
  items = await getAllItemsFromAPI();
  shopListDOM.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    shopListDOM.innerHTML += `<li>
    <span>
      <input 
        type="checkbox" 
        onchange="checkedItem(${items[i].id}, ${i})" 
        ${items[i].bought ? "checked" : ""} 
      >
    </span>
        <span class='${items[i].bought ? "textSpan" : ""}'>${
      items[i].name
    }</span>
        <span onclick="deleteItemFromList('${
          items[i].id
        }')" class="item-delete-btn" id='${items[i].id}'>x</span>
    </li>`;
  }
}

async function addItemToList() {
  const newItem = inputIdDOM.value.trim();
  inputIdDOM.value = "";
  if (!newItem) {
    alert("añade algo !! ");
    return;
  }
  if (newItem.length > 25) {
    alert("el archivo es superior a 25 caracteres");
    return;
  }
  for (const item of items) {
    if (item.name.toLowerCase() == newItem.toLowerCase()) {
      alert("ya esta en la lista");
      return;
    }
  }
  let newItemObject = {
    name: textFormat(newItem),
    bought: false,
  };
  await postItemToAPI(newItemObject);
  await printList();
}

async function deleteItemFromList(inputIdDOM) {
  await deleteItemFromAPI(inputIdDOM);

  await printList();
}

async function checkedItem(itemId) {
  const item = items.find((item) => item.id == itemId);
  if (!item) {
    console.error("Item no encontrado:", itemId);
    return;
  }

  item.bought = !item.bought;

  try {
    await putItemToAPI(itemId, { ...item, bought: item.bought });
    console.log(`Estado del item ${item.name} actualizado a ${item.bought}`);
  } catch (error) {
    console.error("Error al actualizar el estado:", error);
    return;
  }

  printList();
}


function textFormat(text) {
  const splitText = text.split(" ");
  const wordFormatText = [];
  splitText.forEach((word) =>
    wordFormatText.push(
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
  );
  return wordFormatText.join(" ");
}

async function main() {
  addBtnId.addEventListener("click", addItemToList);
  await printList();
}

await main();

window.addItemToList = addItemToList;
window.deleteItemFromList = deleteItemFromList;
window.checkedItem = checkedItem;
