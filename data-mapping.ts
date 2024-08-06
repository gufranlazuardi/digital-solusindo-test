interface DataGroup {
  branch: string;
  posting_date: string;
}

const data_group: DataGroup[] = [
  { branch: "Surabaya", posting_date: "2024-01-01" },
  { branch: "Surabaya", posting_date: "2024-01-02" },
  { branch: "Surabaya", posting_date: "2024-01-03" },
  { branch: "Jakarta", posting_date: "2024-01-01" },
  { branch: "Jakarta", posting_date: "2024-01-03" },
];

interface DataRaw {
  branch: string;
  posting_date: string;
  customer: string;
  grand_total: number;
}

const data_raw: DataRaw[] = [
  {
    branch: "Surabaya",
    posting_date: "2024-01-01",
    customer: "CUST-001",
    grand_total: 100000,
  },
  {
    branch: "Surabaya",
    posting_date: "2024-01-01",
    customer: "CUST-001",
    grand_total: 560000,
  },
  {
    branch: "Jakarta",
    posting_date: "2024-01-01",
    customer: "CUST-001",
    grand_total: 720000,
  },
  {
    branch: "Surabaya",
    posting_date: "2024-01-02",
    customer: "CUST-001",
    grand_total: 340000,
  },
  {
    branch: "Surabaya",
    posting_date: "2024-01-02",
    customer: "CUST-001",
    grand_total: 568000,
  },
  {
    branch: "Surabaya",
    posting_date: "2024-01-02",
    customer: "CUST-001",
    grand_total: 142000,
  },
  {
    branch: "Surabaya",
    posting_date: "2024-01-02",
    customer: "CUST-001",
    grand_total: 256000,
  },
  {
    branch: "Surabaya",
    posting_date: "2024-01-03",
    customer: "CUST-001",
    grand_total: 234500,
  },
  {
    branch: "Surabaya",
    posting_date: "2024-01-03",
    customer: "CUST-001",
    grand_total: 345600,
  },
  {
    branch: "Jakarta",
    posting_date: "2024-01-03",
    customer: "CUST-001",
    grand_total: 125000,
  },
  {
    branch: "Jakarta",
    posting_date: "2024-01-03",
    customer: "CUST-001",
    grand_total: 70000,
  },
  {
    branch: "Jakarta",
    posting_date: "2024-01-03",
    customer: "CUST-001",
    grand_total: 86000,
  },
];

interface Result {
  indent: number;
  branch?: string;
  posting_date?: string;
  customer?: string;
  grand_total: number;
}

function mappingData(data_raw: DataRaw[]): Result[] {
  const result: Result[] = [];
  const branchTotals: { [key: string]: number } = {};
  const dateTotals: { [key: string]: number } = {};

  data_raw.forEach((entry) => {
    const branchKey = entry.branch;
    const dateKey = `${entry.branch}-${entry.posting_date}`;

    branchTotals[branchKey] =
      (branchTotals[branchKey] || 0) + entry.grand_total;
    dateTotals[dateKey] =
      (dateTotals[dateKey] || 0) + entry.grand_total;
  });

  Object.keys(branchTotals).forEach((branch) => {
    result.push({
      indent: 0,
      branch,
      grand_total: branchTotals[branch],
    });

    data_raw
      .filter((entry) => entry.branch === branch)
      .forEach((entry) => {
        const dateKey = `${entry.branch}-${entry.posting_date}`;
        if (
          !result.find(
            (r) =>
              r.posting_date === entry.posting_date &&
              r.branch === entry.branch &&
              r.indent === 1
          )
        ) {
          result.push({
            indent: 1,
            posting_date: entry.posting_date,
            grand_total: dateTotals[dateKey],
          });
        }

        result.push({
          indent: 2,
          branch: entry.branch,
          posting_date: entry.posting_date,
          customer: entry.customer,
          grand_total: entry.grand_total,
        });
      });
  });

  return result;
}

const result = mappingData(data_raw);
console.log(result);
