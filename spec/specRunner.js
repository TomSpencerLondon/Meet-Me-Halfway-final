const Jasmine = require('jasmine');

const jasmine = new Jasmine();

jasmine.loadConfigFile('spec/support/jasmine.json');

const green = "\x1b[32m";
const red = "\x1b[31m";
const resetTextColour = "\x1b[0m";

var myReporter = {
    specDone: function(result) {
        const textColour = result.status === "passed" ? green : red;
        console.log(textColour + 'Spec: "' + result.description + '": ' + result.status + resetTextColour);
        // for(var i = 0; i < result.failedExpectations.length; i++) {
        //     console.log('Failure: ' + result.failedExpectations[i].message);
        //     console.log(result.failedExpectations[i].stack);
        // }
        // console.log(result.passedExpectations.length);
    }
};

jasmine.addReporter(myReporter);

jasmine.execute();
