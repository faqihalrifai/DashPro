# DashPro - Modern Admin Panel Dashboard

---
**Product Name:** DashPro - Modern Admin Panel Dashboard 
**Version:** 1.0.0 
**Author:** [Muhammad Faqih Al Rifai/DashPro] 
**Date:** June 14, 2025 (Updated)
---

Thank you for purchasing **"DashPro - Modern Admin Panel Dashboard"**!  This README file provides a quick overview to help you get started with DashPro. For comprehensive, step-by-step instructions, detailed customization guides, advanced usage tips, and troubleshooting solutions, please refer to the main documentation file: `documentation.html`.
---

## 1. Product Overview

DashPro is a sleek, modern, and fully responsive admin panel dashboard template. It is meticulously designed for a wide range of backend applications, administrative dashboards, and control panels. Built with clean, well-structured HTML, highly customizable CSS (utilizing custom CSS variables for effortless theming), and modular JavaScript (including the powerful Chart.js library), DashPro ensures a consistent, interactive, and visually appealing user experience across all devices and screen sizes.
**Key Features & Highlights:**
* **Clean and Modern Design:** A contemporary aesthetic that adheres to current UI/UX trends.
* **Fully Responsive Layout:** Optimized for seamless display and functionality on desktops, tablets, and mobile devices.
* **Light & Dark Theme Support:** Easily switch between light and dark modes (Dark mode functionality can be implemented by the buyer, as the template provides the necessary CSS structure in `core.css`).
* **Real-time Theme Customizer:** Effortlessly change the primary color of the entire template on the fly via a built-in color picker in the header.
* **Multi-Language Support:** Pre-configured with English and Indonesian languages, making it easy to adapt for international users.
* **Modular & Maintainable JavaScript:** Well-organized JavaScript files (`main.js` for global functions, `dashboard.js`, `analytics.js`, etc., for page-specific scripts) ensure better performance and easier maintenance.
* **Interactive Charts:** Engage your users with dynamic and informative data visualizations powered by Chart.js.
* **Dynamic Table Management:** Interactive tables support common management actions like viewing, editing, and deleting entries, complete with toast notifications for user feedback.
* **Comprehensive Page Set:** Includes essential admin pages: Dashboard, Analytics, Orders, Users, Products, Categories, Settings, and Help.
* **Accordion-style FAQ Section:** A user-friendly FAQ section for quick answers to common questions.
* **Common Modals:** Ready-to-use modals for profile management, account switching, login/register simulation, and logout confirmation.
* **Global Toast Notifications:** Provides clear and concise feedback to users for various actions.
---

## 2. Quick Start (Getting Started in 3 Simple Steps)

DashPro is designed for a rapid setup. Follow these steps to get your admin panel up and running in no time:

### Step 1: Extract the Package

1.  Locate the downloaded "DashPro.zip" file.
2.  Unzip (extract) the entire contents of this file to your desired directory on your local machine or web server.
    You will find the following clean and organized folder structure: 

    ```
    📁 your-template-name/
    ├── index.html                  # Main Dashboard page
    ├── analytics.html              # Analytics overview page
    ├── help.html                   # Help & Support page
    ├── settings.html               # System Settings page 
    ├── products.html               # Product Management page
    ├── users.html                  # User Management page
    ├── orders.html                 # Order Management page
    ├── categories.html             # Category Management page 
    ├── 📁 assets/
    │   ├── 📁 css/
    │   │   ├── core.css            # Global styles and basic components
    │   │   ├── analytics.css       # Page-specific styles (currently empty, ready for your custom styles)
    │   │   ├── users.css           # Page-specific styles (currently empty, ready for your custom styles) 
    │   │   ├── products.css        # Page-specific styles (currently empty, ready for your custom styles)
    │   │   ├── orders.css          # Page-specific styles (currently empty, ready for your custom styles)
    │   │   ├── categories.css      # Page-specific styles (currently empty, ready for your custom styles) 
    │   │   ├── settings.css        # Page-specific styles (currently empty, ready for your custom styles)
    │   │   └── help.css            # Page-specific styles (currently empty, ready for your custom styles)
    │   ├── 📁 js/
    │   │   ├── main.js             # Global scripts and utility functions 
    │   │   ├── dashboard.js        # Dashboard-specific scripts
    │   │   ├── analytics.js        # Analytics-specific scripts
    │   │   ├── orders.js           # Orders-specific scripts
    │   │   ├── users.js            # Users-specific scripts 
    │   │   ├── products.js         # Products-specific scripts
    │   │   ├── categories.js       # Categories-specific scripts
    │   │   ├── settings.js         # Settings-specific scripts
    │   │   └── help.js             # Help-specific scripts 
    │   └── 📁 images/
    │       └── (Your image assets here, e.g., profile.jpg, products.jpg)
    ├── documentation.html          # Comprehensive template documentation
    ├── license.txt                 # MIT License file
    └── readme.txt                  # This file 
    ```

### Step 2: Open in Browser

