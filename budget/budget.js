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

    let prompt = document.getElementById('prompt5');

    prompt.innerHTML = '';



    // Reference to the result prompt
    const resultPrompt = document.getElementById('resultPrompt');

    // Create a div to hold the content
    const contentDiv = document.createElement('div');
    contentDiv.style.marginTop = '20px';

    // Add content to the div
    prompt.innerHTML = `
        <p><strong>Budgeting Results:</strong></p>
        <p><strong>Salary:</strong> $${salary.toFixed(2)}</p>
        <hr>
        <p><strong>Actual Spending:</strong></p>
        <p>Needs: $${needs.toFixed(2)}</p>
        <p>Wants: $${wants.toFixed(2)}</p>
        <p>Savings: $${savings.toFixed(2)}</p>

        <hr>
        <p><strong>Recommended Spending (${selectedRule} Rule):</strong></p>
        <p>Needs: $${recommendedNeeds.toFixed(2)}</p>
        <p>Wants: $${recommendedWants.toFixed(2)}</p>
        <p>Savings: $${recommendedSavings.toFixed(2)}</p>

        <hr>
        <p><strong>Difference:</strong></p>
        <p>Needs: $${needsDifference.toFixed(2)}</p>
        <p>Wants: $${wantsDifference.toFixed(2)}</p>
        <p>Savings: $${savingsDifference.toFixed(2)}</p>
    `;

    prompt.style.height = 'fit-content';
    prompt.style. margin = '40px 0px 40px 0px'
    // // Append the new content div to the result prompt
    // resultPrompt.appendChild(contentDiv);

    // // Show the result prompt
    // fadeIn(resultPrompt);
}

function fadeOut(element) {
    element.style.opacity = 0;
}

function fadeIn(element) {
    element.style.opacity = 1;
}

function nextPrompt(current, next) {
    let currentPromptElement = document.getElementById(current);
    let nextPromptElement = document.getElementById(next);

    let currentInputElement = currentPromptElement.querySelector('input');
    let inputValue = currentInputElement.value.trim();

    let errorMessageElement = currentPromptElement.querySelector('.error-message');

    // Check if the input is empty
    if (inputValue === '') {
        errorMessageElement.textContent = 'Please fill in the input field before proceeding.';
        errorMessageElement.style.color = 'red';
        return;
    }

    // Reset error message when transitioning to the next prompt
    errorMessageElement.textContent = '';

    fadeOut(currentPromptElement);
    setTimeout(() => {
        currentPromptElement.style.display = "none";
        nextPromptElement.style.display = "flex";
        fadeIn(nextPromptElement);
    }, 500); // 500ms delay to match the transition duration
}