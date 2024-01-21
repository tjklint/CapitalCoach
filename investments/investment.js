    // Function to calculate investment value over time and update chart
    function calculateInvestment() {
        // Getting user input
        var initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
        var monthlyInvestment = parseFloat(document.getElementById('monthlyInvestment').value);
        var years = parseInt(document.getElementById('years').value);
        var interestRate = parseFloat(document.getElementById('interestRate').value) / 100;

        // Calculate future value
        var futureValues = [];
        var futureValue = initialInvestment;
        for (var i = 0; i < years * 12; i++) {
            futureValue += monthlyInvestment;
            futureValue *= (1 + interestRate / 12);
            futureValues.push(futureValue);
        }

        // Displaying result
        document.getElementById('result').innerText = 'Future Value: ' + futureValue.toFixed(2);
        return futureValues;
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
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        // Include a dollar sign in the ticks and format to two decimal places
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
        var initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
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
        for (var i = 11; i < investmentData.length; i += 12) {
            yearlyData.push(investmentData[i]);
        }
    
        myChart.data.datasets[0].data = yearlyData;
        myChart.update();
    }