var MIN = 0;
var MAX = Number.MAX_VALUE;
var table;
var apple;
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
}

function getTime(){
	return table.getTimes();
}