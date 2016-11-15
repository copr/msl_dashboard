/*
 * Test
*/

var React = require('react');
var Plotly = require('plotly');
var $ = require('jquery');

module.exports = React.createClass({
    getInitialState: function() {
	return {text: "ahoj", data: [], filter: {}, mean: 0};
    },
    // nereactovske, mrknout pozdeji znovu
    drawGraph: function() {
	var data = this.state.data;
	var x = [];
	var k = 0;
	var suma = 0;
	var n = 0;
	for (var i = 0; i < data.length; i ++) {
	    if (data[i].fields.tym === this.state.filter.team && data[i].fields.rok === this.state.filter.year) {
		f = data[i].fields
		result = (f.l > f.p) ? f.l : f.p ;
		if (result === null) {
		    console.log('null');
		    continue;
		}
		x[k] = result
		suma = suma + x[k++];
		n = n + 1;
	    }
	}
	console.log(x);
	this.setState({mean: suma/n});
	var data2 = [
	    {
		x: x,
		type: 'histogram',
		marker: {
		    color: 'rgba(100,250,100,0.7)',
		},
	    },
	];
	Plotly.newPlot('graph', data2);
    },

    componentDidMount: function() {
	var self = this;
	$.ajax({
	    url: '/api/data',
	    dataType: 'json',
	    cache: false,
	    success: function(data) {
		this.setState({data: data});
	    }.bind(this),
	    error: function(xhr, status, err) {
		console.log("Jsme v pici")
	    }.bind(this)
	});
    },

    handleTeamChange: function(e) {
	self = this;
	this.setState({filter: {team: e.target.value, year: self.state.filter.year}});
    },

    handleYearChange: function(e) {
	self = this;
	this.setState({filter: {year: parseInt(e.target.value), team: self.state.filter.team}});
    },

    render: function() {
	return (
	    <div>
		<div className="controls">
		    <div>Filter by team: <input type="text" id="filter" value={ this.state.filter.team } onChange={this.handleTeamChange}></input></div>
		    <div>Filter by year: <input type="number" id="filter" value={ this.state.filter.year } onChange={this.handleYearChange}></input></div>
		    <div>Mean: { this.state.mean }</div>
		    <div><button onClick={ this.drawGraph }>Filter!</button></div>
		</div>
		<div id="graph"></div>
	    </div>
	);
    }
});


