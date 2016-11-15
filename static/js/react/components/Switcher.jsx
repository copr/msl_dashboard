/* 
 * Class that keeps the information about account, And it  
 * changes the views based on other components.
 */

var React = require('react');

var Welcome = require('./Welcome');

module.exports = React.createClass({
    getInitialState: function() {
	return {step: 0};
    },

    componentDidMount: function() {
    },
    
    render: function() {
	switch(this.state.step) {
	    default:
		return <Welcome />;
	}
    }
});
