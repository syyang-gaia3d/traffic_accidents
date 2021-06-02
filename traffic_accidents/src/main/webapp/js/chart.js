const LABELS = {
    injuries : ['경상', '중상', '사망', '부상신고'],
    casualties : ['사망', '중상', '경상'],
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
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            }
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

    if(id == 'injuries') {
        data = {
            labels: LABELS[id],
            datasets: [{
                label: id,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: originData,
            }]
        };
    }

    if(id == 'casualties') {
        data = {
            labels: LABELS[id],
            datasets: [{
                label: id,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: originData,
            }]
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