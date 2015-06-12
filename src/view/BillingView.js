var BillingView = Backbone.View.extend({
    className: 'BillingView',

    initialize: function(options) {
        
        if (!this.model) {
            this.model = new BillingsModel();
        }

        this.render();
        this.bindings();
    },


    bindings: function() {
        this.model.change('dataReady', function(model, val) {
            this.render();
            var date = new Date(totalCostInstancesCollection.at(0).get('date'));
            // console.log("totalCostInstancesCollection.length -->",totalCostInstancesCollection.length);
            // $(function() {
            //     $('#container').highcharts({
            //         chart: {
            //             zoomType: 'x'
            //         },
            //         title: {
            //             text: 'EC2 Instance Cost'
            //         },
            //         subtitle: {
            //             text: document.ontouchstart === undefined ?
            //                 'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            //         },
            //         xAxis: {
            //             type: 'datetime',
            //             minRange: 14 * 24 * 3600000 // fourteen days
            //         },
            //         yAxis: {
            //             title: {
            //                 text: 'Cost (USD)'
            //             },
            //             min: 0 // this sets minimum values of y to 0
            //         },
            //         legend: {
            //             enabled: false
            //         },
            //         plotOptions: {
            //             area: {
            //                 fillColor: {
            //                     linearGradient: {
            //                         x1: 0,
            //                         y1: 0,
            //                         x2: 0,
            //                         y2: 1
            //                     },
            //                     stops: [
            //                         [0, Highcharts.getOptions().colors[0]],
            //                         [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            //                     ]
            //                 },
            //                 marker: {
            //                     radius: 2
            //                 },
            //                 lineWidth: 1,
            //                 states: {
            //                     hover: {
            //                         lineWidth: 1
            //                     }
            //                 },
            //                 threshold: null
            //             }
            //         },
            //         series: [{
            //             type: 'area',
            //             name: 'Cost',
            //             pointInterval: 3600 * 1000,
            //             pointStart: Date.UTC(date.getYear(), date.getMonth(), date.getDate()),
            //             data: totalCostInstancesCollection.pluck('cost')

            //         }]
            //     });
            // });

            $(function () {
                $('#container').highcharts({
                    chart: {
                        type: 'spline',
                        zoomType: 'x'
                    },
                    title: {
                        text: totalCostInstancesCollection.at(0).get('resourceId')+' hourly cost'
                    },
                    xAxis: {
                        type: 'datetime',
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'USD'
                        },
                        min: 0,
                        minorGridLineWidth: 0,
                        gridLineWidth: 0,
                        alternateGridColor: null,
                        plotBands: [{ // Light air
                            from: 0.3,
                            to: 1.5,
                            color: 'rgba(68, 170, 213, 0.1)',
                            label: {
                                text: 'Light air',
                                style: {
                                    color: '#606060'
                                }
                            }
                        }, { // Light breeze
                            from: 1.5,
                            to: 3.3,
                            color: 'rgba(0, 0, 0, 0)',
                            label: {
                                text: 'Light breeze',
                                style: {
                                    color: '#606060'
                                }
                            }
                        }, { // Gentle breeze
                            from: 3.3,
                            to: 5.5,
                            color: 'rgba(68, 170, 213, 0.1)',
                            label: {
                                text: 'Gentle breeze',
                                style: {
                                    color: '#606060'
                                }
                            }
                        }, { // Moderate breeze
                            from: 5.5,
                            to: 8,
                            color: 'rgba(0, 0, 0, 0)',
                            label: {
                                text: 'Moderate breeze',
                                style: {
                                    color: '#606060'
                                }
                            }
                        }, { // Fresh breeze
                            from: 8,
                            to: 11,
                            color: 'rgba(68, 170, 213, 0.1)',
                            label: {
                                text: 'Fresh breeze',
                                style: {
                                    color: '#606060'
                                }
                            }
                        }, { // Strong breeze
                            from: 11,
                            to: 14,
                            color: 'rgba(0, 0, 0, 0)',
                            label: {
                                text: 'Strong breeze',
                                style: {
                                    color: '#606060'
                                }
                            }
                        }, { // High wind
                            from: 14,
                            to: 15,
                            color: 'rgba(68, 170, 213, 0.1)',
                            label: {
                                text: 'High wind',
                                style: {
                                    color: '#606060'
                                }
                            }
                        }]
                    },
                    tooltip: {
                        valueSuffix: ' m/s'
                    },
                    plotOptions: {
                        spline: {
                            lineWidth: 4,
                            states: {
                                hover: {
                                    lineWidth: 5
                                }
                            },
                            marker: {
                                enabled: false
                            },
                            pointInterval: 3600000, // one hour
                            pointStart: Date.UTC(date.getYear(), date.getMonth(), date.getDate())
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    series: [{
                        type: 'area',
                        name: 'Cost',
                        pointInterval: 3600 * 1000,
                        pointStart: Date.UTC(date.getYear(), date.getMonth(), date.getDate()),
                        data: totalCostInstancesCollection.pluck('cost')

                    }],
                    navigation: {
                        menuItemStyle: {
                            fontSize: '10px'
                        }
                    }
                });
            });
        }.bind(this));
    },

    render: function() {
        var html = Handlebars.templates.BillingView({
            billing: totalCostInstancesCollection.toJSON(),
        });
        this.$el.html(html);


    }


});