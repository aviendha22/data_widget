var datas = [];
var temp = [];
var t = d3.select("#raw_data");

var Sentence = Backbone.Model.extend({
	//something needs to go here....
});

var Table = Backbone.Collection.extend({
	model: Sentence
});

var SentenceView = Backbone.View.extend({
	tagName: 'tr',
	className: 'data',
	initialize: function(){
		this.render();
	},
	render: function(){
		var keys = Object.keys(this.model.attributes);
		var vals =[];
		for (var i = 0; i < keys.length; i++)
			vals[i] = this.model.attributes[keys[i]];
		
		d3.select(this.el)
			.on("mouseover", function(){
				d3.select(this).style("background", "steelblue");
			})
			.on("mouseout", function(){
				d3.select(this).style("background", "white");
			})
			.selectAll('td')
			.data(vals)
			.enter()
			.append('td')
				.text(function(d){ 
					if (typeof(d) === 'object') { return d.toString().substring(0,24); }
					return d;
				});
		
		return this;
	}
});

var TableView = Backbone.View.extend({
	el:$('#raw_data'),
	initialize: function(){
		this.collection = new Table(temp);
		this.render();
	},
	render: function(){	
		d3.selectAll("tr").remove();
		var that = this;
		_.each(this.collection.models, function (item){
			that.renderSentence(item);
		}, this);
	},
	renderSentence: function(item){
		var sentView = new SentenceView({
			model: item
		});
		
		this.$el.append(sentView.render().el);
	},
	getTimes: function(){
		return this.collection.pluck('time');						//JSON
		//return this.collection.pluck("0");						//CSV
	}
});

var table;

d3.json('./raw_data.txt', function(text){							//JSON
//d3.text('./data.txt', function(text){								//CSV
	
	datas = text;													//JSON
	//datas = d3.csv.parseRows(text);									//CSV
	var rows = datas.length;

	var t = d3.select("#raw_data");
	
	createHeaders(Object.keys(datas[0]));							//JSON
	//createHeaders(datas[0]);										//CSV
	
	//datas.shift();													//commented out for JSON
	
	temp = extractData(1338508800000, 1370044800000);					//JSON
	//temp = datas.slice(0,rows);										//CSV
	
	for (var i = 0; i < temp.length; i++){
		temp[i]['time'] = new Date(Date.parse(temp[i]['time']));	//JSON
		//temp[i][0] = new Date(Date.parse(temp[i][0]));				//CSV
	}
	
	var table = new TableView(temp);
	
	d3.selectAll("th")
		.on("click", function(){
			var col = parseInt(this.id);							//CSV
			col = Object.keys(temp[0])[col];						//JSON
			if (this.className == "up"){
				d3.selectAll("th").attr("class","unsorted");
				this.className = "down";
				temp.sort( function (a, b){ return a[col] < b[col]; });
			} else {
				d3.selectAll("th").attr("class","unsorted");
				this.className = "up";
				temp.sort( function (a, b){ return a[col] > b[col]; });
			}
			table = new TableView(temp);
		});
		
	var apple = table.getTimes();
	for (i = 0; i< apple.length; i++){
		apple[i] = Date.parse(apple[i]);
	}
	
	//alert(apple);							//array of integers that represent seconds since epoch
});

function extractData(start, end){
	var currData = [];
	for (var i = 0; i < datas.length; i++){
		var t = Date.parse(datas[i]['time']);						//JSON
		//var t = Date.parse(datas[i][0]);							//CSV
		
		if (t <= end && t >= start) { currData.push(datas[i]); }
	}
	return currData;
}	
	
	
function createHeaders(arr){
	var header = d3.select("#raw_data");
	for (var i = 0; i < arr.length; i++){
		header.append("th")
			.text(arr[i])
			.attr("id", i)
			.attr("class", "unsorted");
	}
}