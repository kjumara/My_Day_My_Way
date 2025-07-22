let soundEnabled = true; // Make sure this is declared only once!

const sounds = {
    complete: new Audio('sounds/complete.wav'),
    add: new Audio('sounds/add.wav'),
    move: new Audio('sounds/move.wav'),
    celebrate: new Audio('sounds/celebrate.wav')
};


function playSound(name) {
    if (soundEnabled && sounds[name]) {
        sounds[name].pause(); // stops overlapping
        sounds[name].currentTime = 0;
        sounds[name].play().catch(err => console.warn("Audio failed to play:", err));
    }
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    document.getElementById("volumeBtn").textContent = soundEnabled ? '🔊' : '🔇';
}

function triggerConfetti() {
    const container = document.getElementById("confettiContainer");
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti-piece";
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.top = Math.random() * 20 + "%";
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
        confetti.style.animationDuration = `${0.8 + Math.random()}s`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), 1200);
    }
}

let tasks = [];
let completedTasks = [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function saveCompletedTasks() {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}
/**
 * Loads tasks and completedTasks from localStorage.
 * If there are no saved tasks/completedTasks, initializes them as empty arrays.
 */
function loadTasks() {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
}

function addTask() {
    const input = document.getElementById("taskInput");
    let baseText = input.value.trim();
    if (!baseText) return;

    let uniqueText = baseText;
    let counter = 2;

    // Ensure unique task text
    while (tasks.some(t => t.text === uniqueText)) {
        uniqueText = `${baseText}_${counter++}`;
    }

    tasks.push({ text: uniqueText, pomodoros: 1, completed: false });
    input.value = "";
    saveTasks();
    renderTaskList();
}


function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTaskList();
}

function updatePomodoros(index, value) {
    tasks[index].pomodoros = parseInt(value);
    saveTasks();
}

function renderTaskList() {
    const list = document.getElementById("taskList");
    list.innerHTML = '';
    tasks.forEach((task, i) => {
        if (task.completed) return; // don't show completed tasks here

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;

        const controls = document.createElement("div");
        controls.className = "task-controls";

        // Pomodoro dropdown
        const pomodoroDropdown = document.createElement('select');
        pomodoroDropdown.className = 'pomodoro-select';
        pomodoroDropdown.onchange = () => updatePomodoros(i, pomodoroDropdown.value);

        for (let j = 1; j <= 5; j++) {
            const option = document.createElement('option');
            option.value = j;
            option.textContent = `${j} ${'🍅'.repeat(j)}`;
            if (task.pomodoros === j) option.selected = true;
            pomodoroDropdown.appendChild(option);
        }

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "🗑️";
        deleteButton.onclick = () => deleteTask(i);

        controls.appendChild(pomodoroDropdown);
        controls.appendChild(deleteButton);

        li.appendChild(span);
        li.appendChild(controls);
        list.appendChild(li);
    });
}

// quadrant IDs in priority order
const quadrantPriority = ['iu', 'inu', 'niu', 'ninu'];

function organizeTasksWithAI() {
    const matrix = document.getElementById("matrix");
    const taskList = document.getElementById("taskList");

    matrix.classList.remove("hidden");
    taskList.classList.add("hidden");

    // Clear quadrants except headings
    quadrantPriority.forEach(id => {
        const quadrant = document.getElementById(id);
        // Remove all children except h3 headings
        Array.from(quadrant.children).forEach(child => {
            if (child.tagName.toLowerCase() !== "h3") quadrant.removeChild(child);
        });
    });

    // Assign each non-completed task a quadrant randomly and store it
    tasks.forEach(task => {
        if (task.completed) return;
        if (!task.quadrant || !quadrantPriority.includes(task.quadrant)) {
            task.quadrant = quadrantPriority[Math.floor(Math.random() * quadrantPriority.length)];
        }
    });

    saveTasks();

    // Add tasks to their assigned quadrant
    tasks.forEach((task, index) => {
        if (task.completed) return;
        const div = document.createElement('div');
        div.className = 'task-item';
        div.textContent = `${task.text} (${task.pomodoros}×🍅)`;
        div.draggable = true;
        div.id = `task-${index}`;
        div.ondragstart = (e) => e.dataTransfer.setData("text", e.target.id);
        document.getElementById(task.quadrant).appendChild(div);
    });
}

