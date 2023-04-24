const data = [
    { property1: 'PG4', property2: '6 Lawrence St. Glasgow', property3: 'flat', property4:'3', property5:'350' },
    { property1: 'PG1', property2: '15 Kelvin Drive Glasgow', property3: 'house', property4:'4', property5:'700' },
    { property1: 'PG2', property2: '25 Argyle St. Edinburgh', property3: 'apartment', property4:'2', property5:'500' },
    { property1: 'PG3', property2: '10 Hope St. Aberdeen', property3: 'flat', property4:'1', property5:'300' },
    { property1: 'PG4', property2: '6 George Square Glasgow', property3: 'studio', property4:'1', property5:'400' },
    { property1: 'PG5', property2: '30 Sauchiehall St. Glasgow', property3: 'apartment', property4:'2', property5:'600' },
    { property1: 'PG1', property2: '12 Buchanan St. Edinburgh', property3: 'flat', property4:'2', property5:'450' },
    { property1: 'PG3', property2: '5 Union St. Dundee', property3: 'house', property4:'5', property5:'800' },
    { property1: 'PG2', property2: '20 Rose St. Glasgow', property3: 'apartment', property4:'1', property5:'350' },
    { property1: 'PG5', property2: '8 Princes St. Edinburgh', property3: 'flat', property4:'3', property5:'550' }
  ];
  

function generateTable(){
    const BranchAddress = document.getElementById("BranchAddress").value;
    const TeleNo = document.getElementById("TeleNo").value;

    // const filterData = data.filter((item)=>{
    //     return item.BranchNumber === BranchNumber && item.BranchAddress === BranchAddress && item.TeleNo === TeleNo;
    // })

  if(BranchAddress ==="B" && TeleNo === "9"){
        // return data;
  const table = document.createElement("table");

  const heading1 = document.createElement("th");
  heading1.textContent = "Property No";
  const heading2 = document.createElement("th");
  heading2.textContent = "Address";
  const heading3 = document.createElement("th");
  heading3.textContent = "Type";
  const heading4 = document.createElement("th");
  heading4.textContent = "Rooms";
  const heading5 = document.createElement("th");
  heading5.textContent = "Rent";

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
    const column5 = document.createElement("td");
    column5.textContent = item.property5;

    row.appendChild(column1);
    row.appendChild(column2);
    row.appendChild(column3);
    row.appendChild(column4);
    row.appendChild(column5);

    table.appendChild(row);
    });

  const headingRow = document.createElement("tr");
  headingRow.appendChild(heading1);
  headingRow.appendChild(heading2);
  headingRow.appendChild(heading3);
  headingRow.appendChild(heading4);
  headingRow.appendChild(heading5);
  table.insertBefore(headingRow, table.firstChild);

  const tableContainer = document.getElementById("table-container");
  tableContainer.innerHTML = "";
  tableContainer.appendChild(table);
}

  }