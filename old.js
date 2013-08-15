				/*//grab the column we want to sort by
				var col = me.getSortedColumn();
				var colText = me.headers[col.id];
				
				console.log(colText);
				var a = item[colText] > me.temp_datas[0][colText];
				var b = item[colText] < me.temp_datas[me.temp_datas.length - 1][colText];
				
				var c = item[colText] < me.temp_datas[0][colText];
				var d = item[colText] > me.temp_datas[me.temp_datas.length - 1][colText];
				
				//var betweenUp = a && b;
				//var betweenDown = c && d;
				
				if (col.class === "up" && a){
					console.log("INSERTING UP");
					//this table is full, we'll need to pop off last and insert new
					if (b){
						me.temp_datas.pop();
						me.temp_datas.sort( function(a, b) { return a[colText] > b[colText] ? 1 : -1 } );
						this.renderSentence(item, me.temp_datas.indexOf(item));
						me.count++;
					} else if (me.temp_datas.length < me.max_rows) {
						//the table isn't full, just add to end
						this.renderSentence(item, false);
						me.count++;
					} else {
						//the item belongs on a further page, do nothing
					}
					
					me.temp_datas.push(item);
					
				} else if (col.class === "down" && c) {
					console.log("INSERTING DOWN");
					
					//this table is full, we'll need to pop off last and insert new
					if (d){
						me.temp_datas.pop();
						me.temp_datas.sort( function(a, b) { return a[colText] < b[colText] ? 1 : -1 } );
						this.renderSentence(item, me.temp_datas.indexOf(item));
						me.count++;
					} else if (me.temp_datas.length < me.max_rows) {
						//the table isn't full, just add to beginning
						this.renderSentence(item, 0);
						me.count++;
					}
					me.temp_datas.push(item);					
				}
				*/
				
				
				//item should be inserted somewhere in or after current table view
				/*if (index > me.page * me.max_rows){
					//item belongs in this table view, but table is full
					if (index < temp){
						me.count++;
						me.temp_datas.push(item);
						
						this.renderSentence(item, false);
						
						//hi-light the row as it is added, with a fade out
						var rows = d3.select('.data_table_data').selectAll('tr');
						var lastRow = rows[0][rows[0].length - 1];
						d3.select(lastRow).style("color", "red")
							.transition()
							.duration(10000)
							.style("color", "black");
					}
				}*/
						
				//render data only between beginning of page and end of page, of length me.max_rows
				/*if ( me.count < temp ) {
					me.count++;
					me.temp_datas.push(item);
					
					this.renderSentence(item, false);
					
					//hi-light the row as it is added, with a fade out
					var rows = d3.select('.data_table_data').selectAll('tr');
					var lastRow = rows[0][rows[0].length - 1];
					d3.select(lastRow).style("color", "red")
						.transition()
						.duration(10000)
						.style("color", "black");
				}*/
				


function resizeLine(){
	var rect = d3.select(this);
	var group = this.parentNode;
	var line = d3.select(group).select('line');
	var circle = d3.select(group).select('circle');
	//var ind = rect.attr('class')[1];

	rect.attr('x', function() { return d3.event.dx + parseInt(rect.attr('x')) })
		.attr('y', function() { return d3.event.dy + parseInt(rect.attr('y')) });
	
	line.attr('x'+ind, function() { return d3.event.dx + parseInt(line.attr('x'+ind)) })
		.attr('y'+ind, function() { return d3.event.dy + parseInt(line.attr('y'+ind)) });
	
		
};

function createEndpoint(g, item, ind){
	var point = g.append('rect')
		.attr('class', 'p' + ind)
		.attr('x', item.attr('x'+ind) - 5)
		.attr('y', item.attr('y'+ind) - 5)
		.attr('width', 10)
		.attr('height', 10)
		.on('mouseover', function(){
			d3.select(this).style('opacity', 1);
		})
		.on('mouseout', function(){
			d3.select(this).style('opacity', 0);
		})
		.call(d3.behavior.drag().on('drag', resizeLine));		
};
				
