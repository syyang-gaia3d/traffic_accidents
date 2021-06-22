const LABELS = {
    daily : ['사망', '중상', '경상'],
    monthly : ['사망', '중상', '경상'],
    accident : ['건널목', '차대차', '차대사람', '차량단독', '철길건널목'],
    casualty : ['사망', '중상', '경상']
};

function createChart(chartType, id, originData) {
    // data에 데이터 입력
    let data = makeData(id, originData);

    // 그래프 그리기
    const config = {
        type: chartType,
        data: data,
        options: {
            responsive: false,
            interaction: {
                intersect: false,
                mode:'point'
            },
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        footer: footer
                    }
                }
            },
        }
    };

    var chart = new Chart(
        'accidentChart',
        config
    );

    return chart;
}

function makeData(id, originData) {
    let data = {};

    if(id == 'daily') {
        let labels = [];
        let death = [];
        let swpsn = [];
        let injpsn = [];

        for(var i in originData) {
            labels.push(originData[i].occuDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
            death.push(originData[i].death);
            swpsn.push(originData[i].swpsn);
            injpsn.push(originData[i].injpsn);
        }

        let datasets = [
            {
                label: LABELS[id][0], // 사망
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: death
            },
            {
                label: LABELS[id][1], // 중상
                backgroundColor: 'rgb(0,128,128)',
                borderColor: 'rgb(0,128,128)',
                data: swpsn
            },
            {
                label: LABELS[id][2], //경상
                backgroundColor: 'rgb(255,255,0)',
                borderColor: 'rgb(255,255,0)',
                data: injpsn
            }
        ];

        data = {
            labels: labels,
            datasets: datasets
        };
    }

    if(id == 'monthly') {
        let labels = [];
        let death = [];
        let swpsn = [];
        let injpsn = [];

        for(var i in originData) {
            labels.push(originData[i].occuMt);
            death.push(originData[i].death);
            swpsn.push(originData[i].swpsn);
            injpsn.push(originData[i].injpsn);
        }

        let datasets = [
            {
                label: LABELS[id][0], // 사망
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: death
            },
            {
                label: LABELS[id][1], // 중상
                backgroundColor: 'rgb(0,128,128)',
                borderColor: 'rgb(0,128,128)',
                data: swpsn
            },
            {
                label: LABELS[id][2], //경상
                backgroundColor: 'rgb(255,255,0)',
                borderColor: 'rgb(255,255,0)',
                data: injpsn
            }
        ];

        data = {
            labels: labels,
            datasets: datasets
        };
    }

    if(id == 'accident') {
        let dataLabels = [];
        let dataArray = [];

        for(var i in originData) {
            dataLabels.push(originData[i].sclas);
            dataArray.push(originData[i].count);
        }

        data = {
            labels: dataLabels,
            datasets: [{
                label: id,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                data: dataArray
            }]
        };
    }

    if(id == 'casualty') {
        data = {
            labels: LABELS[id],
            datasets: [{
                label: id,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                data: [originData[0].death, originData[0].swpsn, originData[0].injpsn],
            }]
        };
    }

    return data;
}

const footer = (tooltipItems) => {
    let data = [];
    let total = 0;
    let raw = 0;

    tooltipItems.forEach(function(tooltipItem) {
        data = tooltipItem.dataset.data;

        data.forEach(function(element) {
            total += element;
        });

        raw = tooltipItem.raw;
    });

    return Math.floor((raw / total) * 100) + '%';
}