// Allow dropping for drag and drop
function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev, quadrantId) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const taskElement = document.getElementById(data);
    if (!taskElement) return;

    document.getElementById(quadrantId).appendChild(taskElement);

    // Extract index from ID like "task-3"
    const match = data.match(/^task-(\d+)$/);
    if (match) {
        const index = parseInt(match[1]);
        if (tasks[index]) {
            tasks[index].quadrant = quadrantId;
            saveTasks();
        }
    }
}

populateTimeDropdown("daystart", "08:00");
populateTimeDropdown("dayend", "17:00");
function showSchedule() {
    switchPage("taskPage", "schedulePage");
}

function goBack() {
    switchPage("schedulePage", "taskPage");
    document.getElementById("matrix").classList.add("hidden");
}

// Move completed tasks from tasks[] to completedTasks[]
function moveCompletedTasks() {
    const stillPending = [];
    tasks.forEach(task => {
        if (task.completed) {
            // Only add if not already in completedTasks
            if (!completedTasks.find(t => t.text === task.text)) {
                completedTasks.push(task);
            }
        } else {
            stillPending.push(task);
        }
    });
    tasks = stillPending;
    saveTasks();
}

// Generate schedule from tasks array sorted by quadrantPriority
function getTasksByMatrixPriority() {
    const taskQueue = [];
    let pomoCount = 0;
    const beforeLong = parseInt(document.getElementById("pomoBeforeLong").value);

    quadrantPriority.forEach(quadrantId => {
        const filteredTasks = tasks.filter(t => !t.completed && t.quadrant === quadrantId);
        filteredTasks.forEach(task => {
            for (let i = 0; i < task.pomodoros; i++) {
                taskQueue.push({ type: "task", text: task.text, id: task.text + "-" + i });
                pomoCount++;
                if (pomoCount % beforeLong === 0) {
                    taskQueue.push({ type: "break", text: "Long Break" });
                } else {
                    taskQueue.push({ type: "break", text: "Short Break" });
                }
            }
        });
    });

    return taskQueue;
}

function generateSchedule(startNow = false) {
    moveCompletedTasks(); // Move completed tasks out of tasks[] first
    organizeTasksWithAI(); // Rebuild matrix quadrants DOM from updated tasks[]

    const grid = document.getElementById("scheduleGrid");
    grid.innerHTML = "";

    let [h, m] = startNow ? getCurrentTimeArray() : document.getElementById("daystart").value.split(":").map(Number);

    const queue = getTasksByMatrixPriority();

    let slotIndex = 0;
    queue.forEach(item => {
        const start = formatTime(h, m);
        if (item.type === "task") {
            [h, m] = addMinutes(h, m, 25);
        } else if (item.type === "break") {
            const longBreakMins = parseInt(document.getElementById("longBreak").value);
            [h, m] = addMinutes(h, m, item.text === "Long Break" ? longBreakMins : 5);
        }
        const end = formatTime(h, m);

        const slot = document.createElement("div");
        slot.className = "time-slot";

        const dropzone = document.createElement("div");
        dropzone.className = "task-dropzone";
        dropzone.id = `slot-${slotIndex++}`;
        dropzone.ondragover = e => e.preventDefault();

        dropzone.ondrop = e => {
            const draggedId = e.dataTransfer.getData("text");
            const dragged = document.getElementById(draggedId);
            const target = dropzone.querySelector(".task-card");

            if (dragged && target && target !== dragged) {
                const parentOfDragged = dragged.parentNode;
                parentOfDragged.innerHTML = '';
                dropzone.innerHTML = '';
                parentOfDragged.appendChild(target);
                dropzone.appendChild(dragged);
                playSound('move');
            } else if (dragged && !target) {
                dropzone.innerHTML = '';
                dropzone.appendChild(dragged);
                playSound('move');
            }
        };


        if (item.type === "task") {
            const card = document.createElement("div");
            card.className = "task-card";
            card.draggable = true;
            card.id = item.id + "-" + dropzone.id;
            // Find if this task is completed or not for checkbox state
            const taskObj = tasks.find(t => t.text === item.text);
            const checked = taskObj ? taskObj.completed : false;
            card.innerHTML = `<label><input type="checkbox" onchange="markComplete(this)" ${checked ? "checked" : ""}> ${item.text}</label>`;
            card.ondragstart = e => e.dataTransfer.setData("text", card.id);
            dropzone.appendChild(card);
        } else {
            const breakCard = document.createElement("div");
            breakCard.className = "task-card break-card";
            breakCard.textContent = item.text;
            dropzone.appendChild(breakCard);
        }

        slot.innerHTML = `<div class="time-label">${start} - ${end}</div>`;
        slot.appendChild(dropzone);
        grid.appendChild(slot);
    });

    saveTasks();
    renderTaskList();
    showSchedule();
}

