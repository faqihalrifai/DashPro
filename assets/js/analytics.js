// File: assets/js/analytics.js

document.addEventListener('DOMContentLoaded', function() {
    // Ensure this is the analytics page before executing page-specific scripts.
    if (!document.body.classList.contains('analytics-page')) {
        return;
    }

    // Get global translation data safely from main.js.
    // This provides access to translated strings based on the current language.
    const currentLanguage = window.currentLanguage || 'en';
    const translations = window.translations || {};
    const langData = translations[currentLanguage] || translations['en']; // Fallback to English

    // Date Range Filter Buttons functionality.
    const dateFilterButtons = document.querySelectorAll('.date-range-filter-group .filter-btn');
    if (dateFilterButtons.length > 0) {
        dateFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove 'active' class from all buttons and add to the clicked one.
                dateFilterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                const selectedRange = this.dataset.range;
                
                // Show a toast notification indicating the filter action.
                // showToast() is a global function from main.js.
                // Use dynamic translation for the toast message.
                showToast(`${langData['analyticsDataFilteredFor']} ${selectedRange}`, 'info'); // Use localized string directly
                
                // --- Add actual data filtering/chart update logic here. ---
                // This would typically involve fetching new data based on the selected range
                // and updating the charts (e.g., by redrawing them with new data).
                // For this template, it's a simulated action.
            });
        });
    }

    // Chart Initialization for Visitor Trends (Main Chart).
    const visitorTrendsCtx = document.getElementById('visitorTrendsChart');
    if (visitorTrendsCtx) {
        const ctx = visitorTrendsCtx.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(56, 178, 172, 0.4)'); // Using secondary color with transparency
        gradient.addColorStop(1, 'rgba(56, 178, 172, 0)');
        
        // Destroy existing chart instance if it exists to prevent re-rendering issues.
        const existingChart = Chart.getChart(visitorTrendsCtx);
        if (existingChart) existingChart.destroy();

        new Chart(visitorTrendsCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
                datasets: [{
                    label: langData['analyticsVisitorTrendsChartLabel'], // Use localized chart label
                    data: [10000, 12000, 9000, 15000, 11000, 13000, 10500, 16000],
                    borderColor: 'var(--secondary)',
                    backgroundColor: gradient,
                    borderWidth: 3,
                    pointBackgroundColor: 'var(--white)',
                    pointBorderColor: 'var(--secondary)',
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
                                if (context.parsed.y !== null) label += context.parsed.y.toLocaleString() + ' ' + langData['visitorsText']; // Localize "visitors"
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
                            drawBorder: false // Do not draw the axis line
                        },
                        ticks: { 
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
    } else { console.warn("Visitor Trends Chart canvas not found on this page."); }

    // Chart Initialization for Traffic Sources (Main Chart).
    const trafficSourcesCtx = document.getElementById('trafficSourcesChart');
    if (trafficSourcesCtx) {
        // Destroy existing chart instance.
        const existingChart = Chart.getChart(trafficSourcesCtx);
        if (existingChart) existingChart.destroy();

        new Chart(trafficSourcesCtx, {
            type: 'pie',
            data: {
                labels: [
                    langData['trafficSourceDirect'], // Use localized label
                    langData['trafficSourceOrganicSearch'], // Use localized label
                    langData['trafficSourceSocialMedia'], // Use localized label
                    langData['trafficSourceReferral'], // Use localized label
                    langData['trafficSourceEmailCampaign'], // Use localized label
                    langData['trafficSourcePaidAds'] // Use localized label
                ],
                datasets: [{
                    data: [25, 35, 18, 12, 5, 5],
                    // Use a diverse set of colors for the pie chart segments.
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#C9CBCF'],
                    hoverOffset: 15, // Increase segment size on hover
                    borderWidth: 1,
                    borderColor: 'var(--card-background)' // Border color around segments
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right', // Position legend to the right
                        labels: { 
                            boxWidth: 20, 
                            padding: 15, 
                            font: { size: 12 }, 
                            color: 'var(--text-color)' 
                        }
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
    } else { console.warn("Traffic Sources Chart canvas not found on this page."); }

    // Functionality for Download Chart Buttons (Analytics Page).
    // downloadChart() is a global function from main.js.
    document.getElementById('downloadVisitorTrendsChart')?.addEventListener('click', function() {
        window.downloadChart('visitorTrendsChart', 'Visitor_Trends.png');
    });
    document.getElementById('downloadTrafficSourcesChart')?.addEventListener('click', function() {
        window.downloadChart('trafficSourcesChart', 'Traffic_Sources.png');
    });

    /**
     * Initializes and re-initializes Chart.js charts for analytics-related modals.
     * Each chart is destroyed before being re-initialized to ensure fresh rendering
     * and prevent issues with multiple chart instances on the same canvas.
     */
    document.querySelectorAll('.analytics-page .btn-details').forEach(button => {
        button.addEventListener('click', function() {
            const modalTargetId = this.dataset.modalTarget;
            // openModal() is a global function from main.js.
            openModal(modalTargetId);

            // Get the specific modal element once to optimize DOM queries for its children.
            const modal = document.getElementById(modalTargetId);
            if (!modal) {
                console.warn(`Modal with ID ${modalTargetId} not found.`);
                return; // Exit if modal element is not found.
            }

            // --- Chart Initialization for Modals on Analytics Page. ---
            if (modalTargetId === 'pageViewsModal') {
                const chartCtx = modal.querySelector('#pageViewsModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'line',
                        data: {
                            labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'],
                            datasets: [{
                                label: langData['pageViewsChartLabel'], // Use localized label
                                data: [5000, 7000, 6000, 8000, 7500, 9000, 10000],
                                borderColor: 'var(--primary)',
                                backgroundColor: 'rgba(90, 103, 216, 0.2)',
                                fill: true,
                                tension: 0.3
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            scales: { x: { display: false }, y: { display: false } } // Hide axes for mini-charts
                        }
                    });
                }
            }
            if (modalTargetId === 'uniqueVisitorsModal') {
                const chartCtx = modal.querySelector('#uniqueVisitorsModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'bar',
                        data: {
                            labels: [langData['weekText'] + ' 1', langData['weekText'] + ' 2', langData['weekText'] + ' 3', langData['weekText'] + ' 4'],
                            datasets: [{
                                label: langData['uniqueVisitorsChartLabel'], // Use localized label
                                data: [15000, 18000, 17000, 20000],
                                backgroundColor: [
                                    '#A6C48A', '#7EB09B', '#5A8D80', '#366B62' 
                                ],
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            scales: { x: { display: false }, y: { display: false } }
                        }
                    });
                }
            }
            if (modalTargetId === 'sessionDurationModal') {
                const chartCtx = modal.querySelector('#sessionDurationModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'line',
                        data: {
                            labels: [langData['dayText'] + ' 1', langData['dayText'] + ' 10', langData['dayText'] + ' 20', langData['dayText'] + ' 30'],
                            datasets: [{
                                label: langData['avgSessionDurationChartLabel'], // Use localized label
                                data: [230, 225, 220, 225], // in seconds
                                borderColor: 'var(--warning)',
                                backgroundColor: 'rgba(237, 137, 54, 0.2)',
                                fill: true,
                                tension: 0.3
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            scales: { x: { display: false }, y: { display: false } }
                        }
                    });
                }
            }
            if (modalTargetId === 'bounceRateModal') {
                const chartCtx = modal.querySelector('#bounceRateModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'bar',
                        data: {
                            labels: [langData['weekText'] + ' 1', langData['weekText'] + ' 2', langData['weekText'] + ' 3', langData['weekText'] + ' 4'],
                            datasets: [{
                                label: langData['bounceRateChartLabel'], // Use localized label
                                data: [45, 46, 45.5, 45.8],
                                backgroundColor: [
                                    '#FFAD60', '#FF8243', '#E0622C', '#C1491E' 
                                ],
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            scales: { x: { display: false }, y: { display: false } }
                        }
                    });
                }
            }
            if (modalTargetId === 'returningVisitorsModal') {
                const chartCtx = modal.querySelector('#returningVisitorsModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'doughnut',
                        data: {
                            labels: [langData['returningText'], langData['newText']], // Use localized labels
                            datasets: [{
                                data: [65, 35],
                                backgroundColor: [
                                    '#6C5B7B', '#C06C84' 
                                ],
                                hoverOffset: 4
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            cutout: '70%',
                            plugins: { legend: { display: false } } // Hide legend as labels are simple
                        }
                    });
                }
            }
            if (modalTargetId === 'conversionFunnelModal') {
                const chartCtx = modal.querySelector('#conversionFunnelModalChart'); // Use modal.querySelector
                if (chartCtx) {
                    const existingChart = Chart.getChart(chartCtx);
                    if (existingChart) existingChart.destroy();
                    new Chart(chartCtx, {
                        type: 'bar',
                        data: {
                            labels: [
                                langData['stage1Label'], // Use localized label
                                langData['stage2Label'], // Use localized label
                                langData['stage3Label'] // Use localized label
                            ],
                            datasets: [{
                                label: langData['conversionRateLabel'], // Use localized label
                                data: [90, 80, 72],
                                backgroundColor: [
                                    '#4F6D7A', '#7F9A9E', '#B0BEC5' 
                                ],
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: { legend: { display: false } },
                            scales: { 
                                x: { grid: { display: false } }, 
                                y: { beginAtZero: true, max: 100 } 
                            }
                        }
                    });
                }
            }
        });
    });
});