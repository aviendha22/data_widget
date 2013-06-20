var datas = [];
var temp = [];
var t = d3.select("#raw_data");

var Sentence = Backbone.Model.extend({
	
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
		return this.collection.pluck("0");
	}
});

var table;

d3.text('./data.txt', function(text){
	
	datas = d3.csv.parseRows(text);
	var rows = datas.length;

	var t = d3.select("#raw_data");
	
	createHeaders(datas[0]);
	datas.shift();
	temp = datas.slice(0,rows);
	
	for (var i = 0; i < datas.length; i++)
		temp[i][0] = new Date(Date.parse(temp[i][0]));
		
	
	var table = new TableView(temp);
	
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
			table = new TableView(temp);
		});
		
	var apple = table.getTimes();
	for (i = 0; i< apple.length; i++){
		apple[i] = Date.parse(apple[i]);
		//alert(apple[i]);							//array of integers that represent seconds since epoch
	}
	
});
	
function createHeaders(arr){
	var header = d3.select("#raw_data");
	for (var i = 0; i < arr.length; i++){
		header.append("th")
			.text(arr[i])
			.attr("id", i)
			.attr("class", "unsorted");
	}
}