function partialUpdate() {
    moveCompletedTasks();
    generateSchedule(true);
}

function formatTime(h, m) {
    const ampm = h >= 12 ? "PM" : "AM";
    const hour = ((h + 11) % 12 + 1);
    return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`;
}

function addMinutes(h, m, mins) {
    m += mins;
    while (m >= 60) {
        m -= 60;
        h++;
    }
    return [h, m];
}

function getCurrentTimeArray() {
    const now = new Date();
    return [now.getHours(), now.getMinutes()];
}

function markComplete(box) {
    const card = box.closest(".task-card, .task-item");
    card.classList.toggle("completed", box.checked);
    const label = card.textContent.trim().replace(/^✓?\s*/, '');
    const task = tasks.find(t => label === t.text);
    if (task) {
        task.completed = box.checked;
    }
    saveTasks();
    moveCompletedTasks();
}


loadTasks();
renderTaskList();

function moveCompletedTasks() {
    completedTasks = completedTasks || [];
    const newlyCompleted = tasks.filter(t => t.completed && !completedTasks.some(c => c.text === t.text));
    completedTasks.push(...newlyCompleted.map(t => ({ text: t.text })));
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    saveCompletedTasks();
}

function showCelebrationPage() {
    loadTasks();
    moveCompletedTasks();

    const completedList = document.getElementById("completedList");
    completedList.innerHTML = '';

    if (completedTasks.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No completed tasks today... yet!";
        completedList.appendChild(li);
    } else {
        completedTasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = task.text;
            completedList.appendChild(li);
        });
    }
    document.getElementById("taskPage")?.classList.add("hidden");
    document.getElementById("schedulePage")?.classList.add("hidden");
    document.getElementById("celebrationPage").classList.remove("hidden");
}

function finishDay() {
    localStorage.removeItem("tasks");
    localStorage.removeItem("completedTasks");
    tasks = [];
    completedTasks = [];
    closeModal();
    location.reload();
}

function confirmFinishDay() {
    const modal = document.getElementById("confirmModal");
    modal.style.display = "flex";
    modal.style.animation = "fadeInScale 0.4s ease forwards";
}

function closeModal() {
    const modal = document.getElementById("confirmModal");
    modal.style.animation = "";
    modal.style.display = "none";
}

loadTasks();
renderTaskList();

// Hook into existing functions to trigger sound
const originalMarkComplete = markComplete;
markComplete = function (box) {
    originalMarkComplete(box);
    playSound('complete');
};

const originalAddTask = addTask;
addTask = function () {
    originalAddTask();
    playSound('add');
};

const originalDrop = drop;
drop = function (ev, quadrantId) {
    originalDrop(ev, quadrantId);
    playSound('move');
};

const originalShowCelebrationPage = showCelebrationPage;
showCelebrationPage = function () {
    originalShowCelebrationPage();
    playSound('celebrate');
    triggerConfetti();
};

function toggleRecurringPanel() {
    const panel = document.getElementById("recurringOverlay");
    panel.style.left = panel.style.left === "0px" ? "-100%" : "0";
    renderRecurringList();
}

function loadRecurringTasks() {
    return JSON.parse(localStorage.getItem("recurringTasks") || "[]");
}

function saveRecurringTasks(tasks) {
    localStorage.setItem("recurringTasks", JSON.stringify(tasks));
}

let recurringTasks = loadRecurringTasks();

function getQuadrantLabel(code) {
    switch (code) {
        case "iu": return "Important, Urgent";
        case "inu": return "Important, Not Urgent";
        case "niu": return "Not Important, Urgent";
        case "ninu": return "Not Important, Not Urgent";
        default: return "Undefined";
    }
}

function renderRecurringList() {
    const list = document.getElementById("recurringList");
    let tasks = loadRecurringTasks();

    tasks.sort((a, b) => {
        if (a.favorite && !b.favorite) return -1;
        if (!a.favorite && b.favorite) return 1;
        return (a.text.localeCompare(b.text));
    });

    list.innerHTML = '';
    tasks.forEach((task, i) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "recurring-task-card";

        // Format quadrant nicely:
        const quadrantNames = {
            "iu": "Important, Urgent",
            "inu": "Important, Not Urgent",
            "niu": "Not Important, Urgent",
            "ninu": "Not Important, Not Urgent",
            null: "Undefined",
            "": "Undefined"
        };
        const quadrantText = quadrantNames[task.quadrant] || "Undefined";

        taskDiv.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <strong>${task.text}</strong>
        <button onclick="toggleFavoriteRecurring(${i})" style="background:none; border:none; cursor:pointer; font-size: 1.25rem;">
          ${task.favorite ? "❤️" : "🤍"}
        </button>
      </div>
      <div>
        (${task.pomodoros}×🍅) - <em>${quadrantText}</em>
      </div>
      <div class="recurring-controls">
        <button onclick="addRecurringToToday(${i})">Add to Today</button>
        <button onclick="deleteRecurringTask(${i})" class="delete-btn">🗑️</button>
      </div>
    `;

        list.appendChild(taskDiv);
    });
}

