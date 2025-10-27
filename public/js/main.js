import { fetchData } from './utils/fetchData.js'
import { putData } from './utils/putData.js'

let users = []

const isProduction = window.location.hostname.includes('onrender.com') || window.location.hostname.includes('render.com')
const localUrl = isProduction 
    ? "https://user-management-api-n980.onrender.com"
    : "http://localhost:3000"

// DOM elements
const spinner = document.getElementById('spinner')
const alert = document.getElementById('alert')
const usersContainer = document.getElementById('users-container')

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    loadData()
    addEventListeners()
})

const loadData = async () => {
    spinner.classList.remove("d-none")
    try {
        const data = await fetchData(localUrl)
        if (data) {
            spinner.classList.add("d-none")
            users = data.data
            displayUsers(users)
        }
    } catch (error) {
        spinner.classList.add("d-none")
        alert.classList.remove("d-none")
        alert.classList.add("alert-danger")
        alert.innerHTML = `Failed to load data: ${error.message}`
    }
}

const displayUsers = (localUsers) => {
    if (!localUsers || localUsers.length === 0) {
        alert.classList.remove("d-none")
        alert.classList.add("alert-danger")
        alert.innerHTML = "No users found."
        return
    }
    
    // Clear existing content
    usersContainer.innerHTML = ""
    
    localUsers.forEach((user) => {
        // Default anonymous avatar
        const defaultAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Ccircle cx='75' cy='75' r='75' fill='%236c757d'/%3E%3Ccircle cx='75' cy='60' r='25' fill='white'/%3E%3Cpath d='M75 100c-20 0-40 10-40 30v20h80v-20c0-20-20-30-40-30z' fill='white'/%3E%3C/svg%3E"
        
        // Check if URL is valid or use default
        let avatarUrl = defaultAvatar
        if (user.avatar_url && user.avatar_url.trim() !== '') {
            // Basic URL validation
            try {
                new URL(user.avatar_url)
                avatarUrl = user.avatar_url
            } catch (e) {
                // Invalid URL, use default
                avatarUrl = defaultAvatar
            }
        }
        
        usersContainer.innerHTML += `
            <article class="card">
                <div class="card-image">
                    <img src="${avatarUrl}" 
                         alt="${user.name}" 
                         class="card-img-top" 
                         onerror="this.src='${defaultAvatar}'"
                         onload="this.style.opacity='1'"
                         style="opacity: 0; transition: opacity 0.3s ease;" />
                    <span class="card-title">${user.name}</span>
                </div>

                <div class="card-content">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Name:</strong> ${user.name}</li>
                        <li class="list-group-item"><strong>Age:</strong> ${user.age}</li>
                        <li class="list-group-item"><strong>Role:</strong> ${user.role}</li>
                    </ul>
                    <div class="card-body">
                        <button class="btn btn-secondary btn-sm edit-btn" data-user-id="${user.id}">
                            Edit User
                        </button>
                    </div>
                </div>
            </article>
        `
    })
    
    // Re-add event listeners after DOM update
    addEventListeners()
}

// Add event listeners as professor specified
const addEventListeners = () => {
    const editButtons = document.querySelectorAll(".edit-btn")
    editButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const userId = e.target.getAttribute("data-user-id")
            const user = users.find(u => u.id == userId)
            if (user) {
                openEditModal(user)
            }
        })
    })
}

// Open edit modal and fill data as professor specified
const openEditModal = (user) => {
    // Fill form with user data
    document.querySelector("#userName").value = user.name
    document.querySelector("#userAge").value = user.age
    document.querySelector("#userRole").value = user.role
    document.querySelector("#userImage").value = user.avatar_url
    
    // Store current user ID for update
    document.querySelector("#editUserForm").setAttribute("data-user-id", user.id)
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('editUserModal'))
    modal.show()
}

// Handle form submission exactly as professor specified
const submitBtn = document.querySelector(".submit-btn")
submitBtn.addEventListener("click", async () => {
    const form = document.querySelector("#editUserForm")
    const userId = form.getAttribute("data-user-id")
    
    const dataToSend = {
        name: document.querySelector("#userName").value,
        age: document.querySelector("#userAge").value,
        role: document.querySelector("#userRole").value,
        avatar_url: document.querySelector("#userImage").value,
    }
    
    try {
        // Show loading state
        submitBtn.classList.add("loading")
        submitBtn.disabled = true
        
        console.log("Submitting data...", dataToSend)
        
        // Send data using professor's putData function
        await putData(`${localUrl}/${userId}`, dataToSend)
        
        // Update local users array
        const userIndex = users.findIndex(u => u.id == userId)
        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...dataToSend }
        }
        
        // Update DOM without page refresh
        displayUsers(users)
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'))
        modal.hide()
        
        // Show success message
        showAlert("User updated successfully!", "success")
        
    } catch (error) {
        console.error("Failed to update user:", error)
        showAlert(`Failed to update user: ${error.message}`, "danger")
    } finally {
        // Reset button state
        submitBtn.classList.remove("loading")
        submitBtn.disabled = false
    }
})

// Show alert helper function
const showAlert = (message, type) => {
    alert.classList.remove("d-none", "alert-success", "alert-danger")
    alert.classList.add(`alert-${type}`)
    alert.innerHTML = message
    
    // Auto-hide success messages
    if (type === "success") {
        setTimeout(() => {
            alert.classList.add("d-none")
        }, 3000)
    }
}
