const data = [
    { property1: 'Awhjkf  hsdkjfwie jfksdnfkjwehfj', property2: 'Xowejrejiltherqlit', property3: 'fookjwh eierhrk' },
    { property1: 'B', property2: 'Y', property3: 'bar' },
    { property1: 'A', property2: 'Z', property3: 'baz' },
    { property1: 'C', property2: 'X', property3: 'foo' },
    { property1: 'B', property2: 'Z', property3: 'qux' },
    { property1: 'A', property2: 'X', property3: 'quux' },
    { property1: 'C', property2: 'Y', property3: 'quuz' },
    { property1: 'B', property2: 'Y', property3: 'corge' },
    { property1: 'C', property2: 'Z', property3: 'grault' },
    { property1: 'A', property2: 'Y', property3: 'garply' }
  ];

function generateTable(){
    const BranchNumber = document.getElementById("BranchNumber").value;
    const BranchAddress = document.getElementById("BranchAddress").value;
    const TeleNo = document.getElementById("TeleNo").value;

    // const filterData = data.filter((item)=>{
    //     return item.BranchNumber === BranchNumber && item.BranchAddress === BranchAddress && item.TeleNo === TeleNo;
    // })

  if(BranchNumber === "A" && BranchAddress ==="B" && TeleNo === "9"){
        // return data;
  const table = document.createElement("table");

  const heading1 = document.createElement("th");
  heading1.textContent = "Staff Number";
  const heading2 = document.createElement("th");
  heading2.textContent = "Name";
  const heading3 = document.createElement("th");
  heading3.textContent = "Position";

  // filteredData.forEach((item) => {
    data.forEach((item) => {
    const row = document.createElement("tr");
    const column1 = document.createElement("td");
    column1.textContent = item.property1;
    const column2 = document.createElement("td");
    column2.textContent = item.property2;
    const column3 = document.createElement("td");
    column3.textContent = item.property3;

    row.appendChild(column1);
    row.appendChild(column2);
    row.appendChild(column3);

    table.appendChild(row);
    });

  const headingRow = document.createElement("tr");
  headingRow.appendChild(heading1);
  headingRow.appendChild(heading2);
  headingRow.appendChild(heading3);
  table.insertBefore(headingRow, table.firstChild);

  const tableContainer = document.getElementById("table-container");
  tableContainer.innerHTML = "";
  tableContainer.appendChild(table);
}

  }