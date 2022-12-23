var minus= document.getElementById("minus");
var plus = document.getElementById("plus");
var quantity = document.getElementById("quantity");
// console.log(quantity.value);
// console.log(typeof quantity.value);
var addToList=document.getElementById("addToList");


minus.addEventListener("click", minusOne );
plus.addEventListener("click", addOne );
addToList.addEventListener("click", add);

function addOne() {
    if (Number(quantity.value) < 100) {
    quantity.value = Number(quantity.value) + 1 ;
    // console.log(quantity.value);
    }

}

function minusOne() {
    if (Number(quantity.value) > 1) {
    quantity.value = Number(quantity.value) - 1;
    // console.log(quantity.value);
    }
}

function add() {
    console.log("dodano do listy dań " + quantity.value + " porcje");
}