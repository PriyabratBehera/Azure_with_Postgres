async function loadEmployees() {

    const response =
        await fetch("/api/employees");

    const employees =
        await response.json();

    const table =
        document.getElementById("employeeTable");

    table.innerHTML = "";

    employees.forEach(employee => {

        table.innerHTML += `

            <tr>

                <td>${employee.id}</td>

                <td>${employee.name}</td>

                <td>${employee.email}</td>

                <td>${employee.department}</td>

                <td>

                    <button
                        onclick="deleteEmployee(${employee.id})">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });

}


async function addEmployee() {

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const department =
        document.getElementById("department").value;


    if (!name || !email || !department) {

        alert("Please fill all fields");

        return;

    }


    const response = await fetch(
        "/api/employees",
        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                name,
                email,
                department

            })

        }
    );


    if (response.ok) {

        document.getElementById("name").value = "";

        document.getElementById("email").value = "";

        document.getElementById("department").value = "";

        loadEmployees();

    }

}


async function deleteEmployee(id) {

    await fetch(
        `/api/employees/${id}`,
        {
            method: "DELETE"
        }
    );

    loadEmployees();

}


loadEmployees();