function saveRecurringTask() {
    let name = document.getElementById("recurringName").value.trim();
    const quadrant = document.getElementById("recurringQuadrant").value;
    const pomodoros = parseInt(document.getElementById("recurringPomodoros").value);

    if (!name) return;

    const tasks = loadRecurringTasks();

    let baseName = name;
    let counter = 2;
    while (tasks.some(t => t.text === name)) {
        name = `${baseName}_${counter++}`;
    }
    tasks.push({ text: name, quadrant: quadrant || null, pomodoros, favorite: false });
    saveRecurringTasks(tasks);
    renderRecurringList();

    // Clear input
    document.getElementById("recurringName").value = '';
    document.getElementById("recurringPomodoros").value = '1';
    document.getElementById("recurringQuadrant").value = '';

}

function addRecurringToToday(index) {
    const recurring = loadRecurringTasks();
    const task = recurring[index];
    if (!task) return;

    const clone = { ...task, completed: false };
    if (!clone.quadrant) {
        // fallback to random
        const quadrantPriority = ['iu', 'inu', 'niu', 'ninu'];
        clone.quadrant = quadrantPriority[Math.floor(Math.random() * 4)];
    }

    tasks.push(clone);
    saveTasks();
    renderTaskList();
    organizeTasksWithAI();

    playSound('add');
}

function addRecurringToTodayFromEncoded(encoded) {
    const decoded = JSON.parse(atob(encoded));
    const clone = { ...decoded, completed: false };

    if (!clone.quadrant) {
        const quadrantPriority = ['iu', 'inu', 'niu', 'ninu'];
        clone.quadrant = quadrantPriority[Math.floor(Math.random() * 4)];
    }

    tasks.push(clone);
    saveTasks();
    renderTaskList();
    organizeTasksWithAI();

    playSound('add');
}

function deleteRecurringTask(index) {
    let recurringTasks = loadRecurringTasks();
    recurringTasks.splice(index, 1);
    saveRecurringTasks(recurringTasks);
    renderRecurringList();
}

function deleteRecurringTaskByText(taskText) {
    let tasks = loadRecurringTasks();
    tasks = tasks.filter(t => t.text !== taskText);
    saveRecurringTasks(tasks);
    renderRecurringList();
}

function formatAMPM(h, m) {
    const hour = h % 12 === 0 ? 12 : h % 12;
    const minute = m.toString().padStart(2, "0");
    const ampm = h < 12 ? "AM" : "PM";
    return `${hour}:${minute} ${ampm}`;
}

