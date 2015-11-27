define(['chartJS'], function () {

	var donutChart = {},
        donutChartContainer = $('.donut-chart');

    donutChart = {

    	init: function () {

			donutChart.verifyChart();

    	},

    	verifyChart: function () {

    		donutChartContainer.each(function () {

				var _this = $(this),
                    donutCanvasContainer = $(this).find('canvas:first');

                donutChart.loadDonutChart(donutCanvasContainer);

    		});

    	},

    	loadDonutChart: function (donutCanvasContainer) {

    		var canvasContainer = donutCanvasContainer.get(0).getContext("2d"),
    			donut;

    		if (typeof donutChartData != 'undefined') {

			  	var doughnutData = [
					{
						value: donutChartData[0].value,
						color: "rgb(253,193,120)",
						highlight: "rgb(253,193,120)",
						label: donutChartData[0].label
					},
					{
						value: donutChartData[1].value,
						color: "rgb(240,99,71)",
						highlight: "rgb(240,99,71)",
						label: donutChartData[1].label
					},
					{
						value: donutChartData[2].value,
						color: "rgb(144,11,58)",
						highlight: "rgb(144,11,58)",
						label: donutChartData[2].label
					},
					{
						value: donutChartData[3].value,
						color: "rgb(68,88,115)",
						highlight: "rgb(68,88,115)",
						label: donutChartData[3].label
					},
					{
						value: donutChartData[4].value,
						color: "rgb(68,68,68)",
						highlight: "rgb(68,68,68)",
						label: donutChartData[4].label
					}
				];

				donut = new Chart(canvasContainer).Doughnut(doughnutData, {responsive : true, segmentShowStroke : false});

    		}

    	}

    };

    if (donutChartContainer.length) {

        donutChart.init();

    };

});