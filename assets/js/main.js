// File: assets/js/main.js

// Universal function to toggle the sidebar's visibility.
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const appContainer = document.querySelector('.app-container');
    sidebar.classList.toggle('active'); // Toggles the 'active' class on the sidebar to show/hide it.
    appContainer.classList.toggle('sidebar-open'); // Toggles a class on the main container to show/hide an overlay.
}

// Event listeners for opening and closing the sidebar.
document.querySelector('.toggle-sidebar')?.addEventListener('click', toggleSidebar);
document.querySelector('.close-sidebar')?.addEventListener('click', toggleSidebar);

// Universal function to open a modal.
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex'; // Use flex to center the modal content.
        // Add listener to close modal when clicking outside the content.
        // Ensure event listener is added only once to prevent multiple bindings.
        if (!modal.dataset.outsideClickListenerAdded) {
            modal.addEventListener('click', function closeOnClickOutside(event) {
                if (event.target === modal) { // Check if the click was directly on the modal overlay.
                    closeModal(modalId);
                }
            });
            modal.dataset.outsideClickListenerAdded = 'true'; // Set flag to indicate listener has been added.
        }
    }
}

// Universal function to close a modal.
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Universal Toast Notification Function for displaying transient messages.
function showToast(message, type = 'success') {
    const toastNotification = document.getElementById('toastNotification');
    if (toastNotification) {
        let iconClass = '';
        // Determine the appropriate Font Awesome icon based on the toast type.
        if (type === 'success') {
            iconClass = 'fa-check-circle';
        } else if (type === 'error') {
            iconClass = 'fa-times-circle';
        } else if (type === 'info') {
            iconClass = 'fa-info-circle';
        } else if (type === 'warning') {
            iconClass = 'fa-exclamation-triangle';
        }
        
        let toastIcon = toastNotification.querySelector('i.fas');
        let toastSpan = toastNotification.querySelector('span');

        // Ensure icon and span elements exist within the toast, create if missing.
        if (!toastIcon) {
            toastIcon = document.createElement('i');
            toastIcon.classList.add('fas');
            toastNotification.prepend(toastIcon); // Add icon at the beginning of the toast.
        }
        if (!toastSpan) {
            toastSpan = document.createElement('span');
            toastNotification.appendChild(toastSpan); // Add span at the end of the toast.
        }

        toastIcon.className = `fas ${iconClass}`; // Update the icon class.
        toastSpan.textContent = message;  // Set the message text.

        // Remove previous type classes and add the current one for styling.
        toastNotification.classList.remove('success', 'error', 'info', 'warning');
        toastNotification.classList.add(type);
        toastNotification.classList.add('show'); // Make the toast visible.
        
        // Hide the toast after a set duration (3 seconds).
        setTimeout(() => {
            toastNotification.classList.remove('show');
        }, 3000); 
    }
}


