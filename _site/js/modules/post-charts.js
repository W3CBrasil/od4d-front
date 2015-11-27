define(['chartJS'], function (Chart) {

    var charts = {},
        chartsContainer = $('.line-chart-container');

    charts = {

        init: function () {

            charts.verifyChart();

        },

        verifyChart: function () {

            chartsContainer.each(function () {

                var _this = $(this),
                    canvasContainer = $(this).find('canvas:first');

                if (canvasContainer.data('chart') === 'single-line') {

                    charts.loadSingleLine(canvasContainer);

                } else if (canvasContainer.data('chart') === 'multi-line') {

                    charts.loadMultiLine(canvasContainer);

                }

            });

        },

        loadSingleLine: function (chart) {

            if (typeof singleLineChartData != 'undefined') {

                var lineChartData = {
                    labels: singleLineChartData.labels,
                    datasets: [{
                        label: "Posts",
                        fillColor: "rgba(19,132,138,0.5)",
                        strokeColor: "rgb(19,132,138)",
                        pointColor: "rgb(255,255,255)",
                        pointStrokeColor: "rgb(19,132,138)",
                        pointHighlightFill: "rgb(19,132,138)",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: singleLineChartData.data
                    }]
                };

                var chartCanvas = chart.get(0).getContext("2d"),
                myLine = new Chart(chartCanvas).Line(lineChartData, {
                    showScale: true,
                    pointDot : true,
                    responsive: true,
                    scaleShowLabels: false,
                    scaleShowGridLines: false,
                    pointDotRadius: 5,
                    pointDotStrokeWidth: 3,
                    pointHitDetectionRadius: 5
                });

            }

        },

        loadMultiLine: function (chart) {

            var chartCanvas = chart.get(0).getContext("2d"),
                lineChartData,
                myLine;

            lineChartData = {
                labels: multiLineChartData.labels,
                datasets: [{
                    label: "OD4D",
                    fillColor: "rgba(221,119,38,0.5)",
                    strokeColor: "rgb(221,119,38)",
                    pointColor: "rgb(255,255,255)",
                    pointStrokeColor: "rgb(221,119,38)",
                    pointHighlightFill: "rgb(221,119,38)",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: multiLineChartData.dataNetwork
                },
                {
                    label: "Posts",
                    fillColor: "rgba(19,132,138,0.5)",
                    strokeColor: "rgb(19,132,138)",
                    pointColor: "rgb(255,255,255)",
                    pointStrokeColor: "rgb(19,132,138)",
                    pointHighlightFill: "rgb(19,132,138)",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: multiLineChartData.dataPosts
                }]

            };

            myLine = new Chart(chartCanvas).Line(lineChartData, {
                showScale: true,
                pointDot : true,
                responsive: true,
                scaleShowLabels: false,
                scaleShowGridLines: false,
                pointDotRadius: 5,
                pointDotStrokeWidth: 3,
                pointHitDetectionRadius: 5,
                customTooltips : function(tooltip) {
                    var tooltipEl = $('.network-line-chart-tooltip:first'),
                        innerHtml = '';

                    if (!tooltip) {
                        tooltipEl.css({
                            opacity: 0
                        });
                        return;
                    }

                    tooltipEl.removeClass('above below');
                    tooltipEl.addClass(tooltip.yAlign);

                    innerHtml += '<strong class="network-line-chart-tooltip__title"> ' + tooltip.title + ' </strong>';

                    for (var i = tooltip.labels.length - 1; i >= 0; i--) {

                        innerHtml += [
                            '<div class="network-line-chart-tooltip__items">',
                            '   <span class="network-line-chart-tooltip__key" style="background-color:' + lineChartData.datasets[i].strokeColor + '"></span>',
                            '   <span class="network-line-chart-tooltip__value">' + tooltip.labels[i] + ' <span class="network-line-chart-tooltip__value-name">' + lineChartData.datasets[i].label + '</span> </span>',
                            '</div>'
                        ].join('');
                    }

                    tooltipEl.html(innerHtml);

                    tooltipEl.css({
                        opacity: 1,
                        left: tooltip.chart.canvas.offsetLeft + tooltip.x + 'px',
                        top: tooltip.chart.canvas.offsetTop + tooltip.y + 'px',
                        fontFamily: tooltip.fontFamily,
                        fontSize: tooltip.fontSize,
                        fontStyle: tooltip.fontStyle,
                    });

                }

            });

            }

    };

    if (chartsContainer.length) {

        charts.init();

    };

});