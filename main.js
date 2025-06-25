const employees = [
  { empId: 101, name: "Neha soni", salary: 55000, department: "HR", joiningDate: "2022-03-01" },
  { empId: 102, name: "atharv mishra", salary: 72000, department: "Engineering", joiningDate: "2021-06-05" },
  { empId: 103, name: "keya patadiya", salary: 48000, department: "Marketing", joiningDate: "2020-07-20" },
  { empId: 104, name: "yatri shah", salary: 80000, department: "Management", joiningDate: "2019-05-08" },
  { empId: 105, name: "rohan patel", salary: 60000, department: "Sales", joiningDate: "2017-03-03" },
  { empId: 106, name: "ram soni", salary: 70000, department: "HR", joiningDate: "2022-12-11" },
  { empId: 107, name: "tapan adesara", salary: 52000, department: "Computer Engineer", joiningDate: "2023-06-27" },
  { empId: 108, name: "sandip chadotara", salary: 30000, department: "Computer Engineer", joiningDate: "2024-08-22" },
  { empId: 109, name: "vidhi rathod", salary: 40000, department: "sr.Computer Engineer", joiningDate: "2019-06-13" },
  { empId: 110, name: "chintan patel", salary: 35000, department: "delevery manager", joiningDate: "2019-11-30" },
];

let currentEmployees = [...employees];   //copy of employee list.

// Calculate the experience from joining date till now
function calculateExperience(joiningDate) {
  const join = new Date(joiningDate);
  const now = new Date();

  let years = now.getFullYear() - join.getFullYear();
  let months = now.getMonth() - join.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
}

// Render the employee data table
function renderTable(data) {
  const tbody = document.getElementById("employeeTableBody");
  tbody.innerHTML = "";

  data.forEach(emp => {
    const row = document.createElement("tr");
    const experience = calculateExperience(emp.joiningDate);

    row.innerHTML = `
      <td>${emp.empId}</td>
      <td>${emp.name}</td>
      <td>${emp.salary}</td>
      <td>${emp.department}</td>
      <td>${emp.joiningDate}</td>
      <td>${experience}</td>
      <td><button class="delete-btn" onclick="deleteEmployee(${emp.empId})">Delete</button></td>
    `;
    tbody.appendChild(row);
  });
}

// Delete an employee by empId
function deleteEmployee(empId) {
  currentEmployees = currentEmployees.filter(emp => emp.empId !== empId);
  applyFilters();
}

// Apply filters for search, sort, year, and date range
function applyFilters() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const sortValue = document.getElementById("sortSelect").value;
  const yearValue = document.getElementById("yearFilter").value;
  const fromDate = document.getElementById("fromDate").value;
  const toDate = document.getElementById("toDate").value;

  let filtered = currentEmployees.filter(emp =>
    emp.name.toLowerCase().includes(searchValue)
  );

  // Filter by year if selected
  if (yearValue) {
    filtered = filtered.filter(emp =>
      new Date(emp.joiningDate).getFullYear() == yearValue
    );

    // Filter further by date range within year if both dates provided
    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      filtered = filtered.filter(emp => {
        const join = new Date(emp.joiningDate);
        return join >= from && join <= to;
      });
      document.getElementById("countDisplay").innerText =
        `Employees joined in ${yearValue} from ${fromDate} to ${toDate}: ${filtered.length}`;
    } else {
      document.getElementById("countDisplay").innerText =
        `Employees joined in ${yearValue}: ${filtered.length}`;
    }
  }
  // Filter by custom date range only
  else if (fromDate && toDate) {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    filtered = filtered.filter(emp => {
      const join = new Date(emp.joiningDate);
      return join >= from && join <= to;
    });
    document.getElementById("countDisplay").innerText =
      `Employees joined from ${fromDate} to ${toDate}: ${filtered.length}`;
  } else {
    document.getElementById("countDisplay").innerText = "";
  }

  // Sort the results by salary
  if (sortValue === "asc") {
    filtered.sort((a, b) => a.salary - b.salary);
  } else if (sortValue === "desc") {
    filtered.sort((a, b) => b.salary - a.salary);
  }

  renderTable(filtered);
}

// Add event listener for search input & sort dropdown
document.getElementById("searchInput").addEventListener("input", applyFilters);

document.getElementById("sortSelect").addEventListener("change", applyFilters);

// Auto-fill date range fields when a year is selected
document.getElementById("yearFilter").addEventListener("input", function () {
  const year = this.value;

  if (year && year >= 2010 && year <= 2100) {
    document.getElementById("fromDate").value = `${year}-01-01`;
    document.getElementById("toDate").value = `${year}-12-31`;
  }

  applyFilters();
});

// Initial render of all employees
renderTable(currentEmployees);