1.  For a quick preview and local development, simply open any HTML file (e.g., `index.html`) directly in your preferred web browser.
2.  **Recommendation for Local Development:** For optimal performance and to avoid potential issues with file paths (especially for AJAX requests if you implement them later), it is highly recommended to serve the template using a local development server (e.g., Python's `http.server`, Node.js `http-server`, or the popular Live Server extension in VS Code).

### Step 3: Basic Customization

Once the template is loaded in your browser, you can start with basic customizations:

1.  **Theme Colors:** Quickly change the primary theme color using the built-in color picker in the header. For more advanced color modifications, you can directly edit the CSS variables (e.g., `--primary`, `--secondary`, `--success`, `--dark`, etc.) located within the `:root` and `body.dark-mode` selectors in `assets/css/core.css`.
2.  **Language:** Utilize the multi-language switcher in the header to set the interface language to English or Indonesian. To add or modify language translations, update the `translations` object in `assets/js/main.js`.
3.  **Content:** To modify text, images, or hardcoded data within tables and cards, directly edit the corresponding HTML files (e.g., `index.html`, `products.html`, `users.html`).
---

## 3. Files Included (Detailed)

This section provides a more detailed breakdown of the files included in your DashPro package, outlining their purpose and modularity.
* **HTML Pages:**
    * `index.html`: Main Dashboard page.
    * `analytics.html`: Analytics overview page.
    * `orders.html`: Order Management page.
    * `users.html`: User Management page.
    * `products.html`: Product Management page.
    * `categories.html`: Category Management page.
    * `settings.html`: System Settings page.
    * `help.html`: Help & Support page.
*(All HTML pages share a common structure for the sidebar and header, making global updates easier.)*

* **CSS Files (`assets/css/`):**
    * `core.css`: Contains all global styles, responsive rules, basic component styling (buttons, cards, forms, tables, modals), and CSS variables for theming. This is your primary CSS file.
    * `analytics.css`, `users.css`, `products.css`, `orders.css`, `categories.css`, `settings.css`, `help.css`: These are currently empty files, provided for you to add page-specific CSS rules without cluttering `core.css`.
* **JavaScript Files (`assets/js/`):**
    * `main.js`: Contains all global JavaScript functionalities, including sidebar toggling, modal handling, toast notifications, multi-language logic, and theme customization (primary color switcher).
    * `dashboard.js`: Specific scripts for the Dashboard page, including Chart.js initialization for revenue and sales charts, and logic for recent orders table interactions.
    * `analytics.js`: Specific scripts for the Analytics page, handling date filters and Chart.js initialization for visitor trends and traffic sources.
    * `orders.js`: Specific scripts for the Orders page, managing order status filters, Chart.js initialization for order stats, and table interactions.
    * `users.js`: Specific scripts for the Users page, including Chart.js initialization for user stats and user table interactions.
    * `products.js`: Specific scripts for the Products page, managing product stats charts, table interactions, and the product image gallery modal.
    * `categories.js`: Specific scripts for the Categories page, handling category stats charts, table interactions, and the category description toggle.
    * `settings.js`: Specific scripts for the Settings page, managing tab navigation and form submission simulations.
    * `help.js`: Specific scripts for the Help page, handling modal content population for help cards and the FAQ accordion functionality.
* **Documentation & Licensing:**
    * `documentation.html`: This comprehensive file provides in-depth instructions, customization options, and troubleshooting advice.
    * `license.txt`: The MIT License file, detailing the terms of use for this template.
    * `readme.txt`: This file (which you are currently reading).

---

## 4. Credits & Resources

DashPro utilizes the following third-party libraries and resources:

* **Fonts:** Poppins from Google Fonts (https://fonts.google.com/specimen/Poppins) 
* **Icons:** Font Awesome Free (https://fontawesome.com/) 
* **Charts:** Chart.js (https://www.chartjs.org/) 
* **Placeholder Images:** profile.jpg, and products.jpg (for profile & generic images in demo) 

---

## 5. Support & Feedback

We are committed to providing excellent support for DashPro. If you encounter any issues, have questions, or require further assistance:

1.  **Consult the Documentation:** Please refer to the comprehensive `documentation.html` file first. It covers detailed instructions, customization guides, and solutions for common questions and issues.
2.  **Contact Support:** If your issue is not covered in the documentation, feel free to contact our support team. You can find the available contact methods (e.g., email, phone) on the `help.html` page within the template.
We highly appreciate your feedback and are continuously working to improve DashPro. Your suggestions are invaluable! 
---

## 6. Licensing

This template, "DashPro - Modern Admin Panel Dashboard", is licensed under the **MIT License**. This permissive license grants you broad rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, subject to including the original copyright and permission notice in all copies or substantial portions of the Software. Please refer to the `license.txt` file included in the package for the full details of the MIT License. Copyright (c) 2023 [Muhammad Faqih Al Rifai/Dash Pro] (Remember to replace this placeholder in your `license.txt` file as well!) 

---

**Thank you for choosing DashPro!** 
We hope this template empowers your projects and enhances your workflow.
