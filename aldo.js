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
      if (category == "aldo") {
        var itemContainerA = document.createElement("div");
        itemContainerA.classList.add("item-container");
        document.querySelector(".containerA").append(itemContainerA);

        //display aldo images
        var itemImageA = document.createElement("img");
        itemImageA.classList.add("aldo-image");
        itemImageA.classList.add("js-modal-toggle");
        itemImageA.src = item.fields.image[0].url;
        itemContainerA.appendChild(itemImageA);

        //add modal container to song container
        var modalContainer = document.createElement("div");
        modalContainer.classList.add("modal-container");
        itemContainerA.append(modalContainer);

        //add modal box to modal container
        var modalBox = document.createElement("div");
        modalBox.classList.add("modal-box");
        modalContainer.append(modalBox);

        //add image to modal box
        var modalImage = document.createElement("img");
        modalImage.classList.add("modal-image");
        modalImage.src = item.fields.image[0].url;
        modalBox.append(modalImage);

        //add caption to modal box
        var itemName = document.createElement("h2");
        itemName.classList.add("itemName");
        itemName.innerText = item.fields.caption;
        modalBox.append(itemName);

        //close modal button
        var closeModalBtn = document.createElement("div");
        closeModalBtn.classList.add("modal-close-btn");
        closeModalBtn.classList.add("js-modal-toggle");
        closeModalBtn.innerHTML = "x";
        modalBox.append(closeModalBtn);
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

