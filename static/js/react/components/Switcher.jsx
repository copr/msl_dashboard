/* 
 * Class that keeps the information about account, And it  
 * changes views what's currently shown.
 */

var React = require('react');

var Menu = require('./Menu');
var Mean = require('./Mean');
var Races = require('./Races');

var SelectBox = require('./SelectBox');
var SelectBoxMultiple = require('./SelectBoxMultiple');
var DataList = require('./DataList');

module.exports = React.createClass({

    getInitialState: function() {
	return {step: 0};
    },

    changeState: function(i) {
	this.setState({step: i});
    },

    menu_items: [[2, "Prumer"], [1, "Grafy"], [0, "Závody"], [3, "Prdy"]],

    render: function() {
	d = ["ahoj", "cau", "cest"]
	switch(this.state.step) {
	    case 1:
		return (
		    <div>
			<Menu changeState={ this.changeState } menu_items={ this.menu_items  } />
			<SelectBoxMultiple data={ ["ahoj", "cau", "cest"] } />
		    </div>
		);
	    case 2:
		return (
		    <div>
			<Menu changeState={ this.changeState } menu_items={ this.menu_items } />
			<Mean />
		    </div>
		);
	    case 0:
		return (
		    <div>
			<Menu changeState={ this.changeState } menu_items={ this.menu_items } />
			<Races />
		    </div>
		);
	    default:
		return (
		    <div>
			<Menu changeState={ this.changeState } menu_items={ this.menu_items } />
			<Mean />
		    </div>
		);
	}
    }
});
