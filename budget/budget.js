"use strict";

// Basic variables:
let salary = 0; // Default
let dependents = 0; // Default
let needs;
let wants;
let savings;
let housingCost;
let utilitiesCost;
let transportationCost;
let hobbyExpenses;
let currentPrompt = 1;


// HTML Elements:
let salaryInput = document.getElementById('salary_input');
let dependentsInput = document.getElementById('dependents_input');
let housingInput = document.getElementById('housing_input');
let utilitiesInput = document.getElementById('utilities_input');
let transportationInput = document.getElementById('transportation_input');
let hobbyExpensesInput = document.getElementById('hobby_expenses_input');


function submitForm() {
    // Get user input
    salary = parseFloat(salaryInput.value);
    dependents = parseInt(dependentsInput.value) || 0;
    housingCost = parseFloat(housingInput.value) || 0;
    utilitiesCost = parseFloat(utilitiesInput.value) || 0;
    transportationCost = parseFloat(transportationInput.value) || 0;
    hobbyExpenses = parseFloat(hobbyExpensesInput.value) || 0;

    // Calculate a score or rating based on user inputs
    let userScore = calculateUserScore(housingCost, hobbyExpenses);

    // Automatically choose a budgeting rule based on the user's score
    let selectedRule = chooseBudgetingRule(userScore);

    // Calculate the percentages based on the selected rule
    needs = calculatePercentage(selectedRule, 'needs');
    wants = calculatePercentage(selectedRule, 'wants');
    savings = calculatePercentage(selectedRule, 'savings');

    // Display the results
    displayResults();
}

function calculateUserScore(housingCost, hobbyExpenses) {
    // You can customize the scoring algorithm based on your criteria
    return (housingCost * 0.2) + (hobbyExpenses * 0.1);
}

function chooseBudgetingRule(userScore) {
    // Define budgeting rules and their associated scores
    const ruleScores = {
        '50/30/20': 0.5,
        '40/30/30': 0.6,
        '60/20/20': 0.4,
        '70/20/10': 0.3,
    };

    // Find the rule with the closest score to the user's score
    let closestRule = Object.keys(ruleScores).reduce((a, b) => Math.abs(ruleScores[a] - userScore) < Math.abs(ruleScores[b] - userScore) ? a : b);

    return closestRule;
}

function calculatePercentage(rule, category) {
    // Define percentage allocations based on the selected rule
    const ruleConfig = {
        '50/30/20': { needs: 50, wants: 30, savings: 20 },
        '40/30/30': { needs: 40, wants: 30, savings: 30 },
        '60/20/20': { needs: 60, wants: 20, savings: 20 },
        '70/20/10': { needs: 70, wants: 20, savings: 10 },
    };

    // Calculate the percentage based on the user's input
    return (ruleConfig[rule][category] / 100) * salary +
        (category === 'needs' ? (dependents * 100) + housingCost + utilitiesCost + transportationCost : 0);
}

function displayResults() {
    alert(`
        Budgeting Results:
        Needs: $${needs.toFixed(2)}
        Wants: $${wants.toFixed(2)}
        Savings: $${savings.toFixed(2)}
    `);
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

    fadeOut(currentPromptElement);
    setTimeout(() => {
        currentPromptElement.style.display = "none";
        nextPromptElement.style.display = "block";
        fadeIn(nextPromptElement);
    }, 500); // 500ms delay to match the transition duration
    currentPrompt++;
}