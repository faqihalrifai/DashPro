// File: assets/js/settings.js

document.addEventListener('DOMContentLoaded', function() {
    // Ensure this script runs only on the settings page.
    if (!document.body.classList.contains('settings-page')) {
        return;
    }

    // Get global translation data safely from main.js.
    const currentLanguage = window.currentLanguage || 'en';
    const translations = window.translations || {};
    const langData = translations[currentLanguage] || translations['en']; // Fallback to English

    // Select all tab buttons and tab panes for settings navigation.
    const tabButtons = document.querySelectorAll('.settings-tabs .tab-button');
    const tabPanes = document.querySelectorAll('.settings-content .tab-pane');

    // Add click event listeners to each tab button.
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Deactivate all tab buttons and hide all tab panes.
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Activate the clicked tab button.
            this.classList.add('active');
            
            // Get the ID of the target pane from the data-tab-target attribute.
            const targetTabId = this.dataset.tabTarget;
            const targetPane = document.getElementById(targetTabId);
            
            // Show the target pane.
            targetPane?.classList.add('active');
        });
    });

    // Form submission handlers for various settings forms.
    const generalSettingsForm = document.getElementById('generalSettingsForm');
    const securitySettingsForm = document.getElementById('securitySettingsForm');
    const notificationSettingsForm = document.getElementById('notificationSettingsForm');
    const integrationSettingsForm = document.getElementById('integrationSettingsForm');

    // Event listener for General Settings form submission.
    generalSettingsForm?.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission to handle it via JavaScript.
        console.log('General settings saved!');
        // showToast() is a global function from main.js.
        // Display a success toast message using the current language's translation.
        showToast(langData['toastSettingsSaved'], 'success');
    });

    // Event listener for Security Settings form submission.
    securitySettingsForm?.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Security settings updated!');
        // Display a success toast message using the current language's translation.
        showToast(langData['toastSettingsSaved'], 'success');
    });

    // Event listener for Notification Settings form submission.
    notificationSettingsForm?.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Notification settings updated!');
        // Display a success toast message using the current language's translation.
        showToast(langData['toastSettingsSaved'], 'success');
    });

    // Event listener for Integration Settings form submission.
    integrationSettingsForm?.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Integration settings updated!');
        // Display a success toast message using the current language's translation.
        showToast(langData['toastSettingsSaved'], 'success');
    });
});