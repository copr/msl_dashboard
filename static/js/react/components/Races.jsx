/*
 * Tohle bude zobrazovat vsechny zavody 
 */

var React = require('react');
var $ = require('jquery');

var SelectBox = require('./SelectBox');
var SelectBoxMultiple = require('./SelectBoxMultiple');
var RacesTable = require('./RacesTable');


module.exports = React.createClass({

    getInitialState: function() {
	return {teams: [], years: [], selected_team: "", selected_year: "",
		selected_category: "", data_to_show: []};
    },

    componentDidMount: function() {
	this.getTeams();
	this.getYears();
    },

    // geaty by mely byt asi jen nekde uplne na vrchu
    // cely ten komponent by mel jen zobrazovat data
    // ne je odnekud tahat
    getTeams: function() {
	$.ajax({
	    url: '/api/teams',
	    dataType: 'json',
	    cache: false,
	    success: function(data) {
		data.unshift("")
		this.setState({teams: data});
	    }.bind(this),
	    error: function(xhr, status, err) {
		console.log("Jsme v pici")
	    }.bind(this)
	});
    },

    getYears: function() {
	$.ajax({
	    url: '/api/years',
	    dataType: 'json',
	    cache: false,
	    success: function(data) {
		data.unshift("")
		this.setState({years: data});
	    }.bind(this),
	    error: function(xhr, status, err) {
		console.log("Jsme v pici")
	    }.bind(this)
	});
    },

    getRaces: function() {
	/* if (this.state.selected_team === undefined || this.state.selected_year === undefined
	   || this.state.selected_category === undefined) {
	   console.log("neni vse");
	   return;
	   } */
	var url = '/api/races/' + this.state.selected_team + '/' +
		  this.state.selected_year + '/' + this.state.selected_category;
	console.log(url);
	$.ajax({
	    url: url,
	    dataType: 'json',
	    cache: false,
	    success: function(data) {
		this.setState({data_to_show: data});
	    }.bind(this),
	    error: function(xhr, status, err) {
		console.log("Jsme v pici")
	    }.bind(this)
	});
    },

    selectTeam: function(e) {
	this.setState({selected_team: e.target.value});
    },

    selectYear: function(e) {
	this.setState({selected_year: parseInt(e.target.value)});
    },

    selectCategory: function(e) {
	this.setState({selected_category: e.target.value});
    },

    render: function() {
	return (
	    <div>
		<div>
		    <SelectBox data={ this.state.teams } getValue={ this.selectTeam } />
		    <SelectBox data={ this.state.years } getValue={ this.selectYear } />
		    <SelectBox data={ ["", "Muži", "Ženy", "Veteráni"] } getValue={ this.selectCategory } />
		    <div>{ this.state.selected_team }</div>
		    <div>{ this.state.selected_year }</div>
		    <div>{ this.state.selected_category }</div>
		    <button onClick={ this.getRaces }>Jedem!</button>
		</div>
		<div>
		    <RacesTable data={ this.state.data_to_show } />
		</div>
	    </div>
	);
    }
});
