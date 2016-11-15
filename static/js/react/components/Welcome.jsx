/*
 * Test
*/

var React = require('react');

module.exports = React.createClass({
    getInitialState: function() {
	return {text: "ahoj"};
    },

    render: function() {
	return (
	    <div className="pozdrav">
		{ this.state.text }
	    </div>
	);
    }
});


