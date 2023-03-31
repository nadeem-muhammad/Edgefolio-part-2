// fetch the data from the JSON file and display the data using the HTML Table:
const url = "./json/fund_data.json";
const tableBody = document.querySelector("#data-table tbody");
const searchInput = document.querySelector("#search-input");

// create a table row and fill the td with the JSON data.  There is a flag set if the data does not exist then it will display Data not found across the whole row
const createRow = (record, isNotFound) => {
	const row = document.createElement("tr");

	// data not found so display message across the 6 td
	if (isNotFound) {
	  const td = document.createElement("td");
	  td.textContent = "Data not found";
	  td.setAttribute("colspan", "6");
	  row.appendChild(td);
	} else {
	  // data found so with each key of the data, display its properties using the fetch method below
	  const keys = ['Name', 'AUM', 'Strategy', 'Inception Date', 'Regional Focus', 'YTD Performance (%)'];
	  for (let i = 0; i < keys.length; i++) {
		const td = document.createElement("td");
		td.textContent = record[keys[i]];
		row.appendChild(td);
	  }
	}
	return row;
  };  
  
fetch(url)
  .then(response => response.json())
  .then(data => {
    data.forEach(record => {
      const row = createRow(record);
      tableBody.appendChild(row);
    });

    // search input by Fund Name using an addEL on input
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.trim().toLowerCase();

      // filter the data array to include only records whose fund name includes the search term
      const filteredData = data.filter(record => record['Name'].toLowerCase().includes(searchTerm));

      // clear the current rows from the table body
      tableBody.innerHTML = "";

      // add rows for the filtered data to the table body
      if (filteredData.length === 0) {
		const row = createRow({}, true);
		tableBody.appendChild(row);
      } else {
			filteredData.forEach(record => {
			const row = createRow(record, false);
			tableBody.appendChild(row);
        });
      }
    });
  })
  .catch(error => console.error(error));
