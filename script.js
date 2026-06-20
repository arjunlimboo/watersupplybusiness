document.addEventListener('DOMContentLoaded', () => {
    initScheduler();
    initCartActions();
    initLocationChecker();
});

/**
 * 1. Delivery Scheduler Initializer
 * Automatically sets the default date choice to 'Today' and locks historical picks
 */
function initScheduler() {
    const dateInput = document.getElementById('deliveryDate');
    const scheduleBtn = document.getElementById('btnSchedule');
    
    if (dateInput) {
        const todayStr = new Date().toISOString().split('T')[0];
        dateInput.min = todayStr;
        dateInput.value = todayStr;
    }

    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', () => {
            const chosenDate = dateInput.value;
            const chosenSlot = document.getElementById('deliverySlot').value;
            
            if (!chosenDate) {
                showToast('Please select a valid configuration date.');
                return;
            }
            
            showToast(`Success! 1.5L batch scheduled for ${chosenDate} during the ${chosenSlot.split(' ')[0]} slot.`);
        });
    }
}

/**
 * 2. Simulated Cart Event Listeners
 */
function initCartActions() {
    // Standard Purchase Additions
    const buyButtons = document.querySelectorAll('.btn-buy');
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productName = e.target.getAttribute('data-item');
            showToast(`Added: "${productName}" to your orders successfully.`);
        });
    });

    // Custom Options Configuration
    const optionsButtons = document.querySelectorAll('.btn-options');
    optionsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productName = e.target.getAttribute('data-item');
            showToast(`Opening parameters for: ${productName}`);
        });
    });
}

/**
 * 3. Regional Truck Route Verification Simulation
 */
function initLocationChecker() {
    const checkBtn = document.getElementById('btnCheckArea');
    const inputField = document.getElementById('locationInput');
    const outputBox = document.getElementById('availabilityOutput');

    if (checkBtn && inputField && outputBox) {
        checkBtn.addEventListener('click', () => {
            const locationQuery = inputField.value.trim();

            if (!locationQuery) {
                outputBox.style.display = 'block';
                outputBox.style.color = '#ef4444'; // Red error alert color
                outputBox.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please specify a valid region or zip code.';
                return;
            }

            // Simulated confirmation response setup
            outputBox.style.display = 'block';
            outputBox.style.color = '#166534'; // Green success alert color
            outputBox.innerHTML = `<i class="fas fa-check-circle"></i> Confirmed! Our regular 1.5L distribution truck routes serve <strong>"${locationQuery}"</strong>. Free shipping handles apply.`;
        });
    }
}

/**
 * 4. Toast UI Alert Engine
 * Triggers a temporary modal popup to feed actions back to the business owner/user
 */
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.innerText = message;
    toast.classList.add('active');

    // Automatically dismiss alert after 3.5 seconds pass cleanly
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3500);
}
