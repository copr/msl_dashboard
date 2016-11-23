/*
 * Menu :)
 */

var React = require('react');

module.exports = React.createClass({
    getInitialState: function() {
	return {selected: -1};
    },

    changeMenu: function(o) {
	console.log(o);
	this.props.changeState(parseInt(o.target.id));
	this.setState({selected: parseInt(o.target.id)});
    },

    render: function() {
	var menu_items = this.props.menu_items.map(i =>
	    <div onClick={ this.changeMenu } className="menu_item"><a id={ i[0] } href="#">{ i[1] }</a></div>
	);
	return <div className="menu">{ menu_items }</div>
    }
});
