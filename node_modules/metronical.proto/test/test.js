const assert = require("assert");
const { s } = require("../lib/index");

describe("proto", function() {
    describe("lower", function() {
        it("Shorthand method for making a string lowercase.", function() {
            let t = s("THIS SHOULD BE LOWERCASE.").lower();
            assert.equal(t.toString(), "this should be lowercase.");
        });
    });
});