function moveRect(parent){
	d3.select(parent).selectAll('rect')
		.each(function(d,i){
			var point = d3.select(this);
			
			point.attr('x', function() { return d3.event.dx + parseInt(point.attr('x')) })
				 .attr('y', function() { return d3.event.dy + parseInt(point.attr('y')) });
		});
}

		
	path = svg.append('line')
		.attr('class', 'relation')
		.attr('x1', toolC.x - 30)
		.attr('y1', toolC.y + 75)
		.attr('x2', toolC.x + 30)
		.attr('y2', toolC.y + 75);
		
	path.on('click', function(){
		var group = d3.select('.canvas svg')
			.append('g')
				.attr('d', 'default relationship');
				
		var p = group.append('line')
			.attr('class', 'line')
			.attr('x1', canvasC.x - 30 + dy)
			.attr('y1', canvasC.y - 30 + dy)
			.attr('x2', canvasC.x + 30 + dy)
			.attr('y2', canvasC.y + 30 + dy)
			.call(d3.behavior.drag().on('drag', function(){
				moveLine(this.parentNode);
			}));	
							
		createEndpoint(group, p, 1);	
		createEndpoint(group, p, 2);
	
		dy += 2;
				
	});
	
/**from alphaToAssert.js*/
	
function stripParens(str){
	var a = str.indexOf("(");
	var b = str.lastIndexOf(")");
	if (a >= 0 && b >= 0)
		return str.substring(a + 1, b);
	else
		return str;
		
	//return str.substring(1, str.length - 1);
}


	
	//from rawfeed
	/*for (var i = 0; i < data.length; i++){
		var tweet = JSON.parse(data[i].text);
		var message = tweet.text;
		messages.push(message);
	}*/
	
	
/** examples to send through dev http*/
alpha_report
{
	"source_name":"Twitter", 
	"source_id":"5", 
	"message_body":"A rare black squirrel has become a regular visitor to a suburban garden. And he ate bunnies."
}
{
"id":"51f196f88a77c2864600000b"
}

{
	"source_name":"Twitter", 
	"source_id":"5", 
	"message_body":"Africa is a continent and they have lots of countries.",
	"reporter_id":"51f196cf8a77c2864600000a"
}
{
"id":"51f197988a77c2864600000d"
}

reporter

{
	"name":"Ashley",
	"source_name":"Twitter"
}

{
"id":"51f196cf8a77c2864600000a"
}


assertion
{
"alpha_report_id":"51f193db8a77c28646000009",
"reporter_id":"51f196cf8a77c2864600000a",
"entity1":"Francisco",
"relationship":"is",
"entity2":"excited"
}

{
"id":"51f197268a77c2864600000c"
}

{ 
	"alpha_report_id": "51f18f098a77c28646000001",
    "reporter_id": "51f196cf8a77c2864600000a",
    "entity1": "squirrel",
    "relationship": "become",
    "entity2": "visitor" 
}
{ alpha_report_id: '51f193db8a77c28646000009',
    reporter_id: undefined,
    entity1: 'Francisco',
    relationship: 'is',
    entity2: 'excited' }
    
    
TripletExtraction main

	public static void main(String[] args) {
		ExtractionService extractor = new ExtractionService();
		ArrayList<Tree> trees = extractor.parser.parse("I seriously go stay at the beach for a week every summer since third grade.");
		
		System.out.println(trees);
		
		for (int i = 0; i < trees.size(); i++){
			Tree root = trees.get(i);
			int numKids = root.lastChild().numChildren();
			root.lastChild().removeChild(numKids - 1);
			Tree output = extractor.extractTriplet(root);
			System.out.println(root);
			if(output == null)
				System.err.println("ERROR: Could not find triplet");
			else
				output.printLocalTree();
		}
	}
	
	
Old NLPParser.js code

var messages = [], assertions = [];
var count = 0, overall = 0;
var $ = require('jquery');
function getMessages(data){
	var messages = []
	for (var i = 0; i < data.length; i++){
		if (data[i].message_body){ messages.push(data[i]); }
	}
	console.log(messages);
	return messages;
}

