/*
 * Component that takes list of data and creates a
 * textinput for it.
 */

var React = require('react');

module.exports = React.createClass({
    getInitialState: function() {
	return {selected: this.props.data[0]};
    },

    handleChange: function(e) {
	this.setState({selected: e.target.value});
	this.props.getValue(e);
    },

    render: function() {
	var data = this.props.data;
	var options = data.map(function(e) {
	    return <option value={ e }>{ e }</option>
	});
	return (
	    <div>
		<input list="data"></input>
		<datalist id="data" onChange={ this.handleChange }>
		    { options }
		</datalist>
	    </div>
	);
    }
});
