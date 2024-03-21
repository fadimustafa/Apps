let textInput = document.querySelector(".text-area");
let doList = document.querySelector(".do-list");
let tasksCunt = document.querySelector(".tasks-cunt");
let clearBtu = document.querySelector(".clear-btu");

function listCunte() {
  let tasks = document.querySelectorAll(".cunte");
  tasksCunt.textContent = tasks.length === 0 ? "no" : tasks.length;

  let allList = document.querySelectorAll(".list");
  if (allList.length > 0) {
    doList.style.marginTop = "20px";
    clearBtu.style.pointerEvents = "auto";
  } else {
    doList.style.marginTop = "0px";
    clearBtu.style.pointerEvents = "none";
  }
}

textInput.addEventListener("keyup", (e) => {
  let inputValue = textInput.value.trim();
  if (e.key === "Enter" && inputValue.length > 0) {
    let textl = `<li class="list cunte" onclick="handleState(this)">
    <input class="chack" type="checkbox" />
    <span class="text-list">${inputValue}</span>
    <i onclick="removeLi(this)" class="fa fa-trash-o" style="font-size: 20px"></i>
  </li>`;
    doList.insertAdjacentHTML("afterbegin", textl);
    textInput.value = "";
    listCunte();
  }
});

function handleState(e) {
  const checkbox = e.querySelector("input");
  checkbox.checked = checkbox.checked ? false : true;
  e.classList.toggle("cunte");
  listCunte();
}

function removeLi(el) {
  el.parentElement.remove();
  listCunte();
}
function clearAll() {
  doList.innerHTML = "";
  listCunte();
}
// const onConfirmRefresh = function (event) {
//   event.preventDefault();
//   return (event.returnValue = "Are you sure you want to leave the page?");
// };

// window.addEventListener("beforeunload", onConfirmRefresh, { capture: true });