// --- Multi-Language Feature: Translations Object ---
// Contains all translatable strings used throughout the dashboard.
const translations = {
    'en': {
        // Global/Common Phrases
        'dashboardTitle': 'DashPro - Modern Admin Panel Dashboard',
        'helpTitle': 'DashPro - Help & Support',
        'increase': 'increase',
        'decrease': 'decrease',
        'detailsBtn': 'Details',
        'modalClose': 'Close',
        'change': 'change', // For 0% change in trends
        'highGrowth': 'High Growth', // New for categories
        'modalEditProfile': 'Edit Profile', // Common profile modal button
        'modalGoToLogin': 'Go to Login', // Common login/register modal button
        'modalSwitch': 'Switch', // Common switch account modal button
        'modalCancel': 'Cancel', // Common cancel button
        'hasBeenDeleted': 'has been deleted.', // Common phrase for deletion toasts
        'hasBeenUpdated': 'has been updated.', // Common phrase for update toasts
        'forText': 'for', // Used in chart export/view data toast
        'simulatedAction': 'Simulated Action', // Generic simulated action text
        'simulatedFormOpen': 'Simulated form open', // Generic simulated form open text
        'navigatingTo': 'Navigating to', // Toast for navigation
        'pageSimulated': 'page (simulated action).', // Toast for navigation

        // Sidebar Menu
        'menuMain': 'Main',
        'menuDashboard': 'Dashboard',
        'menuAnalytics': 'Analytics',
        'menuOrders': 'Orders',
        'menuManagement': 'Management',
        'menuUsers': 'Users',
        'menuProducts': 'Products',
        'menuCategories': 'Categories',
        'menuSettings': 'Settings',
        'menuHelp': 'Help',

        // Header Notifications/Messages
        'headerNotificationsTitle': 'Notifications',
        'notificationNewOrder': 'New order received!',
        'notificationOrderId': '#ORD-001', // Example ID, might not be translated itself but used in sentence
        'notificationLowStock': 'Product',
        'notificationProductA': '"Product A"', // Example product name
        'notificationUpdateAvailable': 'System update available.',
        'headerViewAllNotifications': 'View All Notifications',
        'headerMessagesTitle': 'Messages',
        'messageNewFeatureInquiry': 'Inquiry about new feature...',
        'messageFeedbackOnReport': 'Feedback on monthly report...',
        'headerViewAllMessages': 'View All Messages',
        'modalAllNotificationsTitle': 'All Notifications',
        'notificationNewOrderFull': 'New order received! Order ID: #ORD-001 from John Doe for $128.50.',
        'notificationLowStockFull': 'Critical low stock alert for "Laptop Pro X15". Only 5 units left.',
        'notificationUpdateAvailableFull': 'System update version 2.1.0 is available. Please update for new features.',
        'notificationNewUserRegistered': 'A new user has registered: Sarah Johnson.',
        'notificationMarkRead': 'Mark as Read',
        'notificationMarkUnread': 'Mark as Unread',
        'modalClearAll': 'Clear All',
        'modalAllMessagesTitle': 'All Messages',
        'messageNewFeatureSubject': 'Subject: Inquiry about new feature rollout',
        'messageNewFeatureDetail': '"Hi team, I was wondering if there\'s any update on the new feature rollout described in the last meeting notes..."',
        'messageFeedbackSubject': 'Subject: Feedback on monthly report',
        'messageFeedbackDetail': '"The monthly report was very insightful. Just had a small question about the Q3 projections..."',
        'messageViewDetails': 'View Details',
        'modalComposeMessage': 'Compose Message',
        'noNotifications': 'No new notifications.', // For clear all notifications scenario
        
        // Header Dropdowns (Profile, Language, Theme)
        'profileMyProfile': 'My Profile',
        'profileAccountSettings': 'Account Settings',
        'profileSwitchAccount': 'Switch Account',
        'profileLoginRegister': 'Login / Register',
        'profileLogout': 'Log Out',
        'settingsThemePrimaryColor': 'Primary Color', // For Theme Settings dropdown

        // Breadcrumbs
        'breadcrumbHome': 'Home',
        'breadcrumbDashboard': 'Dashboard',

        // Dashboard Page - Card Titles & Info
        'cardTotalOrders': 'Total Orders',
        'cardTotalRevenue': 'Total Revenue',
        'cardTotalCustomers': 'Total Customers',
        'cardConversionRate': 'Conversion Rate',
        'cardProductsInStock': 'Products in Stock',
        'cardOpenSupportTickets': 'Open Support Tickets',

        // Dashboard Page - Chart Titles & Options
        'chartRevenueOverview': 'Revenue Overview',
        'chartSalesDistribution': 'Sales Distribution',
        'chartViewData': 'View Data',
        'chartExportCSV': 'Export to CSV',
        'revenueChartLabel': 'Revenue', // Chart label for revenue
        'salesChartLabel': 'Sales', // Chart label for sales
        'categoryElectronics': 'Electronics', // Used in sales distribution chart & products page
        'categoryFashion': 'Fashion', // Used in sales distribution chart & products page
        'categoryHomeGoods': 'Home Goods', // Used in sales distribution chart & products page
        'categoryBooks': 'Books', // Used in sales distribution chart & products page
        'categoryOther': 'Other', // For sales distribution chart
        'revenueBreakdown': 'Revenue breakdown:',
        'revenueBreakdownText': 'Monthly revenue trends show consistent growth. Highest revenue recorded in December ($32k).',
        'revenueKeyFactors': 'Key factors:',
        'revenueKeyFactorsText': 'Strong sales in Q4, successful marketing campaigns.',
        'salesDominantCategories': 'Dominant categories:',
        'salesDominantCategoriesText': 'Electronics (35%) and Fashion (25%) account for the majority of sales.',
        'salesOpportunity': 'Opportunity:',
        'salesOpportunityText': 'Home Goods (20%) shows potential for further growth.',
        'weekText': 'Week', // For chart labels
        'dayText': 'Day', // For chart labels
        'resolvedTicketsLabel': 'Resolved', // For tickets chart
        'openTicketsChartLabel': 'Open', // For tickets chart
        'pendingCustomerReplyLabel': 'Pending Customer Reply', // For tickets chart
        'productsHighDemand': 'High Demand:',
        'productsHighDemandText': '50 products are categorized as high demand.',
        'productsAlerts': 'Alerts:',
        'productsAlertsText': '5 products are currently on low stock, requiring immediate attention for replenishment.',
        'ticketsDailyActivity': 'Daily Activity:',
        'ticketsDailyActivityText': '2 new tickets received today.',
        'ticketsEfficiency': 'Efficiency:',
        'ticketsEfficiencyText': 'Average resolution time is 1.5 days, indicating quick support response.',
        'categoryA': 'Category A', // For products in stock modal chart
        'categoryB': 'Category B', // For products in stock modal chart
        'categoryC': 'Category C', // For products in stock modal chart
        'categoryD': 'Category D', // For products in stock modal chart
        'productsInStockChartLabel': 'Products in Stock', // For products in stock modal chart
        'conversionRateChartLabel': 'Conversion Rate', // For conversion modal chart
        'customersChartLabel': 'Customers', // For customers modal chart
        'ordersChartLabel': 'Orders', // For orders modal chart
        'orderText': 'Order', // For order specific toasts

        // Dashboard Page - Table
        'tableRecentOrders': 'Recent Orders',
        'searchOrdersPlaceholder': 'Search orders...',
        'tableHeaderOrderID': 'Order ID',
        'tableHeaderCustomer': 'Customer',
        'tableHeaderDate': 'Date',
        'tableHeaderAmount': 'Amount',
        'tableHeaderStatus': 'Status',
        'tableHeaderActions': 'Actions',
        
        // Status Labels (Used across various tables/cards)
        'statusCompleted': 'Completed',
        'statusPending': 'Pending',
        'statusProcessing': 'Processing',
        'statusActive': 'Active', 
        'statusInactive': 'Inactive', 
        'statusLowStock': 'Low Stock', 
        
        // Dashboard Modals
        'modalOrdersTitle': 'Total Orders Details',
        'modalTotal': 'Total:',
        'modalOrders': 'orders',
        'modalCompleted': 'Completed:',
        'modalPending': 'Pending:',
        'modalCancelled': 'Cancelled:',
        'modalOrdersInfo': "This section provides a summary of all customer orders. You can find more detailed order information on the 'Orders' page in the sidebar.",
        'modalRevenueTitle': 'Total Revenue Details',
        'modalMonthlyGoal': 'Monthly Goal:',
        'modalLastMonth': 'Last Month:',
        'modalRevenueInfo': "Explore the detailed revenue breakdown by product, region, and time period in the 'Analytics' section for deeper insights.",
        'modalCustomersTitle': 'Total Customers Details',
        'modalCustomers': 'customers',
        'modalNewCustomers': 'New Customers (last 30 days):',
        'modalActiveCustomers': 'Active Customers:',
        'modalCustomersInfo': "Gain a comprehensive understanding of your customer base, including demographics and behavior, on the 'Users' page.",
        'modalConversionTitle': 'Conversion Rate Details',
        'modalCurrentRate': 'Current Rate:',
        'modalTargetRate': 'Target Rate:',
        'modalPreviousPeriod': 'Previous Period:',
        'modalConversionInfo': "Analyze conversion funnels and identify areas for optimization to improve overall business performance through our 'Analytics' tools.",
        'modalProductsInStockTitle': 'Products in Stock Details',
        'modalTotalInStock': 'Total in stock:',
        'modalProducts': 'products',
        'modalHighDemandItems': 'High demand items:',
        'modalLowStockAlerts': 'Low stock alerts:',
        'modalProductsInStockInfo': "View detailed stock levels and manage inventory on the 'Products' page.",
        'modalOpenTicketsTitle': 'Open Support Tickets Details',
        'modalTotalOpen': 'Total open:',
        'modalNewToday': 'New today:',
        'modalAvgResolutionTime': 'Average resolution time:',
        'modalTickets': 'tickets',
        'modalDays': 'days',
        'modalOpenTicketsInfo': "Access the support system to manage and resolve customer inquiries.",
        'modalOrderDetailsTitle': 'Order Details',
        'modalCustomer': 'Customer:',
        'modalCustomerName': 'Customer Name',
        'modalOrderDate': 'Order Date',
        'modalSaveChanges': 'Save Changes',
        'modalConfirmDeletionTitle': 'Confirm Deletion',
        'modalDeleteOrderConfirm': 'Are you sure you want to delete order',
        'modalDelete': 'Delete',
        'modalEditOrderTitle': 'Edit Order', // Added for orders table edit modal
        'revenuePerformanceText': 'Current revenue is on track to meet the monthly goal, showing strong performance.',
        'revenueComparisonText': 'Compared to last month, revenue increased by 8%, indicating positive growth momentum.',
        'customersNewVsActiveText': 'The ratio of new to active customers is healthy, with a significant base of returning users.',
        'customersGrowthText': 'New customer acquisition rate shows consistent growth, contributing to overall customer base expansion.',
        'conversionTargetVsCurrentText': 'The current conversion rate is slightly below target, highlighting areas for optimization in the sales funnel.',
        'conversionTrendText': 'Conversion rate has been stable over the last 4 weeks, with minor fluctuations. Focus on improving specific funnel stages.',

        // Help Page Cards
        'cardDocumentationTitle': 'Documentation',
        'cardDocumentationText': 'Access detailed guides',
        'cardTicketTitle': 'Submit a Ticket',
        'cardTicketText': 'Get personalized support',
        'cardForumTitle': 'Community Forum',
        'cardForumText': 'Ask questions, share insights',
        'cardTutorialsTitle': 'Video Tutorials',
        'cardTutorialsText': 'Learn with visual guides',
        'cardContactTitle': 'Contact Support',
        'cardContactText': 'Direct contact options',
        'cardSystemStatusTitle': 'System Status',
        'cardSystemStatusText': 'Check service uptime',

        // Help Page FAQ
        'faqTitle': 'Frequently Asked Questions',
        'faqQ1': 'How do I reset my password?',
        'faqA1': 'You can reset your password from the login page by clicking on "Forgot Password" or in your user profile settings if you are logged in. For security reasons, please follow the instructions sent to your registered email address.',
        'faqQ2': 'Where can I find my order history?',
        'faqA2': 'Your complete order history is available under the "Orders" section in the sidebar menu. You can filter by date, status, or search for specific order IDs.',
        'faqQ3': 'Is this dashboard mobile-friendly?',
        'faqA3': 'Yes, DashPro is designed to be fully responsive and works seamlessly on various screen sizes, including mobile phones and tablets. The layout adapts automatically for optimal viewing.',
        'faqQ4': 'How to add a new product?',
        'faqA4': 'Navigate to the "Products" page from the sidebar. Click on the "Add Product" button usually located at the top right of the product list. Fill in the required details such as name, category, price, stock, and upload relevant images. Click \'Save\' to add the product.',
        'faqQ5': 'Can I customize the dashboard colors?',
        'faqA5': 'Primary color customization can be done via the theme settings icon in the header. For advanced customization, direct modification of CSS variables in the `style.css` file is recommended.',
        'faqQ6': 'How do I integrate with third-party services?',
        'faqA6': 'Integrations with services like Google Analytics or Mailchimp can be managed from the \'Settings\' page under the \'Integrations\' tab. You will typically need to provide API keys or tracking IDs from the respective service.',
        
        // Help Page Modals
        'modalDocTitle': 'Documentation Details',
        'modalDocText1': 'Access our comprehensive documentation portal for step-by-step guides, feature explanations, and troubleshooting tips.',
        'modalDocText2': 'Topics include:',
        'modalGettingStarted': 'Getting Started',
        'modalUserGuide': 'User Guide',
        'modalAPIReference': 'API Reference',
        'modalTroubleshooting': 'Troubleshooting',
        'modalGoToDocs': 'Go to Docs',
        'modalTicketTitle': 'Submit a Ticket Details',
        'modalTicketText1': 'For personalized support, submit a new support ticket. Our team aims to respond within 24-48 hours.',
        'modalTicketText2': 'Please include:',
        'modalIssueDescription': 'Issue description',
        'modalScreenshots': 'screenshots',
        'modalRelevantIDs': 'relevant IDs',
        'modalOrder': 'order',
        'modalUser': 'user',
        'modalProduct': 'product',
        'modalCreateNewTicket': 'Submit New Ticket',
        'modalForumTitle': 'Community Forum Details',
        'modalForumText1': 'Join our active community forum to ask questions, share knowledge, and connect with other users. Many common issues are resolved here.',
        'modalForumText2': 'Features: Search old posts, Start new discussions, Get peer support.',
        'modalSearchOldPosts': 'Search old posts',
        'modalStartNewDiscussions': 'Start new discussions',
        'modalGetPeerSupport': 'Get peer support',
        'modalVisitForum': 'Visit Forum',
        'modalTutorialsTitle': 'Video Tutorials Details',
        'modalTutorialsText1': 'Watch our video tutorials for visual, step-by-step instructions on how to use various features of DashPro.',
        'modalTutorialsText2': 'Available series:',
        'modalDashboardWalkthrough': 'Dashboard Walkthrough',
        'modalProductManagement': 'Product Management',
        'modalAnalyticsDeepDive': 'Analytics Deep Dive',
        'modalWatchTutorials': 'Watch Videos',
        'modalContactTitle': 'Contact Support Details',
        'modalContactText1': 'If you need direct assistance, you can reach our support team via phone or email during business hours.',
        'modalPhone': 'Phone:', 
        'modalMonFri': 'Mon-Fri', // Days of week
        'modalEmail': 'Email:', 
        'modalSendEmail': 'Send Email',
        'modalSystemStatusTitle': 'System Status Details',
        'modalSystemStatusText1': 'Check the current operational status of all DashPro services. We aim for 99.9% uptime.',
        'modalCurrentStatus': 'Current Status:',
        'modalAllSystemsOperational': 'All Systems Operational',
        'modalLastIncident': 'Last Incident:',
        'modalNone': 'None',
        'modalLastUpdated': 'Last updated:', 
        'modalViewStatusPage': 'View Status Page',

        // Profile Modals Common
        'modalMyProfileTitle': 'My Profile Details',
        'modalName': 'Name:',
        'modalRole': 'Role:',
        'modalMyProfileInfo': 'View and manage your personal profile information.',
        'modalSwitchAccountTitle': 'Switch Account',
        'modalSwitchAccountInfo': 'Select another account to switch to. You might need to re-authenticate.',
        'modalSelectAccount': 'Select Account',
        'modalLoginRegisterTitle': 'Login / Register',
        'modalLoginRegisterInfo': 'You are currently logged in. This modal simulates redirecting to login/registration forms.',
        'modalLogoutTitle': 'Confirm Logout',
        'modalLogoutConfirm': 'Are you sure you want to log out of DashPro?',
        'myProfileSimulated': 'Navigating to My Profile page (simulated action).', // Toast message
        'switchAccountSimulated': 'Opening account switcher (simulated action).', // Toast message
        'loginRegisterSimulated': 'Redirecting to Login/Register page (simulated action).', // Toast message
        'logoutSimulated': 'Logging out (simulated action).', // Toast message

        // Analytics Page
        'analyticsPageViews': 'Page Views',
        'analyticsUniqueVisitors': 'Unique Visitors',
        'analyticsAvgSessionDuration': 'Avg. Session Duration',
        'analyticsBounceRate': 'Bounce Rate',
        'analyticsReturningVisitors': 'Returning Visitors',
        'analyticsConversionFunnel': 'Conversion Funnel',
        'analyticsVisitorTrends': 'Visitor Trends',
        'analyticsTrafficSources': 'Traffic Sources',
        'dateFilterLast30Days': 'Last 30 Days',
        'dateFilterLast7Days': 'Last 7 Days',
        'dateFilterThisMonth': 'This Month',
        'dateFilterLastMonth': 'Last Month',
        'dateFilterCustom': 'Custom',
        'modalPageViewsTitle': 'Page Views Details',
        'modalViews': 'views',
        'modalTopPages': 'Top Pages:',
        'modalAvgPerVisitor': 'Avg. per visitor:',
        'modalPages': 'pages',
        'modalPageViewsInfo': "Detailed page view analysis, including heatmaps and user flow, is available in the full analytics report.",
        'modalUniqueVisitorsTitle': 'Unique Visitors Details',
        'modalUniqueUsers': 'unique users',
        'modalNewVsReturning': 'New vs Returning:',
        'modalNew': 'new',
        'modalReturning': 'returning',
        'modalPeakHours': 'Peak Hours:',
        'modalUniqueVisitorsInfo': "Understand your audience better with demographic and geographic insights found in comprehensive user analytics.",
        'modalSessionDurationTitle': 'Avg. Session Duration Details',
        'modalAverage': 'Average:',
        'modalGoal': 'Goal:',
        'modalLongestSessions': 'Longest Sessions:',
        'modalProductConfig': 'Product configuration',
        'modalBlogReading': 'Blog reading',
        'modalSessionDurationInfo': "Improve user engagement and content strategy by analyzing session duration across different content types.",
        'modalBounceRateTitle': 'Bounce Rate Details',
        'modalCurrent': 'Current:',
        'modalIndustryAvg': 'Industry Avg:',
        'modalHighBouncePages': 'High Bounce Pages:',
        'modalBounceRateInfo': "Identify pages with high bounce rates to optimize content, user experience, and call-to-actions.",
        'modalReturningVisitorsTitle': 'Returning Visitors Details',
        'modalPercentage': 'Percentage:',
        'modalLoyaltyScore': 'Loyalty Score:',
        'modalHigh': 'High',
        'modalRetentionRate': 'Retention Rate (30 days):',
        'modalReturningVisitorsInfo': "Focus on strategies to convert new visitors into loyal returning customers for long-term growth.",
        'modalConversionFunnelTitle': 'Conversion Funnel Details',
        'modalOverallConversion': 'Overall Conversion:',
        'modalStage1': 'Stage 1 (Add to Cart):',
        'modalStage2': 'Stage 2 (Checkout Initiated):',
        'modalStage3': 'Stage 3 (Purchase Completed):',
        'modalConversionFunnelInfo': "Analyze each step of the conversion funnel to identify drop-off points and optimize your sales process.",
        'modalTrend': 'Trend (Last 30 Days):',
        'analyticsDataFilteredFor': 'Analytics data filtered for:', // Toast message for date filters
        'visitorsText': 'visitors', // For visitor trends chart tooltip
        'trafficSourceDirect': 'Direct',
        'trafficSourceOrganicSearch': 'Organic Search',
        'trafficSourceSocialMedia': 'Social Media',
        'trafficSourceReferral': 'Referral',
        'trafficSourceEmailCampaign': 'Email Campaign',
        'trafficSourcePaidAds': 'Paid Ads',
        'pageViewsChartLabel': 'Page Views',
        'uniqueVisitorsChartLabel': 'Unique Visitors',
        'avgSessionDurationChartLabel': 'Avg. Session Duration',
        'bounceRateChartLabel': 'Bounce Rate',
        'returningText': 'Returning', // For returning visitors chart
        'newText': 'New', // For returning visitors chart
        'stage1Label': 'Add to Cart', // For conversion funnel chart
        'stage2Label': 'Checkout Initiated', // For conversion funnel chart
        'stage3Label': 'Purchase Completed', // For conversion funnel chart
        'conversionRateLabel': 'Conversion Rate', // For conversion funnel chart
        'analyticsVisitorTrendsWeeklyTrend': 'Weekly trend:',
        'analyticsVisitorTrendsWeeklyTrendText': 'Shows fluctuations in visitor numbers, peaking in Week 8.',
        'analyticsVisitorTrendsAnalysis': 'Analysis:',
        'analyticsVisitorTrendsAnalysisText': 'Further investigation into marketing activities on week 4 and 8 could reveal growth drivers.',
        'analyticsTrafficSourcesPrimary': 'Primary sources:',
        'analyticsTrafficSourcesPrimaryText': 'Organic Search (35%) and Direct (25%) are the main drivers.',
        'analyticsTrafficSourcesOpportunities': 'Opportunities:',
        'analyticsTrafficSourcesOpportunitiesText': 'Social Media (18%) and Referral (12%) show potential for increased efforts.',
        'modalBreakdown': 'Breakdown:',
        'modalBreakdownText': 'Homepage (20%), Products (15%), Blog (10%) are top viewed pages.',
        'modalEngagement': 'Engagement:',
        'modalEngagementText': 'Average of 3.5 pages viewed per visitor.',
        'analyticsVisitorTrendsChartLabel': 'Visitors', // Chart label for visitor trends

        // Orders Page
        'ordersPageTitle': 'Order Management',
        'ordersAllOrders': 'All Orders',
        'ordersFilterAll': 'All',
        'tableHeaderCustomerName': 'Customer Name',
        'tableHeaderProduct': 'Product',
        'tableHeaderOrderDate': 'Order Date',
        'ordersNewOrdersToday': 'New Orders Today',
        'ordersCompletedOrders': 'Completed Orders',
        'ordersPendingOrders': 'Pending Orders',
        'ordersCancelledOrders': 'Cancelled Orders',
        'ordersInTransitOrders': 'Orders in Transit',
        'ordersRefundedOrders': 'Refunded Orders',
        'modalNewOrdersTitle': 'New Orders Today Details',
        'modalCount': 'Count:',
        'modalAvgValue': 'Avg. Value:',
        'modalFromChannels': 'From Channels:',
        'modalOnlineStore': 'Online Store',
        'modalMobileApp': 'Mobile App',
        'modalNewOrdersInfo': 'Review newly placed orders and prioritize for processing.',
        'modalCompletedOrdersTitle': 'Completed Orders Details',
        'modalTotalValue': 'Total Value:',
        'modalAvgFulfillmentTime': 'Avg. Fulfillment Time:',
        'modalCompletedOrdersInfo': 'Monitor the efficiency of your order fulfillment process.',
        'modalPendingOrdersTitle': 'Pending Orders Details',
        'modalOldestPending': 'Oldest Pending:',
        'modalDaysAgo': 'days ago',
        'modalCommonIssues': 'Common Issues:',
        'modalPaymentPending': 'Payment pending',
        'modalStockCheck': 'Stock check',
        'modalPendingOrdersInfo': 'Address pending orders to prevent delays and customer dissatisfaction.',
        'modalCancelledOrdersTitle': 'Cancelled Orders Details',
        'modalCommonReasons': 'Common Reasons:',
        'modalCustomerRequest': 'Customer request',
        'modalItemOutOfStock': 'Item out of stock',
        'modalValueLost': 'Value Lost:',
        'modalCancelledOrdersInfo': 'Analyze cancellation reasons to improve product availability and customer service.',
        'modalInTransitOrdersTitle': 'Orders in Transit Details',
        'modalAvgDeliveryTime': 'Avg. Delivery Time:',
        'modalCarriers': 'Carriers:',
        'modalInTransitOrdersInfo': 'Track ongoing deliveries and manage logistics efficiency.',
        'modalRefundedOrdersTitle': 'Refunded Orders Details',
        'modalTotalRefundedValue': 'Total Refunded Value:',
        'modalReasons': 'Reasons:',
        'modalDefectiveItem': 'Defective item',
        'modalCustomerDissatisfaction': 'Customer dissatisfaction',
        'modalOtherReason': 'Other', // Consolidated from 'Other' in cancelled/refunded
        'modalRefundedOrdersInfo': 'Review refund cases to address product quality and customer experience issues.',
        'ordersBreakdown': 'Breakdown:', // Orders modal info
        'ordersBreakdownText': 'Completed (1,000), Pending (150), Cancelled (95).',
        'ordersTrend': 'Trend:',
        'ordersTrendText': 'Weekly orders show a positive growth, with last week peaking at 350 orders.',
        'ordersInsights': 'Insights:',
        'ordersInsightsText': 'Consistent daily new orders indicate healthy customer flow.',
        'ordersTotalValue': 'Total Value:',
        'ordersTotalValueText': '$18,000 for completed orders.',
        'ordersEfficiency': 'Efficiency:',
        'ordersEfficiencyText': 'Average fulfillment time is 2 days, showing efficient processing.',
        'ordersOldestPending': 'Oldest Pending:',
        'ordersOldestPendingText': 'An order has been pending for 5 days.',
        'ordersCommonIssues': 'Common Issues:',
        'ordersCommonIssuesText': 'Payment pending and stock check are the main reasons for delays.',
        'ordersValueLost': 'Value Lost:',
        'ordersValueLostText': '$850 from cancelled orders.',
        'ordersMainReasons': 'Main Reasons:',
        'ordersMainReasonsText': 'Customer requests and out-of-stock items are primary causes.',
        'ordersDeliveryTime': 'Delivery Time:',
        'ordersDeliveryTimeText': 'Average delivery time is 3-5 days.',
        'ordersCarriers': 'Carriers:',
        'ordersCarriersText': 'Shipments are handled by JNE and TIKI.',
        'ordersTotalRefundedValue': 'Total Refunded Value:',
        'ordersTotalRefundedValueText': '$180 across 2 orders.',
        'ordersRefundReasons': 'Reasons:',
        'ordersRefundReasonsText': 'Primarily due to defective items and customer dissatisfaction.',
        'ordersFilteredBy': 'Orders filtered by:', // New translation key for toast
        'newOrdersChartLabel': 'New Orders', // For new orders modal chart
        'completedOrdersChartLabel': 'Completed Orders', // For completed orders modal chart
        'pendingOrdersChartLabel': 'Pending Orders', // For pending orders modal chart
        'newPendingLabel': 'New Pending', // For pending orders modal chart
        'oldPendingLabel': 'Old Pending', // For pending orders modal chart
        'cancelledOrdersChartLabel': 'Cancelled Orders', // For cancelled orders modal chart
        'customerRequestLabel': 'Customer Request', // For cancelled orders modal chart
        'outOfStockLabel': 'Out of Stock', // For cancelled orders modal chart
        'otherReasonsLabel': 'Other Reasons', // For cancelled orders modal chart
        'inTransitOrdersChartLabel': 'Orders in Transit', // For in transit orders modal chart
        'refundReasonsChartLabel': 'Refund Reasons', // For refunded orders modal chart
        'defectiveItemLabel': 'Defective Item', // For refunded orders modal chart
        'dissatisfactionLabel': 'Dissatisfaction', // For refunded orders modal chart
        'ordersTextPlural': 'order(s)', // For refunded orders modal chart

        // Users Page
        'usersUserList': 'User List', 
        'usersAddUser': 'Add User', 
        'searchUsersPlaceholder': 'Search users...', 
        'usersTableHeaderUserID': 'User ID', 
        'usersTableHeaderName': 'Name', 
        'usersTableHeaderEmail': 'Email', 
        'usersTableHeaderRole': 'Role', 
        'usersTableHeaderStatus': 'Status', 
        'usersTableHeaderRegisteredDate': 'Registered Date', 
        'roleAdmin': 'Admin', 
        'roleEditor': 'Editor', 
        'roleCustomer': 'Customer', 
        'usersNewUsersThisMonth': 'New Users This Month', 
        'usersAdminUsers': 'Admin Users', 
        'usersInactiveUsers': 'Inactive Users', 
        'usersActiveUsers': 'Active Users', 
        'usersSubscribedUsers': 'Subscribed Users', 
        'usersPendingVerification': 'Users with Pending Verification', 
        'modalNewUsersTitle': 'New Users This Month Details', 
        'modalUsers': 'users', 
        'modalAvgDailySignups': 'Avg. daily signups:', 
        'modalGrowthLastMonth': 'Growth from last month:', 
        'modalNewUsersInfo': 'Monitor new user acquisition trends and sources.', 
        'modalAdminUsersTitle': 'Admin Users Details', 
        'modalAdministrators': 'administrators', 
        'modalSuperAdmin': 'Super Admin', 
        'modalContentAdmin': 'Content Admin', 
        'modalOrderManager': 'Order Manager', 
        'modalLastActivity': 'Last activity:', 
        'modalToday': 'Today', 
        'modalAdminUsersInfo': 'Manage administrative access and permissions.', 
        'modalInactiveUsersTitle': 'Inactive Users Details', 
        'modalLastLoginOver30Days': 'Last login over 30 days:', 
        'modalPotentialReasons': 'Potential reasons:', 
        'modalAccountDormant': 'Account dormant', 
        'modalUnsubscribed': 'Unsubscribed', 
        'modalInactiveUsersInfo': 'Identify inactive users for re-engagement campaigns or account cleanup.', 
        'modalActiveUsersTitle': 'Active Users Details', 
        'modalDailyActiveUsers': 'Daily Active Users (DAU):', 
        'modalMonthlyActiveUsers': 'Monthly Active Users (MAU):', 
        'modalActiveUsersInfo': 'Track user engagement and overall platform health.', 
        'modalSubscribedUsersTitle': 'Subscribed Users Details', 
        'modalSubscriptionType': 'Subscription type:', 
        'modalEmailNewsletter': 'Email Newsletter', 
        'modalConversionToCustomer': 'Conversion to customer:', 
        'modalSubscribedUsersInfo': 'Manage your subscriber list for marketing and communication.', 
        'modalPendingVerificationTitle': 'Users with Pending Verification Details', 
        'modalVerificationType': 'Verification type:', 
        'modalActionNeeded': 'Action needed:', 
        'modalSendReminder': 'Send reminder', 
        'modalManualReview': 'Manual review', 
        'modalPendingVerificationInfo': 'Address unverified accounts to ensure data integrity and security.', 
        'modalUserDetailsTitle': 'User Details', 
        'modalRegisteredDate': 'Registered Date:', 
        'modalEditUserTitle': 'Edit User', 
        'modalDeleteUserConfirm': 'Are you sure you want to delete user', 
        'toastAddUserForm': 'A form/modal to add a new user would appear here!', // Toast message
        'toastSimulatingFilterRole': 'Simulating filter or details for role:', // Toast message
        'userText': 'User', // For user specific toasts
        'newUsersChartLabel': 'New Users', // For new users modal chart
        'adminUsersChartLabel': 'Admin Users', // For admin users modal chart
        'inactiveUsersChartLabel': 'Inactive Users', // For inactive users modal chart
        'activeUsersChartLabel': 'Active Users', // For active users modal chart
        'subscribedUsersChartLabel': 'Subscribed Users', // For subscribed users modal chart
        'pendingVerificationsChartLabel': 'Pending Verifications', // For pending verification modal chart
        'emailVerificationLabel': 'Email Verification', // For pending verification modal chart
        'phoneVerificationLabel': 'Phone Verification', // For pending verification modal chart
        'manualReviewLabel': 'Manual Review', // For pending verification modal chart

        // Products Page
        'productsProductList': 'Product List', 
        'productsAddProduct': 'Add Product', 
        'searchProductsPlaceholder': 'Search products...', 
        'productsTableHeaderProductID': 'Product ID', 
        'productsTableHeaderName': 'Name', 
        'productsTableHeaderCategory': 'Category', 
        'productsTableHeaderPrice': 'Price', 
        'productsTableHeaderStock': 'Stock', 
        'productsTableHeaderStatus': 'Status', 
        'productsTotalProducts': 'Total Products', 
        'productsActiveProducts': 'Active Products', 
        'productsInactiveProducts': 'Inactive Products', 
        'productsTotalSales': 'Total Sales', 
        'productsAverageRating': 'Average Rating', 
        'productsLowStockProducts': 'Low Stock Products', 
        'productsProductImages': 'Product Images', 
        'categorySportsOutdoors': 'Sports & Outdoors', 
        'modalTotalProductsTitle': 'Total Products Details', 
        'modalNewProductsThisMonth': 'New products this month:', 
        'modalTotalProductsInfo': 'Manage your entire product catalog.', 
        'modalActiveProductsTitle': 'Active Products Details', 
        'modalTopSellingCategories': 'Top selling categories:', 
        'modalAverageConversionRate': 'Average conversion rate:', 
        'modalActiveProductsInfo': 'Monitor the performance of your active products.', 
        'modalInactiveProductsTitle': 'Inactive Products Details', 
        'modalOutOfStock': 'Out of stock', 
        'modalDiscontinued': 'Discontinued', 
        'modalWeeksAgo': 'weeks ago', 
        'modalInactiveProductsInfo': 'Identify inactive products for potential updates or removal.', 
        'modalTotalSalesTitle': 'Total Sales Details', 
        'modalTotalRevenue': 'Total revenue:', 
        'modalTopSellingProduct': 'Top selling product:', 
        'modalAverageOrderValue': 'Average order value:', 
        'modalTotalSalesInfo': 'Track your overall product sales and performance.', 
        'modalAverageRatingTitle': 'Average Rating Details', 
        'modalAverageRating': 'Average rating:', 
        'modalStars': 'stars', 
        'modalTotalReviews': 'Total reviews:', 
        'modalMostReviewedProduct': 'Most reviewed product:', 
        'modalAverageRatingInfo': 'Monitor customer satisfaction with your products.', 
        'modalLowStockProductsTitle': 'Low Stock Products Details', 
        'modalExampleProducts': 'Example products:', 
        'modalRestock': 'Restock', 
        'modalNotifySupplier': 'Notify supplier', 
        'modalLowStockProductsInfo': 'Ensure you don\'t run out of popular products.', 
        'noImagesAvailable': 'No images available for this product.',
        'productImagesSimulatedNote': 'This is a default product image. Replace with specific product images for a live version.', // Note for product images modal
        'toastAddProductForm': 'A form/modal to add a new product would appear here!', // Toast for add product
        'toastSimulatingImageGallery': 'Simulating image gallery for Product:', // Toast for image gallery
        'toastSimulatingEditProduct': 'Simulating edit for Product ID:', // Toast for edit product
        'productText': 'Product', // For product specific toasts
        'productsCountLabel': 'Products Count', // For total products modal chart
        'activeLabel': 'Active', // For active products modal chart
        'inactiveLabel': 'Inactive', // For inactive products modal chart
        'lowStockLabel': 'Low Stock', // For low stock products modal chart
        'sufficientStockLabel': 'Sufficient Stock', // For low stock products modal chart
        'monthlySalesLabel': 'Monthly Sales ($)', // For total sales modal chart
        'reviewCountLabel': 'Review Count', // For average rating modal chart
        'stars5Label': '5 Stars', // For average rating modal chart
        'stars4Label': '4 Stars', // For average rating modal chart
        'stars3Label': '3 Stars', // For average rating modal chart
        'stars2Label': '2 Stars', // For average rating modal chart
        'stars1Label': '1 Star', // For average rating modal chart
        'reviewsText': 'reviews', // For average rating modal chart tooltip

        // Categories Page
        'categoriesProductCategories': 'Product Categories', 
        'categoriesAddCategory': 'Add Category', 
        'searchCategoriesPlaceholder': 'Search categories...', 
        'categoriesTableHeaderCategoryID': 'Category ID', 
        'categoriesTableHeaderName': 'Name', 
        'categoriesTableHeaderTotalProducts': 'Total Products', 
        'categoriesTableHeaderLastUpdated': 'Last Updated', 
        'categoriesShowDescription': 'Show Description', 
        'categoriesHideDescription': 'Hide Description', 
        'catDescElectronics': 'This category includes a wide range of electronic devices such as laptops, smartphones, cameras, and audio equipment. It is one of our best-selling categories with high customer engagement.', 
        'catDescApparel': 'Our apparel collection features modern and stylish clothing for all genders and ages. From casual wear to formal attire, we offer diverse options for every season.', 
        'catDescBooks': 'A vast library of books covering various genres including fiction, non-fiction, educational, and children\'s literature. New titles are added weekly.', 
        'catDescHomeKitchen': 'Everything you need for a comfortable home and functional kitchen, including appliances, decor, cookware, and storage solutions.', 
        'catDescSportsOutdoors': 'Gear and equipment for various sports activities and outdoor adventures, from camping and hiking to fitness and team sports.', 
        'categoriesTotalCategories': 'Total Categories', 
        'categoriesNewCategoriesThisMonth': 'New Categories This Month', 
        'categoriesTopCategories': 'Top Categories', 
        'categoriesTrendingCategories': 'Trending Categories', 
        'categoriesTrendingCategoriesValue': 'Electronics, Apparel', 
        'categoriesCategorizedProducts': 'Categorized Products', 
        'categoriesNeedingReview': 'Categories Needing Review', 
        'modalTotalCategoriesTitle': 'Total Categories Details', 
        'modalCategories': 'categories', // Consolidated and re-used
        'modalMainCategories': 'Main Categories:', 
        'modalLastAdded': 'Last added:', 
        'modalTools': 'Tools', 
        'modalJune': 'June', 
        'modalTotalCategoriesInfo': 'Overview of all product categories in the system.', 
        'modalNewCategoriesTitle': 'New Categories This Month Details', 
        'modalNewCategories': 'new categories', 
        'modalRecentlyAdded': 'Recently added:', 
        'modalGarden': 'Garden', 
        'modalPetSupplies': 'Pet Supplies', 
        'modalImpact': 'Impact:', 
        'modalIncreasedProductVariety': 'Increased product variety by', 
        'modalNewCategoriesInfo': 'Track recent category additions and their impact.', 
        'modalTopCategoriesTitle': 'Top Categories Details', 
        'modalTop5': 'Top 5:', 
        'modalRevenueContribution': 'Revenue contribution:', 
        'modalGrowthRate': 'Growth Rate:', 
        'modalTopCategoriesInfo': 'Insights into your best-performing product categories.', 
        'modalTrendingCategoriesTitle': 'Trending Categories Details', 
        'modalCurrentlyTrending': 'Currently trending:', 
        'modalDueToNewLaunches': 'due to new product launches', 
        'modalSearchVolumeIncrease': 'Search volume increase:', 
        'modalTrendingCategoriesInfo': 'Identify categories with increasing customer interest.', 
        'modalCategorizedProductsTitle': 'Categorized Products Details', 
        'modalOfProductsAreCategorized': 'of products are categorized', 
        'modalUncategorized': 'Uncategorized:', 
        'modalCategorizeRemaining': 'Categorize remaining products for better discoverability.', 
        'modalCategorizedProductsInfo': 'Ensure all products are correctly categorized for easy navigation.', 
        'modalCategoriesReviewTitle': 'Categories Needing Review Details', 
        'modalReasons': 'Reasons:', // Consolidated and re-used
        'modalOldElectronics': 'Old Electronics', 
        'modalNicheBooks': 'Niche Books', 
        'modalOutdatedProducts': 'Outdated products', 
        'modalLowSalesVolume': 'Low sales volume', 
        'modalCategoriesReviewInfo': 'Periodically review categories to keep your catalog relevant and optimized.', 
        'modalCategoryDetailsTitle': 'Category Details', 
        'modalDescription': 'Description:', 
        'modalEditCategoryTitle': 'Edit Category', 
        'modalCategoryName': 'Category Name', 
        'modalDeleteCategoryConfirm': 'Are you sure you want to delete category', 
        'toastAddCategoryForm': 'A form/modal to add a new category would appear here!', // Toast
        'noDetailedDescription': 'No detailed description available.', // Toast for toggle description
        'categoryText': 'Category', // For category specific toasts
        'modalMainCategoriesLabel': 'Main Categories', // For total categories modal chart
        'modalSubCategoriesLabel': 'Sub Categories', // For total categories modal chart
        'newCategoriesAddedLabel': 'New Categories Added', // For new categories modal chart
        'newCategoriesLabel': 'New Categories', // For new categories modal chart tooltip
        'monthJan': 'Jan', // For charts
        'monthFeb': 'Feb', // For charts
        'monthMar': 'Mar', // For charts
        'monthApr': 'Apr', // For charts
        'monthMay': 'May', // For charts
        'monthJun': 'Jun', // For charts
        'revenueText': 'Revenue', // For top categories modal chart tooltip
        'trendScoreLabel': 'Trend Score', // For trending categories modal chart
        'categorizedLabel': 'Categorized', // For categorized products modal chart
        'uncategorizedLabel': 'Uncategorized', // For categorized products modal chart
        'categoriesToReviewLabel': 'Categories to Review', // For categories to review modal chart
        'outdatedProductsLabel': 'Outdated Products', // For categories to review modal chart
        'lowSalesVolumeLabel': 'Low Sales Volume', // For categories to review modal chart
        'categoryApparel': 'Apparel', // New category label
        
        // Settings Page
        'settingsGeneral': 'General', 
        'settingsSecurity': 'Security', 
        'settingsNotifications': 'Notifications', 
        'settingsIntegrations': 'Integrations', 
        'settingsGeneralAppSettings': 'General Application Settings', 
        'settingsSiteName': 'Site Name', 
        'settingsSiteNameValue': 'DashPro Dashboard', 
        'settingsTimezone': 'Timezone', 
        'timezoneJakarta': 'Asia/Jakarta', 
        'timezoneLondon': 'Europe/London', 
        'timezoneNewYork': 'America/New_York', 
        'timezoneUTC': 'UTC', 
        'settingsDefaultCurrency': 'Default Currency', 
        'settingsDefaultLanguage': 'Default Language', 
        'languageEnglish': 'English', 
        'languageIndonesian': 'Bahasa Indonesia', 
        'languageSpanish': 'Español', 
        'settingsMaintenanceMode': 'Maintenance Mode', 
        'settingsSaveGeneral': 'Save General Settings', 
        'settingsAccountSecurity': 'Account Security Settings', 
        'settingsPasswordPolicy': 'Password Policy', 
        'policyStrong': 'Strong (min 8 chars, 1 uppercase, 1 number, 1 symbol)', 
        'policyMedium': 'Medium (min 6 chars, 1 number)', 
        'policyWeak': 'Weak (min 4 chars)', 
        'settingsTwoFactorAuth': 'Two-Factor Authentication (2FA)', 
        'settingsSessionTimeout': 'Session Timeout (minutes)', 
        'settingsIPWhitelist': 'IP Whitelist (comma-separated, optional)', 
        'settingsIPWhitelistPlaceholder': 'e.g., 192.168.1.1, 10.0.0.5', 
        'settingsIPWhitelistHint': 'Only allow access from specified IP addresses.', 
        'settingsSaveSecurity': 'Save Security Settings', 
        'settingsNotificationPreferences': 'Notification Preferences', 
        'settingsEmailNotifications': 'Email Notifications', 
        'settingsEmailNotificationsHint': 'Receive important updates via email.', 
        'settingsSMSNotifications': 'SMS Notifications', 
        'settingsSMSNotificationsHint': 'Receive critical alerts on your mobile phone.', 
        'settingsPushNotifications': 'Push Notifications (in-app)', 
        'settingsPushNotificationsHint': 'Get real-time updates directly in the dashboard.', 
        'settingsSaveNotifications': 'Save Notification Settings', 
        'settingsThirdPartyIntegrations': 'Third-Party Integrations', 
        'settingsGoogleAnalytics': 'Google Analytics', 
        'settingsGoogleAnalyticsText': 'Connect your Google Analytics account to track website traffic.', 
        'settingsTrackingID': 'Tracking ID (GA4)', 
        'settingsEnableDisableGA': 'Enable/Disable Google Analytics integration.', 
        'settingsMailchimp': 'Mailchimp', 
        'settingsMailchimpText': 'Sync your customer data with Mailchimp for email marketing campaigns.', 
        'settingsAPIKey': 'API Key', 
        'settingsEnableDisableMailchimp': 'Enable/Disable Mailchimp integration.', 
        'settingsSaveIntegrations': 'Save Integrations', 
        'toastSettingsSaved': 'Settings saved successfully!', 

        // Footer
        'footerText': '2023 DashPro. All rights reserved.'
    },
    'id': {
        // Global/Common Phrases
        'dashboardTitle': 'DashPro - Dasbor Panel Admin Modern',
        'helpTitle': 'DashPro - Bantuan & Dukungan',
        'increase': 'peningkatan',
        'decrease': 'penurunan',
        'detailsBtn': 'Detail',
        'modalClose': 'Tutup',
        'change': 'perubahan', // For 0% change in trends
        'highGrowth': 'Pertumbuhan Tinggi', // New for categories
        'modalEditProfile': 'Edit Profil', // Common profile modal button
        'modalGoToLogin': 'Ke Halaman Login', // Common login/registration modal button
        'modalSwitch': 'Ganti', // Common switch account modal button
        'modalCancel': 'Batal', // Common cancel button
        'hasBeenDeleted': 'telah dihapus.', // Common phrase for deletion toasts
        'hasBeenUpdated': 'telah diperbarui.', // Common phrase for update toasts
        'forText': 'untuk', // Used in chart export/view data toast
        'simulatedAction': 'Tindakan Simulasi', // Generic simulated action text
        'simulatedFormOpen': 'Formulir simulasi terbuka', // Generic simulated form open text
        'navigatingTo': 'Menavigasi ke', // Toast for navigation
        'pageSimulated': 'halaman (tindakan simulasi).', // Toast for navigation

        // Sidebar Menu
        'menuMain': 'Utama',
        'menuDashboard': 'Dasbor',
        'menuAnalytics': 'Analitik',
        'menuOrders': 'Pesanan',
        'menuManagement': 'Manajemen',
        'menuUsers': 'Pengguna',
        'menuProducts': 'Produk',
        'menuCategories': 'Kategori',
        'menuSettings': 'Pengaturan',
        'menuHelp': 'Bantuan',

        // Header Notifications/Messages
        'headerNotificationsTitle': 'Notifikasi',
        'notificationNewOrder': 'Pesanan baru diterima!',
        'notificationOrderId': '#ORD-001', // Example ID, might not be translated itself
        'notificationLowStock': 'Produk',
        'notificationProductA': '"Produk A"', // Example product name
        'notificationUpdateAvailable': 'Pembaruan sistem tersedia.',
        'headerViewAllNotifications': 'Lihat Semua Notifikasi',
        'headerMessagesTitle': 'Pesan',
        'messageNewFeatureInquiry': 'Pertanyaan tentang fitur baru...',
        'messageFeedbackOnReport': 'Umpan balik laporan bulanan...',
        'headerViewAllMessages': 'Lihat Semua Pesan',
        'modalAllNotificationsTitle': 'Semua Notifikasi',
        'notificationNewOrderFull': 'Pesanan baru diterima! ID Pesanan: #ORD-001 dari John Doe seharga $128.50.',
        'notificationLowStockFull': 'Peringatan stok kritis untuk "Laptop Pro X15". Hanya tersisa 5 unit.',
        'notificationUpdateAvailableFull': 'Pembaruan sistem versi 2.1.0 tersedia. Harap perbarui untuk fitur baru.',
        'notificationNewUserRegistered': 'Pengguna baru telah terdaftar: Sarah Johnson.',
        'notificationMarkRead': 'Tandai sudah Dibaca',
        'notificationMarkUnread': 'Tandai belum Dibaca',
        'modalClearAll': 'Bersihkan Semua',
        'modalAllMessagesTitle': 'Semua Pesan',
        'messageNewFeatureSubject': 'Subjek: Pertanyaan tentang peluncuran fitur baru',
        'messageNewFeatureDetail': '"Halo tim, saya ingin tahu apakah ada pembaruan tentang peluncuran fitur baru yang dijelaskan dalam catatan rapat terakhir..."',
        'messageFeedbackSubject': 'Subjek: Umpan balik laporan bulanan',
        'messageFeedbackDetail': '"Laporan bulanan sangat informatif. Hanya ada pertanyaan kecil tentang proyeksi Q3..."',
        'messageViewDetails': 'Lihat Detail',
        'modalComposeMessage': 'Tulis Pesan',
        'noNotifications': 'Tidak ada notifikasi baru.', // For clear all notifications scenario
        
        // Header Dropdowns (Profile, Language, Theme)
        'profileMyProfile': 'Profil Saya',
        'profileAccountSettings': 'Pengaturan Akun',
        'profileSwitchAccount': 'Ganti Akun',
        'profileLoginRegister': 'Login / Daftar',
        'profileLogout': 'Keluar',
        'settingsThemePrimaryColor': 'Warna Primer', // For Theme Settings dropdown

        // Breadcrumbs
        'breadcrumbHome': 'Beranda',
        'breadcrumbDashboard': 'Dasbor',

        // Dashboard Page - Card Titles & Info
        'cardTotalOrders': 'Total Pesanan',
        'cardTotalRevenue': 'Total Pendapatan',
        'cardTotalCustomers': 'Total Pelanggan',
        'cardConversionRate': 'Tingkat Konversi',
        'cardProductsInStock': 'Produk dalam Stok',
        'cardOpenSupportTickets': 'Tiket Dukungan Terbuka',

        // Dashboard Page - Chart Titles & Options
        'chartRevenueOverview': 'Ikhtisar Pendapatan',
        'chartSalesDistribution': 'Distribusi Penjualan',
        'chartViewData': 'Lihat Data',
        'chartExportCSV': 'Ekspor ke CSV',
        'revenueChartLabel': 'Pendapatan ($)', // Chart label for revenue
        'salesChartLabel': 'Penjualan', // Chart label for sales
        'categoryElectronics': 'Elektronik', // Used in sales distribution chart & products page
        'categoryFashion': 'Fashion', // Used in sales distribution chart & products page
        'categoryHomeGoods': 'Produk Rumah Tangga', // Used in sales distribution chart & products page
        'categoryBooks': 'Buku', // Used in sales distribution chart & products page
        'categoryOther': 'Lainnya', // For sales distribution chart
        'revenueBreakdown': 'Rincian pendapatan:',
        'revenueBreakdownText': 'Tren pendapatan bulanan menunjukkan pertumbuhan yang konsisten. Pendapatan tertinggi tercatat di bulan Desember ($32k).',
        'revenueKeyFactors': 'Faktor kunci:',
        'revenueKeyFactorsText': 'Penjualan yang kuat di Q4, kampanye pemasaran yang sukses.',
        'salesDominantCategories': 'Kategori dominan:',
        'salesDominantCategoriesText': 'Elektronik (35%) dan Fashion (25%) menyumbang mayoritas penjualan.',
        'salesOpportunity': 'Peluang:',
        'salesOpportunityText': 'Produk Rumah Tangga (20%) menunjukkan potensi pertumbuhan lebih lanjut.',
        'weekText': 'Minggu', // For chart labels
        'dayText': 'Hari', // For chart labels
        'resolvedTicketsLabel': 'Terselesaikan', // For tickets chart
        'openTicketsChartLabel': 'Terbuka', // For tickets chart
        'pendingCustomerReplyLabel': 'Menunggu Balasan Pelanggan', // For tickets chart
        'productsHighDemand': 'Permintaan Tinggi:',
        'productsHighDemandText': '50 produk dikategorikan sebagai permintaan tinggi.',
        'productsAlerts': 'Peringatan:',
        'productsAlertsText': '5 produk saat ini stoknya rendah, membutuhkan perhatian segera untuk pengisian ulang.',
        'ticketsDailyActivity': 'Aktivitas Harian:',
        'ticketsDailyActivityText': '2 tiket baru diterima hari ini.',
        'ticketsEfficiency': 'Efisiensi:',
        'ticketsEfficiencyText': 'Waktu penyelesaian rata-rata adalah 1,5 hari, menunjukkan respons dukungan yang cepat.',
        'categoryA': 'Kategori A', // For products in stock modal chart
        'categoryB': 'Kategori B', // For products in stock modal chart
        'categoryC': 'Kategori C', // For products in stock modal chart
        'categoryD': 'Kategori D', // For products in stock modal chart
        'productsInStockChartLabel': 'Produk dalam Stok', // For products in stock modal chart
        'conversionRateChartLabel': 'Tingkat Konversi', // For conversion modal chart
        'customersChartLabel': 'Pelanggan', // For customers modal chart
        'ordersChartLabel': 'Pesanan', // For orders modal chart
        'orderText': 'Pesanan', // For order specific toasts

        // Dashboard Page - Table
        'tableRecentOrders': 'Pesanan Terbaru',
        'searchOrdersPlaceholder': 'Cari pesanan...',
        'tableHeaderOrderID': 'ID Pesanan',
        'tableHeaderCustomer': 'Pelanggan',
        'tableHeaderDate': 'Tanggal',
        'tableHeaderAmount': 'Jumlah',
        'tableHeaderStatus': 'Status',
        'tableHeaderActions': 'Tindakan',

        // Status Labels (Used across various tables/cards)
        'statusCompleted': 'Selesai',
        'statusPending': 'Tertunda',
        'statusProcessing': 'Diproses',
        'statusActive': 'Aktif',
        'statusInactive': 'Tidak Aktif',
        'statusLowStock': 'Stok Rendah',

        // Dashboard Modals
        'modalOrdersTitle': 'Detail Total Pesanan',
        'modalTotal': 'Total:',
        'modalOrders': 'pesanan',
        'modalCompleted': 'Selesai:',
        'modalPending': 'Tertunda:',
        'modalCancelled': 'Dibatalkan:',
        'modalOrdersInfo': "Bagian ini memberikan ringkasan semua pesanan pelanggan. Anda dapat menemukan informasi pesanan yang lebih rinci di halaman 'Pesanan' di bilah sisi.",
        'modalRevenueTitle': 'Detail Total Pendapatan',
        'modalMonthlyGoal': 'Target Bulanan:',
        'modalLastMonth': 'Bulan Lalu:',
        'modalRevenueInfo': "Jelajahi rincian pendapatan berdasarkan produk, wilayah, dan periode waktu di bagian 'Analitik' untuk wawasan yang lebih dalam.",
        'modalCustomersTitle': 'Detail Total Pelanggan',
        'modalCustomers': 'pelanggan',
        'modalNewCustomers': 'Pelanggan Baru (30 hari terakhir):',
        'modalActiveCustomers': 'Pelanggan Aktif:',
        'modalCustomersInfo': "Dapatkan pemahaman komprehensif tentang basis pelanggan Anda, termasuk demografi dan perilaku, di halaman 'Pengguna'.",
        'modalConversionTitle': 'Detail Tingkat Konversi',
        'modalCurrentRate': 'Tingkat Saat Ini:',
        'modalTargetRate': 'Tingkat Target:',
        'modalPreviousPeriod': 'Periode Sebelumnya:',
        'modalConversionInfo': "Analisis corong konversi dan identifikasi area untuk optimasi guna meningkatkan kinerja bisnis secara keseluruhan melalui alat 'Analitik' kami.",
        'modalProductsInStockTitle': 'Detail Produk dalam Stok',
        'modalTotalInStock': 'Total dalam stok:',
        'modalProducts': 'produk',
        'modalHighDemandItems': 'Item permintaan tinggi:',
        'modalLowStockAlerts': 'Peringatan stok rendah:',
        'modalProductsInStockInfo': "Lihat level stok terperinci dan kelola inventaris di halaman 'Produk'.",
        'modalOpenTicketsTitle': 'Detail Tiket Dukungan Terbuka',
        'modalTotalOpen': 'Total terbuka:',
        'modalNewToday': 'Baru hari ini:',
        'modalAvgResolutionTime': 'Waktu penyelesaian rata-rata:',
        'modalTickets': 'tiket',
        'modalDays': 'hari',
        'modalOpenTicketsInfo': "Akses sistem dukungan untuk mengelola dan menyelesaikan pertanyaan pelanggan.",
        'modalOrderDetailsTitle': 'Detail Pesanan',
        'modalCustomer': 'Pelanggan:',
        'modalCustomerName': 'Nama Pelanggan',
        'modalOrderDate': 'Tanggal Pesanan',
        'modalSaveChanges': 'Simpan Perubahan',
        'modalConfirmDeletionTitle': 'Konfirmasi Penghapusan',
        'modalDeleteOrderConfirm': 'Anda yakin ingin menghapus pesanan',
        'modalDelete': 'Hapus',
        'modalEditOrderTitle': 'Edit Pesanan', // Added for orders table edit modal
        'revenuePerformanceText': 'Pendapatan saat ini sesuai target bulanan, menunjukkan kinerja yang kuat.',
        'revenueComparisonText': 'Dibandingkan bulan lalu, pendapatan meningkat 8%, menunjukkan momentum pertumbuhan positif.',
        'customersNewVsActiveText': 'Rasio pelanggan baru dan aktif sehat, dengan basis pengguna kembali yang signifikan.',
        'customersGrowthText': 'Tingkat akuisisi pelanggan baru menunjukkan pertumbuhan yang konsisten, berkontribusi pada perluasan basis pelanggan secara keseluruhan.',
        'conversionTargetVsCurrentText': 'Tingkat konversi saat ini sedikit di bawah target, menyoroti area untuk optimasi dalam corong penjualan.',
        'conversionTrendText': 'Tingkat konversi stabil selama 4 minggu terakhir, dengan fluktuasi kecil. Fokus pada peningkatan tahapan corong tertentu.',

        // Help Page Cards
        'cardDocumentationTitle': 'Dokumentasi',
        'cardDocumentationText': 'Akses panduan terperinci',
        'cardTicketTitle': 'Ajukan Tiket',
        'cardTicketText': 'Dapatkan dukungan personal',
        'cardForumTitle': 'Forum Komunitas',
        'cardForumText': 'Ajukan pertanyaan, bagikan wawasan',
        'cardTutorialsTitle': 'Tutorial Video',
        'cardTutorialsText': 'Belajar dengan panduan visual',
        'cardContactTitle': 'Hubungi Dukungan',
        'cardContactText': 'Pilihan kontak langsung',
        'cardSystemStatusTitle': 'Status Sistem',
        'cardSystemStatusText': 'Periksa waktu aktif layanan',

        // Help Page FAQ
        'faqTitle': 'Pertanyaan yang Sering Diajukan',
        'faqQ1': 'Bagaimana cara mengatur ulang kata sandi saya?',
        'faqA1': 'Anda dapat mengatur ulang kata sandi dari halaman login dengan mengklik "Lupa Kata Sandi" atau di pengaturan profil pengguna Anda jika Anda sudah masuk. Demi alasan keamanan, ikuti instruksi yang dikirimkan ke alamat email terdaftar Anda.',
        'faqQ2': 'Di mana saya bisa menemukan riwayat pesanan saya?',
        'faqA2': 'Riwayat pesanan lengkap Anda tersedia di bagian "Pesanan" di menu bilah sisi. Anda dapat memfilter berdasarkan tanggal, status, atau mencari ID pesanan tertentu.',
        'faqQ3': 'Apakah dasbor ini ramah seluler?',
        'faqA3': 'Ya, DashPro dirancang agar sepenuhnya responsif dan berfungsi dengan mulus di berbagai ukuran layar, termasuk ponsel dan tablet. Tata letak akan menyesuaikan secara otomatis untuk tampilan optimal.',
        'faqQ4': 'Bagaimana cara menambahkan produk baru?',
        'faqA4': 'Navigasikan ke halaman "Produk" dari bilah sisi. Klik tombol "Tambah Produk" yang biasanya terletak di kanan atas daftar produk. Isi detail yang diperlukan seperti nama, kategori, harga, stok, dan unggah gambar yang relevan. Klik \'Simpan\' untuk menambahkan produk.',
        'faqQ5': 'Bisakah saya menyesuaikan warna dasbor?',
        'faqA5': 'Kustomisasi warna primer dapat dilakukan melalui ikon pengaturan tema di header. Untuk kustomisasi lanjutan, disarankan modifikasi langsung variabel CSS di file `style.css`.',
        'faqQ6': 'Bagaimana cara mengintegrasikan dengan layanan pihak ketiga?',
        'faqA6': 'Integrasi dengan layanan seperti Google Analytics atau Mailchimp dapat dikelola dari halaman \'Pengaturan\' di bawah tab \'Integrasi\'. Anda biasanya perlu memberikan kunci API atau ID pelacakan dari layanan masing-masing.',

        // Help Page Modals
        'modalDocTitle': 'Detail Dokumentasi',
        'modalDocText1': 'Akses portal dokumentasi komprehensif kami untuk panduan langkah demi langkah, penjelasan fitur, dan tips pemecahan masalah.',
        'modalDocText2': 'Topik meliputi:',
        'modalGettingStarted': 'Memulai',
        'modalUserGuide': 'Panduan Pengguna',
        'modalAPIReference': 'Referensi API',
        'modalTroubleshooting': 'Pemecahan Masalah',
        'modalGoToDocs': 'Ke Dokumentasi',
        'modalTicketTitle': 'Detail Pengajuan Tiket',
        'modalTicketText1': 'Untuk dukungan personal, ajukan tiket dukungan baru. Tim kami bertujuan untuk merespons dalam 24-48 jam.',
        'modalTicketText2': 'Harap sertakan:',
        'modalIssueDescription': 'Deskripsi masalah',
        'modalScreenshots': 'tangkapan layar',
        'modalRelevantIDs': 'ID relevan',
        'modalOrder': 'pesanan',
        'modalUser': 'pengguna',
        'modalProduct': 'produk',
        'modalCreateNewTicket': 'Ajukan Tiket Baru',
        'modalForumTitle': 'Detail Forum Komunitas',
        'modalForumText1': 'Bergabunglah dengan forum komunitas aktif kami untuk mengajukan pertanyaan, berbagi pengetahuan, dan terhubung dengan pengguna lain. Banyak masalah umum diselesaikan di sini.',
        'modalForumText2': 'Fitur: Cari postingan lama, Mulai diskusi baru, Dapatkan dukungan rekan.',
        'modalSearchOldPosts': 'Cari postingan lama',
        'modalStartNewDiscussions': 'Mulai diskusi baru',
        'modalGetPeerSupport': 'Dapatkan dukungan rekan',
        'modalVisitForum': 'Kunjungi Forum',
        'modalTutorialsTitle': 'Detail Tutorial Video',
        'modalTutorialsText1': 'Tonton tutorial video kami untuk instruksi visual langkah demi langkah tentang cara menggunakan berbagai fitur DashPro.',
        'modalTutorialsText2': 'Seri yang tersedia:',
        'modalDashboardWalkthrough': 'Panduan Dasbor',
        'modalProductManagement': 'Manajemen Produk',
        'modalAnalyticsDeepDive': 'Analitik Mendalam',
        'modalWatchTutorials': 'Tonton Video',
        'modalContactTitle': 'Detail Kontak Dukungan',
        'modalContactText1': 'Jika Anda membutuhkan bantuan langsung, Anda dapat menghubungi tim dukungan kami melalui telepon atau email selama jam kerja.',
        'modalPhone': 'Telepon:', 
        'modalMonFri': 'Sen-Jum', // Hari kerja
        'modalEmail': 'Email:', 
        'modalSendEmail': 'Kirim Email',
        'modalSystemStatusTitle': 'Detail Status Sistem',
        'modalSystemStatusText1': 'Periksa status operasional saat ini dari semua layanan DashPro. Kami menargetkan 99,9% uptime.',
        'modalCurrentStatus': 'Status Saat Ini:',
        'modalAllSystemsOperational': 'Semua Sistem Beroperasi',
        'modalLastIncident': 'Insiden Terakhir:',
        'modalNone': 'Tidak Ada',
        'modalLastUpdated': 'Terakhir diperbarui:', 
        'modalViewStatusPage': 'Lihat Halaman Status',

        // Profile Modals Common
        'modalMyProfileTitle': 'Detail Profil Saya',
        'modalName': 'Nama:',
        'modalRole': 'Peran:',
        'modalMyProfileInfo': 'Lihat dan kelola informasi profil pribadi Anda.',
        'modalSwitchAccountTitle': 'Ganti Akun',
        'modalSwitchAccountInfo': 'Pilih akun lain untuk diganti. Anda mungkin perlu mengautentikasi ulang.',
        'modalSelectAccount': 'Pilih Akun',
        'modalLoginRegisterTitle': 'Login / Daftar',
        'modalLoginRegisterInfo': 'Anda saat ini masuk. Modal ini mensimulasikan pengalihan ke formulir login/registrasi.',
        'modalLogoutTitle': 'Konfirmasi Keluar',
        'modalLogoutConfirm': 'Anda yakin ingin keluar dari DashPro?',
        'myProfileSimulated': 'Menavigasi ke halaman Profil Saya (tindakan simulasi).', // Toast message
        'switchAccountSimulated': 'Membuka pengalih akun (tindakan simulasi).', // Toast message
        'loginRegisterSimulated': 'Mengalihkan ke halaman Login/Daftar (tindakan simulasi).', // Toast message
        'logoutSimulated': 'Keluar (tindakan simulasi).', // Toast message
        
        // Analytics Page
        'analyticsDataFilteredFor': 'Data analitik difilter untuk:', // Toast message for date filters
        'visitorsText': 'pengunjung', // For visitor trends chart tooltip
        'trafficSourceDirect': 'Langsung',
        'trafficSourceOrganicSearch': 'Pencarian Organik',
        'trafficSourceSocialMedia': 'Media Sosial',
        'trafficSourceReferral': 'Rujukan',
        'trafficSourceEmailCampaign': 'Kampanye Email',
        'trafficSourcePaidAds': 'Iklan Berbayar',
        'pageViewsChartLabel': 'Tampilan Halaman',
        'uniqueVisitorsChartLabel': 'Pengunjung Unik',
        'avgSessionDurationChartLabel': 'Durasi Sesi Rata-rata',
        'bounceRateChartLabel': 'Rasio Pentalan',
        'returningText': 'Kembali', // For returning visitors chart
        'newText': 'Baru', // For returning visitors chart
        'stage1Label': 'Tambah ke Keranjang', // For conversion funnel chart
        'stage2Label': 'Checkout Dimulai', // For conversion funnel chart
        'stage3Label': 'Pembelian Selesai', // For conversion funnel chart
        'conversionRateLabel': 'Tingkat Konversi', // For conversion funnel chart
        'analyticsVisitorTrendsWeeklyTrend': 'Tren mingguan:',
        'analyticsVisitorTrendsWeeklyTrendText': 'Menunjukkan fluktuasi jumlah pengunjung, memuncak di Minggu 8.',
        'analyticsVisitorTrendsAnalysis': 'Analisis:',
        'analyticsVisitorTrendsAnalysisText': 'Investigasi lebih lanjut terhadap aktivitas pemasaran di minggu 4 dan 8 dapat mengungkapkan pendorong pertumbuhan.',
        'analyticsTrafficSourcesPrimary': 'Sumber utama:',
        'analyticsTrafficSourcesPrimaryText': 'Pencarian Organik (35%) dan Langsung (25%) adalah pendorong utama.',
        'analyticsTrafficSourcesOpportunities': 'Peluang:',
        'analyticsTrafficSourcesOpportunitiesText': 'Media Sosial (18%) dan Rujukan (12%) menunjukkan potensi untuk peningkatan upaya.',
        'modalBreakdown': 'Rincian:',
        'modalBreakdownText': 'Beranda (20%), Produk (15%), Blog (10%) adalah halaman yang paling banyak dilihat.',
        'modalEngagement': 'Keterlibatan:',
        'modalEngagementText': 'Rata-rata 3,5 halaman dilihat per pengunjung.',
        'analyticsVisitorTrendsChartLabel': 'Pengunjung', // Chart label for visitor trends

        // Orders Page
        'ordersPageTitle': 'Manajemen Pesanan',
        'ordersAllOrders': 'Semua Pesanan',
        'ordersFilterAll': 'Semua',
        'tableHeaderCustomerName': 'Nama Pelanggan',
        'tableHeaderProduct': 'Produk',
        'tableHeaderOrderDate': 'Tanggal Pesanan',
        'ordersNewOrdersToday': 'Pesanan Baru Hari Ini',
        'ordersCompletedOrders': 'Pesanan Selesai',
        'ordersPendingOrders': 'Pesanan Tertunda',
        'ordersCancelledOrders': 'Pesanan Dibatalkan',
        'ordersInTransitOrders': 'Pesanan dalam Pengiriman',
        'ordersRefundedOrders': 'Pesanan Dikembalikan',
        'modalNewOrdersTitle': 'Detail Pesanan Baru Hari Ini',
        'modalCount': 'Jumlah:',
        'modalAvgValue': 'Nilai Rata-rata:',
        'modalFromChannels': 'Dari Saluran:',
        'modalOnlineStore': 'Toko Online',
        'modalMobileApp': 'Aplikasi Seluler',
        'modalNewOrdersInfo': 'Tinjau pesanan yang baru ditempatkan dan prioritaskan untuk diproses.',
        'modalCompletedOrdersTitle': 'Detail Pesanan Selesai',
        'modalTotalValue': 'Total Nilai:',
        'modalAvgFulfillmentTime': 'Waktu Pemenuhan Rata-rata:',
        'modalCompletedOrdersInfo': 'Pantau efisiensi proses pemenuhan pesanan Anda.',
        'modalPendingOrdersTitle': 'Detail Pesanan Tertunda',
        'modalOldestPending': 'Tertunda Terlama:',
        'modalDaysAgo': 'hari yang lalu',
        'modalCommonIssues': 'Masalah Umum:',
        'modalPaymentPending': 'Pembayaran tertunda',
        'modalStockCheck': 'Pengecekan stok',
        'modalPendingOrdersInfo': 'Atasi pesanan tertunda untuk mencegah keterlambatan dan ketidakpuasan pelanggan.',
        'modalCancelledOrdersTitle': 'Detail Pesanan Dibatalkan',
        'modalCommonReasons': 'Alasan Umum:',
        'modalCustomerRequest': 'Permintaan pelanggan',
        'modalItemOutOfStock': 'Barang habis stok',
        'modalValueLost': 'Nilai Hilang:',
        'modalCancelledOrdersInfo': 'Analisis alasan pembatalan untuk meningkatkan ketersediaan produk dan layanan pelanggan.',
        'modalInTransitOrdersTitle': 'Detail Pesanan dalam Pengiriman',
        'modalAvgDeliveryTime': 'Waktu Pengiriman Rata-rata:',
        'modalCarriers': 'Jasa Kurir:',
        'modalInTransitOrdersInfo': 'Lacak pengiriman yang sedang berlangsung dan kelola efisiensi logistik.',
        'modalRefundedOrdersTitle': 'Detail Pesanan Dikembalikan',
        'modalTotalRefundedValue': 'Total Nilai Dikembalikan:',
        'modalReasons': 'Alasan:',
        'modalDefectiveItem': 'Barang cacat',
        'modalCustomerDissatisfaction': 'Ketidakpuasan pelanggan',
        'modalOtherReason': 'Lainnya', 
        'modalRefundedOrdersInfo': 'Tinjau kasus pengembalian dana untuk mengatasi masalah kualitas produk dan pengalaman pelanggan.',
        'ordersBreakdown': 'Rincian:', // Orders modal info
        'ordersBreakdownText': 'Selesai (1.000), Tertunda (150), Dibatalkan (95).',
        'ordersTrend': 'Tren:',
        'ordersTrendText': 'Pesanan mingguan menunjukkan pertumbuhan positif, dengan minggu lalu mencapai puncaknya pada 350 pesanan.',
        'ordersInsights': 'Wawasan:',
        'ordersInsightsText': 'Pesanan baru harian yang konsisten menunjukkan aliran pelanggan yang sehat.',
        'ordersTotalValue': 'Total Nilai:',
        'ordersTotalValueText': '$18.000 untuk pesanan yang selesai.',
        'ordersEfficiency': 'Efisiensi:',
        'ordersEfficiencyText': 'Waktu pemenuhan rata-rata adalah 2 hari, menunjukkan pemrosesan yang efisien.',
        'ordersOldestPending': 'Tertunda Terlama:',
        'ordersOldestPendingText': 'Satu pesanan telah tertunda selama 5 hari.',
        'ordersCommonIssues': 'Masalah Umum:',
        'ordersCommonIssuesText': 'Pembayaran tertunda dan pengecekan stok adalah alasan utama penundaan.',
        'ordersValueLost': 'Nilai Hilang:',
        'ordersValueLostText': '$850 dari pesanan yang dibatalkan.',
        'ordersMainReasons': 'Alasan Utama:',
        'ordersMainReasonsText': 'Permintaan pelanggan dan item yang habis stok adalah penyebab utama.',
        'ordersDeliveryTime': 'Waktu Pengiriman:',
        'ordersDeliveryTimeText': 'Waktu pengiriman rata-rata adalah 3-5 hari.',
        'ordersCarriers': 'Jasa Kurir:',
        'ordersCarriersText': 'Pengiriman ditangani oleh JNE dan TIKI.',
        'ordersTotalRefundedValue': 'Total Nilai Dikembalikan:',
        'ordersTotalRefundedValueText': '$180 dari 2 pesanan.',
        'ordersRefundReasons': 'Alasan Pengembalian Dana:',
        'ordersRefundReasonsText': 'Terutama karena barang cacat dan ketidakpuasan pelanggan.',
        'ordersFilteredBy': 'Pesanan difilter berdasarkan:', // New translation key for toast
        'newOrdersChartLabel': 'Pesanan Baru', // For new orders modal chart
        'completedOrdersChartLabel': 'Pesanan Selesai', // For completed orders modal chart
        'pendingOrdersChartLabel': 'Pesanan Tertunda', // For pending orders modal chart
        'newPendingLabel': 'Tertunda Baru', // For pending orders modal chart
        'oldPendingLabel': 'Tertunda Lama', // For pending orders modal chart
        'cancelledOrdersChartLabel': 'Pesanan Dibatalkan', // For cancelled orders modal chart
        'customerRequestLabel': 'Permintaan Pelanggan', // For cancelled orders modal chart
        'outOfStockLabel': 'Habis Stok', // For cancelled orders modal chart
        'otherReasonsLabel': 'Alasan Lain', // For cancelled orders modal chart
        'inTransitOrdersChartLabel': 'Pesanan dalam Pengiriman', // For in transit orders modal chart
        'refundReasonsChartLabel': 'Alasan Pengembalian Dana', // For refunded orders modal chart
        'defectiveItemLabel': 'Barang Cacat', // For refunded orders modal chart
        'dissatisfactionLabel': 'Ketidakpuasan', // For refunded orders modal chart
        'ordersTextPlural': 'pesanan', // For refunded orders modal chart

        // Users Page
        'usersUserList': 'Daftar Pengguna', 
        'usersAddUser': 'Tambah Pengguna', 
        'searchUsersPlaceholder': 'Cari pengguna...', 
        'usersTableHeaderUserID': 'ID Pengguna', 
        'usersTableHeaderName': 'Nama', 
        'usersTableHeaderEmail': 'Email', 
        'usersTableHeaderRole': 'Peran', 
        'usersTableHeaderStatus': 'Status', 
        'usersTableHeaderRegisteredDate': 'Tanggal Terdaftar', 
        'roleAdmin': 'Admin', 
        'roleEditor': 'Editor', 
        'roleCustomer': 'Pelanggan', 
        'usersNewUsersThisMonth': 'Pengguna Baru Bulan Ini', 
        'usersAdminUsers': 'Pengguna Admin', 
        'usersInactiveUsers': 'Pengguna Tidak Aktif', 
        'usersActiveUsers': 'Pengguna Aktif', 
        'usersSubscribedUsers': 'Pengguna Berlangganan', 
        'usersPendingVerification': 'Pengguna dengan Verifikasi Tertunda', 
        'modalNewUsersTitle': 'Detail Pengguna Baru Bulan Ini', 
        'modalUsers': 'pengguna', 
        'modalAvgDailySignups': 'Rata-rata pendaftaran harian:', 
        'modalGrowthLastMonth': 'Pertumbuhan dari bulan lalu:', 
        'modalNewUsersInfo': 'Pantau tren dan sumber akuisisi pengguna baru.', 
        'modalAdminUsersTitle': 'Detail Pengguna Admin', 
        'modalAdministrators': 'administrator', 
        'modalSuperAdmin': 'Super Admin', 
        'modalContentAdmin': 'Admin Konten', 
        'modalOrderManager': 'Manajer Pesanan', 
        'modalLastActivity': 'Aktivitas terakhir:', 
        'modalToday': 'Hari Ini', 
        'modalAdminUsersInfo': 'Kelola akses dan izin administratif.', 
        'modalInactiveUsersTitle': 'Detail Pengguna Tidak Aktif', 
        'modalLastLoginOver30Days': 'Login terakhir lebih dari 30 hari:', 
        'modalPotentialReasons': 'Alasan potensial:', 
        'modalAccountDormant': 'Akun tidak aktif', 
        'modalUnsubscribed': 'Berhenti berlangganan', 
        'modalInactiveUsersInfo': 'Identifikasi pengguna tidak aktif untuk kampanye re-engagement atau pembersihan akun.', 
        'modalActiveUsersTitle': 'Detail Pengguna Aktif', 
        'modalDailyActiveUsers': 'Pengguna Aktif Harian (DAU):', 
        'modalMonthlyActiveUsers': 'Pengguna Aktif Bulanan (MAU):', 
        'modalActiveUsersInfo': 'Lacak keterlibatan pengguna dan kesehatan platform secara keseluruhan.', 
        'modalSubscribedUsersTitle': 'Detail Pengguna Berlangganan', 
        'modalSubscriptionType': 'Jenis langganan:', 
        'modalEmailNewsletter': 'Buletin Email', 
        'modalConversionToCustomer': 'Konversi ke pelanggan:', 
        'modalSubscribedUsersInfo': 'Kelola daftar pelanggan Anda untuk pemasaran dan komunikasi.', 
        'modalPendingVerificationTitle': 'Detail Pengguna dengan Verifikasi Tertunda', 
        'modalVerificationType': 'Jenis verifikasi:', 
        'modalActionNeeded': 'Tindakan diperlukan:', 
        'modalSendReminder': 'Kirim pengingat', 
        'modalManualReview': 'Tinjauan manual', 
        'modalPendingVerificationInfo': 'Atasi akun yang belum diverifikasi untuk memastikan integritas dan keamanan data.', 
        'modalUserDetailsTitle': 'Detail Pengguna', 
        'modalRegisteredDate': 'Tanggal Terdaftar:', 
        'modalEditUserTitle': 'Edit Pengguna', 
        'modalDeleteUserConfirm': 'Anda yakin ingin menghapus pengguna', 
        'toastAddUserForm': 'Formulir/modal untuk menambah pengguna baru akan muncul di sini!', // Toast message
        'toastSimulatingFilterRole': 'Mensimulasikan filter atau detail untuk peran:', // Toast message
        'userText': 'Pengguna', // For user specific toasts
        'newUsersChartLabel': 'Pengguna Baru', // For new users modal chart
        'adminUsersChartLabel': 'Pengguna Admin', // For admin users modal chart
        'inactiveUsersChartLabel': 'Pengguna Tidak Aktif', // For inactive users modal chart
        'activeUsersChartLabel': 'Pengguna Aktif', // For active users modal chart
        'subscribedUsersChartLabel': 'Pengguna Berlangganan', // For subscribed users modal chart
        'pendingVerificationsChartLabel': 'Verifikasi Tertunda', // For pending verification modal chart
        'emailVerificationLabel': 'Verifikasi Email', // For pending verification modal chart
        'phoneVerificationLabel': 'Verifikasi Telepon', // For pending verification modal chart
        'manualReviewLabel': 'Tinjauan Manual', // For pending verification modal chart

        // Products Page
        'productsProductList': 'Daftar Produk', 
        'productsAddProduct': 'Tambah Produk', 
        'searchProductsPlaceholder': 'Cari produk...', 
        'productsTableHeaderProductID': 'ID Produk', 
        'productsTableHeaderName': 'Nama', 
        'productsTableHeaderCategory': 'Kategori', 
        'productsTableHeaderPrice': 'Harga', 
        'productsTableHeaderStock': 'Stok', 
        'productsTableHeaderStatus': 'Status', 
        'productsTotalProducts': 'Total Produk', 
        'productsActiveProducts': 'Produk Aktif', 
        'productsInactiveProducts': 'Produk Tidak Aktif', 
        'productsTotalSales': 'Total Penjualan', 
        'productsAverageRating': 'Rating Rata-rata', 
        'productsLowStockProducts': 'Produk Stok Rendah', 
        'productsProductImages': 'Gambar Produk', 
        'categorySportsOutdoors': 'Olahraga & Luar Ruangan', 
        'modalTotalProductsTitle': 'Detail Total Produk', 
        'modalNewProductsThisMonth': 'Produk baru bulan ini:', 
        'modalTotalProductsInfo': 'Kelola seluruh katalog produk Anda.', 
        'modalActiveProductsTitle': 'Detail Produk Aktif', 
        'modalTopSellingCategories': 'Kategori terlaris:', 
        'modalAverageConversionRate': 'Tingkat konversi rata-rata:', 
        'modalActiveProductsInfo': 'Pantau kinerja produk aktif Anda.', 
        'modalInactiveProductsTitle': 'Detail Produk Tidak Aktif', 
        'modalOutOfStock': 'Habis stok', 
        'modalDiscontinued': 'Dihentikan', 
        'modalWeeksAgo': 'minggu yang lalu', 
        'modalInactiveProductsInfo': 'Identifikasi produk tidak aktif untuk potensi pembaruan atau penghapusan.', 
        'modalTotalSalesTitle': 'Detail Total Penjualan', 
        'modalTotalRevenue': 'Total pendapatan:', 
        'modalTopSellingProduct': 'Produk terlaris:', 
        'modalAverageOrderValue': 'Nilai pesanan rata-rata:', 
        'modalTotalSalesInfo': 'Lacak total penjualan dan kinerja produk Anda.', 
        'modalAverageRatingTitle': 'Detail Rating Rata-rata', 
        'modalAverageRating': 'Rating rata-rata:', 
        'modalStars': 'bintang', 
        'modalTotalReviews': 'Total ulasan:', 
        'modalMostReviewedProduct': 'Produk paling banyak diulas:', 
        'modalAverageRatingInfo': 'Pantau kepuasan pelanggan terhadap produk Anda.', 
        'modalLowStockProductsTitle': 'Detail Produk Stok Rendah', 
        'modalExampleProducts': 'Contoh produk:', 
        'modalRestock': 'Restok', 
        'modalNotifySupplier': 'Beritahu pemasok', 
        'modalLowStockProductsInfo': 'Pastikan Anda tidak kehabisan produk populer.', 
        'noImagesAvailable': 'Tidak ada gambar tersedia untuk produk ini.',
        'productImagesSimulatedNote': 'Ini adalah gambar produk default. Ganti dengan gambar produk spesifik untuk versi live.', // Note for product images modal
        'toastAddProductForm': 'Formulir/modal untuk menambah produk baru akan muncul di sini!', // Toast for add product
        'toastSimulatingImageGallery': 'Mensimulasikan galeri gambar untuk Produk:', // Toast for image gallery
        'toastSimulatingEditProduct': 'Mensimulasikan edit untuk ID Produk:', // Toast for edit product
        'productText': 'Produk', // For product specific toasts
        'productsCountLabel': 'Jumlah Produk', // For total products modal chart
        'activeLabel': 'Aktif', // For active products modal chart
        'inactiveLabel': 'Tidak Aktif', // For inactive products modal chart
        'lowStockLabel': 'Stok Rendah', // For low stock products modal chart
        'sufficientStockLabel': 'Stok Cukup', // For low stock products modal chart
        'monthlySalesLabel': 'Penjualan Bulanan ($)', // For total sales modal chart
        'reviewCountLabel': 'Jumlah Ulasan', // For average rating modal chart
        'stars5Label': '5 Bintang', // For average rating modal chart
        'stars4Label': '4 Bintang', // For average rating modal chart
        'stars3Label': '3 Bintang', // For average rating modal chart
        'stars2Label': '2 Bintang', // For average rating modal chart
        'stars1Label': '1 Bintang', // For average rating modal chart
        'reviewsText': 'ulasan', // For average rating modal chart tooltip

        // Categories Page
        'categoriesProductCategories': 'Kategori Produk', 
        'categoriesAddCategory': 'Tambah Kategori', 
        'searchCategoriesPlaceholder': 'Cari kategori...', 
        'categoriesTableHeaderCategoryID': 'ID Kategori', 
        'categoriesTableHeaderName': 'Nama', 
        'categoriesTableHeaderTotalProducts': 'Total Produk', 
        'categoriesTableHeaderLastUpdated': 'Terakhir Diperbarui', 
        'categoriesShowDescription': 'Tampilkan Deskripsi', 
        'categoriesHideDescription': 'Sembunyikan Deskripsi', 
        'catDescElectronics': 'Kategori ini mencakup berbagai macam perangkat elektronik seperti laptop, smartphone, kamera, dan peralatan audio. Ini adalah salah satu kategori terlaris kami dengan keterlibatan pelanggan yang tinggi.', 
        'catDescApparel': 'Koleksi pakaian kami menampilkan pakaian modern dan stylish untuk semua gender dan usia. Dari pakaian kasual hingga formal, kami menawarkan beragam pilihan untuk setiap musim.', 
        'catDescBooks': 'Perpustakaan besar berisi buku-buku yang mencakup berbagai genre termasuk fiksi, non-fiksi, edukasi, dan literatur anak-anak. Judul-judul baru ditambahkan setiap minggu.', 
        'catDescHomeKitchen': 'Segala yang Anda butuhkan untuk rumah yang nyaman dan dapur yang fungsional, termasuk peralatan, dekorasi, peralatan masak, dan solusi penyimpanan.', 
        'catDescSportsOutdoors': 'Peralatan dan perlengkapan untuk berbagai aktivitas olahraga dan petualangan luar ruangan, mulai dari berkemah dan mendaki hingga kebugaran dan olahraga tim.', 
        'categoriesTotalCategories': 'Total Kategori', 
        'categoriesNewCategoriesThisMonth': 'Kategori Baru Bulan Ini', 
        'categoriesTopCategories': 'Kategori Teratas', 
        'categoriesTrendingCategories': 'Kategori Tren', 
        'categoriesTrendingCategoriesValue': 'Elektronik, Pakaian', 
        'categoriesCategorizedProducts': 'Produk Terkategorikan', 
        'categoriesNeedingReview': 'Kategori Membutuhkan Peninjauan', 
        'modalTotalCategoriesTitle': 'Detail Total Kategori', 
        'modalCategories': 'kategori', 
        'modalMainCategories': 'Kategori Utama:', 
        'modalLastAdded': 'Terakhir ditambahkan:', 
        'modalTools': 'Alat', 
        'modalJune': 'Juni', 
        'modalTotalCategoriesInfo': 'Ikhtisar semua kategori produk dalam sistem.', 
        'modalNewCategoriesTitle': 'Detail Kategori Baru Bulan Ini', 
        'modalNewCategories': 'kategori baru', 
        'modalRecentlyAdded': 'Baru ditambahkan:', 
        'modalGarden': 'Taman', 
        'modalPetSupplies': 'Perlengkapan Hewan Peliharaan', 
        'modalImpact': 'Dampak:', 
        'modalIncreasedProductVariety': 'Meningkatkan variasi produk sebesar', 
        'modalNewCategoriesInfo': 'Lacak penambahan kategori terbaru dan dampaknya.', 
        'modalTopCategoriesTitle': 'Detail Kategori Teratas', 
        'modalTop5': 'Top 5:', 
        'modalRevenueContribution': 'Kontribusi Pendapatan:', 
        'modalGrowthRate': 'Tingkat Pertumbuhan:', 
        'modalTopCategoriesInfo': 'Wawasan tentang kategori produk berkinerja terbaik Anda.', 
        'modalTrendingCategoriesTitle': 'Detail Kategori Tren', 
        'modalCurrentlyTrending': 'Sedang tren saat ini:', 
        'modalDueToNewLaunches': 'karena peluncuran produk baru', 
        'modalSearchVolumeIncrease': 'Peningkatan volume pencarian:', 
        'modalTrendingCategoriesInfo': 'Identifikasi kategori dengan peningkatan minat pelanggan.', 
        'modalCategorizedProductsTitle': 'Detail Produk Terkategorikan', 
        'modalOfProductsAreCategorized': 'produk terkategorikan', 
        'modalUncategorized': 'Tidak Terkategorikan:', 
        'modalCategorizeRemaining': 'Kategorikan produk yang tersisa agar lebih mudah ditemukan.', 
        'modalCategorizedProductsInfo': 'Pastikan semua produk dikategorikan dengan benar untuk navigasi yang mudah.', 
        'modalCategoriesReviewTitle': 'Detail Kategori Membutuhkan Peninjauan', 
        'modalReasons': 'Alasan:', 
        'modalOldElectronics': 'Elektronik Lama', 
        'modalNicheBooks': 'Buku Niche', 
        'modalOutdatedProducts': 'Produk Usang', 
        'modalLowSalesVolume': 'Volume Penjualan Rendah', 
        'modalCategoriesReviewInfo': 'Tinjau kategori secara berkala untuk menjaga katalog Anda relevan dan teroptimasi.', 
        'modalCategoryDetailsTitle': 'Detail Kategori', 
        'modalDescription': 'Deskripsi:', 
        'modalEditCategoryTitle': 'Edit Kategori', 
        'modalCategoryName': 'Nama Kategori', 
        'modalDeleteCategoryConfirm': 'Anda yakin ingin menghapus kategori', 
        'toastAddCategoryForm': 'Formulir/modal untuk menambah kategori baru akan muncul di sini!', // Toast
        'noDetailedDescription': 'Tidak ada deskripsi rinci yang tersedia.', // Toast for toggle description
        'categoryText': 'Kategori', // For category specific toasts
        'modalMainCategoriesLabel': 'Kategori Utama', // For total categories modal chart
        'modalSubCategoriesLabel': 'Sub Kategori', // For total categories modal chart
        'newCategoriesAddedLabel': 'Kategori Baru Ditambahkan', // For new categories modal chart
        'newCategoriesLabel': 'Kategori Baru', // For new categories modal chart tooltip
        'monthJan': 'Jan', // For charts
        'monthFeb': 'Feb', // For charts
        'monthMar': 'Mar', // For charts
        'monthApr': 'Apr', // For charts
        'monthMay': 'Mei', // For charts
        'monthJun': 'Jun', // For charts
        'revenueText': 'Pendapatan', // For top categories modal chart tooltip
        'trendScoreLabel': 'Skor Tren', // For trending categories modal chart
        'categorizedLabel': 'Terkategorikan', // For categorized products modal chart
        'uncategorizedLabel': 'Tidak Terkategorikan', // For categorized products modal chart
        'categoriesToReviewLabel': 'Kategori untuk Ditinjau', // For categories to review modal chart
        'outdatedProductsLabel': 'Produk Usang', // For categories to review modal chart
        'lowSalesVolumeLabel': 'Volume Penjualan Rendah', // For categories to review modal chart
        'categoryApparel': 'Pakaian', 
        
        // Settings Page
        'settingsGeneral': 'Umum', 
        'settingsSecurity': 'Keamanan', 
        'settingsNotifications': 'Notifikasi', 
        'settingsIntegrations': 'Integrasi', 
        'settingsGeneralAppSettings': 'Pengaturan Aplikasi Umum', 
        'settingsSiteName': 'Nama Situs', 
        'settingsSiteNameValue': 'Dasbor DashPro', 
        'settingsTimezone': 'Zona Waktu', 
        'timezoneJakarta': 'Asia/Jakarta', 
        'timezoneLondon': 'Eropa/London', 
        'timezoneNewYork': 'Amerika/New York', 
        'timezoneUTC': 'UTC', 
        'settingsDefaultCurrency': 'Mata Uang Default', 
        'settingsDefaultLanguage': 'Bahasa Default', 
        'languageEnglish': 'Inggris', 
        'languageIndonesian': 'Bahasa Indonesia', 
        'languageSpanish': 'Spanyol', 
        'settingsMaintenanceMode': 'Mode Pemeliharaan', 
        'settingsSaveGeneral': 'Simpan Pengaturan Umum', 
        'settingsAccountSecurity': 'Pengaturan Keamanan Akun', 
        'settingsPasswordPolicy': 'Kebijakan Kata Sandi', 
        'policyStrong': 'Kuat (min 8 karakter, 1 huruf besar, 1 angka, 1 simbol)', 
        'policyMedium': 'Sedang (min 6 karakter, 1 angka)', 
        'policyWeak': 'Lemah (min 4 karakter)', 
        'settingsTwoFactorAuth': 'Autentikasi Dua Faktor (2FA)', 
        'settingsSessionTimeout': 'Waktu Habis Sesi (menit)', 
        'settingsIPWhitelist': 'Daftar Putih IP (dipisahkan koma, opsional)', 
        'settingsIPWhitelistPlaceholder': 'misal, 192.168.1.1, 10.0.0.0.5', 
        'settingsIPWhitelistHint': 'Hanya izinkan akses dari alamat IP yang ditentukan.', 
        'settingsSaveSecurity': 'Simpan Pengaturan Keamanan', 
        'settingsNotificationPreferences': 'Preferensi Notifikasi', 
        'settingsEmailNotifications': 'Notifikasi Email', 
        'settingsEmailNotificationsHint': 'Terima pembaruan penting melalui email.', 
        'settingsSMSNotifications': 'Notifikasi SMS', 
        'settingsSMSNotificationsHint': 'Terima peringatan kritis di ponsel Anda.', 
        'settingsPushNotifications': 'Notifikasi Push (dalam aplikasi)', 
        'settingsPushNotificationsHint': 'Dapatkan pembaruan real-time langsung di dasbor.', 
        'settingsSaveNotifications': 'Simpan Pengaturan Notifikasi', 
        'settingsThirdPartyIntegrations': 'Integrasi Pihak Ketiga', 
        'settingsGoogleAnalytics': 'Google Analytics', 
        'settingsGoogleAnalyticsText': 'Hubungkan akun Google Analytics Anda untuk melacak lalu lintas situs web.', 
        'settingsTrackingID': 'ID Pelacakan (GA4)', 
        'settingsEnableDisableGA': 'Aktifkan/Nonaktifkan Integrasi Google Analytics.', 
        'settingsMailchimp': 'Mailchimp', 
        'settingsMailchimpText': 'Sinkronkan data pelanggan Anda dengan Mailchimp untuk kampanye pemasaran email.', 
        'settingsAPIKey': 'Kunci API', 
        'settingsEnableDisableMailchimp': 'Aktifkan/Nonaktifkan Integrasi Mailchimp.', 
        'settingsSaveIntegrations': 'Simpan Integrasi', 
        'toastSettingsSaved': 'Pengaturan berhasil disimpan!', 

        // Footer
        'footerText': '2023 DashPro. Semua hak dilindungi.'
    }
};

