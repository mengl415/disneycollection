// load Airtable library, name it Airtable
var Airtable = require("airtable");
console.log(Airtable);

// connect airtable base to website w/ API
var base = new Airtable({ apiKey: "keyzQjFfjYvxAob2b" }).base(
  "appsH7NqmKw8OFD7U"
);

// get airtable data, specify how to retrieve it with functions

base("disney").select({}).eachPage(gotPageOfItems, gotAllItems);

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
  try {
    showItems();
  } catch (e) {
    console.log(e);
  }
}

// just loop through the Items and console.log them
function consoleLogItems() {
  console.log("consoleLogItems()");
  items.forEach((item) => {
    console.log("Item:", item);
  });
}

//loop through items, create for them and add to page
function showItems() {
  console.log("showItems()");
  items.forEach((item) => {
    var itemType = item.fields.type;
    itemType.forEach((category) => {
      if (category == "coach") {
        var itemContainerC = document.createElement("div");
        itemContainerC.classList.add("item-container");
        document.querySelector(".containerC").append(itemContainerC);

        var itemImageC = document.createElement("img");
        itemImageC.classList.add("coach-image");
        itemImageC.classList.add("js-modal-toggle");
        itemImageC.src = item.fields.image[0].url;
        itemContainerC.appendChild(itemImageC);

        //add modal container to song container
        var modalContainerC = document.createElement("div");
        modalContainerC.classList.add("modal-container");
        itemContainerC.append(modalContainerC);

        //add modal box to modal container
        var modalBoxC = document.createElement("div");
        modalBoxC.classList.add("modal-box");
        modalContainerC.append(modalBoxC);

        //add image to modal box
        var modalImageC = document.createElement("img");
        modalImageC.classList.add("modal-image");
        modalImageC.src = item.fields.image[0].url;
        modalBoxC.append(modalImageC);

        //add caption to modal box
        var itemNameC = document.createElement("h2");
        itemNameC.classList.add("itemName");
        itemNameC.innerText = item.fields.caption;
        modalBoxC.append(itemNameC);

        //close modal button
        var closeModalBtn = document.createElement("div");
        closeModalBtn.classList.add("modal-close-btn");
        closeModalBtn.classList.add("js-modal-toggle");
        closeModalBtn.innerHTML = "x";
        modalBoxC.append(closeModalBtn);
      }
    });
  });

  //close and open modal
  //find all of our modals
  var modals = document.querySelectorAll(".item-container");

  //check if there are modals
  if (modals) {
    modals.forEach((modal) => {
      const toggles = modal.querySelectorAll(".js-modal-toggle");

      //add event listener to each toggle
      toggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
          modal.classList.toggle("modal-is-active");
        });
      });
    });
  }
}
