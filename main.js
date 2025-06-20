  const employees = [
  { empId: 101, name: "Neha soni", salary: 55000, department: "HR" },
  { empId: 102, name: "atharv mishra", salary: 72000, department: "Engineering" },
  { empId: 103, name: "keya patadiya", salary: 48000, department: "Marketing" },
  { empId: 104, name: "yatri shah", salary: 80000, department: "Management" },
  { empId: 105, name: "rohan patel", salary: 60000, department: "Sales" },
  { empId: 106, name: "ram soni", salary: 70000, department: "HR" },
  { empId: 107, name: "tapan adeshara", salary: 52000, department: "Computer Engineer" },

];

let currentEmployees = [...employees];   //copy of the orignal employee list

function renderTable(data) {    
  const tbody = document.getElementById("employeeTableBody");  //it is use to rander data inside html body
  tbody.innerHTML = "";

  data.forEach(emp => {
    const row = document.createElement("tr"); //for  each employee tabale row

    row.innerHTML = `
      <td>${emp.empId}</td>
      <td>${emp.name}</td>
      <td>${emp.salary}</td>
      <td>${emp.department || ""}</td>
      <td><button class="delete-btn" onclick="deleteEmployee(${emp.empId})">Delete</button></td>`; // delete enployee

    tbody.appendChild(row);  //append to the table body
  });
}

function deleteEmployee(empId) {
  currentEmployees = currentEmployees.filter(emp => emp.empId !== empId);
  applyFilters();
}

function applyFilters() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const sortValue = document.getElementById("sortSelect").value;    //sort the value asc/dsc

  let filtered = currentEmployees.filter(emp =>
    emp.name.toLowerCase().includes(searchValue)
  );

  if (sortValue === "asc") {
    filtered.sort((a, b) => a.salary - b.salary);
  } else if (sortValue === "desc") {
    filtered.sort((a, b) => b.salary - a.salary);
  }

  renderTable(filtered);  //when data change also re-apply filter
}

document.getElementById("searchInput").addEventListener("input", applyFilters);
document.getElementById("sortSelect").addEventListener("change", applyFilters);

renderTable(currentEmployees);  //on page reload data restore