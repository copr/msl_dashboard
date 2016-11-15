/*
 * Account represents part of the app that displays account information. On left top side
 * should be information about the account itself. On top right side should be form to update
 * current account. On bottom should be d3 graphs that ilustratete history of account.
 */

var React = require('react');
var LineGraph = require('../graphs/LineGraph');
var Messages = require('./Messages');


module.exports = React.createClass({

    addToHistory: function(newVal) {
	var last = this.state.history[this.state.history.length];
	var hist = this.state.history;
	hist.append(last);
	hist[hist.length].y = newVal;
	return {history: hist};
    },
    
    logout: function() {
	document.cookie = "";
	this.props.changeStep(0);
    },
    
    render: function() {
	return (
	    <div className="account">
		<div className="row"><AccountDash account={this.props.account} /></div>
		<div className="row"><AccountControls account={this.props.account} ws={this.props.ws}/></div>
		<div className="row"><AccountGraphHistory account={this.props.account} data={this.props.history} /></div>
		<div className="row"><button onClick={this.logout}>Logout</button></div>
	    </div>
	);
    }
});

AccountDash = React.createClass({
    render: function() {
	return (
	    <div className="account-dash">
		<ul>
 		    <li>Account Number: {this.props.account.AccountNr}</li>
		    <li>Account Balance: {this.props.account.Balance}</li>
		</ul>
	    </div>
	);
    }
});

AccountControls = React.createClass({
    getInitialState: function() {
	return {action: "Deposit", amount: ""};
    },
    
    handleActionChange: function(e) {
	this.setState({action: e.target.value});
    },
    
    handleAmountChange: function(e) {
	this.setState({amount: e.target.value});
    },

    handleSubmit: function(e) {
	e.preventDefault();
	this.setState({action: "Deposit", amount: ""});
	val = Messages.CreateValue(this.state.action,
				   parseInt(this.state.amount),
				   "10",
				   1,
				   this.props.account.AccountNr,
	);
	mes = Messages.CreateMessage(0, val);
	this.props.ws.send(JSON.stringify(mes));
	console.log(mes);
    },
    
    render: function() {
	// I use this to get a reference to the whole object
	// from within the map function
	var self = this;
	var radioButtons = ["Deposit", "Withdraw"].map(function(r) {
	    return (
		<span>
		    <input type="radio"
			   name="action"
			   value={r.valueOf()}
			   checked={self.state.action.valueOf() === r.valueOf()}
			   onChange={self.handleActionChange}
		    />{r.valueOf()}<br></br>
		</span>
	    );
	});
	return (
	    <div className="account-controls">
		<form onSubmit={this.handleSubmit} >
		    {radioButtons}
		    Amount: <input type="text"  name="amount" value={this.state.amount} onChange={this.handleAmountChange} />
		    <input type="submit" value="Send" />
		</form>
	    </div>
	);
    }
});

AccountTextHistory = React.createClass({
    render: function() {
	var transactions = this.props.transactionHistory.map(function(t) {
	    
	});
	return;
    }
});

AccountGraphHistory = React.createClass({
    margins: {top: 20, bottom: 20, left: 50, right: 20},
    width: 1000,
    height: 500,
    
    render: function() {
	return <div><LineGraph margins={this.margins} width={this.width} height={this.height} data={this.props.data} /></div>
    }
});

