function onOpen(e) {
  SpreadsheetApp.getUi()
    .createMenu("Allocator")
    .addItem("Allocate Vendors", "allocateVendors")
    .addToUi();
}

function allocateVendors() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = SpreadsheetApp.getActiveSheet().getDataRange().getValues();
  var ui = SpreadsheetApp.getUi();
  var budget = ui.prompt("Enter your budget");
  var parsedBudget = parseInt(budget.getResponseText());
  let vendors = [];
  const setVendors = () => {
    rows.forEach((row) => {
      vendors.push({
        vendor: row[0],
        cap: row[1],
        margin: row[2],
        allocation: null,
      });
    });
  };
  setVendors();
  vendors.shift();
  const sortedVendors = vendors.sort(function (a, b) {
    return b.margin - a.margin;
  });
  const allocatedVendors = [];
  do {
    if (parsedBudget < sortedVendors[0].cap) {
      sortedVendors[0].allocation = parsedBudget;
      parsedBudget = 0;
      allocatedVendors.push(sortedVendors[0]);
      sortedVendors.shift();
    }
    if (parsedBudget > sortedVendors[0].cap) {
      sortedVendors[0].allocation = sortedVendors[0].cap;
      parsedBudget = parsedBudget - sortedVendors[0].allocation;
      allocatedVendors.push(sortedVendors[0]);
      sortedVendors.shift();
    }
  } while (parsedBudget > 0 && sortedVendors.length > 0);

  let newRows = [];
  const setNewRows = () => {
    allocatedVendors.forEach((vendor) => {
      newRows.push([
        vendor.vendor,
        vendor.cap,
        vendor.margin,
        vendor.allocation,
      ]);
    });
  };
  setNewRows();
  var oldRows = SpreadsheetApp.getActiveSheet().getRange("A2:Z1000");
  oldRows.setValue("");
  const rowsLength = newRows.length;
  for (let i = 0; i < rowsLength; i++) {
    sheet.appendRow(newRows[0]);
    newRows.shift();
  }
}
