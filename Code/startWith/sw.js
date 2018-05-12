String.prototype.startsWith = function(search, pos) {
	return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
};







