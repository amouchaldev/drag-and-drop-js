const input = document.querySelector(".inputs input"),
  button = document.querySelector(".inputs button"),
  boxs = document.querySelectorAll(".boxs .box");
let draggedItem = null;
const firstColor = getComputedStyle(document.documentElement).getPropertyValue(
  "--first-color"
);
const firstBg = getComputedStyle(document.documentElement).getPropertyValue(
  "--first-bg"
);

button.addEventListener("click", () => {
  if (input.value.trim() == "") return;
  boxs[0].innerHTML += `<p draggable="true" data-id="${+boxs[0].lastElementChild.getAttribute('data-id') + 1}">${input.value}</p>`;
  input.value = "";
  dragFn();
});

function dragFn() {
  const todos = document.querySelectorAll(".boxs > .box > p");
  todos.forEach((todo) => {
    // --------------------------------------------------------
    todo.addEventListener("dragstart", function (e) {
      draggedItem = this;
      this.style.opacity = '.5'
      e.dataTransfer.setData('test', e.target.innerHTML)
    //   console.log("dragged item : ", this, " - ", draggedItem);
    });
    // --------------------------------------------------
    todo.addEventListener("dragend", function () {
      draggedItem = null;
      this.style.opacity = '1'
    });
    // ---------------------------------------------------------------
    // todo.addEventListener("dragover", function (e) {
    //   e.preventDefault()
    // });
  });
}
dragFn();

boxs.forEach(box => {
  box.addEventListener("dragleave", function () {
    this.style.backgroundImage = "";
    this.style.backgroundColor = "#fff";
  });
  box.addEventListener("dragover", function (e) {
    e.preventDefault();
    // this.style.backgroundImage = firstBg;
  });
  box.addEventListener("drop", function (e) {
    e.preventDefault()

    console.log(e.dataTransfer.getData('test'))
    this.append(draggedItem);
    // this.style.backgroundImage = "";
    // this.style.backgroundColor = "#fff";
  });
});