// EXPORT translations and currentLanguage to global scope for other JS files.
// This allows other scripts to access translation data and the currently selected language.
window.translations = translations;
window.currentLanguage = localStorage.getItem('language') || 'en'; // Default to English if no preference is saved.


/**
 * Sets the active language for the dashboard.
 * Iterates through elements with `data-lang-key` and updates their text content
 * or placeholder text based on the selected language from the `translations` object.
 * Also updates the active state of language selection buttons.
 * @param {string} lang - The language code (e.g., 'en', 'id').
 */
function setLanguage(lang) {
    window.currentLanguage = lang; // Update the global currentLanguage variable.
    const langData = translations[lang] || translations['en']; // Get language data, fallback to English.

    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.dataset.langKey;
        const translation = langData[key]; // Use langData directly

        if (translation !== undefined) { // Check for undefined to allow empty strings as valid translations
            // Special handling for input placeholders.
            if (element.tagName === 'INPUT' && element.placeholder !== undefined) {
                element.placeholder = translation;
            } 
            // Special handling for select options.
            else if (element.tagName === 'OPTION') {
                 element.textContent = translation;
            }
            // Handle cases where innerHTML is needed (e.g., for icons or embedded HTML in text).
            else if (element.dataset.langHtml) { // Use a new data attribute for innerHTML.
                element.innerHTML = translation;
            }
            // Default: update textContent for other elements.
            else {
                element.textContent = translation;
            }
        }
    });
    // Update active class for language buttons in the header dropdown.
    document.querySelectorAll('.language-select').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    // Update category description buttons if on the categories page, as their text toggles.
    if (document.body.classList.contains('categories-page')) {
        document.querySelectorAll('.toggle-description-btn').forEach(btn => {
            const descriptionRow = btn.closest('tr')?.nextElementSibling; // Use optional chaining
            // Check if the description row is currently shown.
            if (descriptionRow && descriptionRow.classList.contains('show-description')) {
                btn.textContent = langData['categoriesHideDescription']; // Use langData
                btn.classList.remove('btn-primary'); // Ensure correct styling for "Hide" state.
                btn.classList.add('btn-secondary');
            } else {
                btn.textContent = langData['categoriesShowDescription']; // Use langData
                btn.classList.remove('btn-secondary'); // Ensure correct styling for "Show" state.
                btn.classList.add('btn-primary');
            }
        });
    }
    localStorage.setItem('language', lang); // Save selected language preference to local storage.
}


