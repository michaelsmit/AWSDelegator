(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['AWSOperationsView'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div id=\"awsoperationscontainer\"> </div>";
},"useData":true});
templates['AWSView'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "";
},"useData":true});
templates['AppView'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"content-view\"> </div>\n";
},"useData":true});
templates['EC2BillingView'] = template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "			<tr class=\"tablesorter-body\">\n				<td>"
    + alias2(alias1((depth0 != null ? depth0.resourceId : depth0), depth0))
    + "</td>\n				<td>"
    + alias2(alias1((depth0 != null ? depth0.cost : depth0), depth0))
    + "</td>\n				<td>"
    + alias2(alias1((depth0 != null ? depth0.volumeId : depth0), depth0))
    + "</td>\n				<td>"
    + alias2(alias1((depth0 != null ? depth0.date : depth0), depth0))
    + "</td>					\n			</tr>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"billingcontainer\"></div>\n\n<!-- <div>\n	<table id=\"BillingTable\" class=\"tablesorter-metro\" cellspacing=\"1\">\n		<thead>\n			<tr class=\"dark-row\" role=\"row\">\n\n				<th class=\"tablesorter-header\" data-column=\"2\" unselectable=\"on\">\n					<div class=\"tablesorter-header-inner\">Resource ID</div>\n				</th>\n				<th class=\"tablesorter-header\" data-column=\"0\" unselectable=\"on\">\n					<div id=\"time\" class=\"tablesorter-header-inner\">Cost</div>\n				</th>\n				<th class=\"tablesorter-header\" data-column=\"1\" unselectable=\"on\">\n					<div class=\"tablesorter-header-inner\">VolumeId</div>\n				</th>\n						<th class=\"tablesorter-header\" data-column=\"3\" unselectable=\"on\">\n					<div class=\"tablesorter-header-inner\">Date</div>\n				</th>\n			</tr>\n			</tr>\n		</thead>\n		<tbody id=\"billingData\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.billing : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "		</tbody>	\n	</table>\n</div> -->\n\n\n\n\n\n";
},"useData":true});
templates['EC2CostView'] = template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "			<tr class=\"tablesorter-body\">\n				<td>"
    + alias2(alias1((depth0 != null ? depth0.productName : depth0), depth0))
    + "</td>\n				<td>"
    + alias2(alias1((depth0 != null ? depth0.cost : depth0), depth0))
    + "</td>				\n			</tr>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"ec2CostContainer\"></div>\n\n<!-- <div>\n	<table id=\"BillingTable\" class=\"tablesorter-metro\" cellspacing=\"1\">\n		<thead>\n			<tr class=\"dark-row\" role=\"row\">\n\n				<th class=\"tablesorter-header\" data-column=\"2\" unselectable=\"on\">\n					<div class=\"tablesorter-header-inner\">Resource ID</div>\n				</th>\n				<th class=\"tablesorter-header\" data-column=\"0\" unselectable=\"on\">\n					<div id=\"time\" class=\"tablesorter-header-inner\">Cost</div>\n				</th>\n			</tr>\n		</thead>\n		<tbody id=\"billingData\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.product : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "		</tbody>	\n	</table>\n</div> -->";
},"useData":true});
templates['EC2InstancesView'] = template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "		<tr>\n			<td >"
    + alias2(alias1((depth0 != null ? depth0.instance : depth0), depth0))
    + "</td>\n			<td>"
    + alias2(alias1((depth0 != null ? depth0.state : depth0), depth0))
    + "</td>\n			<td>"
    + alias2(alias1((depth0 != null ? depth0.keyName : depth0), depth0))
    + "</td>\n			<td>"
    + alias2(alias1((depth0 != null ? depth0.instanceType : depth0), depth0))
    + "</td>\n			<td>"
    + alias2(alias1((depth0 != null ? depth0.launchTime : depth0), depth0))
    + "</td> \n			<td>"
    + alias2(alias1((depth0 != null ? depth0.zone : depth0), depth0))
    + "</td>\n			<td>"
    + alias2(alias1((depth0 != null ? depth0.duration : depth0), depth0))
    + " min</td>\n			<td>"
    + alias2(alias1((depth0 != null ? depth0.email : depth0), depth0))
    + "</td>\n			<td>"
    + alias2(alias1((depth0 != null ? depth0.volumeid : depth0), depth0))
    + "</td>\n			<td>"
    + alias2(alias1((depth0 != null ? depth0.lastActiveTime : depth0), depth0))
    + "</td>\n		</tr>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<table id=\"InstanceTable\" class=\"hover\">\n	<thead>\n		<tr class=\"dark-row\">\n			<th>Instance ID</th>\n			<th>State</th>\n			<th>Key Name</th>\n			<th>Type</th>\n			<th>Launched</th>\n			<th>Zone</th>\n			<th>Lifetime</th>\n			<th>E-Mail</th>\n			<th>Volume ID</th>\n			<th>LastActiveTime</th>\n		</tr>\n	</thead>\n	<tbody id=\"instanceData\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.instances : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	</tbody>	\n</table>\n";
},"useData":true});
templates['EC2MetricsView'] = template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "			<tr class=\"tablesorter-body\">\n				<td>"
    + alias2(alias1((depth0 != null ? depth0.instance : depth0), depth0))
    + "</td>\n				<td>"
    + alias2(alias1((depth0 != null ? depth0.networkIn : depth0), depth0))
    + "</td>\n				<td>"
    + alias2(alias1((depth0 != null ? depth0.networkOut : depth0), depth0))
    + "</td>\n				<td>"
    + alias2(alias1((depth0 != null ? depth0.cpuUtilization : depth0), depth0))
    + "</td>\n				<td>"
    + alias2(alias1((depth0 != null ? depth0.time : depth0), depth0))
    + "</td>\n			</tr>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"networkContainer\"></div>\n<div id=\"cpuContainer\"></div>\n<div class=\"clear\"></div>\n\n<!-- <div id=\"Metrics\">\n	<table id=\"MetricsTable\" class=\"tablesorter-metro\" cellspacing=\"1\">\n		<thead>\n			<tr class=\"dark-row\">\n				<th class=\"tablesorter-header\" data-column=\"0\">\n					Instance ID\n				</th>\n				<th class=\"tablesorter-header\" data-column=\"1\">\n					Network In\n				</th>\n				<th class=\"tablesorter-header\" data-column=\"2\">\n					Network Out\n				</th>\n				<th class=\"tablesorter-header\" data-column=\"3\">\n					Cpu Utilization\n				</th>\n				<th class=\"tablesorter-header\" data-column=\"4\">\n					Time\n				</th>\n			</tr>\n		</thead>\n		<tbody id=\"metricsData\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.metrics : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "		</tbody>	\n	</table>\n</div>\n -->\n\n";
},"useData":true});
templates['EC2View'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "";
},"useData":true});
templates['FooterView'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "";
},"useData":true});
templates['HeaderView'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"setting\"> </div>\n\n<div class=\"menu\"><i class=\"fa fa-bars fa-1x\"></i> Menu</div>";
},"useData":true});
templates['MeterView'] = template({"1":function(depth0,helpers,partials,data) {
    return "		"
    + this.escapeExpression(this.lambda((depth0 != null ? depth0.value : depth0), depth0))
    + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div>usage rate \n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.rate : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n<div>usage \n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.usage : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});
templates['NavView'] = template({"1":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression, alias3=helpers.helperMissing;

  return "<div class=\"page\" page-id=\""
    + alias2(alias1((depth0 != null ? depth0.page_id : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</div>\n\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias3).call(depth0,(depth0 != null ? depth0.title : depth0),"==","Amazon Elastic Compute Cloud",{"name":"ifCond","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias3).call(depth0,(depth0 != null ? depth0.title : depth0),"==","Amazon RDS Service",{"name":"ifCond","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    return "<div class=\"subpage\" subpage-id=\"0\"> >> EC2 Instances</div>\n";
},"4":function(depth0,helpers,partials,data) {
    return "<div class=\"subpage\" subpage-id=\"1\"> >> RDS Instances</div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"slider\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.pages : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n</div>";
},"useData":true});
templates['NonFreeBillingView'] = template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "			<tr class=\"tablesorter-body\">\n				<td>"
    + alias2(alias1((depth0 != null ? depth0.resourceId : depth0), depth0))
    + "</td>\n				<td>"
    + alias2(alias1((depth0 != null ? depth0.cost : depth0), depth0))
    + "</td>\n				<td>"
    + alias2(alias1((depth0 != null ? depth0.volumeId : depth0), depth0))
    + "</td>\n				<td>"
    + alias2(alias1((depth0 != null ? depth0.date : depth0), depth0))
    + "</td>					\n			</tr>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"nonfreebillingcontainer\"></div>\n\n<!-- <div>\n	<table id=\"BillingTable\" class=\"tablesorter-metro\" cellspacing=\"1\">\n		<thead>\n			<tr class=\"dark-row\" role=\"row\">\n\n				<th class=\"tablesorter-header\" data-column=\"2\" unselectable=\"on\">\n					<div class=\"tablesorter-header-inner\">Resource ID</div>\n				</th>\n				<th class=\"tablesorter-header\" data-column=\"0\" unselectable=\"on\">\n					<div id=\"time\" class=\"tablesorter-header-inner\">Cost</div>\n				</th>\n				<th class=\"tablesorter-header\" data-column=\"1\" unselectable=\"on\">\n					<div class=\"tablesorter-header-inner\">VolumeId</div>\n				</th>\n						<th class=\"tablesorter-header\" data-column=\"3\" unselectable=\"on\">\n					<div class=\"tablesorter-header-inner\">Date</div>\n				</th>\n			</tr>\n			</tr>\n		</thead>\n		<tbody id=\"billingData\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.billing : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "		</tbody>	\n	</table>\n</div> -->\n\n\n\n";
},"useData":true});
templates['OperationsView'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div id=\"operationscontainer\"></div>\n";
},"useData":true});
templates['ProductCostView'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div id=\"productcostcontainer\"></div>\n";
},"useData":true});
templates['RDSBillingView'] = template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "			<tr class=\"tablesorter-body\">\n				<td>"
    + alias2(alias1((depth0 != null ? depth0.resourceId : depth0), depth0))
    + "</td>\n				<td>"
    + alias2(alias1((depth0 != null ? depth0.cost : depth0), depth0))
    + "</td>\n				<td>"
    + alias2(alias1((depth0 != null ? depth0.volumeId : depth0), depth0))
    + "</td>\n				<td>"
    + alias2(alias1((depth0 != null ? depth0.date : depth0), depth0))
    + "</td>					\n			</tr>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<!-- <div id=\"rdsbillingcontainer\"></div> -->\n\n<!-- <div>\n	<table id=\"BillingTable\" class=\"tablesorter-metro\" cellspacing=\"1\">\n		<thead>\n			<tr class=\"dark-row\" role=\"row\">\n\n				<th class=\"tablesorter-header\" data-column=\"2\" unselectable=\"on\">\n					<div class=\"tablesorter-header-inner\">Resource ID</div>\n				</th>\n				<th class=\"tablesorter-header\" data-column=\"0\" unselectable=\"on\">\n					<div id=\"time\" class=\"tablesorter-header-inner\">Cost</div>\n				</th>\n				<th class=\"tablesorter-header\" data-column=\"1\" unselectable=\"on\">\n					<div class=\"tablesorter-header-inner\">VolumeId</div>\n				</th>\n						<th class=\"tablesorter-header\" data-column=\"3\" unselectable=\"on\">\n					<div class=\"tablesorter-header-inner\">Date</div>\n				</th>\n			</tr>\n			</tr>\n		</thead>\n		<tbody id=\"billingData\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.billing : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "		</tbody>	\n	</table>\n</div> -->\n\n\n\n\n\n";
},"useData":true});
templates['RDSCostView'] = template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "			<tr class=\"tablesorter-body\">\n				<td>"
    + alias2(alias1((depth0 != null ? depth0.productName : depth0), depth0))
    + "</td>\n				<td>"
    + alias2(alias1((depth0 != null ? depth0.cost : depth0), depth0))
    + "</td>				\n			</tr>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div id=\"RDSCostContainer\"></div>\n\n<!-- <div>\n	<table id=\"rdsBillingTable\" class=\"tablesorter-metro\" cellspacing=\"1\">\n		<thead>\n			<tr class=\"dark-row\" role=\"row\">\n				<th class=\"tablesorter-header\" data-column=\"2\" unselectable=\"on\">\n					<div class=\"tablesorter-header-inner\">Resource ID</div>\n				</th>\n				<th class=\"tablesorter-header\" data-column=\"0\" unselectable=\"on\">\n					<div id=\"time\" class=\"tablesorter-header-inner\">Cost</div>\n				</th>\n			</tr>\n		</thead>\n		<tbody id=\"billingData\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.product : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "		</tbody>	\n	</table>\n</div> -->\n";
},"useData":true});
templates['RDSInstancesView'] = template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "		<tr>\n			<td >"
    + alias2(alias1((depth0 != null ? depth0.dbIdentifier : depth0), depth0))
    + "</td>\n			<td>"
    + alias2(alias1((depth0 != null ? depth0.dbClass : depth0), depth0))
    + "</td>\n			<td>"
    + alias2(alias1((depth0 != null ? depth0.dbEngine : depth0), depth0))
    + "</td>\n			<td>"
    + alias2(alias1((depth0 != null ? depth0.dbStatus : depth0), depth0))
    + "</td>\n			<td>"
    + alias2(alias1((depth0 != null ? depth0.masterUsername : depth0), depth0))
    + "</td> \n			<td>"
    + alias2(alias1((depth0 != null ? depth0.dbName : depth0), depth0))
    + "</td>\n			<td>"
    + alias2(alias1((depth0 != null ? depth0.allocatedStorage : depth0), depth0))
    + " GB</td>\n			<td>"
    + alias2(alias1((depth0 != null ? depth0.launchTime : depth0), depth0))
    + "</td>\n			<td>"
    + alias2(alias1((depth0 != null ? depth0.zone : depth0), depth0))
    + "</td>\n			<td>"
    + alias2(alias1((depth0 != null ? depth0.type : depth0), depth0))
    + "</td>\n		</tr>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<table id=\"RDSInstanceTable\" class=\"hover\">\n	<thead>\n		<tr class=\"dark-row\">\n			<th>Identifier</th>\n			<th>Class</th>\n			<th>Engine</th>\n			<th>Status</th>\n			<th>MasterUsername</th>\n			<th>DBName</th>\n			<th>AllocatedStorage</th>\n			<th>Launch Time</th>\n			<th>Zone</th>\n			<th>StorageType</th>\n		</tr>\n	</thead>\n	<tbody id=\"instanceData\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.instances : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	</tbody>	\n</table>\n";
},"useData":true});
templates['RDSMetricsView'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div id=\"rdsCpuContainer\"></div>\n<div id=\"readWriteIopsContainer\"></div>\n<div id=\"queueDepthContainer\"></div>\n<div class=\"clear\"></div>";
},"useData":true});
})();