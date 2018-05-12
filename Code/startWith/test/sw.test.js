var assert = require('assert');

describe('type of variable', function () {
    it('should return true when it does start with the same string', function () {
        var str = 'To be, or not to be, that is the question.'
        assert.equal(str.startsWith('To be'), true);
    });
    it('should return false when it does not start with the same string', function () {
        var str = 'To be, or not to be, that is the question.'
        assert.equal(str.startsWith('not to be'), false);
    });
    it('should return true when it does not start with the same string from the given pos', function () {
        var str = 'To be, or not to be, that is the question.'
        assert.equal(str.startsWith('not to be',10), true);
    });
    it('should return false when index out' , function(){
        var str = 'To be, or not to be, that is the question.'
        assert.equal(str.startsWith('not to be, that is the question. ss',10), false);        
    });
});