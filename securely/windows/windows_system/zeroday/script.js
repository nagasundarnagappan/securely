let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function () {
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
        sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else
        sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
}


const ctx = document.getElementById('myChart');
let labels = []
let tcpData = []
let udpData = []

const groupedBarChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [
            {
                label: 'TCP',
                data: tcpData,
                borderWidth: 1,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
            {
                label: 'UDP',
                data: udpData,
                borderWidth: 1,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },

        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    }
});

const ctx2 = document.getElementById('myChart2');

const groupedBarChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [
            {
                label: 'RED',
                data: [],
                borderWidth: 1,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: 'GREEN',
                data: [],
                borderWidth: 1,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: 'YELLOW',
                data: [],
                borderWidth: 1,
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
            },
            {
                label: 'BLUE',
                data: [],
                borderWidth: 1,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },

        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                type: 'logarithmic',
            }
        }
    }
});


const update_agents_and_grouped_bar_chart = (data) => {
    groupedBarChart.data.labels = data['NetworkCollection']['Labels']
    groupedBarChart.data.datasets[0].data = data['NetworkCollection']['TCP']
    groupedBarChart.data.datasets[1].data = data['NetworkCollection']['UDP']
    groupedBarChart.update()

    groupedBarChart2.data.labels = data['ColorsCollection']['Labels']
    groupedBarChart2.data.datasets[0].data = data['ColorsCollection']['RED']
    groupedBarChart2.data.datasets[1].data = data['ColorsCollection']['GREEN']
    groupedBarChart2.data.datasets[2].data = data['ColorsCollection']['YELLOW']
    groupedBarChart2.data.datasets[3].data = data['ColorsCollection']['BLUE']
    groupedBarChart2.update()



    document.getElementById('totalAgents').innerText = data['TestCollection']['Count']
    document.getElementById('liveAgents').innerText = data['TestCollection']['Count']
}
const update_agent_details = (testCollection) => {
    const osNames = document.getElementById('osNames')
    const osVersions = document.getElementById('osVersions')
    const hostNames = document.getElementById('hostNames')
    const currentTimes = document.getElementById('currentTimes')
    for (let i = 0; i < testCollection.OSNames.length; i++) {
        let temp = document.createElement('li')
        temp.innerHTML = `<li>${testCollection.OSNames[i]}</li><br><br>`
        osNames.appendChild(temp.firstChild)
    }
    for (let i = 0; i < testCollection.OSVersions.length; i++) {
        let temp = document.createElement('li')
        temp.innerHTML = `<li>${testCollection.OSVersions[i]}</li><br><br>`
        osVersions.appendChild(temp.firstChild)
    }
    for (let i = 0; i < testCollection.HostNames.length; i++) {
        let temp = document.createElement('li')
        temp.innerHTML = `<li>${testCollection.HostNames[i]}</li><br><br>`
        hostNames.appendChild(temp.firstChild)
    }
    for (let i = 0; i < testCollection.CurrentTimes.length; i++) {
        let temp = document.createElement('li')
        temp.innerHTML = `<li>${testCollection.CurrentTimes[i]}</li><br><br>`
        currentTimes.appendChild(temp.firstChild)
    }
}

const fetchData = () => {
    fetch('http://127.0.0.1:5000/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            update_agents_and_grouped_bar_chart(data)
            update_agent_details(data['TestCollection'])
            console.log(data)
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}
fetchData()