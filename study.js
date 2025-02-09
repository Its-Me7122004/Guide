let timeLeft = 1500; // Default to 25 minutes (1500 seconds)
let originalTime = 1500; // Default to 25 minutes (1500 seconds)
let timerId = null;
let totalStudyTime = 0;
let sessionCount = 0;
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const progressBar = document.getElementById('progress');

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    const progress = ((originalTime - timeLeft) / originalTime) * 100;
    progressBar.style.width = `${progress}%`;
}

startButton.addEventListener('click', () => {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateTimer();
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                alert('Session completed!');
                totalStudyTime += 25; // Add 25 minutes to total study time
                sessionCount++; // Increment session count
                updateStats();
                addStudySession(25); // Log a 25-minute study session
                timeLeft = originalTime; // Reset timer
                updateTimer();
            }
        }, 1000);
        startButton.textContent = 'Pause';
    } else {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    timeLeft = originalTime;
    updateTimer();
    startButton.textContent = 'Start';
});

// Task management
const taskInput = document.querySelector('.task-input');
const taskList = document.getElementById('taskList');
let completedTasks = 0;

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && taskInput.value.trim()) {
        const taskText = taskInput.value.trim();
        const subject = taskText.includes('#') ? 
            taskText.split('#')[1].trim() : 'General';
        
        const li = document.createElement('li');
        li.className = 'task-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed');
            if (checkbox.checked) {
                completedTasks++;
                updateStats();
            } else {
                completedTasks--;
                updateStats();
            }
        });

        const text = document.createTextNode(taskText.split('#')[0]);
        const tag = document.createElement('span');
        tag.className = 'subject-tag';
        tag.textContent = subject;
        
        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(tag);
        taskList.appendChild(li);
        
        taskInput.value = '';
    }
});

// Stats and session tracking
function updateStats() {
    document.getElementById('totalTime').textContent = `${totalStudyTime}m`;
    document.getElementById('completedTasks').textContent = completedTasks;
    document.getElementById('focusSessions').textContent = sessionCount;
}

function addStudySession(duration) {
    const sessionsDiv = document.getElementById('sessions');
    const session = document.createElement('div');
    session.className = 'study-session';
    
    const now = new Date();
    session.innerHTML = `
        <div>
            ${now.toLocaleTimeString()} - ${duration} minutes
            <span class="subject-tag">Focus Session</span>
        </div>
        <div>${completedTasks} tasks completed</div>
    `;
    
    sessionsDiv.insertBefore(session, sessionsDiv.firstChild);
}