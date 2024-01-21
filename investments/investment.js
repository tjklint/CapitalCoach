// Function to calculate investment value over time and update chart
// Function to calculate investment value over time and update chart
function calculateInvestment() {
    // Getting user input
    var initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
    var monthlyInvestment = parseFloat(document.getElementById('monthlyInvestment').value);
    var years = parseInt(document.getElementById('years').value);
    var interestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    var inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100;

    // Calculate future value and inflation-adjusted value
    var futureValues = [];
    var inflationAdjustedValues = [];
    var futureValue = initialInvestment;
    var inflationAdjustedValue = initialInvestment;

    for (var i = 0; i < years * 12; i++) {
        futureValue += monthlyInvestment;
        futureValue *= (1 + interestRate / 12);
        futureValues.push(futureValue);

        inflationAdjustedValue += monthlyInvestment;
        inflationAdjustedValue *= (1 + interestRate / 12);

        // Apply annual inflation adjustment
        if ((i + 1) % 12 === 0) {
            inflationAdjustedValue /= (1 + inflationRate);
        }
        
        inflationAdjustedValues.push(inflationAdjustedValue);
    }

    // Displaying result
    document.getElementById('result').innerText = 'Future Value: ' + futureValue.toFixed(2);
    return { futureValues, inflationAdjustedValues };
}

// Setting up the chart
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // This will be populated by the updateChart function
        datasets: [{
            label: 'Investment Over Time',
            data: [], // This will be populated by the updateChart function
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
        },
        {
            label: 'Inflation-Adjusted Investment',
            data: [], // This will be populated by the updateChart function
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value, index, values) {
                        return '$' + value.toFixed(2);
                    }
                }
            }
        }
    }
});

// Function to update chart
function updateChart() {
    var years = parseInt(document.getElementById('years').value);
    var investmentData = calculateInvestment();
    
    // Generate labels for each year
    var labels = [];
    for (var i = 1; i <= years; i++) {
        labels.push('Year ' + i);
    }

    myChart.data.labels = labels;
    
    // Since we have labels for years, we want to only display the value at the end of each year
    var yearlyData = [];
    var inflationAdjustedYearlyData = [];
    for (var i = 11; i < investmentData.futureValues.length; i += 12) {
        yearlyData.push(investmentData.futureValues[i]);
        inflationAdjustedYearlyData.push(investmentData.inflationAdjustedValues[i]);
    }

    myChart.data.datasets[0].data = yearlyData;
    myChart.data.datasets[1].data = inflationAdjustedYearlyData;
    myChart.update();
}

// Initialize the inflation rate with the average yearly inflation rate in Canada
document.getElementById('inflationRate').value = '2';
