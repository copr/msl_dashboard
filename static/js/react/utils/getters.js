/*
 * pomocne funkce
 */

var obj = {
    getValuesFromBoxMultiple: function (e) {
	var data = [];
	for (i = 0; i < e.target.selectedOptions.length; i++) {
	    data.push(e.target.selectedOptions[i].value);
	}
	return data;
    }
};
    
module.exports = obj;
