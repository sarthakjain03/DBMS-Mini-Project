const data = [
  { property1: 'CR76', property2: 'John kay', property3: '20/04/02', property4:'Too Remote'},
  { property1: 'CR88', property2: 'Jane Smith', property3: '22/05/02', property4:'Remote'},
  { property1: 'CR92', property2: 'David Brown', property3: '18/03/02', property4:'Urban'},
  { property1: 'CR79', property2: 'Alice Green', property3: '10/01/02', property4:'Urban'},
  { property1: 'CR84', property2: 'Bob Lee', property3: '15/02/02', property4:'Remote'},
  { property1: 'CR91', property2: 'Sophie Wang', property3: '28/06/02', property4:'Urban'},
  { property1: 'CR77', property2: 'Tom Lee', property3: '02/08/02', property4:'Remote'},
  { property1: 'CR85', property2: 'Linda Chen', property3: '09/09/02', property4:'Urban'},
  { property1: 'CR90', property2: 'Jerry Li', property3: '11/12/02', property4:'Urban'},
  { property1: 'CR82', property2: 'Chris Johnson', property3: '30/11/02', property4:'Remote'}
];
  

function generateTable(){
  const PropertyNumber = document.getElementById("PropertyNumber").value;
  const PropertyAddress = document.getElementById("PropertyAddress").value;
  const Type = document.getElementById("Type").value;
  const Rent = document.getElementById("Rent").value;

  if(PropertyNumber === 'B' && PropertyAddress ==="C" && Type==="flat" && Rent === "350"){
        // return data;
  const table = document.createElement("table");

  const heading1 = document.createElement("th");
  heading1.textContent = "Client No";
  const heading2 = document.createElement("th");
  heading2.textContent = "Name";
  const heading3 = document.createElement("th");
  heading3.textContent = "Date";
  const heading4 = document.createElement("th");
  heading4.textContent = "Comments";

  // filteredData.forEach((item) => {
    data.forEach((item) => {
    const row = document.createElement("tr");
    const column1 = document.createElement("td");
    column1.textContent = item.property1;
    const column2 = document.createElement("td");
    column2.textContent = item.property2;
    const column3 = document.createElement("td");
    column3.textContent = item.property3;
    const column4 = document.createElement("td");
    column4.textContent = item.property4;

    row.appendChild(column1);
    row.appendChild(column2);
    row.appendChild(column3);
    row.appendChild(column4);

    table.appendChild(row);
    });

  const headingRow = document.createElement("tr");
  headingRow.appendChild(heading1);
  headingRow.appendChild(heading2);
  headingRow.appendChild(heading3);
  headingRow.appendChild(heading4);
  table.insertBefore(headingRow, table.firstChild);

  const tableContainer = document.getElementById("table-container");
  tableContainer.innerHTML = "";
  tableContainer.appendChild(table);
}

  }