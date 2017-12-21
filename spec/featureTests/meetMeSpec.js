const Browser = require('zombie');
const request = require('request');
const app = require('../../app');

Browser.localhost('example.com', 3001);
const timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
const longTimeout = timeout * 10;

describe('website', function(){

  var server;
  const browser = new Browser();

  beforeEach(function(){
    server = app.listen(3001);
  });

  afterEach(function(){
    server.close();
  });

  it('successfully loads the page', function(done){
    browser.visit("/", function(err){
      browser.assert.success();
      done();
    });

  }, timeout);

  it('should contain a map div', function(done){
    browser.visit("/", function(err){
      expect(browser.html("body")).toContain('<div id="map"></div>')
      done();
    });
  }, timeout);

});
