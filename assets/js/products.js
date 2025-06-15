// File: assets/js/products.js

document.addEventListener('DOMContentLoaded', function() {
    // Ensure this script runs only on the products page.
    if (!document.body.classList.contains('products-page')) {
        return;
    }

    // Get global translation data safely from main.js.
    // This provides access to translated strings based on the current language.
    const currentLanguage = window.currentLanguage || 'en';
    const translations = window.translations || {};
    const langData = translations[currentLanguage] || translations['en']; // Fallback to English

    /**
     * Initializes and re-initializes Chart.js charts for product-related modals.
     * Each chart is destroyed before being re-initialized to ensure fresh rendering
     * and prevent issues with multiple chart instances on the same canvas.
     */
    document.querySelectorAll('.products-page .btn-details').forEach(button => {
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

            // --- Chart Initialization for Product Modals. ---
            if (modalTargetId === 'totalProductsModal') {
                const chartCtx = modal.querySelector('#totalProductsModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'bar',
                        data: {
                            labels: [
                                langData['categoryElectronics'], // Use localized label
                                langData['categoryFashion'], // Use localized label
                                langData['categoryHomeGoods'], // Use localized label
                                langData['categoryBooks'], // Use localized label
                                langData['categorySportsOutdoors'] // Use localized label
                            ],
                            datasets: [{
                                label: langData['productsCountLabel'], // Use localized label
                                data: [50, 120, 30, 200, 75],
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
                                            // Localize "products" text
                                            return `${context.label}: ${context.raw} ${langData['modalProducts']}`;
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
            if (modalTargetId === 'activeProductsModal') {
                const chartCtx = modal.querySelector('#activeProductsModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'doughnut',
                        data: {
                            labels: [
                                langData['activeLabel'], // Use localized label
                                langData['inactiveLabel'] // Use localized label
                            ],
                            datasets: [{
                                data: [110, 15],
                                backgroundColor: ['#28A745', '#DC3545'], // Green for active, Red for inactive
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
                                                // Localize "products" text
                                                label += context.parsed + ' ' + langData['modalProducts'];
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
            if (modalTargetId === 'inactiveProductsModal') {
                const chartCtx = modal.querySelector('#inactiveProductsModalChart'); // Use modal.querySelector
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
                                data: [16, 15, 15, 15],
                                backgroundColor: [
                                    '#FFC107', '#FFA000', '#FFCD38', '#FF8F00'
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
                                            // Localize "Inactive Products" text
                                            return langData['inactiveProductsChartLabel'] + ': ' + context.raw;
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
            if (modalTargetId === 'totalSalesModal') {
                const chartCtx = modal.querySelector('#totalSalesModalChart'); // Use modal.querySelector
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
                                label: langData['monthlySalesLabel'], // Use localized label
                                data: [2500, 3000, 2800, 3200, 3500, 3800],
                                borderColor: '#3182CE',
                                backgroundColor: 'rgba(49, 130, 206, 0.3)',
                                fill: true,
                                tension: 0.4,
                                pointBackgroundColor: '#3182CE',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: '#3182CE',
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
                                            // Localize "Monthly Sales" text
                                            return langData['monthlySalesLabel'] + `: $${context.raw}`;
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
            if (modalTargetId === 'averageRatingModal') {
                const chartCtx = modal.querySelector('#averageRatingModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'bar',
                        data: {
                            labels: [
                                langData['stars5Label'], // Use localized label
                                langData['stars4Label'], // Use localized label
                                langData['stars3Label'], // Use localized label
                                langData['stars2Label'], // Use localized label
                                langData['stars1Label'] // Use localized label
                            ],
                            datasets: [{
                                label: langData['reviewCountLabel'], // Use localized label
                                data: [300, 150, 40, 7, 3],
                                backgroundColor: [
                                    '#4CAF50', '#2196F3', '#FFC107', '#FF9800', '#F44336'
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
                                            // Localize "reviews" text
                                            return `${context.label}: ${context.raw} ${langData['reviewsText']}`;
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
            if (modalTargetId === 'lowStockProductsModal') {
                const chartCtx = modal.querySelector('#lowStockProductsModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'doughnut',
                        data: {
                            labels: [
                                langData['lowStockLabel'], // Use localized label
                                langData['sufficientStockLabel'] // Use localized label
                            ],
                            datasets: [{
                                data: [5, 120],
                                backgroundColor: ['#E53E3E', '#48BB78'], // Red for low stock, Green for sufficient
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
                                                // Localize "products" text
                                                label += context.parsed + ' ' + langData['modalProducts'];
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
        });
    });

    // Add Product Button functionality.
    // Listens for a click on the primary button within the products page's table header.
    document.querySelector('.products-page .table-header .btn-primary')?.addEventListener('click', function() {
        // showToast() is a global function from main.js.
        // Displays a toast message indicating that a form/modal for adding a new product would appear.
        showToast(langData['toastAddProductForm'], 'info'); // Uses localized string
        // Example: If you had a real modal for adding a product, you would call:
        // openModal('addProductModal');
    });

    // Functionality for Action Buttons on Products Table (View Images, Edit, Delete).
    const productsTable = document.getElementById('productsTable');
    if (productsTable) {
        productsTable.addEventListener('click', function(event) {
            const targetBtn = event.target.closest('.action-btn');
            if (!targetBtn) return; // If no action button was clicked, exit.

            const row = targetBtn.closest('tr');
            if (!row) return; // If no table row found, exit.

            // Safely get data attributes from the row.
            const productId = row.dataset.productId || '';
            const productName = row.dataset.name || '';
            const productCategory = row.dataset.category || '';
            const productPrice = row.dataset.price || '';
            const productStock = row.dataset.stock || '';
            const productStatus = row.dataset.status || '';
            
            // Handle View Images Button.
            if (targetBtn.classList.contains('view-images')) {
                const imageGalleryModal = document.getElementById('imageGalleryModal');
                // Optimize DOM queries by getting modal reference once, then query its children.
                if (imageGalleryModal) {
                    const galleryProductNameElem = imageGalleryModal.querySelector('#galleryProductName');
                    const galleryImagesContainer = imageGalleryModal.querySelector('.gallery-images-container');

                    if (galleryProductNameElem && galleryImagesContainer) {
                        // Update modal title with product name.
                        galleryProductNameElem.textContent = `${productName} ${langData['productsProductImages']}`; // Uses localized string
                        galleryImagesContainer.innerHTML = ''; // Clear previous images.

                        // MODIFIED: Use products.jpg directly as a placeholder image.
                        const imageUrl = 'assets/images/products.jpg'; // Path to your products.jpg

                        const imgWrapper = document.createElement('div');
                        imgWrapper.classList.add('image-viewer-wrapper');

                        const img = document.createElement('img');
                        img.src = imageUrl;
                        img.alt = productName; // Alt text for accessibility.
                        imgWrapper.appendChild(img);
                        
                        galleryImagesContainer.appendChild(imgWrapper);
                        
                        // ADDED: Add a note if there's only one image or this is the default image, with translation.
                        galleryImagesContainer.innerHTML += `<p class="image-source-note" style="text-align: center; color: var(--gray); margin-top: 15px; font-size: 0.85rem;">${langData['productImagesSimulatedNote']}</p>`; // Uses localized string

                        openModal('imageGalleryModal');
                    } else {
                        console.warn('One or more required image gallery modal elements not found.');
                        showToast(`${langData['toastSimulatingImageGallery']} ${productName}.`, 'info'); // Uses localized string
                    }
                } else {
                    console.warn('Image Gallery Modal not found.');
                    showToast(`${langData['toastSimulatingImageGallery']} ${productName}.`, 'info'); // Uses localized string
                }

            // Handle Edit Product Button.
            } else if (targetBtn.classList.contains('edit-product')) {
                const editProductModal = document.getElementById('editProductModal');
                if (editProductModal) {
                    // Optimize DOM queries by getting modal reference once, then query its children.
                    const editProductIdDisplay = editProductModal.querySelector('#editProductIdDisplay');
                    const editProductName = editProductModal.querySelector('#editProductName');
                    const editProductCategory = editProductModal.querySelector('#editProductCategory');
                    const editProductPrice = editProductModal.querySelector('#editProductPrice');
                    const editProductStock = editProductModal.querySelector('#editProductStock');
                    const editProductStatus = editProductModal.querySelector('#editProductStatus');
                    const editOriginalProductId = editProductModal.querySelector('#editOriginalProductId');

                    if (editProductIdDisplay) editProductIdDisplay.textContent = productId;
                    if (editProductName) editProductName.value = productName;
                    if (editProductCategory) editProductCategory.value = productCategory;
                    if (editProductPrice) editProductPrice.value = productPrice;
                    if (editProductStock) editProductStock.value = productStock;
                    if (editProductStatus) editProductStatus.value = productStatus;
                    if (editOriginalProductId) editOriginalProductId.value = productId;

                    openModal('editProductModal');
                } else {
                    console.warn('Edit Product Modal not found in products.html.');
                    showToast(`${langData['toastSimulatingEditProduct']} ${productId}.`, 'info'); // Uses localized string
                }
            
            // Handle Delete Product Button.
            } else if (targetBtn.classList.contains('delete-product')) {
                const deleteProductConfirmModal = document.getElementById('deleteProductConfirmModal');
                if (deleteProductConfirmModal) {
                    deleteProductConfirmModal._targetRow = row; // Store reference to the row to be deleted.
                    
                    const deleteProductIdDisplay = deleteProductConfirmModal.querySelector('#deleteProductIdDisplay');
                    if (deleteProductIdDisplay) deleteProductIdDisplay.textContent = productId;

                    openModal('deleteProductConfirmModal');

                    const confirmDeleteBtn = deleteProductConfirmModal.querySelector('.confirm-delete-product-btn');
                    // Remove old event listener if it exists to prevent duplication.
                    const oldConfirmListener = confirmDeleteBtn?._deleteListener;
                    if (oldConfirmListener) {
                        confirmDeleteBtn.removeEventListener('click', oldConfirmListener);
                    }
                    
                    // Define the new event listener for the confirmation button.
                    const newConfirmListener = () => {
                        const rowToDelete = deleteProductConfirmModal._targetRow;
                        if(rowToDelete) {
                            rowToDelete.remove(); // Remove the row from the table.
                            // Show success toast notification, using translation.
                            showToast(`${langData['productText']} ID: ${productId} ${langData['hasBeenDeleted']}`, 'success'); // Uses localized string
                        }
                        closeModal('deleteProductConfirmModal');
                        
                        // Clean up the event listener and stored reference.
                        confirmDeleteBtn.removeEventListener('click', newConfirmListener);
                        confirmDeleteBtn._deleteListener = null;
                        deleteProductConfirmModal._targetRow = null; // Clear stored reference.
                    };
                    confirmDeleteBtn.addEventListener('click', newConfirmListener);
                    confirmDeleteBtn._deleteListener = newConfirmListener; // Store the reference to the new listener.

                } else {
                    console.warn('Delete Product Confirm Modal not found in products.html. Using alert fallback.');
                    // Fallback to native confirm dialog if modal is not found.
                    if (confirm(`${langData['modalDeleteProductConfirm']} ${productId}?`)) {
                        row.remove();
                        showToast(`${langData['productText']} ID: ${productId} ${langData['hasBeenDeleted']}`, 'success');
                    }
                }
            }
        });
    }

    // Handle Edit Product Form Submission.
    const editProductForm = document.getElementById('editProductForm');
    if (editProductForm) {
        editProductForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission.

            // Optimize DOM queries by getting form reference once, then query its children.
            const originalProductId = editProductForm.querySelector('#editOriginalProductId').value;
            const newName = editProductForm.querySelector('#editProductName').value;
            const newCategory = editProductForm.querySelector('#editProductCategory').value;
            const newPrice = editProductForm.querySelector('#editProductPrice').value;
            const newStock = editProductForm.querySelector('#editProductStock').value;
            const newStatus = editProductForm.querySelector('#editProductStatus').value;

            // Find the original table row using the data-product-id.
            const targetRow = document.querySelector(`#productsTable tr[data-product-id="${originalProductId}"]`);
            if (targetRow) {
                // Update data-attributes of the row.
                targetRow.dataset.name = newName;
                targetRow.dataset.category = newCategory;
                targetRow.dataset.price = newPrice;
                targetRow.dataset.stock = newStock;
                targetRow.dataset.status = newStatus;

                // Update displayed text in table cells.
                // Using optional chaining for safety on children access.
                if (targetRow.children[1]) targetRow.children[1].textContent = newName;

                const categoryCell = targetRow.children[2];
                if (categoryCell) {
                    let categorySpan = categoryCell.querySelector('span');
                    if (!categorySpan) { // Create a span if it doesn't exist.
                        categorySpan = document.createElement('span');
                        categoryCell.textContent = ''; // Clear existing text before appending span.
                        categoryCell.appendChild(categorySpan);
                    }
                    categorySpan.textContent = newCategory;
                    // Note: If categories had distinct styling classes, those would be managed here too.
                }

                if (targetRow.children[3]) targetRow.children[3].textContent = newPrice;
                if (targetRow.children[4]) targetRow.children[4].textContent = newStock;

                const statusCell = targetRow.children[5];
                if (statusCell) {
                    let statusSpan = statusCell.querySelector('.status');
                    if (!statusSpan) { // Create a span if it doesn't exist.
                        statusSpan = document.createElement('span');
                        statusSpan.className = 'status'; // Add base class.
                        statusCell.textContent = '';
                        statusCell.appendChild(statusSpan);
                    }
                    statusSpan.textContent = newStatus;
                    statusSpan.className = 'status'; // Reset classes to remove previous status style.
                    // Add appropriate status class for styling.
                    if (newStatus === 'Active') statusSpan.classList.add('active');
                    else if (newStatus === 'Inactive') statusSpan.classList.add('inactive');
                    // Use 'pending' class from core.css for 'Low Stock' status for consistent styling.
                    else if (newStatus === 'Low Stock') statusSpan.classList.add('pending');
                }
            }
            closeModal('editProductModal'); // Close the edit modal.
            // Show success toast notification, using translation.
            showToast(`${langData['productText']} ${originalProductId} ${langData['hasBeenUpdated']}`, 'success');
        });
    }
});