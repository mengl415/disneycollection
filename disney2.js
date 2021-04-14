console.log("Hello world");

// load Airtable library, name it Airtable
var Airtable = require("airtable");
console.log(Airtable);

// connect airtable base to website w/ API
var base = new Airtable({ apiKey: "keyzQjFfjYvxAob2b" }).base(
  "appsH7NqmKw8OFD7U"
);

// get airtable data, specify how to retrieve it with functions

base("disney")
  .select({})
  .eachPage(gotPageOfItems, gotAllItems);

// empty array to hold data
const items = [];

// callback function that receives data
function gotPageOfItems(records, fetchNextPage) {
  console.log("gotPageOfItems()");
  // add records from item to array
  items.push(...records);
  // request more pages
  fetchNextPage();
}

function gotAllItems(err) {
  console.log("gotAllItems()");

  // report an error
  if (err) {
    console.log("error loading units");
    console.error(err);
    return;
  }

  // call functions to log and show the units
  consoleLogItems();
  showItems();
}

// just loop through the Items and console.log them
function consoleLogItems() {
  console.log("consoleLogItems()");
  items.forEach(item => {
    console.log("Item:", item);
  });
}

//loop through items, create for them and add to page
function showItems() {
  console.log("showItems()");
  items.forEach(item => {
    var itemType = item.fields.type;
    itemType.forEach(category => {
      if (category == "uniqlo") {

        var itemContainerU = document.createElement("div");
        itemContainerU.classList.add("item-container");
        document.querySelector(".containerU").append(itemContainerU);

        //display uniqlo images
        var itemImageU = document.createElement("img");
        itemImageU.classList.add("uniqlo-image");
        itemImageU.src = item.fields.image[0].url;
        itemContainerU.appendChild(itemImageU);
      }
      if (category == "aldo"){
        var itemContainerA = document.createElement("div");
        itemContainerA.classList.add("item-container");
        document.querySelector(".containerA").append(itemContainerA);

        //display aldo images
        var itemImageA = document.createElement("img");
        itemImageA.classList.add("aldo-image");
        itemImageA.src = item.fields.image[0].url;
        itemContainerA.appendChild(itemImageA);
      }
      if (category == "coach"){
        var itemContainerC = document.createElement("div");
        itemContainerC.classList.add("item-container");
        document.querySelector(".containerC").append(itemContainerC);

        var itemImageC = document.createElement("img");
        itemImageC.classList.add("coach-image");
        itemImageC.src = item.fields.image[0].url;
        itemContainerC.appendChild(itemImageC);
      }
      if (category == "el"){
        var itemContainerE = document.createElement("div");
        itemContainerE.classList.add("item-container");
        document.querySelector(".containerE").append(itemContainerE);

        var itemImageE = document.createElement("img");
        itemImageE.classList.add("el-image");
        itemImageE.src = item.fields.image[0].url;
        itemContainerE.appendChild(itemImageE);
      }
      if (category == "gucci"){
        var itemContainerG = document.createElement("div");
        itemContainerG.classList.add("item-container");
        document.querySelector(".containerG").append(itemContainerG);

        var itemImageG = document.createElement("img");
        itemImageG.classList.add("gucci-image");
        itemImageG.src = item.fields.image[0].url;
        itemContainerG.appendChild(itemImageG);
      }
      if (category == "pandora"){
        var itemContainerP = document.createElement("div");
        itemContainerP.classList.add("item-container");
        document.querySelector(".containerP").append(itemContainerP);

        var itemImageP = document.createElement("img");
        itemImageP.classList.add("pandora-image");
        itemImageP.src = item.fields.image[0].url;
        itemContainerP.appendChild(itemImageP);
      }
      if (category == "zara"){
        var itemContainerZ = document.createElement("div");
        itemContainerZ.classList.add("item-container");
        document.querySelector(".containerZ").append(itemContainerZ);

        var itemImageZ = document.createElement("img");
        itemImageZ.classList.add("zara-image");
        itemImageZ.src = item.fields.image[0].url;
        itemContainerZ.appendChild(itemImageZ);
      }

    });
  });
  
}

// function moveUp(event){
//   console.log(event.target);
//   event.target.style.marginTop = "-1rem";
// }

// document.body.addEventListener("mouseover", moveUp());
