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
            labels: [],
            datasets: [{
                label: 'Investment Over Time',
                data: [],
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Function to update chart
    function updateChart() {
        var investmentData = calculateInvestment();
        myChart.data.labels = Array.from({length: investmentData.length}, (_, i) => i + 1);
        myChart.data.datasets[0].data = investmentData;
        myChart.update();
    }