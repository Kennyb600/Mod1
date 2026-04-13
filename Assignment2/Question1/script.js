// cached sorted employees and formatter used by search
let sortedEmployeesCache = [];
let salaryFormatter = null;

async function fetchEmployees() {
    try {
        const response = await fetch('../employees.json');

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        // FIX: Pass the array inside the 'employees' property, not the root object
        processEmployees(data.employees);

        // wire up search input to filter the displayed list
        const searchEl = document.getElementById('search');
        if (searchEl) {
            searchEl.addEventListener('input', (e) => {
                const q = e.target.value.trim().toLowerCase();
                if (!q) {
                    displayEmployees(sortedEmployeesCache, salaryFormatter);
                    return;
                }
                const filtered = sortedEmployeesCache.filter(emp => {
                    const full = `${emp.firstName} ${emp.lastName}`.toLowerCase();
                    return full.includes(q) || String(emp.id) === q;
                });
                displayEmployees(filtered, salaryFormatter);
            });
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

fetchEmployees();

function processEmployees(employees) {
    if (!Array.isArray(employees)) {
        console.error('processEmployees: expected an array');
        return;
    }

    // Create a sorted copy by age (ascending) without mutating original
    const sorted = [...employees].sort((a, b) => a.age - b.age);

    // Map to full names using destructuring
    const fullNames = sorted.map(({ firstName, lastName }) => `${firstName} ${lastName}`);
    console.log('Full Names:', fullNames);

    // Reduce total salary (coerce salary to Number to be resilient)
    const totalSalary = sorted.reduce((total, emp) => total + (Number(emp.salary) || 0), 0);

    // Format as currency
    const formatter = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'JMD', maximumFractionDigits: 0 });

    // update shared cache/formatter for search
    sortedEmployeesCache = sorted;
    salaryFormatter = formatter;

    const totalEl = document.getElementById('totalSalary');
    if (totalEl) {
        totalEl.textContent = `Total Salary: ${formatter.format(totalSalary)}`;
    }

    // Filter high earners
    const highEarners = sorted.filter(emp => Number(emp.salary) > 55000);
    console.log('High Earners:', highEarners.map(emp => emp.firstName));

    // Render employees to the page
    displayEmployees(sorted, formatter);

    // Persist sorted list in localStorage
    try {
        localStorage.setItem('sortedEmployees', JSON.stringify(sorted));
        
        // ADD THIS LINE: Save a dummy theme preference
        localStorage.setItem('themePreference', 'dark'); 
        
    } catch (e) {
        console.warn('Could not write to localStorage', e);
    }

function displayEmployees(employees, formatter) {
    const demo = document.getElementById('demo');
    if (!demo) return;

    demo.innerHTML = '';
    const list = document.createElement('ul');
    employees.forEach(emp => {
        const li = document.createElement('li');
        const salary = formatter ? formatter.format(Number(emp.salary) || 0) : emp.salary;
        li.textContent = `${emp.firstName} ${emp.lastName} — Age: ${emp.age} — Salary: ${salary}`;
        list.appendChild(li);
    });
    demo.appendChild(list);
}

// Demonstrate getItem()
document.getElementById('btnLoad').addEventListener('click', () => {
    const savedData = localStorage.getItem('sortedEmployees');
    const statusEl = document.getElementById('storageStatus');
    
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        console.log("Successfully loaded from localStorage:", parsedData);
        statusEl.textContent = "Data loaded from local storage!";
        
        // Actually display the data on the screen using the saved storage
        displayEmployees(parsedData, salaryFormatter);
    } else {
        statusEl.textContent = "No data found. It might have been removed or cleared.";
        // Clear the screen to show there is no data
        document.getElementById('demo').innerHTML = ''; 
    }
});

// Demonstrate removeItem()
document.getElementById('btnRemove').addEventListener('click', () => {
    localStorage.removeItem('sortedEmployees');
    document.getElementById('storageStatus').textContent = "'sortedEmployees' item has been removed from localStorage.";
    
    // Clear the screen so the user sees the data is gone
    document.getElementById('demo').innerHTML = '';
});

// Demonstrate clear()
document.getElementById('btnClear').addEventListener('click', () => {
    localStorage.clear();
    document.getElementById('storageStatus').textContent = "All localStorage data has been entirely cleared.";
    
    // Clear the screen so the user sees the data is gone
    document.getElementById('demo').innerHTML = '';
});