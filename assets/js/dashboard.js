// File: assets/js/dashboard.js

document.addEventListener('DOMContentLoaded', function() {
    // Ensure this script runs only on the dashboard page.
    if (!document.body.classList.contains('dashboard-page')) {
        return;
    }

    // Get global translation data safely from main.js.
    const currentLanguage = window.currentLanguage || 'en';
    const translations = window.translations || {};
    const langData = translations[currentLanguage] || translations['en']; // Fallback to English

    // Chart Initialization (Revenue Overview - Main Chart).
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        const ctx = revenueCtx.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(90, 103, 216, 0.4)'); // Primary color with transparency
        gradient.addColorStop(1, 'rgba(90, 103, 216, 0)');

        // Destroy existing chart instance if it exists to prevent re-rendering issues.
        const existingChart = Chart.getChart(revenueCtx);
        if (existingChart) existingChart.destroy();

        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: langData['revenueChartLabel'] || 'Revenue ($)', // Localized label
                    data: [12000, 19000, 15000, 18000, 22000, 25000, 23000, 28000, 26000, 30000, 29000, 32000],
                    borderColor: 'var(--primary)',
                    backgroundColor: gradient,
                    borderWidth: 3,
                    pointBackgroundColor: 'var(--white)',
                    pointBorderColor: 'var(--primary)',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    tension: 0.4, // Smoother line
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }, // Hide legend as there's only one dataset
                    tooltip: {
                        mode: 'index',
                        intersect: false, // Show tooltip when hovering anywhere on the line
                        backgroundColor: 'var(--dark)',
                        titleFont: { size: 14, weight: 'bold' },
                        bodyFont: { size: 12 },
                        padding: 10,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) label += ': ';
                                if (context.parsed.y !== null) label += '$' + context.parsed.y.toLocaleString();
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'var(--border-color)', // Grid line color
                            drawBorder: false
                        },
                        ticks: {
                            callback: function(value) { return '$' + value.toLocaleString(); },
                            color: 'var(--gray)', // Tick label color
                            font: { size: 11 }
                        }
                    },
                    x: {
                        grid: { display: false }, // Hide x-axis grid lines
                        ticks: {
                            color: 'var(--gray)',
                            font: { size: 11 }
                        }
                    }
                }
            }
        });
    } else { console.warn("Revenue Chart canvas not found on this page."); }

    // Chart Initialization (Sales Distribution - Main Chart).
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        // Destroy existing chart instance.
        const existingChart = Chart.getChart(salesCtx);
        if (existingChart) existingChart.destroy();

        new Chart(salesCtx, {
            type: 'doughnut',
            data: {
                labels: [
                    langData['categoryElectronics'] || 'Electronics',
                    langData['categoryFashion'] || 'Fashion',
                    langData['categoryHomeGoods'] || 'Home Goods',
                    langData['categoryBooks'] || 'Books',
                    langData['categoryOther'] || 'Other'
                ],
                datasets: [{
                    data: [35, 25, 20, 10, 10],
                    backgroundColor: [
                        '#5a67d8', // Primary
                        '#38b2ac', // Secondary
                        '#ed8936', // Warning
                        '#e53e3e', // Danger
                        '#a0aec0'  // Gray
                    ],
                    hoverOffset: 15,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%', // Inner hole size
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { boxWidth: 20, padding: 15, font: { size: 12 }, color: 'var(--text-color)' }
                    },
                    tooltip: {
                        backgroundColor: 'var(--dark)',
                        titleFont: { size: 14, weight: 'bold' },
                        bodyFont: { size: 12 },
                        padding: 10,
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) label += ': ';
                                if (context.parsed !== null) {
                                    const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                                    const percentage = ((context.parsed / total) * 100).toFixed(1) + '%';
                                    label += percentage;
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    } else { console.warn("Sales Chart canvas not found on this page."); }

    // Functionality for "Details" Buttons on Stats Cards.
    document.querySelectorAll('.dashboard-page .btn-details').forEach(button => {
        button.addEventListener('click', function() {
            const modalTargetId = this.dataset.modalTarget;
            // openModal() is a global function from main.js.
            openModal(modalTargetId);

            // Get the specific modal element.
            const modal = document.getElementById(modalTargetId);
            if (!modal) {
                console.warn(`Modal with ID ${modalTargetId} not found.`);
                return;
            }

            // --- Chart Initialization and Dynamic Content Population for Dashboard Modals. ---
            // Each modal chart is destroyed and re-initialized to ensure fresh rendering.
            if (modalTargetId === 'ordersModal') {
                const chartCtx = document.getElementById('ordersModalChart');
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
                                label: langData['ordersChartLabel'] || 'Orders',
                                data: [250, 300, 280, 350, 320],
                                borderColor: '#5a67d8', // Primary color
                                backgroundColor: 'rgba(90, 103, 216, 0.3)',
                                fill: true,
                                tension: 0.4, // Smoother line
                                pointBackgroundColor: '#5a67d8',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: '#5a67d8',
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
                                            return `${langData['ordersChartLabel'] || 'Orders'}: ${context.raw}`; // Localize label in tooltip
                                        }
                                    }
                                }
                            },
                            scales: {
                                x: { display: true, ticks: { color: 'var(--gray)' } }, // Display x-axis
                                y: { beginAtZero: true, display: true, ticks: { color: 'var(--gray)' } } // Display y-axis
                            }
                        }
                    });
                }
                // Populate dynamic text content.
                const totalOrders = modal.querySelector('p:has(strong[data-lang-key="modalTotal"])');
                const completed = modal.querySelector('p:has(strong[data-lang-key="modalCompleted"])');
                const pending = modal.querySelector('p:has(strong[data-lang-key="modalPending"])');
                const cancelled = modal.querySelector('p:has(strong[data-lang-key="modalCancelled"])');
                const infoText = modal.querySelector('[data-lang-key="modalOrdersInfo"]');

                if (totalOrders) totalOrders.innerHTML = `<strong>${langData['modalTotal']}</strong> 1,245 <span data-lang-key="modalOrders">${langData['modalOrders']}</span>`;
                if (completed) completed.innerHTML = `<strong>${langData['modalCompleted']}</strong> 1,000`;
                if (pending) pending.innerHTML = `<strong>${langData['modalPending']}</strong> 150`;
                if (cancelled) cancelled.innerHTML = `<strong>${langData['modalCancelled']}</strong> 95`;
                if (infoText) infoText.textContent = langData['modalOrdersInfo'];
                const breakdownText = modal.querySelector('[data-lang-key="ordersBreakdownText"]');
                if (breakdownText) breakdownText.textContent = langData['ordersBreakdownText'];
                const trendText = modal.querySelector('[data-lang-key="ordersTrendText"]');
                if (trendText) trendText.textContent = langData['ordersTrendText'];


            } else if (modalTargetId === 'revenueModal') {
                const chartCtx = document.getElementById('revenueModalChart');
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
                                label: langData['revenueChartLabel'] || 'Revenue ($)',
                                data: [8000, 9500, 9000, 12000],
                                backgroundColor: [
                                    '#48bb78', // Success
                                    '#66CDAA', // MediumAquamarine
                                    '#3CB371', // MediumSeaGreen
                                    '#20B2AA'  // LightSeaGreen
                                ],
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
                                            return `${langData['revenueChartLabel'] || 'Revenue'}: $${context.raw.toLocaleString()}`; // Localize label in tooltip
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
                // Populate dynamic text content.
                const totalRevenue = modal.querySelector('p:has(strong[data-lang-key="modalTotal"])');
                const monthlyGoal = modal.querySelector('p:has(strong[data-lang-key="modalMonthlyGoal"])');
                const lastMonth = modal.querySelector('p:has(strong[data-lang-key="modalLastMonth"])');
                const infoText = modal.querySelector('[data-lang-key="modalRevenueInfo"]');

                if (totalRevenue) totalRevenue.innerHTML = `<strong>${langData['modalTotal']}</strong> $34.6k`;
                if (monthlyGoal) monthlyGoal.innerHTML = `<strong>${langData['modalMonthlyGoal']}</strong> $40k`;
                if (lastMonth) lastMonth.innerHTML = `<strong>${langData['modalLastMonth']}</strong> $32k`;
                if (infoText) infoText.textContent = langData['modalRevenueInfo'];
                const performanceText = modal.querySelector('[data-lang-key="revenuePerformanceText"]');
                if (performanceText) performanceText.textContent = langData['revenuePerformanceText'];
                const comparisonText = modal.querySelector('[data-lang-key="revenueComparisonText"]');
                if (comparisonText) comparisonText.textContent = langData['revenueComparisonText'];

            } else if (modalTargetId === 'customersModal') {
                const chartCtx = document.getElementById('customersModalChart');
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
                                label: langData['customersChartLabel'] || 'Customers',
                                data: [500, 520, 510, 550],
                                borderColor: '#ed8936', // Warning color
                                backgroundColor: 'rgba(237, 137, 54, 0.3)',
                                fill: true,
                                tension: 0.4,
                                pointBackgroundColor: '#ed8936',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: '#ed8936',
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
                                            return `${langData['customersChartLabel'] || 'Customers'}: ${context.raw.toLocaleString()}`; // Localize label in tooltip
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
                // Populate dynamic text content.
                const totalCustomers = modal.querySelector('p:has(strong[data-lang-key="modalTotal"])');
                const newCustomers = modal.querySelector('p:has(strong[data-lang-key="modalNewCustomers"])');
                const activeCustomers = modal.querySelector('p:has(strong[data-lang-key="modalActiveCustomers"])');
                const infoText = modal.querySelector('[data-lang-key="modalCustomersInfo"]');

                if (totalCustomers) totalCustomers.innerHTML = `<strong>${langData['modalTotal']}</strong> 2,432 <span data-lang-key="modalCustomers">${langData['modalCustomers']}</span>`;
                if (newCustomers) newCustomers.innerHTML = `<strong>${langData['modalNewCustomers']}</strong> 150`;
                if (activeCustomers) activeCustomers.innerHTML = `<strong>${langData['modalActiveCustomers']}</strong> 2,000`;
                if (infoText) infoText.textContent = langData['modalCustomersInfo'];
                const newVsActiveText = modal.querySelector('[data-lang-key="customersNewVsActiveText"]');
                if (newVsActiveText) newVsActiveText.textContent = langData['customersNewVsActiveText'];
                const growthText = modal.querySelector('[data-lang-key="customersGrowthText"]');
                if (growthText) growthText.textContent = langData['customersGrowthText'];

            } else if (modalTargetId === 'conversionModal') {
                const chartCtx = document.getElementById('conversionModalChart');
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
                                label: langData['conversionRateChartLabel'] || 'Conversion Rate (%)',
                                data: [58, 57, 56, 56.3],
                                backgroundColor: [
                                    '#e53e3e', // Danger
                                    '#CD5C5C', // IndianRed
                                    '#FA8072', // Salmon
                                    '#FF6347'  // Tomato
                                ],
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
                                            return `${langData['conversionRateChartLabel'] || 'Conversion Rate'}: ${context.raw}%`; // Localize label in tooltip
                                        }
                                    }
                                }
                            },
                            scales: {
                                x: { display: true, ticks: { color: 'var(--gray)' } },
                                y: { beginAtZero: true, display: true, max: 100, ticks: { color: 'var(--gray)' } }
                            }
                        }
                    });
                }
                // Populate dynamic text content.
                const currentRate = modal.querySelector('p:has(strong[data-lang-key="modalCurrentRate"])');
                const targetRate = modal.querySelector('p:has(strong[data-lang-key="modalTargetRate"])');
                const previousPeriod = modal.querySelector('p:has(strong[data-lang-key="modalPreviousPeriod"])');
                const infoText = modal.querySelector('[data-lang-key="modalConversionInfo"]');


                if (currentRate) currentRate.innerHTML = `<strong>${langData['modalCurrentRate']}</strong> 56.3%`;
                if (targetRate) targetRate.innerHTML = `<strong>${langData['modalTargetRate']}</strong> 60%`;
                if (previousPeriod) previousPeriod.innerHTML = `<strong>${langData['modalPreviousPeriod']}</strong> 59%`;
                if (infoText) infoText.textContent = langData['modalConversionInfo'];
                const targetVsCurrentText = modal.querySelector('[data-lang-key="conversionTargetVsCurrentText"]');
                if (targetVsCurrentText) targetVsCurrentText.textContent = langData['conversionTargetVsCurrentText'];
                const conversionTrendText = modal.querySelector('[data-lang-key="conversionTrendText"]');
                if (conversionTrendText) conversionTrendText.textContent = langData['conversionTrendText'];


            } else if (modalTargetId === 'productsInStockModal') {
                const chartCtx = document.getElementById('productsInStockModalChart');
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'bar',
                        data: {
                            labels: [
                                langData['categoryA'] || 'Category A',
                                langData['categoryB'] || 'Category B',
                                langData['categoryC'] || 'Category C',
                                langData['categoryD'] || 'Category D'
                            ], // Localized category labels
                            datasets: [{
                                label: langData['productsInStockChartLabel'] || 'Products in Stock',
                                data: [80, 60, 40, 25],
                                backgroundColor: [
                                    '#3182ce', // Info
                                    '#4299E1', // Blue-light
                                    '#63B3ED', // Blue-lighter
                                    '#90CDF4'  // Light blue
                                ],
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
                                            return `${context.label}: ${context.raw} ${langData['modalProducts'] || 'products'}`; // Localize label in tooltip
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
                // Populate dynamic text content.
                const totalInStock = modal.querySelector('p:has(strong[data-lang-key="modalTotalInStock"])');
                const highDemandItems = modal.querySelector('p:has(strong[data-lang-key="modalHighDemandItems"])');
                const lowStockAlerts = modal.querySelector('p:has(strong[data-lang-key="modalLowStockAlerts"])');
                const infoText = modal.querySelector('[data-lang-key="modalProductsInStockInfo"]');

                if (totalInStock) totalInStock.innerHTML = `<strong>${langData['modalTotalInStock']}</strong> 180 <span data-lang-key="modalProducts">${langData['modalProducts']}</span>`;
                if (highDemandItems) highDemandItems.innerHTML = `<strong>${langData['modalHighDemandItems']}</strong> 50 <span data-lang-key="modalProducts">${langData['modalProducts']}</span>`;
                if (lowStockAlerts) lowStockAlerts.innerHTML = `<strong>${langData['modalLowStockAlerts']}</strong> 5 <span data-lang-key="modalProducts">${langData['modalProducts']}</span>`;
                if (infoText) infoText.textContent = langData['modalProductsInStockInfo'];
                const highDemandText = modal.querySelector('[data-lang-key="productsHighDemandText"]');
                if (highDemandText) highDemandText.textContent = langData['productsHighDemandText'];
                const alertsText = modal.querySelector('[data-lang-key="productsAlertsText"]');
                if (alertsText) alertsText.textContent = langData['productsAlertsText'];


            } else if (modalTargetId === 'openTicketsModal') {
                const chartCtx = document.getElementById('openTicketsModalChart');
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'doughnut',
                        data: {
                            labels: [
                                langData['resolvedTicketsLabel'] || 'Resolved',
                                langData['openTicketsChartLabel'] || 'Open',
                                langData['pendingCustomerReplyLabel'] || 'Pending Customer Reply'
                            ], // Localized labels
                            datasets: [{
                                data: [85, 8, 7], // Updated data assuming 100 total (85 resolved, 8 open, 7 pending)
                                backgroundColor: [
                                    '#48bb78', // Success for resolved
                                    '#38b2ac', // Secondary for open
                                    '#a0aec0'  // Gray for pending
                                ],
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
                                    labels: { color: 'var(--text-color)' }
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function(context) {
                                            let label = context.label || '';
                                            if (label) label += ': ';
                                            if (context.parsed) label += context.parsed + '%';
                                            return label;
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
                // Populate dynamic text content.
                const totalOpen = modal.querySelector('p:has(strong[data-lang-key="modalTotalOpen"])');
                const newToday = modal.querySelector('p:has(strong[data-lang-key="modalNewToday"])');
                const avgResolutionTime = modal.querySelector('p:has(strong[data-lang-key="modalAvgResolutionTime"])');
                const infoText = modal.querySelector('[data-lang-key="modalOpenTicketsInfo"]');


                if (totalOpen) totalOpen.innerHTML = `<strong>${langData['modalTotalOpen']}</strong> 8 <span data-lang-key="modalTickets">${langData['modalTickets']}</span>`;
                if (newToday) newToday.innerHTML = `<strong>${langData['modalNewToday']}</strong> 2 <span data-lang-key="modalTickets">${langData['modalTickets']}</span>`;
                if (avgResolutionTime) avgResolutionTime.innerHTML = `<strong>${langData['modalAvgResolutionTime']}</strong> 1.5 <span data-lang-key="modalDays">${langData['modalDays']}</span>`;
                if (infoText) infoText.textContent = langData['modalOpenTicketsInfo'];
                const dailyActivityText = modal.querySelector('[data-lang-key="ticketsDailyActivityText"]');
                if (dailyActivityText) dailyActivityText.textContent = langData['ticketsDailyActivityText'];
                const efficiencyText = modal.querySelector('[data-lang-key="ticketsEfficiencyText"]');
                if (efficiencyText) efficiencyText.textContent = langData['ticketsEfficiencyText'];
            }
        });
    });

    // Functionality for Download Chart Buttons (Dashboard).
    // downloadChart() is a global function from main.js.
    document.getElementById('downloadRevenueChart')?.addEventListener('click', function() {
        window.downloadChart('revenueChart', 'Revenue_Overview.png');
    });
    document.getElementById('downloadSalesChart')?.addEventListener('click', function() {
        window.downloadChart('salesChart', 'Sales_Distribution.png');
    });


    // Functionality for Action Buttons on "Recent Orders" Table (Dashboard).
    const recentOrdersTable = document.getElementById('recentOrdersTable');
    if (recentOrdersTable) {
        recentOrdersTable.addEventListener('click', function(event) {
            const targetBtn = event.target.closest('.action-btn');
            if (!targetBtn) return; // If no action button was clicked, exit.
            const row = targetBtn.closest('tr');
            if (!row) return; // If no table row found, exit.

            // Retrieve data attributes from the table row.
            const orderId = row.dataset.orderId || '';
            const customer = row.dataset.customer || '';
            const date = row.dataset.date || '';
            const amount = row.dataset.amount || '';
            const status = row.dataset.status || '';
            const products = row.dataset.products || ''; // Specific for this table.

            if (targetBtn.classList.contains('view-order')) {
                // Populate and open the View Order Modal.
                // Ensure elements exist before populating.
                const viewOrderId = document.getElementById('viewOrderId');
                const viewOrderCustomer = document.getElementById('viewOrderCustomer');
                const viewOrderDate = document.getElementById('viewOrderDate');
                const viewOrderAmount = document.getElementById('viewOrderAmount');
                const viewOrderStatus = document.getElementById('viewOrderStatus');
                const viewOrderProducts = document.getElementById('viewOrderProducts');

                if (viewOrderId) viewOrderId.textContent = orderId;
                if (viewOrderCustomer) viewOrderCustomer.textContent = customer;
                if (viewOrderDate) viewOrderDate.textContent = date;
                if (viewOrderAmount) viewOrderAmount.textContent = amount;
                if (viewOrderStatus) viewOrderStatus.textContent = status;
                if (viewOrderProducts) viewOrderProducts.textContent = products;

                // openModal() is a global function from main.js.
                openModal('viewOrderModal');

            } else if (targetBtn.classList.contains('edit-order')) {
                // Populate and open the Edit Order Modal.
                // Ensure elements exist before populating.
                const editOrderIdDisplay = document.getElementById('editOrderIdDisplay');
                const editCustomer = document.getElementById('editCustomer');
                const editDate = document.getElementById('editDate');
                const editAmount = document.getElementById('editAmount');
                const editStatus = document.getElementById('editStatus');
                const editOriginalOrderId = document.getElementById('editOriginalOrderId');

                if (editOrderIdDisplay) editOrderIdDisplay.textContent = orderId;
                if (editCustomer) editCustomer.value = customer;
                if (editDate) editDate.value = date;
                if (editAmount) editAmount.value = amount;
                if (editStatus) editStatus.value = status;
                if (editOriginalOrderId) editOriginalOrderId.value = orderId; // Hidden field to keep track of original ID.

                openModal('editOrderModal');

            } else if (targetBtn.classList.contains('delete-order')) {
                // Store the row reference on the modal element for easy access during deletion.
                const deleteConfirmModal = document.getElementById('deleteConfirmModal');
                if (deleteConfirmModal) {
                    deleteConfirmModal._targetRow = row;
                    const deleteOrderIdDisplay = document.getElementById('deleteOrderIdDisplay');
                    if (deleteOrderIdDisplay) deleteOrderIdDisplay.textContent = orderId;

                    openModal('deleteConfirmModal');

                    // Re-bind the click listener for the confirm delete button to ensure it's fresh.
                    const confirmDeleteBtn = document.querySelector('#deleteConfirmModal .confirm-delete-btn');
                    // Use optional chaining for safety if _deleteListener might not exist.
                    const oldConfirmListener = confirmDeleteBtn?._deleteListener;
                    if (oldConfirmListener) confirmDeleteBtn.removeEventListener('click', oldConfirmListener);

                    // Define the new listener.
                    const newConfirmListener = () => {
                        const rowToDelete = document.getElementById('deleteConfirmModal')._targetRow;
                        if(rowToDelete) {
                            rowToDelete.remove(); // Remove the row from the table.
                        }
                        closeModal('deleteConfirmModal'); // Close the confirmation modal.
                        // showToast() is a global function from main.js.
                        showToast(`${langData['orderText'] || 'Order'} ${orderId} ${langData['hasBeenDeleted'] || 'has been deleted.'}`, 'success');
                        confirmDeleteBtn.removeEventListener('click', newConfirmListener); // Clean up listener.
                        confirmDeleteBtn._deleteListener = null; // Clear stored listener.
                        // Also clear the stored row reference.
                        document.getElementById('deleteConfirmModal')._targetRow = null;
                    };
                    confirmDeleteBtn.addEventListener('click', newConfirmListener); // Attach new listener.
                    confirmDeleteBtn._deleteListener = newConfirmListener; // Store the new listener for future removal.
                } else {
                    console.warn('Delete Confirm Modal not found in dashboard.html. Using alert fallback.');
                    if (confirm(`${langData['modalDeleteOrderConfirm']} ${orderId}?`)) {
                        row.remove();
                        showToast(`${langData['orderText'] || 'Order'} ${orderId} ${langData['hasBeenDeleted'] || 'has been deleted.'}`, 'success');
                    }
                }
            }
        });
    }

    // Handle Edit Order Form Submission (Dashboard specific table).
    const editOrderForm = document.getElementById('editOrderForm');
    if (editOrderForm) {
        editOrderForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission.

            const originalOrderId = document.getElementById('editOriginalOrderId').value;
            const newCustomer = document.getElementById('editCustomer').value;
            const newDate = document.getElementById('editDate').value;
            const newAmount = document.getElementById('editAmount').value;
            const newStatus = document.getElementById('editStatus').value;

            // Find the original table row using the data-order-id.
            const targetRow = document.querySelector(`tr[data-order-id="${originalOrderId}"]`);
            if (targetRow) {
                // Update the data attributes.
                targetRow.dataset.customer = newCustomer;
                targetRow.dataset.date = newDate;
                targetRow.dataset.amount = newAmount;
                targetRow.dataset.status = newStatus;

                // Update the displayed text in the table cells.
                if (targetRow.children[1]) targetRow.children[1].textContent = newCustomer;
                if (targetRow.children[2]) targetRow.children[2].textContent = newDate;
                if (targetRow.children[3]) targetRow.children[3].textContent = newAmount;

                // Update the status span text and its class for styling.
                const statusCell = targetRow.children[4];
                if (statusCell) {
                    const statusSpan = statusCell.querySelector('.status');
                    if (statusSpan) {
                        statusSpan.textContent = newStatus;
                        statusSpan.className = 'status'; // Reset classes.
                        if (newStatus === 'Completed') statusSpan.classList.add('completed');
                        else if (newStatus === 'Pending') statusSpan.classList.add('pending');
                        else if (newStatus === 'Processing') statusSpan.classList.add('processing');
                    }
                }
            }

            closeModal('editOrderModal'); // Close the edit modal.
            showToast(`${langData['orderText'] || 'Order'} ${originalOrderId} ${langData['hasBeenUpdated'] || 'has been updated.'}`, 'success'); // Show success toast.
        });
    }
});