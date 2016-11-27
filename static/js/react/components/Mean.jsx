/*
 * Test
*/

var React = require('react');
//var Plotly = require('plotly');
var $ = require('jquery');
var math = require('mathjs');

var SelectBox = require('./SelectBox');
var SelectBoxMultiple = require('./SelectBoxMultiple');
var DataList = require('./DataList');

module.exports = React.createClass({
    getInitialState: function() {
	return {data: [], filter: {team: "", years: [2016]}, mean: 0, dataToShow: [],
		teams: [], years: []};
    },

    isInYears: function(year) {
	if (this.state.filter.years.indexOf(year) != -1) {
	    return true;
	}
	return false;
    },
    
    drawGraph: function() {
	var data = this.state.data;
	var x = data.filter(function(d) {
                 	return d.fields.tym === this.state.filter.team &&
        		       this.isInYears(d.fields.rok);
	            }, this)
		    .map(function(d) {
			return (d.fields.l > d.fields.p) ? d.fields.l : d.fields.p;
		    })
		    .filter(function(d) {
			return d !== null;
		    });
	this.setState({dataToShow: x, mean: math.mean(x)});
    },

    getAllTeams: function(data) {
	// kazdy tym vrati prave jednou
	var teams = [];
	var exists = {};
	for (i = 0; i < data.length; i++) {
	    var team = data[i].fields.tym;
	    if (exists[team] != true) {
		exists[team] = true;
		teams.push(team);
	    }
	}
	this.setState({teams: teams});
    },

    getAllYears: function() {
	// je to uz nake neprehledne :D, chtelo by to predelat
	// ma to vratit vsechny roky kdy zavodil uz vybrany tym
	var years = [];
	var exists = {};
	var team = this.state.filter.team;
	var data = this.state.data;
	for (i = 0; i < data.length; i++) {
	    var year = this.state.data[i].fields.rok;
	    var t = this.state.data[i].fields.tym;
	    if (exists[year] != true && t === team ) {
		exists[year] = true;
		years.push(year);
	    }
	}
	return years;
    },

    componentDidMount: function() {
	var self = this;
	$.ajax({
	    url: '/api/data',
	    dataType: 'json',
	    cache: false,
	    success: function(data) {
		this.setState({data: data});
		this.getAllTeams(data);
	    }.bind(this),
	    error: function(xhr, status, err) {
		console.log("Jsme v pici")
	    }.bind(this)
	});
    },

    handleTeamChange: function(e) {
	var self = this;
	console.log("ahoj");
	this.setState({filter: {team: e.target.value,
				years: self.state.filter.year}});
    },

    handleYearChange: function(e) {
	var self = this;
	var selectedOpts = e.target.selectedOptions;
	var years = []
	for (i = 0; i < selectedOpts.length; i++) {
	    years.push(parseInt(selectedOpts[i].value));
	}
	this.setState({filter: {years: years,
				team: self.state.filter.team}});
    },

    render: function() {
	return (
	    <div>
		<div className="controls">
		    <div>
			Filter by team:
			<SelectBox getValue={ this.handleTeamChange } data={ this.state.teams } />
			{ this.state.filter.team }
		    </div>
		    <div>
			Filter by year:
			<SelectBoxMultiple getValue={ this.handleYearChange } data={ this.getAllYears() } />
			{ this.state.filter.year }
		    </div>
		    <div>Mean: { this.state.mean }</div>
		    <div><button onClick={ this.drawGraph }>Filter!</button></div>
		</div>
		<div id="graph"></div>
	    </div>
	);
    }
});


