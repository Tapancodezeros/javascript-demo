const employees = [
  { empId: 101, name: "Neha soni", salary: 55000, department: "HR" },
  { empId: 102, name: "atharv mishra", salary: 72000, department: "Engineering" },
  { empId: 103, name: "keya patadiya", salary: 48000, department: "Marketing" },
  { empId: 104, name: "yatri shah", salary: 80000, department: "Management" },
  { empId: 105, name: "rohan patel", salary: 60000, department: "Sales" },
  { empId: 106, name: "ram soni", salary: 70000, department: "HR" },
  { empId: 107, name: "tapan adeshara", salary: 52000, department: "Computer Engineer" },
];

// Save data to localStorage
function saveToLocalStorage(data) {
  localStorage.setItem("employeeData", JSON.stringify(data));
}

// Load data from localStorage, or fallback to original list
function loadFromLocalStorage() {
  const data = localStorage.getItem("employeeData");
  return data ? JSON.parse(data) : [...employees];
}


let currentEmployees = loadFromLocalStorage();  // Load from local storage or fallback

function renderTable(data) {
  const tbody = document.getElementById("employeeTableBody");
  tbody.innerHTML = "";

  data.forEach(emp => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${emp.empId}</td>
      <td>${emp.name}</td>
      <td>${emp.salary}</td>
      <td>${emp.department || ""}</td>
      <td><button class="delete-btn" onclick="deleteEmployee(${emp.empId})">Delete</button></td>`;

    tbody.appendChild(row);
  });
}

function deleteEmployee(empId) {
  currentEmployees = currentEmployees.filter(emp => emp.empId !== empId);
  saveToLocalStorage(currentEmployees);  // Update local storage
  applyFilters();
}

function applyFilters() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const sortValue = document.getElementById("sortSelect").value;

  let filtered = currentEmployees.filter(emp =>
    emp.name.toLowerCase().includes(searchValue)
  );

  if (sortValue === "asc") {
    filtered.sort((a, b) => a.salary - b.salary);
  } else if (sortValue === "desc") {
    filtered.sort((a, b) => b.salary - a.salary);
  }

  renderTable(filtered);
}

document.getElementById("searchInput").addEventListener("input", applyFilters);
document.getElementById("sortSelect").addEventListener("change", applyFilters);

renderTable(currentEmployees);
