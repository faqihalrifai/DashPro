// File: assets/js/orders.js

document.addEventListener('DOMContentLoaded', function() {
    // Ensure this script runs only on the orders page.
    if (!document.body.classList.contains('orders-page')) {
        return;
    }

    // Get global translation data safely from main.js.
    // This provides access to translated strings based on the current language.
    const currentLanguage = window.currentLanguage || 'en';
    const translations = window.translations || {};
    const langData = translations[currentLanguage] || translations['en']; // Fallback to English

    // Order status filter buttons functionality.
    const filterButtons = document.querySelectorAll('.order-filters-group .filter-btn');
    const ordersTable = document.getElementById('ordersTable');

    if (filterButtons.length > 0 && ordersTable) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove 'active' class from all buttons and add to the clicked one.
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                const statusToFilter = this.dataset.status; // Get the status to filter by.
                const tableRows = ordersTable.querySelectorAll('tbody tr');
                
                // Iterate through table rows and show/hide based on selected status.
                tableRows.forEach(row => {
                    const rowStatus = row.dataset.status;
                    if (statusToFilter === 'all' || rowStatus === statusToFilter) {
                        row.style.display = ''; // Show row.
                    } else {
                        row.style.display = 'none'; // Hide row.
                    }
                });
                // Show a toast notification indicating the filter action.
                // showToast() is a global function from main.js.
                showToast(`${langData['ordersFilteredBy']} ${statusToFilter}`, 'info'); // Use localized string
            });
        });
    }

    /**
     * Initializes and re-initializes Chart.js charts for order-related modals.
     * Each chart is destroyed before being re-initialized to ensure fresh rendering
     * and prevent issues with multiple chart instances on the same canvas.
     */
    document.querySelectorAll('.orders-page .btn-details').forEach(button => {
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

            // --- Enhanced Chart Display for Modals on Orders Page. ---
            if (modalTargetId === 'newOrdersModal') {
                const chartCtx = modal.querySelector('#newOrdersModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'bar',
                        data: {
                            labels: [
                                langData['dayMon'], langData['dayTue'], // Use localized day labels
                                langData['dayWed'], langData['dayThu'],
                                langData['dayFri']
                            ],
                            datasets: [{
                                label: langData['newOrdersChartLabel'], // Use localized label
                                data: [5, 8, 7, 10, 6],
                                backgroundColor: [
                                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
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
                                            return `${langData['newOrdersChartLabel']}: ${context.raw}`; // Localize label in tooltip
                                        }
                                    }
                                }
                            },
                            scales: {
                                x: { display: true, ticks: { color: 'var(--gray)' } }, // Show day labels
                                y: { beginAtZero: true, display: true, ticks: { color: 'var(--gray)' } } // Show y values
                            }
                        }
                    });
                }
            }
            if (modalTargetId === 'completedOrdersModal') {
                const chartCtx = modal.querySelector('#completedOrdersModalChart'); // Use modal.querySelector
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
                                label: langData['completedOrdersChartLabel'], // Use localized label
                                data: [100, 110, 105, 120],
                                borderColor: '#28a745', // Green color
                                backgroundColor: 'rgba(72, 187, 120, 0.3)',
                                fill: true,
                                tension: 0.4, // Smoother line
                                pointBackgroundColor: '#28a745', // Point color
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: '#28a745',
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
                                            return `${langData['completedOrdersChartLabel']}: ${context.raw}`; // Localize label in tooltip
                                        }
                                    }
                                }
                            },
                            scales: {
                                x: { display: true, ticks: { color: 'var(--gray)' } },
                                y: { beginAtZero: true, display: true, ticks: { color: 'var(--gray)' } }
                            }
                        }
                    });
                }
            }
            if (modalTargetId === 'pendingOrdersModal') {
                const chartCtx = modal.querySelector('#pendingOrdersModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'bar',
                        data: {
                            labels: [
                                langData['newPendingLabel'], // Use localized label
                                langData['oldPendingLabel'] // Use localized label
                            ],
                            datasets: [{
                                label: langData['pendingOrdersChartLabel'], // Use localized label
                                data: [15, 10], // Data aligned with the modal
                                backgroundColor: [
                                    '#FFD700', // Gold Yellow
                                    '#FFA500'  // Orange
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
                                            return `${context.label}: ${context.raw}`;
                                        }
                                    }
                                }
                            },
                            scales: {
                                x: { display: true, ticks: { color: 'var(--gray)' } },
                                y: { beginAtZero: true, display: true, ticks: { color: 'var(--gray)' } }
                            }
                        }
                    });
                }
            }
            if (modalTargetId === 'cancelledOrdersModal') {
                const chartCtx = modal.querySelector('#cancelledOrdersModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'pie',
                        data: {
                            labels: [
                                langData['customerRequestLabel'], // Use localized label
                                langData['outOfStockLabel'], // Use localized label
                                langData['otherReasonsLabel'] // Use localized label
                            ],
                            datasets: [{
                                data: [60, 30, 10], // Example percentage
                                backgroundColor: [
                                    '#E53E3E', // Red (Danger)
                                    '#FD7F20', // Orange (slightly different from warning)
                                    '#A0AEC0'  // (Gray)
                                ],
                                hoverOffset: 8
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: true, // Show Legend
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
                                                label += context.parsed + '%'; // Show Percentage
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
            if (modalTargetId === 'inTransitOrdersModal') {
                const chartCtx = modal.querySelector('#inTransitOrdersModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'line',
                        data: {
                            labels: [
                                langData['dayText'] + ' 1', langData['dayText'] + ' 2',
                                langData['dayText'] + ' 3', langData['dayText'] + ' 4',
                                langData['dayText'] + ' 5'
                            ], // Localized day labels
                            datasets: [{
                                label: langData['inTransitOrdersChartLabel'], // Use localized label
                                data: [15, 12, 10, 8, 5],
                                borderColor: 'var(--primary)', // primary color
                                backgroundColor: 'rgba(90, 103, 216, 0.3)',
                                fill: true,
                                tension: 0.4,
                                pointBackgroundColor: 'var(--primary)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'var(--primary)',
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
                                            return `${langData['inTransitOrdersChartLabel']}: ${context.raw}`; // Localize label in tooltip
                                        }
                                    }
                                }
                            },
                            scales: {
                                x: { display: true, ticks: { color: 'var(--gray)' } },
                                y: { beginAtZero: true, display: true, ticks: { color: 'var(--gray)' } }
                            }
                        }
                    });
                }
            }
            if (modalTargetId === 'refundedOrdersModal') {
                const chartCtx = modal.querySelector('#refundedOrdersModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'bar',
                        data: {
                            labels: [
                                langData['defectiveItemLabel'], // Use localized label
                                langData['dissatisfactionLabel'], // Use localized label
                                langData['otherLabel'] // Use localized label
                            ],
                            datasets: [{
                                label: langData['refundReasonsChartLabel'], // Use localized label
                                data: [1, 0.5, 0.5], // Example refund count data
                                backgroundColor: [
                                    '#6A5ACD', // SlateBlue
                                    '#8A2BE2', // BlueViolet
                                    '#DDA0DD'  // Plum
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
                                            // Localize "order(s)" text
                                            return `${context.label}: ${context.raw} ${langData['ordersTextPlural']}`;
                                        }
                                    }
                                }
                            },
                            scales: {
                                x: { display: true, ticks: { color: 'var(--gray)' } },
                                y: { beginAtZero: true, display: true, ticks: { color: 'var(--gray)' } }
                            }
                        }
                    });
                }
            }
        });
    });

    // Functionality for Action Buttons on Orders Table (View/Edit/Delete).
    const ordersTableActions = document.getElementById('ordersTable');
    if (ordersTableActions) {
        ordersTableActions.addEventListener('click', function(event) {
            const targetBtn = event.target.closest('.action-btn');
            if (!targetBtn) return; // If no action button was clicked, exit.
            const row = targetBtn.closest('tr');
            if (!row) return; // If no table row found, exit.

            // Retrieve data attributes from the table row.
            const orderId = row.dataset.orderId;
            const customer = row.dataset.customer;
            const product = row.dataset.product;
            const amount = row.dataset.amount;
            const date = row.dataset.date;
            const status = row.dataset.status;

            if (targetBtn.classList.contains('view-order')) {
                // Optimize DOM queries by getting modal reference once.
                const viewOrderModal = document.getElementById('viewOrderModal');
                if (viewOrderModal) {
                    const viewOrderId = viewOrderModal.querySelector('#viewOrderId');
                    const viewOrderCustomer = viewOrderModal.querySelector('#viewOrderCustomer');
                    const viewOrderDate = viewOrderModal.querySelector('#viewOrderDate');
                    const viewOrderAmount = viewOrderModal.querySelector('#viewOrderAmount');
                    const viewOrderStatus = viewOrderModal.querySelector('#viewOrderStatus');
                    const viewOrderProduct = viewOrderModal.querySelector('#viewOrderProduct');

                    if (viewOrderId) viewOrderId.textContent = orderId;
                    if (viewOrderCustomer) viewOrderCustomer.textContent = customer;
                    if (viewOrderDate) viewOrderDate.textContent = date;
                    if (viewOrderAmount) viewOrderAmount.textContent = amount;
                    if (viewOrderStatus) viewOrderStatus.textContent = status;
                    if (viewOrderProduct) viewOrderProduct.textContent = product;
                    
                    openModal('viewOrderModal');
                } else {
                    console.warn('View Order Modal not found.');
                }

            } else if (targetBtn.classList.contains('edit-order')) {
                // Optimize DOM queries by getting modal reference once.
                const editOrderModal = document.getElementById('editOrderModal');
                if (editOrderModal) {
                    const editOrderIdDisplay = editOrderModal.querySelector('#editOrderIdDisplay');
                    const editCustomer = editOrderModal.querySelector('#editCustomer');
                    const editProduct = editOrderModal.querySelector('#editProduct');
                    const editAmount = editOrderModal.querySelector('#editAmount');
                    const editDate = editOrderModal.querySelector('#editDate');
                    const editStatus = editOrderModal.querySelector('#editStatus');
                    const editOriginalOrderId = editOrderModal.querySelector('#editOriginalOrderId');

                    if (editOrderIdDisplay) editOrderIdDisplay.textContent = orderId;
                    if (editCustomer) editCustomer.value = customer;
                    if (editProduct) editProduct.value = product;
                    if (editAmount) editAmount.value = amount;
                    if (editDate) editDate.value = date;
                    if (editStatus) editStatus.value = status;
                    if (editOriginalOrderId) editOriginalOrderId.value = orderId;
                    
                    openModal('editOrderModal');
                } else {
                    console.warn('Edit Order Modal not found.');
                }

            } else if (targetBtn.classList.contains('delete-order')) {
                const deleteConfirmModal = document.getElementById('deleteConfirmModal');
                
                if (deleteConfirmModal) {
                    deleteConfirmModal._targetRow = row; // Store reference to the row to be deleted.
                    const deleteOrderIdDisplay = deleteConfirmModal.querySelector('#deleteOrderIdDisplay'); // Use modal.querySelector
                    if (deleteOrderIdDisplay) deleteOrderIdDisplay.textContent = orderId;
                    
                    openModal('deleteConfirmModal');
                    const confirmDeleteBtn = deleteConfirmModal.querySelector('.confirm-delete-btn'); // Use modal.querySelector
                    // Remove old event listener if it exists to prevent duplication.
                    const oldConfirmListener = confirmDeleteBtn?._deleteListener;
                    if (oldConfirmListener) confirmDeleteBtn.removeEventListener('click', oldConfirmListener);

                    // Define the new event listener for the confirmation button.
                    const newConfirmListener = () => {
                        const rowToDelete = deleteConfirmModal._targetRow; // Access from modal reference
                        if(rowToDelete) {
                            rowToDelete.remove(); // Remove the row from the table.
                        }
                        closeModal('deleteConfirmModal'); // Close the confirmation modal.
                        // Show success toast notification, using translation.
                        showToast(`${langData['orderText']} ${orderId} ${langData['hasBeenDeleted']}`, 'success'); // Use localized string
                        
                        // Clean up the event listener and stored reference.
                        confirmDeleteBtn.removeEventListener('click', newConfirmListener);
                        confirmDeleteBtn._deleteListener = null;
                        deleteConfirmModal._targetRow = null; // Clear stored reference.
                    };
                    confirmDeleteBtn.addEventListener('click', newConfirmListener);
                    confirmDeleteBtn._deleteListener = newConfirmListener; // Store reference to the new listener.
                } else {
                    console.warn('Delete Confirm Modal not found in orders.html. Using alert fallback.');
                    if (confirm(`${langData['modalDeleteOrderConfirm']} ${orderId}?`)) { // Use localized string
                        row.remove();
                        showToast(`${langData['orderText']} ${orderId} ${langData['hasBeenDeleted']}`, 'success');
                    }
                }
            }
        });
    }

    // Handle Edit Order Form Submission (Orders Page specific table).
    const editOrderFormOrdersPage = document.getElementById('editOrderForm');
    if (editOrderFormOrdersPage) {
        editOrderFormOrdersPage.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission.
            // Optimize DOM queries by getting form reference once, then query its children.
            const originalOrderId = editOrderFormOrdersPage.querySelector('#editOriginalOrderId').value;
            const newCustomer = editOrderFormOrdersPage.querySelector('#editCustomer').value;
            const newProduct = editOrderFormOrdersPage.querySelector('#editProduct').value;
            const newAmount = editOrderFormOrdersPage.querySelector('#editAmount').value;
            const newDate = editOrderFormOrdersPage.querySelector('#editDate').value;
            const newStatus = editOrderFormOrdersPage.querySelector('#editStatus').value;
            
            // Find the original table row using the data-order-id.
            const targetRow = document.querySelector(`#ordersTable tr[data-order-id="${originalOrderId}"]`);
            if (targetRow) {
                // Update data attributes of the row.
                targetRow.dataset.customer = newCustomer;
                targetRow.dataset.product = newProduct;
                targetRow.dataset.amount = newAmount;
                targetRow.dataset.date = newDate;
                targetRow.dataset.status = newStatus;

                // Update displayed text in table cells.
                // Using optional chaining for safety on children access.
                if (targetRow.children[1]) targetRow.children[1].textContent = newCustomer;
                if (targetRow.children[2]) targetRow.children[2].textContent = newProduct;
                if (targetRow.children[3]) targetRow.children[3].textContent = newAmount;
                if (targetRow.children[4]) targetRow.children[4].textContent = newDate;

                const statusCell = targetRow.children[5]; // The cell containing the status span.
                if (statusCell) {
                    const statusSpan = statusCell.querySelector('.status');
                    if (statusSpan) {
                        statusSpan.textContent = newStatus;
                        statusSpan.className = 'status'; // Reset class.
                        // Add appropriate status class for styling.
                        if (newStatus === 'Completed') statusSpan.classList.add('completed');
                        else if (newStatus === 'Pending') statusSpan.classList.add('pending');
                        else if (newStatus === 'Processing') statusSpan.classList.add('processing');
                    }
                }
            }
            closeModal('editOrderModal'); // Close the edit modal.
            // Show success toast notification, using translation.
            showToast(`${langData['orderText']} ${originalOrderId} ${langData['hasBeenUpdated']}`, 'success'); // Use localized string
        });
    }
});