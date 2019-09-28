// from data.js
var tableData = data;

// YOUR CODE HERE!
//var $tbody = document.querySelector("tbody");
//var $dateInput = document.querySelector("#datetime");
//var $searchBtn = document.querySelector("#search");
//var $cityInput = document.querySelector("#city");
//var $stateInput = document.querySelector("#state");
//var $countryInput = document.querySelector("#country");
//var $shapeInput = document.querySelector("#shape");

//var $searchBtn = document.querySelector("#search");
//var $searchBtn1 = document.querySelector("#search1");
//var $searchBtn2 = document.querySelector("#search2");
//var $searchBtn3 = document.querySelector("#search3");
//var $searchBtn4 = document.querySelector("#search4");


//$searchBtn1.addEventListener("click", handleSearchButtonClick1);
//$searchBtn2.addEventListener("click", handleSearchButtonClick2);
//$searchBtn3.addEventListener("click", handleSearchButtonClick3);
//$searchBtn4.addEventListener("click", handleSearchButtonClick4);
//$searchBtn.addEventListener("click", handleSearchButtonClick);

//function renderTable() {
//    $tbody.innerHTML = "";
//    for (var i = 0; i < tableData.length; i++) {
//      // Get get the current UFO object and its fields
//      var ufo = tableData[i];
//      var observations = Object.keys(ufo);
//      // Create a new row in the tbody, set the index to be i + startingIndex
//      var $row = $tbody.insertRow(i);
//      for (var j = 0; j < observations.length; j++) {
        // For every observations in the ufo object, create a new cell at set its inner text to be the current value at the current     ufo'sobservation
//        var observation = observations[j];
//        var $cell = $row.insertCell(j);
//        $cell.innerText = ufo[observation];
//      }
//    }
//  }

//  function handleSearchButtonClick() {
    // Format the user's search by removing leading and trailing whitespace, lowercase the string
//    var filterDate = $dateInput.value.trim();
    // Set filteredUFOs to an array of all ufos whose "date" matches the filter
//    tableData = data.filter(function (ufo) {
//      var ufoDate = ufo.datetime.toLowerCase();
  
      // If true, add the date to the filteredUFO, otherwise don't add it to filteredUFO
//      return ufoDate === filterDate;
//    });
  
//    renderTable();
//  }
  
  
//  function handleSearchButtonClick1() {
    // Format the user's search by removing leading and trailing whitespace, lowercase the string
  
//    var filterCity = $cityInput.value.trim().toLowerCase();
  
    // Set filteredUFOs to an array of all ufos whose "city" matches the filter
//    tableData = data.filter(function (ufo) {
//      var ufoCity = ufo.city.toLowerCase();
  
      // If true, add the city to the filteredUFO, otherwise don't add it to filteredUFO
//      return ufoCity === filterCity;
//    });
  
//    renderTable();
//  }
  
  
//  function handleSearchButtonClick2() {
    // Format the user's search by removing leading and trailing whitespace, lowercase the string
  
//    var filterState = $stateInput.value.trim().toLowerCase();
  
    // Set filteredUFOs to an array of all ufos whose "state" matches the filter
//    tableData = data.filter(function (ufo) {
//      var ufoState = ufo.state.toLowerCase();
  
      // If true, add the state to the filteredUFO, otherwise don't add it to filteredUFO
//      return ufoState === filterState;
//    });
  
//    renderTable();
//  }
  
  
//  function handleSearchButtonClick3() {
    // Format the user's search by removing leading and trailing whitespace, lowercase the string
  
//    var filterCountry = $countryInput.value.trim().toLowerCase();
  
    // Set filteredUFOs to an array of all ufos whose "country" matches the filter
//    tableData = data.filter(function (ufo) {
//      var ufoCountry = ufo.country.toLowerCase();
  
      // If true, add the country to the filteredUFO, otherwise don't add it to filteredUFO
//      return ufoCountry === filterCountry;
//    });
  
//    renderTable();
//  }
  
  
//  function handleSearchButtonClick4() {
    // Format the user's search by removing leading and trailing whitespace, lowercase the string
  
//    var filterShape = $shapeInput.value.trim().toLowerCase();
  
    // Set filteredUFOs to an array of all ufos whose "shape" matches the filter
//    tableData = data.filter(function (ufo) {
//      var ufoShape = ufo.shape.toLowerCase();
  
      // If true, add the shape to the filteredUFO, otherwise don't add it to filteredUFO
//      return ufoShape === filterShape;
//    });
  
//    renderTable();
//  }
//  renderTable();

var tbody = d3.select("tbody");

function appendRowsAndData(obj) {
    var row = tbody.append("tr");

    // Below loop assumes object keys are in same order and are present every time
    Object.entries(obj).forEach(([key, value]) => {
        row.append("td").text(value); 
    })
};

// Append all table rows and data
data.forEach(appendRowsAndData);

var button = d3.select("#filter-btn");

// Only runs when button is clicked or user presses enter
button.on("click", function() {
    d3.event.preventDefault();

    var dateInput = d3.select("#datetime");
    var datetime = dateInput.property("value");

    var filterInputs = {};

    if (datetime !== "") {
        filterInputs.datetime = datetime;
    }

    // This variable set in moreFilters.on()
    if (usingMoreFilters) {
        var cityFilter = d3.select("#City-filter");
        var city = cityFilter.property("value").toLowerCase();

        if (city !== "") {
            filterInputs.city = city;
        }

        var stateFilter = d3.select("#State-filter");
        var state = stateFilter.property("value").toLowerCase();

        if (state !== "") {
            filterInputs.state = state;
        }

        var countryFilter = d3.select("#Country-filter");
        var country = countryFilter.property("value").toLowerCase();

        if (country !== "") {
            filterInputs.country = country;
        }

        var shapeFilter = d3.select("#Shape-filter");
        var shape = shapeFilter.property("value").toLowerCase();
        
        if (shape !== "") {
            filterInputs.shape = shape;
        }
    }

    var filtered = tableData.filter(obj => {
        var criteria = true;
        Object.entries(filterInputs).forEach(([key, value]) => {
            criteria = criteria && (obj[key] === value);
        });
        return criteria;
    });

    console.log(filtered);

    tbody.html("");

    filtered.forEach(appendRowsAndData);
});

var resetFilters = d3.select("#reset-filter-btn");
var moreFilters = d3.select("#more-filter-btn");
var usingMoreFilters = false;

moreFilters.on("click", function() {
    d3.event.preventDefault();

    usingMoreFilters = true;

    // Use for loop to create additional filters
    var filters = d3.select("#filters");
    const filterList = ["City", "State", "Country", "Shape"];

    filterList.forEach(filter => {
        var newLi = filters.append("li").attr("class","filter list-group-item");
        newLi.append("label").attr("for", filter).text(`Enter a ${filter}`);
        newLi.append("input").attr("class", "form-control")
                             .attr("type", "text")
                             .attr("id", `${filter}-filter`);
    });
    moreFilters.style("display", "none");
    resetFilters.style("display", "block");
});

// "reset" button clears filters and displays all data
resetFilters.on("click", function() {
    d3.event.preventDefault();

    var allFilters = d3.selectAll("input")
                       .property("value", "");
    data.forEach(appendRowsAndData);
});