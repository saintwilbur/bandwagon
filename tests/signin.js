//signin.js
describe('angularjs homepage', function() {
	var username = element(by.id('username'));
	var password = element(by.id('password'));
	var submit = element(by.id('submit'));
	var error = element(by.binding('error'));
	var droptoggle = element(by.id('droptoggle'));
	var signout = element(by.id('signout'));

	beforeEach(function() {
		browser.get('http://localhost:3000/#!/signin');
	});

	it('should have a title', function() {	
    	expect(browser.getTitle()).toEqual('bandwagon - Development Environment'); 
  	});	

	it('should have a username', function() {	
		username.sendKeys('');
		password.sendKeys('password');
		submit.click();
    	expect(error.getText()).toEqual('Missing credentials'); 
  	});	

	it('should have a password', function() {	
		username.sendKeys('test');
		password.sendKeys('');
		submit.click();
    	expect(error.getText()).toEqual('Missing credentials'); 
 	});	

	it('should fail with incorrect password', function() {	
		username.sendKeys('ThisNewUser');
		password.sendKeys('banana');
		submit.click();
    	expect(error.getText()).toEqual('Invalid password'); 
  	});	

  	it('should login with correct credentials', function() {	
		username.sendKeys('ThisNewUser');
		password.sendKeys('password');
		submit.click();
		droptoggle.click();
		signout.click();
  	});	
});