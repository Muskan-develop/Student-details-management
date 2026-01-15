// ===================== LOGIN FUNCTION =====================
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Login successful!");
            // ✅ redirect to student page after login
            window.location.href = "http://127.0.0.1:5500/student.html";
        } else {
            alert("Invalid username or password");
        }
    })
    .catch(err => {
        alert("Server error!");
        console.error(err);
    });
}


// ===================== ADD STUDENT FUNCTION =====================
function addStudent() {
    const name = document.getElementById("name").value;
    const roll_no = document.getElementById("roll_no").value;
    const department = document.getElementById("department").value;
    const email = document.getElementById("email").value;

    if (!name || !roll_no || !department || !email) {
        alert("Please fill all fields!");
        return;
    }

    fetch("http://localhost:3000/add-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, roll_no, department, email })
    })
    .then(res => res.json())
    .then(data => {
        alert("Student added successfully!");
        console.log(data);
        fetchStudents(); // ✅ refresh table
    })
    .catch(err => {
        console.error("Error:", err);
        alert("Failed to add student");
    });
}


// ===================== FETCH STUDENTS FUNCTION =====================
function fetchStudents() {
    fetch("http://localhost:3000/students")
        .then(res => res.json())
        .then(data => {
            const tableBody = document.getElementById("studentTableBody");
            tableBody.innerHTML = "";
            data.forEach(student => {
                const row = `<tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.roll_no}</td>
                    <td>${student.department}</td>
                    <td>${student.email}</td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(err => console.error("Error loading students:", err));
}


// ===================== AUTO LOAD STUDENTS WHEN PAGE OPENS =====================
window.onload = function() {
    if (window.location.pathname.endsWith("student.html")) {
        fetchStudents();
    }
};


// ===================== ADD TEACHER =====================
function addTeacher() {
  const tname = document.getElementById("tname").value;
  const education = document.getElementById("education").value;
  const course = document.getElementById("course").value;

  fetch("http://localhost:3000/add-teacher", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tname, education, course })
  })
  .then(res => res.json())
  .then(data => {
    alert("Teacher added successfully!");
    fetchTeachers();
  })
  .catch(err => alert("Failed to add teacher"));
}

function fetchTeachers() {
  fetch("http://localhost:3000/teachers")
    .then(res => res.json())
    .then(data => {
      const body = document.getElementById("teacherTableBody");
      body.innerHTML = "";
      data.forEach(t => {
        body.innerHTML += `<tr><td>${t.id}</td><td>${t.tname}</td><td>${t.education}</td><td>${t.course}</td></tr>`;
      });
    });
}

// ===================== ADD COURSE =====================
function addCourse() {
  const cname = document.getElementById("cname").value;
  const fees = document.getElementById("fees").value;
  const duration = document.getElementById("duration").value;

  fetch("http://localhost:3000/add-course", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cname, fees, duration })
  })
  .then(res => res.json())
  .then(data => {
    alert("Course added successfully!");
    fetchCourses();
  })
  .catch(err => alert("Failed to add course"));
}

function fetchCourses() {
  fetch("http://localhost:3000/courses")
    .then(res => res.json())
    .then(data => {
      const body = document.getElementById("courseTableBody");
      body.innerHTML = "";
      data.forEach(c => {
        body.innerHTML += `<tr><td>${c.id}</td><td>${c.cname}</td><td>${c.fees}</td><td>${c.duration}</td></tr>`;
      });
    });
}
