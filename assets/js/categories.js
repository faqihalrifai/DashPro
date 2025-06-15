// File: assets/js/categories.js

document.addEventListener('DOMContentLoaded', function() {
    // Ensure this script runs only on the categories page.
    if (!document.body.classList.contains('categories-page')) {
        return;
    }

    // Get global translation data safely from main.js.
    // This provides access to translated strings based on the current language.
    const currentLanguage = window.currentLanguage || 'en';
    const translations = window.translations || {};
    const langData = translations[currentLanguage] || translations['en']; // Fallback to English

    /**
     * Initializes and re-initializes Chart.js charts for category-related modals.
     * Each chart is destroyed before being re-initialized to ensure fresh rendering
     * and prevent issues with multiple chart instances on the same canvas.
     */
    document.querySelectorAll('.categories-page .btn-details').forEach(button => {
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

            // --- Chart Initialization for Modals on Categories Page. ---
            if (modalTargetId === 'totalCategoriesModal') {
                const chartCtx = modal.querySelector('#totalCategoriesModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'doughnut',
                        data: {
                            labels: [
                                langData['modalMainCategoriesLabel'], // Use localized label
                                langData['modalSubCategoriesLabel']   // Use localized label
                            ],
                            datasets: [{
                                data: [10, 5], // Example: 10 main, 5 sub
                                backgroundColor: ['#5a67d8', '#38b2ac'], // Primary & Secondary colors
                                hoverOffset: 8
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            cutout: '70%',
                            plugins: {
                                legend: {
                                    display: true, // Show legend
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
                                                // Localize "categories" text
                                                label += context.parsed + ' ' + langData['modalCategories'];
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
            if (modalTargetId === 'newCategoriesModal') {
                const chartCtx = modal.querySelector('#newCategoriesModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'bar',
                        data: {
                            labels: [
                                langData['monthJan'], // Localized month
                                langData['monthFeb'],
                                langData['monthMar'],
                                langData['monthApr'],
                                langData['monthMay'],
                                langData['monthJun']
                            ],
                            datasets: [{
                                label: langData['newCategoriesAddedLabel'], // Localized label
                                data: [1, 0, 2, 0, 3, 1],
                                backgroundColor: [
                                    '#48BB78', // Success
                                    '#A0AEC0', // Gray (for zero value)
                                    '#48BB78',
                                    '#A0AEC0',
                                    '#48BB78',
                                    '#48BB78'
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
                                            // Localize "New Categories" text
                                            return langData['newCategoriesLabel'] + ': ' + context.raw;
                                        }
                                    }
                                }
                            },
                            scales: {
                                x: { display: true, ticks: { color: 'var(--gray)' } }, // Show X axis labels
                                y: { beginAtZero: true, display: true, ticks: { color: 'var(--gray)' } } // Show Y axis labels
                            }
                        }
                    });
                }
            }
            if (modalTargetId === 'topCategoriesModal') {
                const chartCtx = modal.querySelector('#topCategoriesModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'pie',
                        data: {
                            labels: [
                                langData['categoryElectronics'], // Use localized label
                                langData['categoryApparel'], // Use localized label
                                langData['categoryHomeGoods'], // Use localized label
                                langData['categoryBooks'], // Use localized label
                                langData['categorySportsOutdoors'] // Use localized label
                            ],
                            datasets: [{
                                data: [40, 25, 20, 10, 5],
                                backgroundColor: [
                                    '#5a67d8', // Primary
                                    '#38b2ac', // Secondary
                                    '#ed8936', // Warning
                                    '#e53e3e', // Danger
                                    '#3182ce'  // Info
                                ],
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
                                                // Localize "Revenue" text
                                                label += context.parsed + '% ' + langData['revenueText'];
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
            if (modalTargetId === 'trendingCategoriesModal') {
                const chartCtx = modal.querySelector('#trendingCategoriesModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'line',
                        data: {
                            labels: [
                                langData['weekText'] + ' 1', langData['weekText'] + ' 2',
                                langData['weekText'] + ' 3', langData['weekText'] + ' 4',
                                langData['weekText'] + ' 5'
                            ], // Localized week labels
                            datasets: [{
                                label: langData['trendScoreLabel'], // Use localized label
                                data: [70, 75, 80, 85, 90],
                                borderColor: '#3182ce', // Info color
                                backgroundColor: 'rgba(49, 130, 206, 0.3)',
                                fill: true,
                                tension: 0.4, // Smoother line
                                pointBackgroundColor: '#3182ce',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: '#3182ce',
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
                                            // Localize "Trend Score" text
                                            return langData['trendScoreLabel'] + ': ' + context.raw;
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
            if (modalTargetId === 'categorizedProductsModal') {
                const chartCtx = modal.querySelector('#categorizedProductsModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'doughnut',
                        data: {
                            labels: [
                                langData['categorizedLabel'], // Use localized label
                                langData['uncategorizedLabel'] // Use localized label
                            ],
                            datasets: [{
                                data: [80, 20],
                                backgroundColor: ['#38b2ac', '#a0aec0'], // Secondary & Gray
                                hoverOffset: 8
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            cutout: '70%',
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
            if (modalTargetId === 'categoriesReviewModal') {
                const chartCtx = modal.querySelector('#categoriesReviewModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'bar',
                        data: {
                            labels: [
                                langData['outdatedProductsLabel'], // Use localized label
                                langData['lowSalesVolumeLabel'] // Use localized label
                            ],
                            datasets: [{
                                label: langData['categoriesToReviewLabel'], // Use localized label
                                data: [15, 5],
                                backgroundColor: [
                                    '#e53e3e', // Danger
                                    '#ed8936'  // Warning
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
                                            // Localize "categories" text
                                            return `${context.label}: ${context.raw} ${langData['modalCategories']}`;
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

    // Add Category Button functionality.
    document.getElementById('addCategoryBtn')?.addEventListener('click', function() {
        // showToast() is a global function from main.js.
        // Displays a toast message indicating that a form/modal for adding a new category would appear.
        showToast(langData['toastAddCategoryForm'], 'info'); // Uses localized string
        // Example: If you had a real modal for adding a category:
        // openModal('addCategoryModal');
    });

    // Functionality for Action Buttons on Category Table (View/Edit/Delete/Toggle Description).
    const categoriesTable = document.getElementById('categoriesTable');
    if (categoriesTable) {
        categoriesTable.addEventListener('click', function(event) {
            const targetBtn = event.target.closest('.action-btn');
            if (!targetBtn) return; // If no action button was clicked, exit.

            const row = targetBtn.closest('tr');
            if (!row) return; // If no table row found, exit.

            // Safely get data attributes from the row.
            const categoryId = row.dataset.categoryId || '';
            const name = row.dataset.name || '';
            const totalProducts = row.dataset.totalProducts || '';
            const lastUpdated = row.dataset.lastUpdated || '';
            const description = row.dataset.description || '';
            // Get the *next* sibling row which is the description row.
            const descriptionRow = row.nextElementSibling; 

            // Handle View Category Button click.
            if (targetBtn.classList.contains('view-category')) {
                // Optimize DOM queries by getting modal reference once.
                const viewCategoryModal = document.getElementById('viewCategoryModal');
                if (viewCategoryModal) {
                    const viewCategoryId = viewCategoryModal.querySelector('#viewCategoryId');
                    const viewCategoryName = viewCategoryModal.querySelector('#viewCategoryName');
                    const viewCategoryTotalProducts = viewCategoryModal.querySelector('#viewCategoryTotalProducts');
                    const viewCategoryLastUpdated = viewCategoryModal.querySelector('#viewCategoryLastUpdated');
                    const viewCategoryDescription = viewCategoryModal.querySelector('#viewCategoryDescription');

                    if (viewCategoryId) viewCategoryId.textContent = categoryId;
                    if (viewCategoryName) viewCategoryName.textContent = name;
                    if (viewCategoryTotalProducts) viewCategoryTotalProducts.textContent = totalProducts;
                    if (viewCategoryLastUpdated) viewCategoryLastUpdated.textContent = lastUpdated;
                    if (viewCategoryDescription) viewCategoryDescription.textContent = description;
                    
                    // openModal() is a global function from main.js.
                    openModal('viewCategoryModal');
                } else {
                    console.warn('View Category Modal not found.');
                }

            // Handle Edit Category Button click.
            } else if (targetBtn.classList.contains('edit-category')) {
                // Optimize DOM queries by getting modal reference once.
                const editCategoryModal = document.getElementById('editCategoryModal');
                if (editCategoryModal) {
                    const editCategoryIdDisplay = editCategoryModal.querySelector('#editCategoryIdDisplay');
                    const editCategoryName = editCategoryModal.querySelector('#editCategoryName');
                    const editCategoryTotalProducts = editCategoryModal.querySelector('#editCategoryTotalProducts');
                    const editCategoryLastUpdated = editCategoryModal.querySelector('#editCategoryLastUpdated');
                    const editCategoryDescription = editCategoryModal.querySelector('#editCategoryDescription');
                    const editOriginalCategoryId = editCategoryModal.querySelector('#editOriginalCategoryId');

                    if (editCategoryIdDisplay) editCategoryIdDisplay.textContent = categoryId;
                    if (editCategoryName) editCategoryName.value = name;
                    if (editCategoryTotalProducts) editCategoryTotalProducts.value = totalProducts;
                    if (editCategoryLastUpdated) editCategoryLastUpdated.value = lastUpdated;
                    if (editCategoryDescription) editCategoryDescription.value = description;
                    if (editOriginalCategoryId) editOriginalCategoryId.value = categoryId;
                    
                    openModal('editCategoryModal');
                } else {
                    console.warn('Edit Category Modal not found.');
                }

            // Handle Delete Category Button click.
            } else if (targetBtn.classList.contains('delete-category')) {
                const deleteCategoryConfirmModal = document.getElementById('deleteCategoryConfirmModal');
                if (deleteCategoryConfirmModal) {
                    // Store references to the row and its description row for later removal.
                    deleteCategoryConfirmModal._targetRow = row;
                    deleteCategoryConfirmModal._descriptionRow = descriptionRow; 
                    
                    const deleteCategoryIdDisplay = deleteCategoryConfirmModal.querySelector('#deleteCategoryIdDisplay');
                    if (deleteCategoryIdDisplay) deleteCategoryIdDisplay.textContent = categoryId;

                    openModal('deleteCategoryConfirmModal');

                    const confirmDeleteBtn = deleteCategoryConfirmModal.querySelector('.confirm-delete-category-btn');
                    // Remove old event listener if it exists to prevent duplication.
                    const oldConfirmListener = confirmDeleteBtn?._deleteListener;
                    if (oldConfirmListener) {
                        confirmDeleteBtn.removeEventListener('click', oldConfirmListener);
                    }

                    // Define the new event listener for the confirmation button.
                    const newConfirmListener = () => {
                        const rowToDelete = deleteCategoryConfirmModal._targetRow;
                        const descRowToDelete = deleteCategoryConfirmModal._descriptionRow;
                        if(rowToDelete) {
                             rowToDelete.remove(); // Remove the main category row.
                             if (descRowToDelete) {
                                descRowToDelete.remove(); // Remove description row if it exists.
                            }
                        }
                        closeModal('deleteCategoryConfirmModal');
                        // Show success toast notification.
                        showToast(`${langData['categoryText']} ${categoryId} ${langData['hasBeenDeleted']}`, 'success'); // Uses localized string
                        
                        // Clean up the event listener and stored references.
                        confirmDeleteBtn.removeEventListener('click', newConfirmListener);
                        confirmDeleteBtn._deleteListener = null;
                        deleteCategoryConfirmModal._targetRow = null; 
                        deleteCategoryConfirmModal._descriptionRow = null; 
                    };
                    confirmDeleteBtn.addEventListener('click', newConfirmListener);
                    confirmDeleteBtn._deleteListener = newConfirmListener; // Store the reference to the new listener.

                } else {
                    console.warn('Delete Category Confirm Modal not found in categories.html. Using alert fallback.');
                    // Fallback to native confirm dialog if modal is not found.
                    if (confirm(`${langData['modalDeleteCategoryConfirm']} ${categoryId}?`)) { // Uses localized string
                        row.remove();
                        // If descriptionRow also exists, remove it in fallback as well.
                        if (descriptionRow && descriptionRow.classList.contains('category-description-row')) {
                            descriptionRow.remove();
                        }
                        showToast(`${langData['categoryText']} ${categoryId} ${langData['hasBeenDeleted']}`, 'success');
                    }
                }

            // Handle Toggle Description Button click.
            } else if (targetBtn.classList.contains('toggle-description-btn')) {
                // Ensure translations are available.
                const categoriesShowDescription = langData['categoriesShowDescription'];
                const categoriesHideDescription = langData['categoriesHideDescription'];

                if (descriptionRow && descriptionRow.classList.contains('category-description-row')) {
                    const isShowing = descriptionRow.classList.toggle('show-description');
                    targetBtn.textContent = isShowing ? categoriesHideDescription : categoriesShowDescription;
                    
                    // Toggle button styles based on visibility.
                    if (isShowing) {
                         targetBtn.classList.remove('btn-primary');
                         targetBtn.classList.add('btn-secondary'); // Change to secondary style when description is shown.
                     } else {
                         targetBtn.classList.remove('btn-secondary');
                         targetBtn.classList.add('btn-primary'); // Change back to primary style when description is hidden.
                     }
                } else {
                    console.warn("No description row found for this category or it's not correctly structured.");
                    showToast(langData['noDetailedDescription'], 'info'); // Uses localized string
                }
            }
        });
    }

    // Handle Edit Category Form Submission.
    const editCategoryForm = document.getElementById('editCategoryForm');
    if (editCategoryForm) {
        editCategoryForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission.

            // Optimize DOM queries by getting form reference once, then query its children.
            const originalCategoryId = editCategoryForm.querySelector('#editOriginalCategoryId').value;
            const newName = editCategoryForm.querySelector('#editCategoryName').value;
            const newTotalProducts = editCategoryForm.querySelector('#editCategoryTotalProducts').value;
            const newLastUpdated = editCategoryForm.querySelector('#editCategoryLastUpdated').value;
            const newDescription = editCategoryForm.querySelector('#editCategoryDescription').value;

            const targetRow = document.querySelector(`#categoriesTable tr[data-category-id="${originalCategoryId}"]`);
            if (targetRow) {
                // Update data attributes of the main row.
                targetRow.dataset.name = newName;
                targetRow.dataset.totalProducts = newTotalProducts;
                targetRow.dataset.lastUpdated = newLastUpdated;
                targetRow.dataset.description = newDescription;

                // Update displayed text in table cells.
                // Using optional chaining for safety on children access.
                if (targetRow.children[1]) {
                    const categoryNameSpan = targetRow.children[1].querySelector('span[data-lang-key]');
                    if (categoryNameSpan) {
                         // Update the text content of the span (which might be translated).
                         categoryNameSpan.textContent = newName;
                    } else {
                         targetRow.children[1].textContent = newName; // Fallback if span not found.
                    }
                }
                if (targetRow.children[2]) targetRow.children[2].textContent = newTotalProducts;
                if (targetRow.children[3]) targetRow.children[3].textContent = newLastUpdated;

                // Update the corresponding description row if it exists.
                const updatedDescriptionRow = targetRow.nextElementSibling;
                if (updatedDescriptionRow && updatedDescriptionRow.classList.contains('category-description-row')) {
                    const descPElement = updatedDescriptionRow.querySelector('p');
                    if (descPElement) {
                        descPElement.textContent = newDescription;
                        // Also update data-category for consistency, though not strictly needed for this JS.
                        updatedDescriptionRow.dataset.category = newName.toLowerCase().replace(/ & /g, '').replace(/ /g, '');
                    }
                }
            }

            closeModal('editCategoryModal'); // Close the edit modal.
            showToast(`${langData['categoryText']} ${originalCategoryId} ${langData['hasBeenUpdated']}`, 'success'); // Uses localized string
        });
    }
});