$.getJSON(url + 'alpha_report/?callback=?', function(data){

	messages = getMessages(data);
	
	//send each message body through NLP to extract a TRIPLET
	for (i = 0; i < messages.length; i++){
		var tree = parser.parseSync(messages[i].message_body);
		for ( var j = 0; j < tree.sizeSync(); j++){
			overall++;
			var output = getTriplet(tree.getSync(j));
			
			//create assertion object with data extracted from NLP
			if (output){
				var assert = {
					alpha_report_id : messages[i]._id,
					reporter_id : messages[i].reporter_id,
					entity1 : output.getEntity1StringSync(),
					relationship: output.getRelationStringSync(),
					entity2: output.getEntity2StringSync()
				};
				assertions.push( assert );
				count++;
				console.log("HI");
				assertion_service.saveAssertion(assert, function(err, newAssertion){
					console.log("ERR");
					if (!err){
						console.log("Here is the new assertion");
						console.log(newAssertion);
					} else {
						console.log("There was an error saving the parsed Assertion object");
					}
				
				});
				console.log("YA");
			} else {}
		}
	}
	//console.log(assertions);				
	//console.log("Displaying " + count + " matches out of " + overall + " possible assertions");
});
/*var logger = null;

this.load = function(app, io, gcm, log) {
	logger = log;
	app = app;
	
	app.get('/nlp-parser/start', function(req, res){
		if(logger.DO_LOG){
			logger.info('Request for nlp parser start');
		}
		
		me.parse(req.query, res);
	});
	
	app.get('/nlp-parser/stop', function(req, res){
		if(logger.DO_LOG){
			logger.info('Request for nlp parser stop');
		}
		
		me.stopParse(req.query, res);
	});
};

me.parse = function(query, res){
	
};*/


/*this.parseAndSave({
	"source_name":"Twitter",
	"source_id":"1",
	"message_body":"A rare black squirrel has become a regular visitor to a suburban garden",
	"_id":"51f18f098a77c28646000001",
	"__v":0,
	"updatedDate":"2013-07-25T20:48:09.388Z",
	"createdDate":"2013-07-25T20:48:09.388Z"
});*/

var obj = {
	"alpha_report_id":"51f286c9054604e60a000001",
	"entity1":"Francisco",
	"relationship":"is",
	"entity2":"excited"
};

assertion_service.saveAssertion(obj, function(err, newAssertion){
	if (!err){
		console.log("Callback version " +newAssertion);
	} else {
		console.log("There was an error saving the parsed Assertion object.");
	}
});

