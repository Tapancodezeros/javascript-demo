const employees = [
  { empId: 101, name: "Neha soni", salary: 55000, department: "HR", joiningDate: "2022-03-01" },
  { empId: 102, name: "aakansha mishra", salary: 72000, department: "Engineering", joiningDate: "2021-06-05" },
  { empId: 103, name: "keya patadiya", salary: 48000, department: "Marketing", joiningDate: "2020-07-20" },
  { empId: 104, name: "yatri shah", salary: 80000, department: "Management", joiningDate: "2019-05-08" },
  { empId: 105, name: "rohan patel", salary: 60000, department: "Sales", joiningDate: "2017-03-03" },
  { empId: 106, name: "ram soni", salary: 70000, department: "HR", joiningDate: "2022-12-11" },
  { empId: 107, name: "tapan adesara", salary: 52000, department: "Computer Engineer", joiningDate: "2023-06-27" },
  { empId: 108, name: "sandip chadotara", salary: 30000, department: "Computer Engineer", joiningDate: "2024-08-22" },
  { empId: 109, name: "vidhi patel", salary: 40000, department: "sr.Computer Engineer", joiningDate: "2019-06-13" },
  { empId: 110, name: "chintan patel", salary: 35000, department: "delevery manager", joiningDate: "2019-11-30" },
  { empId: 111, name: "navin prajapati", salary: 55000, department: "delevery manager", joiningDate: "2019-01-22" },
  { empId: 112, name: "git jadeja", salary: 130000, department: "delevery manager", joiningDate: "2011-11-11" },
  { empId: 113, name: "aagam shah", salary: 125000, department: "delevery manager", joiningDate: "2012-02-01" },
  { empId: 114, name: "rutvi shah", salary: 115000, department: "delevery manager", joiningDate: "2013-01-01" },
  { empId: 115, name: "rajvi singh", salary: 100000, department: "delevery manager", joiningDate: "2014-12-01" },
  { empId: 116, name: "keyur bhuvaji", salary: 85000, department: "delevery manager", joiningDate: "2015-07-01" },
  { empId: 117, name: "kaushik patel", salary: 44000, department: "delevery manager", joiningDate: "2016-08-01" },
  { empId: 118, name: "raj patel", salary: 66000, department: "delevery manager", joiningDate: "2017-09-01" }

];

let currentEmployees = [...employees];
let editingEmpId = null;

// Calculates the experience in years and months from the joining date.
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

// Renders the employee table with given data
function renderTable(data) {
  const tbody = document.getElementById("employeeTableBody");
  tbody.innerHTML = "";
  data.forEach(emp => {
    const row = document.createElement("tr");
    if (emp.empId === editingEmpId) {
      row.innerHTML = `
        <td>${emp.empId}</td>
        <td><input type="text" id="editName" value="${emp.name}"></td>
        <td><input type="number" id="editSalary" value="${emp.salary}"></td>
        <td>${emp.department}</td>
        <td>${emp.joiningDate}</td>
        <td>${calculateExperience(emp.joiningDate)}</td>
        <td>
          <button onclick="saveInlineEdit(${emp.empId})">Save</button>
          <button onclick="cancelInlineEdit()">Cancel</button>
        </td>
      `;
    } else {
      row.innerHTML = `
        <td>${emp.empId}</td>
        <td>${emp.name}</td>
        <td>${emp.salary}</td>
        <td>${emp.department}</td>
        <td>${emp.joiningDate}</td>
        <td>${calculateExperience(emp.joiningDate)}</td>
        <td>
          <button onclick="deleteEmployee(${emp.empId})" ${editingEmpId !== null ? "disabled" : ""}>Delete</button>
          <button onclick="editEmployee(${emp.empId})" ${editingEmpId !== null ? "disabled" : ""}>Edit</button>
        </td>
      `;
    }
    tbody.appendChild(row);
  });
}

// Deletes an employee by ID
function deleteEmployee(empId) {
  currentEmployees = currentEmployees.filter(emp => emp.empId !== empId);
  applyFilters();
}

// Starts editing mode for selected employee
function editEmployee(empId) {
  editingEmpId = empId;
  renderTable(currentEmployees);
}

// Saves the edited data
function saveInlineEdit(empId) {
  const name = document.getElementById("editName").value.trim();
  const salary = parseFloat(document.getElementById("editSalary").value);
  if (!name || isNaN(salary)) {
    alert("Please enter valid name and salary.");
    return;
  }
  const index = currentEmployees.findIndex(emp => emp.empId === empId);
  if (index !== -1) {
    currentEmployees[index].name = name;
    currentEmployees[index].salary = salary;
  }
  editingEmpId = null;
  applyFilters();
}

// Cancels editing
function cancelInlineEdit() {
  editingEmpId = null;
  renderTable(currentEmployees);
}

// Applies search, sort, year and date range filters independently
function applyFilters() {
  let filtered = [...currentEmployees];

  // Search Filter
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  if (searchValue) {
    filtered = filtered.filter(emp =>
      emp.name.toLowerCase().includes(searchValue)
    );
  }

  // Year Filter
  const yearValue = document.getElementById("yearFilter").value;
  if (yearValue) {
    filtered = filtered.filter(emp =>
      new Date(emp.joiningDate).getFullYear() == yearValue
    );
  }

  // Date Range Filter
  const fromDate = document.getElementById("fromDate").value;
  const toDate = document.getElementById("toDate").value;
  if (fromDate && toDate) {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    filtered = filtered.filter(emp => {
      const join = new Date(emp.joiningDate);
      return join >= from && join <= to;
    });
  }

  // Sorting
  const sortValue = document.getElementById("sortSelect").value;
  if (sortValue === "asc") {
    filtered.sort((a, b) => a.salary - b.salary);
  } else if (sortValue === "desc") {
    filtered.sort((a, b) => b.salary - a.salary);
  }

  //  Count Display (optional)
  let countMessage = '';
  if (yearValue && fromDate && toDate) {
    countMessage = `Employees joined in ${yearValue} from ${fromDate} to ${toDate}: ${filtered.length}`;
  } else if (yearValue) {
    countMessage = `Employees joined in ${yearValue}: ${filtered.length}`;
  } else if (fromDate && toDate) {
    countMessage = `Employees joined from ${fromDate} to ${toDate}: ${filtered.length}`;
  } else {
    countMessage = '';
  }
  document.getElementById("countDisplay").innerText = countMessage;

  renderTable(filtered);
}

// Auto-fill date range when year is selected
document.getElementById("yearFilter").addEventListener("input", function () {
  const year = this.value;
  if (year && year >= 2010 && year <= 2100) {
    document.getElementById("fromDate").value = `${year}-01-01`;
    document.getElementById("toDate").value = `${year}-12-31`;
  }
  applyFilters();
});

//  Event listeners for real-time filtering/sorting
document.getElementById("searchInput").addEventListener("input", applyFilters);
document.getElementById("sortSelect").addEventListener("change", applyFilters);
document.getElementById("fromDate").addEventListener("change", applyFilters);
document.getElementById("toDate").addEventListener("change", applyFilters);

// Initial render
renderTable(currentEmployees);
