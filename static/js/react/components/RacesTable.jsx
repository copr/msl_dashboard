/*
 * Tohle zobrazi vsechny zavody v tabulce nebo seznamu spis 
 */

var React = require('react');
var math = require('mathjs');

module.exports = React.createClass({
    getResult: function(r) {
	if (r.fields.l === null || r.fields.p === null) {
	    return null;
	}
	return (r.fields.l > r.fields.p) ? r.fields.l : r.fields.p;
    },

    removeNulls: function(data) {
	return data.filter(x => this.getResult(x) !== null);
    },

    leftAverage: function(data) {
	var d = data.map(x => x.fields.l).filter(x => x !== null);
	return math.sum(d)/d.length;
    },

    rightAverage: function(data) {
	var d = data.map(x => x.fields.p).filter(x => x !== null);
	return math.sum(d)/d.length;
    },

    average: function(data) {
	var d = data.map(x => this.getResult(x)).filter(x => x !== null);
	return math.sum(d)/d.length;
    },
    
    render: function() {
	console.log(this.props.data);
	var data = this.props.data;
	var rs = data.map(r =>
	    <tr>
		<td>{ r.fields.misto }</td>
		<td>{ r.fields.kolo }</td>
		<td>{ this.getResult(r) }</td>
		<td>{ r.fields.l }</td>
		<td>{ r.fields.p }</td>
		<td>{ r.fields.body }</td>
	    </tr>
	);
	return (
	    <table>
		<tbody>
		    <tr>
			<th>Místo</th>
			<th>Kolo</th>
			<th>Výsledný čas</th>
			<th>Levý Proud</th>
			<th>Pravý Proud</th>
			<th>Body</th>
		    </tr>
		    { rs }
		    <tr>
			<td>Průměry</td>
			<th>-</th>
			<th>{ this.average(data) }</th>
			<th>{ this.leftAverage(data) }</th>
			<th>{ this.rightAverage(data) }</th>
			<th>{ data.reduce((acc, cur) => acc + cur.fields.body, 0)/data.length }</th>
		    </tr>
		</tbody>
	    </table>
	);
    }
});
