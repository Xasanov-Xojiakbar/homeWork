let form = document.querySelector("#form_order");
let userName = document.querySelector("#user_name");
let phoneNumber = document.querySelector("#phone_number");
let userAdress = document.querySelector("#user_adress");
let ratingBall = document.querySelector("#rating_ball");
let checkbox = document.querySelectorAll(".checkbox");
let checkboxAdd = document.querySelectorAll(".checkboxAdd");
let $sizes = document.querySelectorAll(".sizes");
let content = document.getElementById("content");
let ingredentArr = [];
let ingredentAdd = [];
let pitsaSize = "30";

let orders = [];

function getValue(e) {
  if (e.target.checked) ingredentArr.push(e.target.id);
  else if (!e.target.checked)
    ingredentArr = ingredentArr.filter((item) => item !== e.target.id);

  console.log(ingredentArr);
}

function getValueAdd(e) {
  if (e.target.checked) ingredentAdd.push(e.target.id);
  else if (!e.target.checked)
    ingredentAdd = ingredentAdd.filter((item) => item !== e.target.id);
}

function pizza(e) {
  e.preventDefault();
  pitsaSize = e.target.value;
  console.log(e.target.value);
}

checkbox.forEach(function (item) {
  item.addEventListener("change", getValue);
});

checkboxAdd.forEach(function (item) {
  item.addEventListener("change", getValueAdd);
});

$sizes.forEach(function (item) {
  item.addEventListener("click", pizza);
});

function cardOrder(e) {
  e.preventDefault();
  let cardObj = {
    name: userName.value,
    number: phoneNumber.value,
    adress: userAdress.value,
    size: pitsaSize,
    ratingBall: ratingBall.value,
    ingredent: ingredentArr,
    ingredentAdd: ingredentAdd,
  };
  orders.push(cardObj);

  renderCard();
}

form.addEventListener("submit", cardOrder);

function renderCard() {
  let result = "";
  orders.forEach((item, i) => {
    let ingredent =
      item.ratingBall === "Thin"
        ? 10
        : item.ratingBall === "Medium"
        ? 12
        : item.ratingBall === "Thick"
        ? 15
        : 0;

    let sizeSum = item.$sizes === "25" ? 10 : item.$sizes === "35" ? 15 : 12;

    let ingredentSum = item.ingredent.length * 5;
    let ingredentAddSum = item.ingredentAdd.length * 5;

    let total = ingredentSum + sizeSum + ingredent + ingredentAddSum;g

    result =
      result +
      `
  <div class="card position-relative fit m-3" style="width: 18rem;">
  <button type="button"
    class="delete position-absolute top-0 end-0"></button>
  <div class="card-body">
    <h5 class="card-title">Order: ${i + 1}</h5>
  </div>
  <div>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">
      <ul>
        <li class="m-1"><strong>Name: </strong>${item.name}</li>
        <li class="m-1"><strong>Phone: </strong>+998${item.number}</li>
        <li class="m-1"><strong>Address: </strong>${item.adress}</li>
      </ul>
    </li>
    <li class="list-group-item">
      <ul class="list-group list-group-flush">
        <li class="list-group-item p-0">
          <ul class="mb-4">
            <li class="m-1"><strong>Dough thickness: </strong>${
              item.ratingBall
            }</li>
            <li class="m-1"><strong>Size: </strong>${item.size} sm</li>
            <li class="m-1"><strong>On pizza: </strong>${item.ingredent.join(
              " - "
            )}</li>
            <li class="m-1"><strong>Add: </strong>${item.ingredentAdd.join(
              " - "
            )}</li>
          </ul>
        </li>
        <li class="list-group-item text-end pe-5"><strong>Total: </strong>$${total}</li>
      </ul>
    </li>
  </ul>
</div>
  
  `;
  });

  console.log(result);
  content.innerHTML = result;
}