draw.js
		//grab the line that is a sibling or child to current circle
		/*var line = d3.select(that.parentNode).select('.relation');
		d3.select(that.parentNode).selectAll('.triangle').remove();
		
		if (!line[0][0]){
			return;
		}
		var x, y;
		if (line.attr('x1') === cx && line.attr('y1') === cy){
			x = 'x1';
			y = 'y1';
		} else {
			x = 'x2';
			y = 'y2';
		}
	
		line.attr(x, function() { 
			var newC = dx + parseInt(line.attr(x)); 
			return me.computeCoord(newC, 'x');
		})
		.attr(y, function() { 
			var newC = dy + parseInt(line.attr(y)); 
			return me.computeCoord(newC, 'y');
		});
		
		var p1 = { 
			x:parseInt(line.attr('x1'),10),
			y:parseInt(line.attr('y1'),10)
		};
		
		var p2 = {
			x:parseInt(line.attr('x2'),10),
			y:parseInt(line.attr('y2'),10)
		};
		
		me.createArrow(line, that);*/
		
	/**
		called when a new line is created in the following functions
		me.dragGroup, me.nodeclick, me.doubleClickNode
		@param - line: the line that we want to add the arrow to
				 that: the item to append the arrows to
		@return - none
		@functionality - calculate the locations of the points that
				  will be used for the arrows that indicate direction
				  between entity 1 and entity 2
		@internal functions - none
	*/
	me.createArrow = function(line){
		var p1 = {
			x: parseInt(line.attr('x1'),10),
			y: parseInt(line.attr('y1'),10)
		};
		
		var p2 = {
			x: parseInt(line.attr('x2'),10),
			y: parseInt(line.attr('y2'),10)
		};
		
		var midlineX = (p2.x + p1.x) / 2;
		var midlineY = (p2.y + p1.y) / 2;
		var magline = Math.sqrt((p2.y - p1.y) * (p2.y - p1.y) + (p2.x - p1.x) * (p2.x - p1.x));
		var alpha = Math.atan((p2.y - p1.y) / (p2.x - p1.x)) - 0.523598;
		var beta = Math.atan((p2.y - p1.y) / (p2.x - p1.x)) + 0.523598;

		var dx1 = me.arrowlength * Math.cos(alpha);
		var dy1 = me.arrowlength * Math.sin(alpha);
		
		var dx2 = me.arrowlength * Math.cos(beta);
		var dy2 = me.arrowlength * Math.sin(beta);
		
		var Dx1, Dy1, Dx2, Dy2;
		
		//(+, +) case, accounting for inverted y-axis
		if ((p2.x > p1.x) && (p2.y < p1.y)){
			Dx1 = -dx1;
			Dy1 = -dy1;
			Dx2 = -dx2;
			Dy2 = -dy2;
		//(-, -) case, accounting for inverted y-axis
		} else if((p2.x < p1.x) && (p2.y > p1.y)){
			Dx1 = dx1;
			Dy1 = dy1;
			Dx2 = dx2;
			Dy2 = dy2;
		//either (+, -) or (-, +)
		} else {
			Dx1 = p2.x > p1.x ? -dx1 : dx1;
			Dy1 = p2.y > p1.y ? -dy1 : dy1;
			
			Dx2 = p2.x > p1.x ? -dx2 : dx2;
			Dy2 = p2.y > p1.y ? -dy2 : dy2;
		}
		
		d3.select(line[0][0].parentNode).append('line')
			.attr('class', 'triangle')
			.attr('x1', midlineX)
			.attr('y1', midlineY)
			.attr('x2', midlineX + Dx1)
			.attr('y2', midlineY + Dy1);
			
		d3.select(line[0][0].parentNode).append('line')
			.attr('class', 'triangle')
			.attr('x1', midlineX)
			.attr('y1', midlineY)
			.attr('x2', midlineX + Dx2)
			.attr('y2', midlineY + Dy2);
	};
					/*group.append('circle')
					.attr('d', $('.ent2').val())
					.attr('class', me.circleCount)
					.attr('cx', function(){ return me.computeCoord(p2.x, 'x'); })
					.attr('cy', function(){ return me.computeCoord(p2.y, 'y'); })
					.attr('r', me.radius)
					.style('fill', color(cGroup))
					.call(d3.behavior.drag().on('drag', me.move))
					.on('dblclick', me.doubleClickNode)
					.on('mouseover', me.mouseover)
					.on('mouseout', me.mouseout)
					.on('click', me.nodeclick);*/

								/*var request = new XMLHttpRequest();
			var url = 'http://localhost:8081/target_assertion/';
			
			request.open('POST', url, true);
			request.onreadystatechange = function() {
				if (request.readyState === 4){
					console.log('It worked');
				}
			};
			request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			request.send(escape(JSON.stringify(postData)));
			
			$.ajax({
				type:'POST',
				beforeSend: function(request){
					request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
					request.setRequestHeader('Access-Control-Allow-Origin: *');
				},
				url: url,
				data: 'json=' + escape(JSON.stringify(postData)),
				processData: false
			
			});
				
			//var url = 'http://localhost:8081/target_assertion/?callback=localJsonpCallback&' +JSON.stringify(postData);
			
			$.ajax({
				url: url,
				type: 'POST',
				data: escape(JSON.stringify(postData)),
				dataType: 'jsonp',
				jsonpCallback: 'localJsonpCallback',
				jsonp: false,
				success:localJsonpCallback,
				crossDomain:true
			});	*/
			
			/*function localJsonpCallback(json){
				if(!json.Error){
					console.log('yay');
				} else {
					console.log(json.Message);
				}
			}*/
			
			
				/*$.ajax({
					type:'POST',
					beforeSend: function(request){
						request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
						request.setRequestHeader('Access-Control-Allow-Origin: *');
					},
					url: url,
					data: 'json=' + escape(JSON.stringify(postData)),
					processData: false
				});*/
				
draw.js
jquery drag plugin version
$('.canvas').drag('start', function (ev, dd ){
	if (me.mode === 'select_hold'){
		d3.select('.canvas svg').append('rect')
			.attr('class', 'selection')
			.style('opacity', 0.25);
	}
})
.drag(function(ev, dd){			
	if (me.mode === 'select_hold'){
		d3.select('.selection').attr('width', Math.abs( ev.pageX - dd.startX ))
			.attr('height', Math.abs( ev.pageY - dd.startY ))
			.attr('x', Math.min( ev.pageX - 169, dd.startX - 169))
			.attr('y', Math.min( ev.pageY - 9, dd.startY - 9));
			
		d3.selectAll('.canvas circle').each(function(){
			var c = d3.select(this);
			var rect = d3.select('.selection');
			var right = parseInt(rect.attr('x'),10) + parseInt(rect.attr('width'),10);
			var bottom = parseInt(rect.attr('y'),10) + parseInt(rect.attr('height'),10);
			if (c.attr('cx') < right & c.attr('cx') > parseInt(rect.attr('x'))){
				if (c.attr('cy') < bottom & c.attr('cy') > parseInt(rect.attr('y'))){
					c.style('fill', 'red');
				} else {
					var i = me.indexOf(c, me.circles);
					c.style('fill', color(me.circles[i].group));
				}
			} else {
				var i = me.indexOf(c, me.circles);
				c.style('fill', color(me.circles[i].group));
			}
		});
	}
})
.drag('end', function(ev, dd){
	if (me.mode === 'select_hold'){
		$('.selection').remove();
	}
});

