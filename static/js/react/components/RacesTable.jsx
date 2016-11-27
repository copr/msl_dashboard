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

    truncate: function(x, n) {
	var numero = Math.pow(10, n)
	return Math.trunc(x*numero)/numero;
    },
    
    render: function() {
	console.log(this.props.data);
	var data = this.props.data;
	var rs = data.map(r =>
	    <tr>
		<td>{ r.fields.tym }</td>
		<td>{ r.fields.rok }</td>
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
			<th>Tým</th>
			<th>Rok</th>
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
			<th>-</th>
			<th>-</th>
			<th>{ this.truncate(this.average(data), 3) }</th>
			<th>{ this.truncate(this.leftAverage(data), 3) }</th>
			<th>{ this.truncate(this.rightAverage(data), 3) }</th>
			<th>{ this.truncate(data.reduce((acc, cur) => acc + cur.fields.body, 0)/data.length, 3) }</th>
		    </tr>
		</tbody>
	    </table>
	);
    }
});
