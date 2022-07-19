const vendors = [
  {
    name: "A",
    cap: 500,
    profit: 10,
    allocation: null,
  },
  {
    name: "B",
    cap: 600,
    profit: 20,
    allocation: null,
  },
  {
    name: "C",
    cap: 100,
    profit: 5,
    allocation: null,
  },
  {
    name: "D",
    cap: 700,
    profit: 5,
    allocation: null,
  },
];

const allocate = (budget) => {
  const allocatedVendors = [];
  const sortedVendors = vendors.sort(function (a, b) {
    return b.profit - a.profit;
  });
  do {
    if (budget < sortedVendors[0].cap) {
      sortedVendors[0].allocation = budget;
      budget = 0;
      allocatedVendors.push(sortedVendors[0]);
      sortedVendors.shift();
    }
    if (budget > sortedVendors[0].cap) {
      sortedVendors[0].allocation = sortedVendors[0].cap;
      budget = budget - sortedVendors[0].allocation;
      allocatedVendors.push(sortedVendors[0]);
      sortedVendors.shift();
    }
  } while (budget > 0);
  console.log(allocatedVendors);
};

allocate(1000);