on delete_hold selection
else if (me.mode === 'delete_hold'){
	var nodesToRemove = [];
	var linksToRemove = [];
	d3.selectAll('.canvas circle').each(function(){
		var c = d3.select(this);
		if(c.style('fill') === '#ff0000'){
			nodesToRemove.push(c[0][0]);
		}
	});
	
	d3.selectAll('.canvas line').each(function(){
		var l = d3.select(this);
		if (l.style('stroke') === '#ff0000'){
			linksToRemove.push(l[0][0]);
		}
	});
	
	for (var i = 0; i < nodesToRemove.length; i++){
		me.deleteNode(nodesToRemove[i]);
	}
	
	for (i = 0; i < linksToRemove.length; i++){
		me.deleteLink(linksToRemove[i]);
	}
}

me.move
if(me.mode === 'mover_hold'){
	var circles = [];
	var lines = [];
	
	var group = me.indexOf(d3.select(this), me.circles);
	var x = me.extractCircles(me.circles[group].group);
	
	for (var i = 0; i < x.length; i++){
		circles.push(me.circles[x[i]].html);
	}
	
	var y = me.extractLines(x);
	for (i = 0; i < y.length; i++){
		lines.push(me.lines[y[i]].html);
		d3.select(me.lines[y[i]].html.parentNode)
			.select('path').remove();
	}
	me.moveCircles(d3.selectAll(circles));
	me.moveLines(d3.selectAll(lines));
	for (var i = 0; i < circles.length; i++){
		me.dragGroup(circles[i]);	
	}
	
} 
	

/**
	called from the me.move function
	@param - parent: the parent element to the item we want to move
	@return - none
	@functionality - grabs each line in the group and translates each
			  of the endpoints, moving each line but staying within the
			  bounds of the canvas
	@internal functions - me.computeCoord
						  me.createArrow
*/
me.moveLines = function(lines){
	lines.each(function(){
		var line = d3.select(this);
		
		line.attr('x1', function() { 
			var newC = d3.event.dx + parseInt(line.attr('x1')); 
			return me.computeCoord(newC, 'x');
		}).attr('y1', function() { 
			var newC = d3.event.dy + parseInt(line.attr('y1')); 
			return me.computeCoord(newC, 'y'); 
		}).attr('x2', function() { 
			var newC = d3.event.dx + parseInt(line.attr('x2')); 
			return me.computeCoord(newC, 'x');
		}).attr('y2', function() { 
			var newC = d3.event.dy + parseInt(line.attr('y2')); 
			return me.computeCoord(newC, 'y'); 
		});
		
		var path = me.createArrow(line);
	});
};

	
/**
	called from the me.move function
	@param - parent: the parent element to the item we want to move
	@return - none
	@functionality - grabs each circle in the group and translates it,
			  moving each circle but staying within the bounds of the
			  canvas
	@internal functions - me.computeCoord
*/
me.moveCircles = function(circles){

	circles.each(function(){
		var circle = d3.select(this);
		
		circle.attr('cx', function() { 
			var newC = d3.event.dx + parseInt(circle.attr('cx'));
			return me.computeCoord(newC, 'x');
		}).attr('cy', function() { 
			var newC =  d3.event.dy + parseInt(circle.attr('cy'));
			return me.computeCoord(newC, 'y'); 
		});
		
		var c = me.circles[me.indexOf(circle, me.circles)];
			c.x = circle.attr('cx');
			c.y = circle.attr('cy');
		});
};

	
me.getCircleByClass = function(clazz){
	d3.selectAll('.canvas circle').each(function(){
		if (d3.select(this).attr('class') === clazz){
			return this;
		}
	});
};