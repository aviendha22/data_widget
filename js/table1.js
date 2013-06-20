<!DOCTYPE html>
<meta charset="utf-8">
<style>
#raw_data {
	border-color:#00f;
	border-width:3px;
	border-collapse:collapse;
}
td {
	padding:0px 15px 0px 5px;
}
th {
	cursor: pointer;
	padding:10px;
	text-align:left;
}
table {
	font-size:15px;
}
</style>
<body>
<table border="1" id='raw_data' ></table>
<script src="lib/d3.v3/d3.v3.js"></script>
<script>
	//plain d3 and javascript version

	var t = d3.select("#raw_data");
	
	function createHeaders(arr){
		var header = d3.select("#raw_data");
		header.append("tr");
		for (var i = 0; i < arr.length; i++){
			header.append("th")
				.text(arr[i])
				.attr("id", i)
				.attr("class", "unsorted");
		}
	}
	
	function createTable(temp){
		alert(temp);
		d3.selectAll("tr").remove();
		t.selectAll("tr.data")
			.data(temp)
			.enter().append("tr")
				.attr("class", "data")
				.on("mouseover", function(){
					d3.select(this).style("background", "steelblue");
				})
				.on("mouseout", function(){
					d3.select(this).style("background", "white");
				})
			.selectAll("td")
			.data(function(d){ return d;} )
			.enter().append("td")
				.text(function(d){
					if (typeof(d) === "object")
						return d.toString().substring(0,24);		//cheating to make date shorter
						
					return d;
				});
	}
	
	//parse the csv file			
	d3.text('./data/csv_raw_data.txt', function(text){
	
		datum = d3.csv.parseRows(text);
		var rows = 20;
	
		var t = d3.select("#raw_data");
		
		createHeaders(datum[0]);
		datum.shift();
		
		var times = [];											//what will be sent to timeline?
		for (var i = 0; i < datum.length; i++){
			times[i] = datum[i][0];
			datum[i][0] = new Date(Date.parse(datum[i][0]));
		}
		
		var temp = datum.slice(0,rows);
		createTable(temp);
		
		d3.selectAll("th")
			.on("click", function(){
				var col = parseInt(this.id);
				
				if (this.className == "up"){
					d3.selectAll("th").attr("class","unsorted");
					this.className = "down";
					temp.sort( function (a, b){ return a[col] < b[col]; });
				} else {
					d3.selectAll("th").attr("class","unsorted");
					this.className = "up";
					temp.sort( function (a, b){ return a[col] > b[col]; });
				}
				
				createTable(temp);
			});
	});
	
	//Wed Dec 25 2013 03:20:25 GMT-0500 (EST)   datum[i][0] = new Date(Date.parse(datum[i][0]));	pretty
	//1387959625000								datum[i][0] = Date.parse(datum[i][0]);          	seconds since UNIX epoch
	//2013-12-25T00:20:25-08:00   				datum[i][0]											ISO-8601
	
	//still need to get accurate raw data and then fix table
	//date is way long, maybe needs to be formatted, but I want to wait until I have an example of actual data.
	//auto update functionality
	
</script>
</body>
</html>


