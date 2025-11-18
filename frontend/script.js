const API_URL = 'http://localhost:5000/api';

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const messageEl = document.getElementById('message');
const totalCount = document.getElementById('totalCount');
const completedCount = document.getElementById('completedCount');

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task on button click
addBtn.addEventListener('click', addTask);

// Add task on Enter key
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

async function loadTasks() {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) throw new Error('Failed to load tasks');
    
    const tasks = await response.json();
    renderTasks(tasks);
    updateStats(tasks);
  } catch (error) {
    showMessage('Error loading tasks', 'error');
    console.error('Error:', error);
  }
}

async function addTask() {
  const title = taskInput.value.trim();
  
  if (!title) {
    showMessage('Please enter a task', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    });

    if (!response.ok) throw new Error('Failed to add task');
    
    taskInput.value = '';
    showMessage('Task added successfully!', 'success');
    loadTasks();
  } catch (error) {
    showMessage('Error adding task', 'error');
    console.error('Error:', error);
  }
}

async function toggleTask(id, completed) {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed: !completed })
    });

    if (!response.ok) throw new Error('Failed to update task');
    
    loadTasks();
  } catch (error) {
    showMessage('Error updating task', 'error');
    console.error('Error:', error);
  }
}

async function deleteTask(id) {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Failed to delete task');
    
    showMessage('Task deleted successfully!', 'success');
    loadTasks();
  } catch (error) {
    showMessage('Error deleting task', 'error');
    console.error('Error:', error);
  }
}

function renderTasks(tasks) {
  if (tasks.length === 0) {
    taskList.innerHTML = '<li class="loading">No tasks yet. Add one to get started!</li>';
    return;
  }

  taskList.innerHTML = tasks.map(task => `
    <li class="task-item ${task.completed ? 'completed' : ''}">
      <input 
        type="checkbox" 
        class="task-checkbox" 
        ${task.completed ? 'checked' : ''}
        onchange="toggleTask(${task.id}, ${task.completed})"
      >
      <span class="task-text">${escapeHtml(task.title)}</span>
      <button class="btn-delete" onclick="deleteTask(${task.id})">Delete</button>
    </li>
  `).join('');
}

function updateStats(tasks) {
  totalCount.textContent = tasks.length;
  completedCount.textContent = tasks.filter(t => t.completed).length;
}

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
  
  setTimeout(() => {
    messageEl.classList.add('hidden');
  }, 3000);
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
