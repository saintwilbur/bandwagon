//
// test/routesSpec.js
//
describe('E2E: Testing Routes', function() {
  var username = element(by.id('username'));
  var password = element(by.id('password'));
  var submit = element(by.id('submit'));
  var error = element(by.binding('error'));
  var droptoggle = element(by.id('droptoggle'));
  var deleteAccount = element(by.id('deleteAccount'));
  var signout = element(by.id('signout'));

  // Function signin so that we can test routes only seen when logged in
  function signin(){
    browser.get('http://localhost:3000/#!/signin');
    username.sendKeys('test');
    password.sendKeys('password');
    submit.click();
  }

  beforeEach(function() {
    browser.get('http://localhost:3000/#!/');
  });

  it('should jump to the / path when /gigs is accessed and user is not logged in', function() {
    browser.get('http://localhost:3000/#!/gigs');
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/');
  });

  it('should jump to the / path when /artists is accessed and user is not logged in', function() {
    browser.get('http://localhost:3000/#!/artists');
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/');
  });

  it('should jump to the / path when /settings/profile is accessed and user is not logged in', function() {
    browser.get('http://localhost:3000/#!/settings/profile');
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/');
  });

  it('should jump to the / path when /settings/password is accessed and user is not logged in', function() {
    browser.get('http://localhost:3000/#!/settings/password');
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/');
  });

  it('should have a working /gigs route', function() {
    signin();
    browser.get('http://localhost:3000/#!/gigs');
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/gigs');
  });

  it('should have a working /artists route', function() {
    browser.get('http://localhost:3000/#!/artists');
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/artists');
  });

  it('should have a working /settings/profile route', function() {
    browser.get('http://localhost:3000/#!/settings/profile');
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/settings/profile');
  });

  it('should have a working /settings/password route', function() {
    browser.get('http://localhost:3000/#!/settings/password');
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/settings/password');
    droptoggle.click();
    signout.click();
  });

  it('should have a working /settings/deleteAccount route', function() {
    browser.get('http://localhost:3000/#!/settings/deleteAccount');
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/settings/deleteAccount');
  });

});