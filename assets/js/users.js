// File: assets/js/users.js

document.addEventListener('DOMContentLoaded', function() {
    // Ensure this script runs only on the users page.
    if (!document.body.classList.contains('users-page')) {
        return;
    }

    // Get global translation data safely from main.js.
    // This provides access to translated strings based on the current language.
    const currentLanguage = window.currentLanguage || 'en';
    const translations = window.translations || {};
    const langData = translations[currentLanguage] || translations['en']; // Fallback to English

    /**
     * Initializes and re-initializes Chart.js charts for user-related modals.
     * Each chart is destroyed before being re-initialized to ensure fresh rendering
     * and prevent issues with multiple chart instances on the same canvas.
     */
    document.querySelectorAll('.users-page .btn-details').forEach(button => {
        button.addEventListener('click', function() {
            const modalTargetId = this.dataset.modalTarget;
            // openModal() is a global function from main.js to display the modal.
            openModal(modalTargetId);

            // Get the specific modal element once to optimize DOM queries for its children.
            const modal = document.getElementById(modalTargetId);
            if (!modal) {
                console.warn(`Modal with ID ${modalTargetId} not found.`);
                return; // Exit if modal element is not found.
            }

            // --- Chart Initialization for Modals on Users Page. ---
            // Data and colors are adjusted to be more diverse and informative.
            if (modalTargetId === 'newUsersModal') {
                const chartCtx = modal.querySelector('#newUsersModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'line',
                        data: {
                            labels: [
                                langData['weekText'] + ' 1', langData['weekText'] + ' 2',
                                langData['weekText'] + ' 3', langData['weekText'] + ' 4'
                            ], // Localized week labels
                            datasets: [{
                                label: langData['newUsersChartLabel'], // Use localized label
                                data: [10, 15, 12, 13],
                                borderColor: 'var(--primary)',
                                backgroundColor: 'rgba(90, 103, 216, 0.3)', // Transparent color for area under the line
                                fill: true,
                                tension: 0.4 // Smoother line
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                                tooltip: { // More detailed tooltip
                                    callbacks: {
                                        label: function(context) {
                                            // Localize label in tooltip
                                            return `${langData['newUsersChartLabel']}: ${context.raw}`;
                                        }
                                    }
                                }
                            },
                            scales: {
                                x: { display: false }, // X axis not displayed for mini-chart
                                y: { beginAtZero: true, display: false } // Y axis starts from zero and is not displayed
                            }
                        }
                    });
                }
            }
            if (modalTargetId === 'adminUsersModal') {
                const chartCtx = modal.querySelector('#adminUsersModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'doughnut',
                        data: {
                            labels: [
                                langData['modalSuperAdmin'], // Use localized label
                                langData['modalContentAdmin'], // Use localized label
                                langData['modalOrderManager'] // Use localized label
                            ],
                            datasets: [{
                                data: [2, 2, 1], // Example distribution of 5 admins
                                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Bright and varied colors
                                hoverOffset: 8
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            cutout: '70%',
                            plugins: {
                                legend: {
                                    display: true, // Show legend to explain colors
                                    position: 'bottom',
                                    labels: {
                                        color: 'var(--text-color)'
                                    }
                                },
                                tooltip: { // More detailed tooltip
                                    callbacks: {
                                        label: function(context) {
                                            let label = context.label || '';
                                            if (label) {
                                                label += ': ';
                                            }
                                            if (context.parsed) {
                                                label += context.parsed;
                                            }
                                            return label;
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
            }
            if (modalTargetId === 'inactiveUsersModal') {
                const chartCtx = modal.querySelector('#inactiveUsersModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'bar',
                        data: {
                            labels: [
                                langData['weekText'] + ' 1', langData['weekText'] + ' 2',
                                langData['weekText'] + ' 3', langData['weekText'] + ' 4'
                            ], // Localized week labels
                            datasets: [{
                                label: langData['inactiveUsersChartLabel'], // Use localized label
                                data: [12, 11, 10, 10],
                                backgroundColor: [
                                    '#FF9900', // Orange
                                    '#CC6600', // Darker orange
                                    '#FFCC66', // Lighter orange
                                    '#FF8000'  // Medium orange
                                ],
                                borderColor: 'transparent',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    callbacks: {
                                        label: function(context) {
                                            // Localize label in tooltip
                                            return `${langData['inactiveUsersChartLabel']}: ${context.raw}`;
                                        }
                                    }
                                }
                            },
                            scales: {
                                x: { display: false },
                                y: { beginAtZero: true, display: false }
                            }
                        }
                    });
                }
            }
            if (modalTargetId === 'activeUsersModal') {
                const chartCtx = modal.querySelector('#activeUsersModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'pie',
                        data: {
                            labels: [
                                langData['activeUsersChartLabel'], // Use localized label
                                langData['inactiveUsersChartLabel'] // Use localized label
                            ],
                            datasets: [{
                                data: [75, 25],
                                backgroundColor: ['#4CAF50', '#FFC107'], // Green for active, Yellow for inactive
                                hoverOffset: 8
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'bottom',
                                    labels: {
                                        color: 'var(--text-color)'
                                    }
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function(context) {
                                            let label = context.label || '';
                                            if (label) {
                                                label += ': ';
                                            }
                                            if (context.parsed) {
                                                label += context.parsed + '%';
                                            }
                                            return label;
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
            }
            if (modalTargetId === 'subscribedUsersModal') {
                const chartCtx = modal.querySelector('#subscribedUsersModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'line',
                        data: {
                            labels: [
                                langData['monthJan'], langData['monthFeb'], // Use localized labels
                                langData['monthMar'], langData['monthApr'],
                                langData['monthMay'], langData['monthJun']
                            ],
                            datasets: [{
                                label: langData['subscribedUsersChartLabel'], // Use localized label
                                data: [180, 190, 195, 200, 210, 205],
                                borderColor: '#9C27B0', // Purple
                                backgroundColor: 'rgba(156, 39, 176, 0.3)',
                                fill: true,
                                tension: 0.4
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    callbacks: {
                                        label: function(context) {
                                            // Localize label in tooltip
                                            return `${langData['subscribedUsersChartLabel']}: ${context.raw}`;
                                        }
                                    }
                                }
                            },
                            scales: {
                                x: { display: true, ticks: { color: 'var(--gray)' } }, // Display X axis so months are visible
                                y: { beginAtZero: true, display: false } // Hide Y axis values for mini-chart
                            }
                        }
                    });
                }
            }
            if (modalTargetId === 'pendingVerificationModal') {
                const chartCtx = modal.querySelector('#pendingVerificationModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'bar',
                        data: {
                            labels: [
                                langData['emailVerificationLabel'], // Use localized label
                                langData['phoneVerificationLabel'], // Use localized label
                                langData['manualReviewLabel'] // Use localized label
                            ],
                            datasets: [{
                                label: langData['pendingVerificationsChartLabel'], // Use localized label
                                data: [2, 1, 0], // Example distribution, can be adjusted
                                backgroundColor: [
                                    '#F44336', // Red for Email
                                    '#2196F3', // Blue for Phone
                                    '#607D8B'  // Gray for Manual (if any)
                                ],
                                borderColor: 'transparent',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                                tooltip: { // More detailed tooltip
                                    callbacks: {
                                        label: function(context) {
                                            return `${context.label}: ${context.raw}`;
                                        }
                                    }
                                }
                            },
                            scales: {
                                x: { display: true, ticks: { color: 'var(--gray)' } }, // Show X axis
                                y: { beginAtZero: true, display: false } // Hide Y axis values for mini-chart
                            }
                        }
                    });
                }
            }
        });
    });

    // Add User Button functionality.
    document.getElementById('addUserBtn')?.addEventListener('click', function() {
        // showToast() is a global function from main.js.
        // Display a toast message using the current language's translation.
        showToast(langData['toastAddUserForm'], 'info'); // Use localized string directly
        // Or, if you have an actual Add User modal, you would call:
        // openModal('addUserModal'); // example
    });

    // User Role Tags (Clickable - simulated action).
    const roleTags = document.querySelectorAll('.role-tag');
    if (roleTags.length > 0) {
        roleTags.forEach(tag => {
            tag.addEventListener('click', function() {
                const role = this.dataset.role;
                // Show a toast message for simulated action, using translation.
                showToast(`${langData['toastSimulatingFilterRole']} ${role.charAt(0).toUpperCase() + role.slice(1)}`, 'info'); // Use localized string directly
            });
        });
    }

    // Functionality for Action Buttons on Users Table (View/Edit/Delete).
    const usersTable = document.getElementById('usersTable');
    if (usersTable) {
        usersTable.addEventListener('click', function(event) {
            const targetBtn = event.target.closest('.action-btn');
            if (!targetBtn) return; // If no action button was clicked, exit.
            const row = targetBtn.closest('tr');
            if (!row) return; // If no table row found, exit.

            // Safely retrieve data attributes from the table row.
            const userId = row.dataset.userId;
            const name = row.dataset.name;
            const email = row.dataset.email;
            const role = row.dataset.role;
            const status = row.dataset.status;
            const registeredDate = row.dataset.registeredDate;

            if (targetBtn.classList.contains('view-user')) {
                // Populate and open the View User Modal.
                // Optimize DOM queries by getting modal reference once.
                const viewUserModal = document.getElementById('viewUserModal');
                if (viewUserModal) {
                    const viewUserId = viewUserModal.querySelector('#viewUserId');
                    const viewUserName = viewUserModal.querySelector('#viewUserName');
                    const viewUserEmail = viewUserModal.querySelector('#viewUserEmail');
                    const viewUserRole = viewUserModal.querySelector('#viewUserRole');
                    const viewUserStatus = viewUserModal.querySelector('#viewUserStatus');
                    const viewUserRegisteredDate = viewUserModal.querySelector('#viewUserRegisteredDate');

                    if (viewUserId) viewUserId.textContent = userId;
                    if (viewUserName) viewUserName.textContent = name;
                    if (viewUserEmail) viewUserEmail.textContent = email;
                    if (viewUserRole) viewUserRole.textContent = role;
                    if (viewUserStatus) viewUserStatus.textContent = status;
                    if (viewUserRegisteredDate) viewUserRegisteredDate.textContent = registeredDate;

                    openModal('viewUserModal');
                } else {
                    console.warn('View User Modal not found.');
                }

            } else if (targetBtn.classList.contains('edit-user')) {
                // Populate and open the Edit User Modal.
                // Optimize DOM queries by getting modal reference once.
                const editUserModal = document.getElementById('editUserModal');
                if (editUserModal) {
                    const editUserIdDisplay = editUserModal.querySelector('#editUserIdDisplay');
                    const editUserName = editUserModal.querySelector('#editUserName');
                    const editUserEmail = editUserModal.querySelector('#editUserEmail');
                    const editUserRole = editUserModal.querySelector('#editUserRole');
                    const editUserStatus = editUserModal.querySelector('#editUserStatus');
                    const editOriginalUserId = editUserModal.querySelector('#editOriginalUserId');

                    if (editUserIdDisplay) editUserIdDisplay.textContent = userId;
                    if (editUserName) editUserName.value = name;
                    if (editUserEmail) editUserEmail.value = email;
                    if (editUserRole) editUserRole.value = role;
                    if (editUserStatus) editUserStatus.value = status;
                    if (editOriginalUserId) editOriginalUserId.value = userId;

                    openModal('editUserModal');
                } else {
                    console.warn('Edit User Modal not found.');
                }

            } else if (targetBtn.classList.contains('delete-user')) {
                const deleteUserConfirmModal = document.getElementById('deleteUserConfirmModal');
                
                if (deleteUserConfirmModal) {
                    deleteUserConfirmModal._targetRow = row; // Store reference to the row to be deleted.
                    const deleteUserIdDisplay = deleteUserConfirmModal.querySelector('#deleteUserIdDisplay'); // Use modal.querySelector
                    if (deleteUserIdDisplay) deleteUserIdDisplay.textContent = userId;

                    openModal('deleteUserConfirmModal');

                    const confirmDeleteUserBtn = deleteUserConfirmModal.querySelector('.confirm-delete-user-btn'); // Use modal.querySelector
                    // Remove old event listener if it exists to prevent duplication.
                    const oldConfirmListener = confirmDeleteUserBtn?._deleteListener; // Use optional chaining for safety.
                    if (oldConfirmListener) {
                        confirmDeleteUserBtn.removeEventListener('click', oldConfirmListener);
                    }
                    // Define the new event listener for the confirmation button.
                    const newConfirmListener = () => {
                        const rowToDelete = deleteUserConfirmModal._targetRow; // Access from modal reference
                        if(rowToDelete) {
                            rowToDelete.remove(); // Remove the row from the table.
                        }
                        closeModal('deleteUserConfirmModal'); // Close the confirmation modal.
                        // Show success toast notification, using translation.
                        showToast(`${langData['userText']} ${userId} ${langData['hasBeenDeleted']}`, 'success'); // Use localized string directly
                        
                        // Clean up the event listener and stored reference.
                        confirmDeleteUserBtn.removeEventListener('click', newConfirmListener);
                        confirmDeleteUserBtn._deleteListener = null;
                        deleteUserConfirmModal._targetRow = null; // Clear stored reference.
                    };
                    confirmDeleteUserBtn.addEventListener('click', newConfirmListener);
                    confirmDeleteUserBtn._deleteListener = newConfirmListener; // Store reference to the new listener.
                } else {
                    console.warn('Delete User Confirm Modal not found in users.html. Using alert fallback.');
                    if (confirm(`${langData['modalDeleteUserConfirm']} ${userId}?`)) { // Use localized string directly
                        row.remove();
                        showToast(`${langData['userText']} ${userId} ${langData['hasBeenDeleted']}`, 'success'); // Use localized string directly
                    }
                }
            }
        });
    }

    // Handle Edit User Form Submission.
    const editUserForm = document.getElementById('editUserForm');
    if (editUserForm) {
        editUserForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission.

            const originalUserId = editUserForm.querySelector('#editOriginalUserId').value; // Use form.querySelector
            const newName = editUserForm.querySelector('#editUserName').value; // Use form.querySelector
            const newEmail = editUserForm.querySelector('#editUserEmail').value; // Use form.querySelector
            const newRole = editUserForm.querySelector('#editUserRole').value; // Use form.querySelector
            const newStatus = editUserForm.querySelector('#editUserStatus').value; // Use form.querySelector

            // Find the original table row using the data-user-id.
            const targetRow = document.querySelector(`#usersTable tr[data-user-id="${originalUserId}"]`);
            if (targetRow) {
                // Update data-attributes of the row.
                targetRow.dataset.name = newName;
                targetRow.dataset.email = newEmail;
                targetRow.dataset.role = newRole;
                targetRow.dataset.status = newStatus;

                // Update displayed text in table cells.
                // Using optional chaining for safety on children access.
                if (targetRow.children[1]) targetRow.children[1].textContent = newName;
                if (targetRow.children[2]) targetRow.children[2].textContent = newEmail;

                // Update role display (text content and class for styling).
                const roleCell = targetRow.children[3]; // The cell containing the role span.
                if (roleCell) {
                    let roleSpan = roleCell.querySelector('.role-tag');
                    if (!roleSpan) { // Create if it doesn't exist.
                        roleSpan = document.createElement('span');
                        roleSpan.className = 'role-tag'; // Add base class.
                        roleCell.textContent = ''; // Remove existing text if any.
                        roleCell.appendChild(roleSpan);
                    }
                    roleSpan.textContent = newRole; // Set the text content (e.g., "Admin", "Editor").
                    roleSpan.className = 'role-tag'; // Reset class.
                    // Add appropriate role-specific class for styling.
                    if (newRole === 'Admin') roleSpan.classList.add('admin');
                    else if (newRole === 'Editor') roleSpan.classList.add('editor');
                    else if (newRole === 'Customer') roleSpan.classList.add('customer');
                }

                // Update status display (text content and class for styling).
                const statusCell = targetRow.children[4]; // The cell containing the status span.
                if (statusCell) {
                    let statusSpan = statusCell.querySelector('.status');
                    if (!statusSpan) { // Create if it doesn't exist.
                        statusSpan = document.createElement('span');
                        statusSpan.className = 'status'; // Add base class.
                        statusCell.textContent = ''; // Remove existing text if any.
                        statusCell.appendChild(statusSpan);
                    }
                    statusSpan.textContent = newStatus; // Set the text content (e.g., "Active", "Inactive").
                    statusSpan.className = 'status'; // Reset class.
                    // Add appropriate status-specific class for styling.
                    if (newStatus === 'Active') statusSpan.classList.add('active');
                    else if (newStatus === 'Inactive') statusSpan.classList.add('inactive');
                    else if (newStatus === 'Pending') statusSpan.classList.add('pending'); // Use 'pending' for consistency.
                }
            }

            closeModal('editUserModal'); // Close the edit modal.
            // Show success toast notification, using translation.
            showToast(`${langData['userText']} ${originalUserId} ${langData['hasBeenUpdated']}`, 'success'); // Use localized string directly
        });
    }
});