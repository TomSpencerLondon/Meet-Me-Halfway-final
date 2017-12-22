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

  it('can receive address 1 from the Google Maps API', function(done){
    browser.visit("/", function(err){
      setTimeout( function() {
        browser
        .fill('#address1', "makers academy london")
        .fill('#address2', "se83js")
        .pressButton('#submit', function(){
          browser.assert.text('#hiddenAddress1Result', '{"lat":51.5173403,"lng":-0.07328080000002046}');
          done();
        });
      }, 1000);
    });
  }, longTimeout);

  it('can receive address 2 from the Google Maps API', function(done){
  browser.visit("/", function(err){
    setTimeout( function() {
      browser
      .fill('#address1', "makers academy london")
      .fill('#address2', "se83js")
      .pressButton('#submit', function() {
          browser.assert.text('#hiddenAddress2Result', '{"lat":51.4821398,"lng":-0.020525399999996807}');
          done();
      });
    }, 1000);
  });
}, longTimeout);

it('can calculate a midpoint', function(done){
  browser.visit("/", function(err){
    setTimeout( function() {
      browser
      .fill('#address1', "makers academy london")
      .fill('#address2', "se83js")
      .pressButton('#submit', function() {
          browser.assert.text('#hiddenMidpoint', '{"lat":51.49974005,"lng":-0.046903100000008635}');
          done();
      });
    }, 1000);
  });
}, longTimeout);

it('can fetch nearby cafes', function(done){
  browser.visit("/", function(err){
    setTimeout( function() {
      browser
      .fill('#address1', "makers academy london")
      .fill('#address2', "se83js")
      .choose('#cafe')
      .pressButton('#submit', function() {
          browser.assert.text('.place:first-child', 'A: Hollywood Bowl Surrey Quays');
          done();
      });
    }, 1000);
  });
}, longTimeout);


});