// --- Theme Customizer (Primary Color Selection) ---
// const colorDots = document.querySelectorAll('.color-dot'); // Unused variable removed
const root = document.documentElement; // Represents the <html> element, used for CSS variables.

/**
 * Helper function to darken a hex color by a given percentage.
 * Used to calculate the --primary-dark shade dynamically.
 * @param {string} hex - The hex color code (e.g., '#RRGGBB').
 * @param {number} percent - The percentage to darken (e.g., 0.15 for 15%).
 * @returns {string} The darkened hex color code.
 */
function darkenColor(hex, percent) {
    let f = parseInt(hex.slice(1), 16),
        t = percent < 0 ? 0 : 255,
        p = percent < 0 ? percent * -1 : percent,
        R = f >> 16,
        G = (f >> 8) & 0x00ff,
        B = f & 0x0000ff;
    return "#" + (
        0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 +
        (Math.round((t - G) * p) + G) * 0x100 +
        (Math.round((t - B) * p) + B)
    ).toString(16).slice(1);
}

/**
 * Sets the primary color for the dashboard by updating CSS variables.
 * Also calculates a darker shade for '--primary-dark' based on the chosen primary color.
 * Updates the active state of color picker dots.
 * @param {string} color - The hex color code (e.g., '#5a67d8').
 */
