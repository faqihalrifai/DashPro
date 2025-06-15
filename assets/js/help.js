// File: assets/js/help.js

document.addEventListener('DOMContentLoaded', function() {
    // Ensure this script runs only on the help page.
    if (!document.body.classList.contains('help-page')) {
        return;
    }

    // Get global translation data safely from main.js.
    // This provides access to translated strings based on the current language.
    const currentLanguage = window.currentLanguage || 'en';
    const translations = window.translations || {};
    const langData = translations[currentLanguage] || translations['en']; // Fallback to English if current language data is missing.

    /**
     * Handles click events for "Details" buttons on help cards.
     * Opens the corresponding modal and populates its content with translated data.
     */
    document.querySelectorAll('.help-page .btn-details').forEach(button => {
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

            // --- Populate Modal Content with Detailed Information (Help Page). ---
            // This part populates the content of various help-related modals
            // using the globally available translation data.

            if (modalTargetId === 'docModal') {
                const docTitle = modal.querySelector('h2'); // Use modal.querySelector
                const docText1 = modal.querySelector('[data-lang-key="modalDocText1"]'); // Use modal.querySelector
                const docText2Parent = modal.querySelector('p:has(strong[data-lang-key="modalDocText2"])'); // Use modal.querySelector
                const goToDocsBtn = modal.querySelector('[data-lang-key="modalGoToDocs"]'); // Use modal.querySelector

                if (docTitle) docTitle.textContent = langData['modalDocTitle'];
                if (docText1) docText1.textContent = langData['modalDocText1'];
                
                // Populate the second paragraph with a list of topics, dynamically translated.
                if (docText2Parent) {
                    const topics = [
                        langData['modalGettingStarted'],
                        langData['modalUserGuide'],
                        langData['modalAPIReference'],
                        langData['modalTroubleshooting']
                    ].filter(Boolean).join(', '); // Filter Boolean to remove undefined/null if any translation is missing.
                    docText2Parent.innerHTML = `<strong>${langData['modalDocText2'].split(':')[0]}:</strong> ${topics}.`; // Reconstruct with dynamic content.
                }

                if (goToDocsBtn) goToDocsBtn.href = "#"; // Placeholder URL, replace with actual docs URL.
            } else if (modalTargetId === 'ticketModal') {
                const ticketTitle = modal.querySelector('h2'); // Use modal.querySelector
                const ticketText1 = modal.querySelector('[data-lang-key="modalTicketText1"]'); // Use modal.querySelector
                const ticketText2Parent = modal.querySelector('p:has(strong[data-lang-key="modalTicketText2"])'); // Use modal.querySelector
                const createTicketBtn = modal.querySelector('[data-lang-key="modalCreateNewTicket"]'); // Use modal.querySelector

                if (ticketTitle) ticketTitle.textContent = langData['modalTicketTitle'];
                if (ticketText1) ticketText1.textContent = langData['modalTicketText1'];
                
                // Populate the second paragraph with required items for ticket submission.
                if (ticketText2Parent) {
                    const items = [
                        langData['modalIssueDescription'],
                        langData['modalScreenshots'],
                        `${langData['modalRelevantIDs']} (${langData['modalOrder']}, ${langData['modalUser']}, ${langData['modalProduct']})`
                    ].filter(Boolean).join(', ');
                    ticketText2Parent.innerHTML = `<strong>${langData['modalTicketText2'].split(':')[0]}:</strong> ${items}.`;
                }

                if (createTicketBtn) createTicketBtn.href = "#"; // Placeholder URL, replace with actual ticket submission URL.
            } else if (modalTargetId === 'forumModal') {
                const forumTitle = modal.querySelector('h2'); // Use modal.querySelector
                const forumText1 = modal.querySelector('[data-lang-key="modalForumText1"]'); // Use modal.querySelector
                const forumText2Parent = modal.querySelector('p:has(strong[data-lang-key="modalForumText2"])'); // Use modal.querySelector
                const visitForumBtn = modal.querySelector('[data-lang-key="modalVisitForum"]'); // Use modal.querySelector

                if (forumTitle) forumTitle.textContent = langData['modalForumTitle'];
                if (forumText1) forumText1.textContent = langData['modalForumText1'];
                
                // Populate the second paragraph with forum features.
                if (forumText2Parent) {
                    const features = [
                        langData['modalSearchOldPosts'],
                        langData['modalStartNewDiscussions'],
                        langData['modalGetPeerSupport']
                    ].filter(Boolean).join(', ');
                    forumText2Parent.innerHTML = `<strong>${langData['modalForumText2'].split(':')[0]}:</strong> ${features}.`;
                }

                if (visitForumBtn) visitForumBtn.href = "#"; // Placeholder URL, replace with actual forum URL.
            } else if (modalTargetId === 'tutorialsModal') {
                const tutorialsTitle = modal.querySelector('h2'); // Use modal.querySelector
                const tutorialsText1 = modal.querySelector('[data-lang-key="modalTutorialsText1"]'); // Use modal.querySelector
                const tutorialsText2Parent = modal.querySelector('p:has(strong[data-lang-key="modalTutorialsText2"])'); // Use modal.querySelector
                const watchTutorialsBtn = modal.querySelector('[data-lang-key="modalWatchTutorials"]'); // Use modal.querySelector

                if (tutorialsTitle) tutorialsTitle.textContent = langData['modalTutorialsTitle'];
                if (tutorialsText1) tutorialsText1.textContent = langData['modalTutorialsText1'];
                
                // Populate the second paragraph with available tutorial series.
                if (tutorialsText2Parent) {
                    const series = [
                        langData['modalDashboardWalkthrough'],
                        langData['modalProductManagement'],
                        langData['modalAnalyticsDeepDive']
                    ].filter(Boolean).join(', ');
                    tutorialsText2Parent.innerHTML = `<strong>${langData['modalTutorialsText2'].split(':')[0]}:</strong> ${series}.`;
                }

                if (watchTutorialsBtn) watchTutorialsBtn.href = "#"; // Placeholder URL, replace with actual video playlist URL.
            } else if (modalTargetId === 'contactModal') {
                const contactTitle = modal.querySelector('h2'); // Use modal.querySelector
                const contactText1 = modal.querySelector('[data-lang-key="modalContactText1"]'); // Use modal.querySelector
                const contactPhoneP = modal.querySelector('p:has(strong[data-lang-key="modalPhone"])'); // Use modal.querySelector
                const contactEmailP = modal.querySelector('p:has(strong[data-lang-key="modalEmail"])'); // Use modal.querySelector
                const sendEmailBtn = modal.querySelector('[data-lang-key="modalSendEmail"]'); // Use modal.querySelector

                if (contactTitle) contactTitle.textContent = langData['modalContactTitle'];
                if (contactText1) contactText1.textContent = langData['modalContactText1'];
                
                // Populate phone and email details, including localized day range.
                if (contactPhoneP) {
                    contactPhoneP.innerHTML = `<strong>${langData['modalPhone']}</strong> +123 456 7890 (<span data-lang-key="modalMonFri">${langData['modalMonFri']}</span>, 9 AM - 5 PM WIB)`;
                }
                if (contactEmailP) {
                     contactEmailP.innerHTML = `<strong>${langData['modalEmail']}</strong> support@dashpro.com`;
                }
                
                if (sendEmailBtn) sendEmailBtn.href = "mailto:support@dashpro.com";
            } else if (modalTargetId === 'systemStatusModal') {
                const statusTitle = modal.querySelector('h2'); // Use modal.querySelector
                const statusText1 = modal.querySelector('[data-lang-key="modalSystemStatusText1"]'); // Use modal.querySelector
                const currentStatusP = modal.querySelector('p:has(strong[data-lang-key="modalCurrentStatus"])'); // Use modal.querySelector
                const lastIncidentP = modal.querySelector('p:has(strong[data-lang-key="modalLastIncident"])'); // Use modal.querySelector
                const viewStatusPageBtn = modal.querySelector('[data-lang-key="modalViewStatusPage"]'); // Use modal.querySelector

                if (statusTitle) statusTitle.textContent = langData['modalSystemStatusTitle'];
                if (statusText1) statusText1.textContent = langData['modalSystemStatusText1'];
                
                // Populate system status and last incident details.
                if (currentStatusP) {
                    currentStatusP.innerHTML = `<strong>${langData['modalCurrentStatus']}</strong> ${langData['modalAllSystemsOperational']} <span style="color: var(--success);"><i class="fas fa-check-circle"></i></span>`;
                }
                if (lastIncidentP) {
                    lastIncidentP.innerHTML = `<strong>${langData['modalLastIncident']}</strong> ${langData['modalNone']} (<span data-lang-key="modalLastUpdated">${langData['modalLastUpdated']}</span>: 2025-06-08)`;
                }
                
                if (viewStatusPageBtn) viewStatusPageBtn.href = "#"; // Placeholder URL, replace with actual status page URL.
            }
        });
    });

    // FAQ Accordion Functionality.
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const parentItem = this.closest('.faq-item');
                if (parentItem) {
                    // Close other open FAQ items to ensure only one is open at a time.
                    document.querySelectorAll('.faq-item.active').forEach(item => {
                        if (item !== parentItem) {
                            item.classList.remove('active');
                        }
                    });
                    // Toggle active class on the clicked FAQ item.
                    parentItem.classList.toggle('active');
                }
            });
        });
    }
});