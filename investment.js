function calculateInvestment() {
    // Getting user input
    var initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
    var monthlyInvestment = parseFloat(document.getElementById('monthlyInvestment').value);
    var years = parseInt(document.getElementById('years').value);
    var interestRate = parseFloat(document.getElementById('interestRate').value) / 100;

    // Calculate future value
    var futureValue = initialInvestment;
    for (var i = 0; i < years * 12; i++) {
        futureValue += monthlyInvestment;
        futureValue *= (1 + interestRate / 12);
    }

    // Displaying result
    document.getElementById('result').innerText = 'Future Value: ' + futureValue.toFixed(2);
}