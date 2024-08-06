interface DataVisualization {
  branch: string;
  posting_date?: string;
  visitors?: number;
  total_transactions?: number;
}

const data_x: DataVisualization[] = [
  { branch: "Surabaya", posting_date: "2024-01-01", visitors: 100 },
  { branch: "Surabaya", posting_date: "2024-01-02", visitors: 80 },
  { branch: "Surabaya", posting_date: "2024-01-03", visitors: 25 },
  { branch: "Surabaya", posting_date: "2024-01-04", visitors: 36 },
  { branch: "Surabaya", posting_date: "2024-01-05", visitors: 48 },
  { branch: "Surabaya", posting_date: "2024-01-06", visitors: 24 },
  { branch: "Surabaya", posting_date: "2024-01-07", visitors: 35 },
  { branch: "Jakarta", posting_date: "2024-01-01", visitors: 200 },
  { branch: "Jakarta", posting_date: "2024-01-02", visitors: 235 },
  { branch: "Jakarta", posting_date: "2024-01-03", visitors: 125 },
  { branch: "Jakarta", posting_date: "2024-01-04", visitors: 115 },
  { branch: "Jakarta", posting_date: "2024-01-05", visitors: 168 },
  { branch: "Jakarta", posting_date: "2024-01-06", visitors: 56 },
  { branch: "Jakarta", posting_date: "2024-01-07", visitors: 300 },
];

const data_y: DataVisualization[] = [
  {
    branch: "Surabaya",
    posting_date: "2024-01-01",
    total_transactions: 35,
  },
  {
    branch: "Surabaya",
    posting_date: "2024-01-02",
    total_transactions: 24,
  },
  {
    branch: "Surabaya",
    posting_date: "2024-01-03",
    total_transactions: 8,
  },
  {
    branch: "Surabaya",
    posting_date: "2024-01-04",
    total_transactions: 19,
  },
  {
    branch: "Surabaya",
    posting_date: "2024-01-06",
    total_transactions: 9,
  },
  {
    branch: "Surabaya",
    posting_date: "2024-01-07",
    total_transactions: 12,
  },
  {
    branch: "Jakarta",
    posting_date: "2024-01-01",
    total_transactions: 135,
  },
  {
    branch: "Jakarta",
    posting_date: "2024-01-02",
    total_transactions: 124,
  },
  {
    branch: "Jakarta",
    posting_date: "2024-01-04",
    total_transactions: 18,
  },
  {
    branch: "Jakarta",
    posting_date: "2024-01-05",
    total_transactions: 79,
  },
  {
    branch: "Jakarta",
    posting_date: "2024-01-06",
    total_transactions: 19,
  },
  {
    branch: "Jakarta",
    posting_date: "2024-01-07",
    total_transactions: 112,
  },
];

function processData(
  data_x: DataVisualization[],
  data_y: DataVisualization[]
): any[] {
  const combinedData: { [key: string]: DataVisualization } = {};

  // Combine data_x and data_y
  data_x.forEach((entry) => {
    const key = `${entry.branch}-${entry.posting_date}`;
    if (!combinedData[key]) {
      combinedData[key] = {
        branch: entry.branch,
        posting_date: entry.posting_date,
        visitors: entry.visitors,
        total_transactions: 0,
      };
    } else {
      combinedData[key].visitors = entry.visitors;
    }
  });

  data_y.forEach((entry) => {
    const key = `${entry.branch}-${entry.posting_date}`;
    if (!combinedData[key]) {
      combinedData[key] = {
        branch: entry.branch,
        posting_date: entry.posting_date,
        visitors: 0,
        total_transactions: entry.total_transactions,
      };
    } else {
      combinedData[key].total_transactions = entry.total_transactions;
    }
  });

  // Calculate the ratios and format the result
  const finalResult: { [key: string]: any }[] = [];

  const branches = Array.from(
    new Set(
      data_x
        .map((entry) => entry.branch)
        .concat(data_y.map((entry) => entry.branch))
    )
  );

  branches.forEach((branch) => {
    const branchData: { [key: string]: number | string } = { branch };
    Object.keys(combinedData).forEach((key) => {
      const entry = combinedData[key];
      if (
        entry.branch === branch &&
        entry.visitors &&
        entry.total_transactions
      ) {
        branchData[entry.posting_date!] = (
          entry.total_transactions / entry.visitors
        ).toFixed(2);
      } else if (
        entry.branch === branch &&
        entry.visitors &&
        !entry.total_transactions
      ) {
        branchData[entry.posting_date!] = "0.00";
      }
    });
    finalResult.push(branchData);
  });

  return finalResult;
}

const finalResult = processData(data_x, data_y);
console.log(finalResult);
