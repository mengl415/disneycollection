console.log("Hello world");

// load Airtable library, name it Airtable
var Airtable = require("airtable");
console.log(Airtable);

// connect airtable base to website w/ API
var base = new Airtable({apiKey: "keyzQjFfjYvxAob2b"}).base(
    "appsH7NqmKw8OFD7U"
);

// get airtable data, specify how to retrieve it with functions

base("disney").select({}).eachPage(gotPageOfItems, gotAllItems);

// empty array to hold data
const items = [];

// callback function that receives data
function gotPageOfItems(records, fetchNextPage){
    console.log("gotPageOfItems()");
    // add records from item to array
    items.push(...records);
    // request more papges
    fetchNextPage();
}

function gotAllItems(err){
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

  function showItems(){
      console.log("showItems()");
      items.forEach(item => {
          
        var itemContainer = document.createElement("div");
        itemContainer.classList.add("item-container");
        document.querySelector(".container").append(itemContainer);

        var itemImage = document.createElement("img");
        itemImage.classList.add("item-image");
        itemImage.src = item.fields.image[0].url;
        itemContainer.append(itemImage);


      })
  }