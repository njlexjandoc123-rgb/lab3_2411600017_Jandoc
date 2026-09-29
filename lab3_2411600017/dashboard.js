document.addEventListener('DOMContentLoaded', function() {

    // Protect the page: redirect to login if not logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'index.html';
        return;
    }

    const username = localStorage.getItem('user') || 'User';

    updateGreeting(username);

    updateStatistics();

    populateActivityTable();

    populateCoursesTable();

    setupLogout();

    const userNameSpan = document.getElementById('userName');
    if (userNameSpan) {
        userNameSpan.textContent = username;
    }
});

function updateGreeting(username) {
    const greetingElement = document.getElementById('greeting');
    if (!greetingElement) return;

    const hour = new Date().getHours();
    let timeOfDay = '';

    if (hour >= 5 && hour < 12) {
        timeOfDay = 'Good Morning';
    } else if (hour >= 12 && hour < 17) {
        timeOfDay = 'Good Afternoon';
    } else if (hour >= 17 && hour < 21) {
        timeOfDay = 'Good Evening';
    } else {
        timeOfDay = 'Good Night';
    }

    greetingElement.textContent = `${timeOfDay}, ${username}!`;
}

function updateStatistics() {

    // Student Portal theme: GPA, Courses, Assignments, Attendance
    const stats = [
        { title: 'Overall GPA', value: '3.59', color: 'text-primary', icon: '🎓' },
        { title: 'Current Courses', value: '6', color: 'text-success', icon: '📚' },
        { title: 'Assignments', value: '2 Due', color: 'text-info', icon: '📝' },
        { title: 'Attendance', value: '96%', color: 'text-warning', icon: '✅' }
    ];

    const cardTitles = document.querySelectorAll('[id^="stat"][id$="-title"]');
    const cardValues = document.querySelectorAll('[id^="stat"][id$="-value"]');

    stats.forEach((stat, index) => {
        const titleElement = document.getElementById(`stat${index + 1}-title`);
        const valueElement = document.getElementById(`stat${index + 1}-value`);

        if (titleElement) {
            titleElement.textContent = `${stat.icon} ${stat.title}`;
        }
        if (valueElement) {
            valueElement.textContent = stat.value;
            // Remove existing color classes and add the new one
            valueElement.className = `card-text fw-bold ${stat.color}`;
        }
    });
}

function populateActivityTable() {
    const tableBody = document.getElementById('activityTableBody');
    if (!tableBody) return;

    const activities = [
        { date: '2026-09-28 14:30', activity: 'Lab 3 graded: 48/50 (WEB101)', status: 'success' },
        { date: '2026-09-28 13:15', activity: 'Assignment submitted: ER Diagram Activity (IT202)', status: 'info' },
        { date: '2026-09-27 11:45', activity: 'Assignment due soon: Problem Set 3 (MATH201)', status: 'warning' },
        { date: '2026-09-26 09:00', activity: 'Quiz 2 graded: 45/50 (IT201)', status: 'success' },
        { date: '2026-09-25 16:20', activity: 'Reflection Paper graded: 19/20 (GE105)', status: 'success' },
        { date: '2026-09-22 14:10', activity: 'Missing submission: Subnetting Worksheet (IT203)', status: 'danger' }
    ];

    tableBody.innerHTML = '';

    activities.forEach(activity => {
        const row = document.createElement('tr');
        row.classList.add('border-accent');

        let badgeClass = 'bg-secondary';
        if (activity.status === 'success') badgeClass = 'bg-success';
        else if (activity.status === 'warning') badgeClass = 'bg-warning text-dark';
        else if (activity.status === 'danger') badgeClass = 'bg-danger';
        else if (activity.status === 'info') badgeClass = 'bg-info text-dark';

        row.innerHTML = `
            <td>${activity.date}</td>
            <td>${activity.activity}</td>
            <td><span class="badge ${badgeClass}">${activity.status}</span></td>
        `;

        tableBody.appendChild(row);
    });
}

// Extra section for the Student Grade Portal theme (current courses & grades)
function populateCoursesTable() {
    const tableBody = document.getElementById('coursesTableBody');
    if (!tableBody) return;

    const courses = [
        { code: 'WEB101', name: 'Web Systems and Technologies', instructor: 'Prof. Santos', units: 3, grade: 94 },
        { code: 'IT201', name: 'Data Structures and Algorithms', instructor: 'Prof. Reyes', units: 3, grade: 88 },
        { code: 'IT202', name: 'Database Management Systems', instructor: 'Prof. Garcia', units: 3, grade: 91 },
        { code: 'MATH201', name: 'Discrete Mathematics', instructor: 'Prof. Cruz', units: 3, grade: 85 },
        { code: 'IT203', name: 'Networking Fundamentals', instructor: 'Prof. Mendoza', units: 3, grade: 90 },
        { code: 'GE105', name: 'Ethics', instructor: 'Prof. Bautista', units: 2, grade: 96 }
    ];

    tableBody.innerHTML = '';

    courses.forEach(course => {
        let letter = 'F';
        if (course.grade >= 93) letter = 'A';
        else if (course.grade >= 90) letter = 'A-';
        else if (course.grade >= 87) letter = 'B+';
        else if (course.grade >= 83) letter = 'B';
        else if (course.grade >= 80) letter = 'B-';
        else if (course.grade >= 70) letter = 'C';
        else if (course.grade >= 60) letter = 'D';

        let badgeClass = 'bg-danger';
        if (course.grade >= 90) badgeClass = 'bg-success';
        else if (course.grade >= 80) badgeClass = 'bg-info text-dark';
        else if (course.grade >= 70) badgeClass = 'bg-warning text-dark';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${course.code}</strong></td>
            <td>${course.name}</td>
            <td class="d-none d-md-table-cell">${course.instructor}</td>
            <td class="text-center d-none d-sm-table-cell">${course.units}</td>
            <td class="text-center">${course.grade}%</td>
            <td class="text-center"><span class="badge ${badgeClass}">${letter}</span></td>
        `;
        tableBody.appendChild(row);
    });
}

function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutLink = document.getElementById('logoutLink');

    function performLogout(e) {
        e.preventDefault();

        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', performLogout);
    }
    if (logoutLink) {
        logoutLink.addEventListener('click', performLogout);
    }
}
