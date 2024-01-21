let salary = 0;
let needs = 0;
let wants = 0;
let savings = 0;
let selectedRule = '';

// HTML Elements:
let salaryInput = document.getElementById('salary_input');
let needsInput = document.getElementById('needs_input');
let wantsInput = document.getElementById('wants_input');
let savingsInput = document.getElementById('savings_input');
let ruleSelect = document.getElementById('budget_rule_select');
const progressBar = document.getElementById('progress-bar');
const progressBarContainer = document.getElementById('progress-bar-container');

let initialBox = document.getElementById('initialBox');
let promptDiv = document.getElementById('prompt');
let prompt1 = document.getElementById('prompts1');

//Upon running...
initialBox.style.display = ''
promptDiv.style.display = 'none';
prompts1.style.display = 'none';
progressBarContainer.style.display = 'none';


let currentPromptIndex = 0;
const totalPrompts = 5;

function updateProgressBar() {
    const progressPercentage = (currentPromptIndex / totalPrompts) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

function submitForm() {
    // Get user input
    salary = parseFloat(salaryInput.value) || 0;
    needs = parseFloat(needsInput.value) || 0;
    wants = parseFloat(wantsInput.value) || 0;
    savings = parseFloat(savingsInput.value) || 0;

    // Retrieve the selected budgeting rule from the dropdown
    selectedRule = ruleSelect.value;

    // Display the results in a new prompt
    displayResults();

    // Increment the current prompt index and update the progress bar
    currentPromptIndex++;
    updateProgressBar();
}

function displayResults() {
    // Calculate the recommended spending based on the selected budgeting rule
    const ruleConfig = {
        '50/30/20': { needs: 0.5, wants: 0.3, savings: 0.2 },
        '40/30/30': { needs: 0.4, wants: 0.3, savings: 0.3 },
        '60/20/20': { needs: 0.6, wants: 0.2, savings: 0.2 },
        '70/20/10': { needs: 0.7, wants: 0.2, savings: 0.1 },
    };

    const recommendedNeeds = ruleConfig[selectedRule].needs * salary;
    const recommendedWants = ruleConfig[selectedRule].wants * salary;
    const recommendedSavings = ruleConfig[selectedRule].savings * salary;

    const needsDifference = needs - recommendedNeeds;
    const wantsDifference = wants - recommendedWants;
    const savingsDifference = savings - recommendedSavings;

    let prompt = document.getElementById('prompts5');

    prompt.innerHTML = '';

    // Reference to the result prompt
    const resultPrompt = document.getElementById('resultPrompt');

    // Helper function to determine the color based on the difference
    function getColorClass(difference) {
        const percentageDifference = (Math.abs(difference) / recommendedNeeds) * 100;

        if (percentageDifference <= 10) {
            return 'green';
        } else if (percentageDifference <= 30) {
            return 'orange';
        } else {
            return 'red';
        }
    }

    // Add content to the div
    prompt.innerHTML = `
        <h1><strong>Budgeting Results:</strong></h1>
        <p><strong>Salary:</strong> $${salary.toFixed(2)}</p>
        <hr>
        <label><strong>Actual Spending:</strong></label>
        <p>Needs: $${needs.toFixed(2)}</p>
        <p>Wants: $${wants.toFixed(2)}</p>
        <p>Savings: $${savings.toFixed(2)}</p>

        <hr>
        <label><strong>Recommended Spending <br> (${selectedRule} Rule):</strong></label>
        <p>Needs: $${recommendedNeeds.toFixed(2)}</p>
        <p>Wants: $${recommendedWants.toFixed(2)}</p>
        <p>Savings: $${recommendedSavings.toFixed(2)}</p>

        <hr>
        <label><strong>Difference:</strong></label>
        <div style='display:flex;flex-direction:row;'> 
        <p style='color:green;' >⬤</p><p> = Good |</p>
        <p style='color:orange;'> ⬤</p><p> = Okay |</p>
        <p style='color:red;'> ⬤</p><p> = Bad</p>
        </div>
        <p>Needs: <span class="${getColorClass(needsDifference)}">${needsDifference >= 0 ? '+' : ''}${needsDifference.toFixed(2)}</span></p>
        <p>Wants: <span class="${getColorClass(wantsDifference)}">${wantsDifference >= 0 ? '+' : ''}${wantsDifference.toFixed(2)}</span></p>
        <p>Savings: <span class="${getColorClass(savingsDifference)}">${savingsDifference >= 0 ? '+' : ''}${savingsDifference.toFixed(2)}</span></p>
    `;

    prompt.style.height = 'fit-content';
    prompt.style.margin = '40px 0px 40px 0px'
}

function fadeIn(element) {
    element.style.display = 'flex'; // Ensure the element is displayed
    element.style.opacity = 1;
}

function fadeOut(element) {
    element.style.opacity = 0;

    // Set a timeout to hide the element after the transition is complete
    setTimeout(() => {
        element.style.display = 'none';
    }, 500); // 500ms matches the transition duration
}

function nextPrompt(current, next) {
    let currentPromptElement = document.getElementById(current);
    let nextPromptElement = document.getElementById(next);

    let currentInputElement = currentPromptElement.querySelector('input');
    let inputValue = currentInputElement.value.trim();

    let errorMessageElement = currentPromptElement.querySelector('.error-message');

    // Check if the input is empty
    if (inputValue === '') {
        errorMessageElement.textContent = 'ERROR: Please fill in the input field before proceeding.';
        errorMessageElement.style.color = 'red';
        return;
    }

    // Reset error message when transitioning to the next prompt
    errorMessageElement.textContent = '';

    // Fade out the current prompt
    fadeOut(currentPromptElement);

    setTimeout(() => {
        // Hide the current prompt
        currentPromptElement.style.display = 'none';

        // Display the next prompt
        fadeIn(nextPromptElement);
        nextPromptElement.style.display = 'flex';

        // Increment the current prompt index and update the progress bar
        currentPromptIndex++;
        updateProgressBar();
    }, 500); // 500ms delay to match the transition duration
}


function startBudgetPlan() {
    promptDiv.style.display = 'flex';
    prompts1.style.display = 'flex';
    progressBarContainer.style.display = 'block';
    initialBox.style.display = 'none'



}