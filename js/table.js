var MIN = 0;
var MAX = Number.MAX_VALUE;
var table;
var datas = [];
var temp = [];
var t = d3.select("#raw_data");

var Sentence = Backbone.Model.extend({
	//something needs to go here....
});

var Table = Backbone.Collection.extend({
	model: Sentence
});

/*The view for each sentence representation in the table. 
Each view will look like the following html
<tr><td>...</td><td>...</td>.......<td>...</td></tr> 
for each attribute of the sentence, create a td tag around it
which will correspond to a single column in this row*/
var SentenceView = Backbone.View.extend({
	tagName: 'tr',
	className: 'data',
	initialize: function(){
		this.render();
	},
	render: function(){
		//get keys and values of the attributes of this model
		var keys = Object.keys(this.model.attributes);
		var vals = [];
		for (var i = 0; i < keys.length; i++)
			vals[i] = this.model.attributes[keys[i]];
		
		//grab this element and add d3 functionality
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
					//cheat to only display part of the date string
					if (typeof(d) === 'object') { return d.toString().substring(0,24); }
					return d;
				});
		return this;
	}
});

/*The view of the entire table holding all of the rows of sentences
rendering the table calls the function to render each sentence
in the available collection of sentences*/
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
		//render this item and add it to the table
		this.$el.append(sentView.render().el);
	},
	getTimes: function(){
		//underscore function to grab all of the times from the data
		return this.collection.pluck('time');							//JSON
	}
});

d3.json('./raw_data.txt', function(text){								//JSON
	
	datas = text;														//JSON
	var t = d3.select("#raw_data");
	
	createHeaders(Object.keys(datas[0]));								//JSON
	table = createTable(MIN,MAX);
	
	var apple = table.getTimes();
	for (i = 0; i< apple.length; i++){
		apple[i] = Date.parse(apple[i]);				//array of integers that represent seconds since epoch
	}
		
	//grab times from forms for use in re-rendering the table
	//will be removed, but shows example handling of future input
	//from timeline widget
	d3.select('#submit')
		.on('click', function(){
			var s = $('#start').val();
			$('#start').val('');
			var e = $('#end').val();
			$('#end').val('');
			
			s = Date.parse(s);
			e = Date.parse(e);
			
			if (s && e)
				createTable(s,e);
			else
				createTable(MIN,MAX);
		});
});

/*Get a range of data based on start and end params
Returns a subset of the array of objects datas containing
only rows that occur in the specified time range*/
function extractData(start, end){
	var currData = [];
	for (var i = 0; i < datas.length; i++){
		var t = Date.parse(datas[i].time);							//JSON
		
		if (t <= end && t >= start) { currData.push(datas[i]); }
	}
	return currData;
}	

/*Create the table based on start and end params, atm creates an
entirely new table, probs want to just re-render it on change of input
or addition of new data*/
function createTable(s, e){
	temp = extractData(s, e);										
	
	for (var i = 0; i < temp.length; i++){
		temp[i].time = new Date(Date.parse(temp[i].time));			//JSON
	}
	
	return (new TableView(temp));
}

/*Create the headers of the table, and add the sorting listener to them*/
function createHeaders(arr){
	var header = d3.select("#raw_data");
	for (var i = 0; i < arr.length; i++){
		header.append("th")
			.text(arr[i])
			.attr("id", i)
			.attr("class", "unsorted");
	}
	
	//add a listener to sort the rows based upon what column is clicked
	d3.selectAll("th")
		.on("click", function(){
			var col = parseInt(this.id, 10);							//CSV ALONE
			col = Object.keys(temp[0])[col];							//JSON
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
}