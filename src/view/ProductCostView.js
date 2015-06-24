var ProductCostView = Backbone.View.extend({
    className: 'ProductCostView',

    initialize: function(options) {
        
        if (!this.model) {
            this.model = new ProductCostModel();
        }

        this.bindings();
    },

    bindings: function() {
            var self = this;

        this.model.change('dataReady', function(model, val) {
            this.render();
            var month = this.model.getMonth(productCostCollection.at(0).get('month'));
            var year = productCostCollection.at(0).get('year')
            var fdata = [];

            for (var i = 0; i < productCostCollection.length; i++) {
                fdata.push([productCostCollection.at(i).get('productName'), productCostCollection.at(i).get('cost')]);
            }
            $(function() {
                var t = this;

                $('#productcostcontainer').highcharts({
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                    },
                    title: {
                        text: 'Amazon Web Service Cost Breakdown - Month: ' + month + ' ' + year
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>USD{point.y:.4f}</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'Cost',
                        data: fdata,
                        point: {
                            events: {
                                click: function(event) {
                                    var thisthis = this;
                                    if (this.name == "Amazon Elastic Compute Cloud") {

                                        // self.EC2Cost.model.getCost(function() {
                                        //     self.EC2Instances.model.getEC2Instances(function() {
                                        //     });

                                        // });
                                        
                                    } else if (this.name == "Amazon RDS Service") {
                                        // self.RDSCost.model.getRDSCost();
                                        // self.RDSInstances.model.getRDSInstances();
                                    }
                                }
                            }
                        }
                    }]
                });
            });
        }.bind(this));

    },

    destroy_view: function() {
        // console.log("remove el");
        // COMPLETELY UNBIND THE VIEW
        this.undelegateEvents();

        this.$el.removeData().unbind();

        // Remove view from DOM
        this.remove();
        Backbone.View.prototype.remove.call(this);
    },
    destroy: function() {
        this.remove();
        this.unbind();
        this.model.unbind("change", this.modelChanged);
    },

    render: function() {
        var html = Handlebars.templates.ProductCostView({
            product: productCostCollection.toJSON()
        });
        this.$el.html(html);

    }


});