function setPrimaryColor(color) {
    root.style.setProperty('--primary', color);
    root.style.setProperty('--primary-dark', darkenColor(color, 0.15)); // Darken by 15% for the secondary primary shade.

    localStorage.setItem('primaryColor', color); // Save color preference to local storage.

    // Update active class for pre-defined color dots (excluding the custom input itself for its own click behavior).
    document.querySelectorAll('.color-dot').forEach(dot => {
        // Ensure to check the data-color attribute for predefined dots
        const dotColor = dot.dataset.color;
        if (dot.id !== 'customPrimaryColorInput') {
            if (dotColor && dotColor.toLowerCase() === color.toLowerCase()) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        }
    });

    // Special handling for the custom color input itself: ensure it reflects the active color
    const customColorInput = document.getElementById('customPrimaryColorInput');
    if (customColorInput) {
        // Only set active if the input's current value matches the new color
        // And visually update the input's value to the chosen color
        customColorInput.value = color; 
        if (customColorInput.value.toLowerCase() === color.toLowerCase()) {
            customColorInput.classList.add('active');
        } else {
            customColorInput.classList.remove('active');
        }
    }
}


// Executed when the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', function() {
    // Apply saved language and theme preferences on page load.
    setLanguage(window.currentLanguage); // Use global currentLanguage.

    const savedPrimaryColor = localStorage.getItem('primaryColor');
    if (savedPrimaryColor) {
        setPrimaryColor(savedPrimaryColor);
    } else {
        setPrimaryColor('#5a67d8'); // Default primary color if no preference is saved.
    }

    // Event listeners for pre-defined Color Picker Dots.
    document.querySelectorAll('.color-dot').forEach(dot => {
        // Only attach listener to actual color buttons, not the custom color input itself.
        if (dot.id !== 'customPrimaryColorInput') {
            dot.addEventListener('click', function() {
                setPrimaryColor(this.dataset.color);
            });
        }
    });

    // Event listener for the custom color input (type="color").
    const customPrimaryColorInput = document.getElementById('customPrimaryColorInput');
    if (customPrimaryColorInput) {
        customPrimaryColorInput.addEventListener('input', function() { // Use 'input' event for real-time updates as color changes.
            setPrimaryColor(this.value);
        });
        // Initial value is already set by setPrimaryColor call above, but ensure it's accurate.
        // It's good practice to set it here explicitly for robustness.
        if (savedPrimaryColor) {
            customPrimaryColorInput.value = savedPrimaryColor;
        } else {
            customPrimaryColorInput.value = '#5a67d8'; // Set default value for the custom input.
        }
    }


    // Event listeners for Language Selection in the header dropdown.
    document.querySelectorAll('.language-select').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior (e.g., page reload).
            setLanguage(this.dataset.lang);
            // Close language menu after selection.
            this.closest('.dropdown-menu')?.classList.remove('show'); // Use optional chaining
        });
    });


    // --- Common Modal Close Buttons ---
    // Attaches event listeners to all elements with 'close-button' or 'close-modal-btn' classes within modals.
    document.querySelectorAll('.modal .close-button, .modal .close-modal-btn').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal'); // Find the parent modal element.
            if (modal) {
                closeModal(modal.id); // Close the identified modal.
            }
        });
    });

    // --- Header Dropdown Toggles (Language, Theme, Profile, Notifications, Messages) ---
    // Handles opening/closing of all dropdown menus in the header.
    const headerDropdownToggles = document.querySelectorAll('.header-icon.dropdown-toggle, .user-profile.profile-toggle');
    headerDropdownToggles.forEach(toggleElement => {
        toggleElement.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent document click listener from immediately closing it.
            // Determine which dropdown menu corresponds to the clicked toggle element.
            const targetMenuId = this.id === 'languageToggle' ? 'languageMenu' :
                                 this.id === 'themeToggle' ? 'themeMenu' :
                                 this.id === 'profileToggle' ? 'profileMenu' :
                                 this.id === 'notificationsToggle' ? 'notificationsMenu' :
                                 this.id === 'messagesToggle' ? 'messagesMenu' : null;
            
            if (targetMenuId) {
                const targetMenu = document.getElementById(targetMenuId);

                // Close all other open dropdowns first to ensure only one is active at a time.
                document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
                    if (openMenu && openMenu !== targetMenu) {
                        openMenu.classList.remove('show');
                    }
                });

                // Toggle the 'show' class on the clicked dropdown's menu.
                targetMenu?.classList.toggle('show'); // Use optional chaining
            }
        });
    });

    // --- Chart Options Dropdown Logic (Universal for Dashboard & Analytics Pages) ---
    // Handles opening/closing of dropdown menus for chart options (e.g., View Data, Export CSV).
    document.querySelectorAll('.chart-options-toggle').forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent click from immediately closing dropdown.
            const chartId = this.dataset.chartId; // Get the ID of the chart associated with this toggle.
            const dropdown = document.getElementById(`${chartId}Dropdown`); // Find the corresponding dropdown menu.
            
            // Close all other chart options dropdowns.
            document.querySelectorAll('.chart-options-dropdown.show').forEach(openDropdown => {
                if (openDropdown && openDropdown !== dropdown) {
                    openDropdown.classList.remove('show');
                }
            });
            // Close all header dropdowns (profile, language, theme, notifications, messages).
            document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
                openMenu.classList.remove('show');
            });

            // Toggle the visibility of the specific chart options dropdown.
            dropdown?.classList.toggle('show'); // Use optional chaining
        });
    });

    // Global click listener to close all open dropdowns (header, chart options) and the sidebar
    // when clicking anywhere else on the document outside of these elements.
    document.addEventListener('click', function(event) {
        // Close chart option dropdowns.
        document.querySelectorAll('.chart-options-dropdown.show').forEach(dropdown => {
            // Find the associated toggle button for this dropdown
            const chartIdFromDropdown = dropdown.id.replace('Dropdown', '');
            const toggleButton = document.querySelector(`[data-chart-id="${chartIdFromDropdown}"]`);
            
            // Check if the click target is outside the dropdown itself AND its toggle button.
            if (dropdown && !dropdown.contains(event.target) && (!toggleButton || !toggleButton.contains(event.target))) {
                dropdown.classList.remove('show');
            }
        });
        // Close header dropdowns (Profile, Language, Theme, Notifications, Messages).
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            let toggleButton; // Find the corresponding toggle button for the menu.
            if (menu.id === 'profileMenu') toggleButton = document.getElementById('profileToggle');
            else if (menu.id === 'languageMenu') toggleButton = document.getElementById('languageToggle');
            else if (menu.id === 'themeMenu') toggleButton = document.getElementById('themeToggle');
            else if (menu.id === 'notificationsMenu') toggleButton = document.getElementById('notificationsToggle');
            else if (menu.id === 'messagesMenu') toggleButton = document.getElementById('messagesToggle');

            // Check if the click target is outside the menu itself AND its toggle button.
            if (menu && !menu.contains(event.target) && (!toggleButton || !toggleButton.contains(event.target))) {
                menu.classList.remove('show');
            }
        });

        // Close sidebar when clicking outside of it (on the overlay) on smaller screens.
        const sidebar = document.querySelector('.sidebar');
        const appContainer = document.querySelector('.app-container');
        const toggleSidebarBtn = document.querySelector('.toggle-sidebar');
        
        // Only close sidebar if it's currently open and the click is outside the sidebar and its toggle button.
        if (appContainer.classList.contains('sidebar-open')) {
            if (sidebar && appContainer && toggleSidebarBtn && !sidebar.contains(event.target) && !toggleSidebarBtn.contains(event.target)) {
                if (window.innerWidth <= 992) { // Apply only for screens where sidebar is initially hidden.
                    toggleSidebar();
                }
            }
        }
    });

    // Handle dropdown menu item clicks for charts (View Data, Export CSV).
    document.querySelectorAll('.chart-options-dropdown a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior.
            const action = this.dataset.action; // Get the action (e.g., 'view-data', 'export-csv').
            const chartId = this.closest('.chart-options-dropdown').id.replace('Dropdown', ''); // Extract chart ID.
            
            // Get langData safely within this scope.
            const langData = translations[window.currentLanguage] || translations['en'];

            // Use translated alert messages.
            if (action === 'view-data') {
                alert(`${langData['chartViewData']} ${langData['forText']} ${chartId}.`);
            } else if (action === 'export-csv') {
                alert(`${langData['chartExportCSV']} ${langData['forText']} ${chartId}.`);
            }
            this.closest('.chart-options-dropdown')?.classList.remove('show'); // Close the dropdown after action.
        });
    });

    // Handle clicks within Profile Menu common actions (My Profile, Switch Account, Login/Register, Logout).
    document.querySelectorAll('#profileMenu .dropdown-item[data-action]').forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const action = this.dataset.action;
            const modalTarget = this.dataset.modalTarget;

            // Get langData safely within this scope.
            const langData = translations[window.currentLanguage] || translations['en'];

            if (modalTarget) {
                openModal(modalTarget); // Open specific modal if data-modal-target is present.
            } else {
                // Show toast messages for simulated actions, using translations.
                if (action === 'my-profile') {
                    showToast(langData['myProfileSimulated'], 'info');
                } else if (action === 'switch-account') {
                     showToast(langData['switchAccountSimulated'], 'info');
                } else if (action === 'login-register') {
                    showToast(langData['loginRegisterSimulated'], 'info');
                } else if (action === 'logout') {
                    showToast(langData['logoutSimulated'], 'info');
                }
            }
            this.closest('.dropdown-menu')?.classList.remove('show'); // Close the profile dropdown.
        });
    });

    // Handle dropdown-footer clicks (e.g., View All Notifications/Messages).
    document.querySelectorAll('.dropdown-footer[data-action]').forEach(footerLink => {
        footerLink.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation(); // Prevent dropdown from closing immediately.
            const modalTarget = this.dataset.modalTarget;

            // Get langData safely within this scope.
            const langData = translations[window.currentLanguage] || translations['en'];

            if (modalTarget) {
                openModal(modalTarget); // Open the targeted modal.
                this.closest('.dropdown-menu')?.classList.remove('show'); // Close the dropdown after opening the modal.
            } else {
                // Show toast message for simulated navigation, using translations.
                showToast(`${langData['navigatingTo']} ${this.dataset.action} ${langData['pageSimulated']}.`, 'info');
            }
        });
    });

    // Example functionality for Notification/Message Full List buttons within modals.
    document.querySelectorAll('#notificationsModal .mark-read-btn').forEach(button => {
        button.addEventListener('click', function() {
            const notificationItem = this.closest('.notification-item-full');
            if (notificationItem) {
                notificationItem.classList.add('read'); // Mark as read by adding class.
                showToast(translations[window.currentLanguage]['notificationMarkRead'], 'success');
                // Optionally, update the notification badge count here.
            }
        });
    });

    document.querySelectorAll('#notificationsModal .mark-unread-btn').forEach(button => {
        button.addEventListener('click', function() {
            const notificationItem = this.closest('.notification-item-full');
            if (notificationItem) {
                notificationItem.classList.remove('read'); // Mark as unread by removing class.
                showToast(translations[window.currentLanguage]['notificationMarkUnread'], 'info');
                // Optionally, update the notification badge count here.
            }
        });
    });

    document.querySelector('#notificationsModal .btn-modern[data-lang-key="modalClearAll"]')?.addEventListener('click', function() {
        const notificationList = document.querySelector('#notificationsModal .notification-full-list');
        if (notificationList) {
            // Replace list content with a "No notifications" message, using translation.
            notificationList.innerHTML = `<p style="text-align: center; color: var(--gray); padding: 20px;">${translations[window.currentLanguage]['noNotifications']}</p>`;
            // Optionally, update the notification badge count to 0.
            showToast(translations[window.currentLanguage]['modalClearAll'] + '!', 'success');
        }
    });

    document.querySelectorAll('#messagesModal .view-message-btn').forEach(button => {
        button.addEventListener('click', function() {
            const messageItem = this.closest('.message-item-full');
            // Get langData safely within this scope.
            const langData = translations[window.currentLanguage] || translations['en'];
            if (messageItem) {
                // Simulate viewing message details (e.g., open a new modal or navigate).
                showToast(langData['messageViewDetails'] + ' (' + langData['simulatedAction'] + ')', 'info');
                messageItem.classList.add('read'); // Mark as read when viewed.
            }
        });
    });

    document.querySelector('#messagesModal .btn-modern[data-lang-key="modalComposeMessage"]')?.addEventListener('click', function() {
        // Get langData safely within this scope.
        const langData = translations[window.currentLanguage] || translations['en'];
        showToast(langData['modalComposeMessage'] + ' (' + langData['simulatedFormOpen'] + ')', 'info');
        // Close the messages modal if compose message form is meant to open elsewhere.
        closeModal('messagesModal');
    });

    // Global utility function to download a chart as a PNG image.
    window.downloadChart = function(chartId, filename) {
        const chartCanvas = document.getElementById(chartId);
        if (chartCanvas) {
            // Ensure a Chart.js instance exists on the canvas.
            const chartInstance = Chart.getChart(chartCanvas);
            if (chartInstance) {
                const url = chartInstance.toBase64Image(); // Get chart image as data URL.
                const a = document.createElement('a'); // Create a temporary anchor element.
                a.href = url;
                a.download = filename || `${chartId}.png`; // Set download filename.
                document.body.appendChild(a); // Append to body to make it clickable.
                a.click(); // Programmatically click the link to trigger download.
                document.body.removeChild(a); // Clean up the temporary link.
            } else {
                console.error(`Chart instance for canvas ID '${chartId}' not found. Cannot download.`);
            }
        } else {
            console.warn(`Canvas with ID '${chartId}' not found for download.`);
        }
    }
}); // End DOMContentLoaded