/*
 *
*/

var React = require('react');
var $ = require('jquery');

var SelectBoxMultiple = require('./SelectBoxMultiple');
var RacesTable = require('./RacesTable');

var Utils = require('../utils/getters');

module.exports = React.createClass({
    getInitialState: function() {
	return {places: [], teams: [], years: [],
		selected_teams: [], selected_years: [], selected_places: [],
		data_to_show: []};
    },

    componentDidMount: function() {
	var self = this;
	$.get('/api/teams', function(data) {
	    self.setState({teams: data});
	}, 'json');
	$.get('/api/years', function(data) {
	    self.setState({years: data});
	}, 'json');
	$.get('/api/places', function(data) {
	    self.setState({places: data});
	}, 'json');
    },

    selectTeam: function(e) {
	var data = Utils.getValuesFromBoxMultiple(e);
	this.setState({selected_teams: data});
    },

    selectYear: function(e) {
	var data = Utils.getValuesFromBoxMultiple(e).map(x => parseInt(x));
	this.setState({selected_years: data});
    },

    selectPlace: function(e) {
	var data = Utils.getValuesFromBoxMultiple(e);
	this.setState({selected_places: data});
    },

    getFilteredData: function() {
	var self = this;
	var toSend = { places: this.state.selected_places,
		       teams: this.state.selected_teams,
		       years: this.state.selected_years };
	$.post('/api/filtr/', toSend, function(data) {
	    self.setState({data_to_show: data});
	}, 'json');
    },

    render: function() {
	return (
	    <div>
		<div className="controls">
	            <SelectBoxMultiple data={ this.state.teams }
      				       getValue = { this.selectTeam }/>
	            <SelectBoxMultiple data={ this.state.years }
				       getValue = { this.selectYear }/>
	            <SelectBoxMultiple data={ this.state.places }
				       getValue = { this.selectPlace }/>
	            <button onClick={ this.getFilteredData }>Jedem!</button>
		</div>
		<div>
		    <RacesTable data={ this.state.data_to_show } />
		</div>
	    </div>
	);
    }
});