function getTimeValue(h, m) {
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

function populateTimeDropdown(id, defaultValue) {
    const dropdown = document.getElementById(id);
    if (!dropdown) {
        console.error(`Dropdown with ID "${id}" not found in the DOM.`);
        return;
    }
    dropdown.innerHTML = "";
    for (let h = 0; h < 24; h++) {
        for (let m of [0, 30]) {
            const value = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
            const label = formatAMPM(h, m);
            const option = document.createElement("option");
            option.value = value;
            option.textContent = label;
            if (value === defaultValue) option.selected = true;
            dropdown.appendChild(option);
        }
    }
}


function formatAMPM(h, m) {
    const hour = h % 12 === 0 ? 12 : h % 12;
    const minute = m.toString().padStart(2, "0");
    const ampm = h < 12 ? "AM" : "PM";
    return `${hour}:${minute} ${ampm}`;
}

function getTimeValue(h, m) {
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

function populateTimeDropdown(id, defaultValue) {
    const dropdown = document.getElementById(id);
    dropdown.innerHTML = "";
    for (let h = 0; h < 24; h++) {
        for (let m of [0, 30]) {
            const value = getTimeValue(h, m);
            const label = formatAMPM(h, m);
            const option = document.createElement("option");
            option.value = value;
            option.textContent = label;
            if (defaultValue === value) {
                option.selected = true;
            }
            dropdown.appendChild(option);
        }
    }
}

function toggleFavoriteRecurring(taskText, event) {
    let tasks = loadRecurringTasks();
    const index = tasks.findIndex(t => t.text === taskText);
    if (index !== -1) {
        tasks[index].favorite = !tasks[index].favorite;
        saveRecurringTasks(tasks);
        renderRecurringList();

        if (tasks[index].favorite && event) {
            const heart = document.createElement("div");
            heart.className = "floating-heart";
            heart.textContent = "❤️";
            document.body.appendChild(heart);

            const rect = event.target.getBoundingClientRect();
            heart.style.left = rect.left + "px";
            heart.style.top = rect.top + "px";

            setTimeout(() => heart.remove(), 1000);
        }
    }
}

function renderRecurringList() {
    const list = document.getElementById("recurringList");
    let tasks = loadRecurringTasks();

    tasks.sort((a, b) => {
        if (a.favorite && !b.favorite) return -1;
        if (!a.favorite && b.favorite) return 1;
        return a.text.localeCompare(b.text);
    });

    list.innerHTML = '';
    tasks.forEach((task, i) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "recurring-task-card";

        const quadrantNames = {
            "iu": "Important, Urgent",
            "inu": "Important, Not Urgent",
            "niu": "Not Important, Urgent",
            "ninu": "Not Important, Not Urgent",
            null: "Undefined",
            "": "Undefined"
        };
        const quadrantText = quadrantNames[task.quadrant] || "Undefined";

        taskDiv.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <strong>${task.text}</strong>
        <button class="favorite-btn" onclick="toggleFavoriteRecurring('${task.text.replace(/'/g, "\\'")}', event)">
          ${task.favorite ? "❤️" : "🤍"}
        </button>
      </div>
      <div>
        (${task.pomodoros}×🍅) - <em>${quadrantText}</em>
      </div>
      <div class="recurring-controls">
        <button onclick="addRecurringToToday(${i})">Add to Today</button>
        <button onclick="deleteRecurringTask(${i})" class="delete-btn">🗑️</button>
      </div>
    `;

        list.appendChild(taskDiv);
    });
}

function switchPage(fromId, toId) {
    const fromPage = document.getElementById(fromId);
    const toPage = document.getElementById(toId);

    if (fromPage) {
        fromPage.classList.remove('page-active');
        fromPage.classList.add('page-transition');
        setTimeout(() => {
            fromPage.classList.add('hidden');
        }, 400); // Wait for animation
    }

    if (toPage) {
        toPage.classList.remove('hidden');
        toPage.classList.add('page-transition');
        setTimeout(() => {
            toPage.classList.add('page-active');
        }, 10); // Trigger transition slightly after un-hiding
    }
}
const overlay = document.getElementById("recurringOverlay");
const toggleWidthBtn = document.getElementById("toggleWidthBtn");

let isExpanded = false;

toggleWidthBtn.addEventListener("click", () => {
    if (isExpanded) {
        overlay.style.width = "350px";
        toggleWidthBtn.textContent = "⛶";
    } else {
        overlay.style.width = "500px";
        toggleWidthBtn.textContent = "🗕";
    }
    isExpanded = !isExpanded;
});