//signin.js
describe('angularjs homepage', function() {
	var username = element(by.id('username'));
	var password = element(by.id('password'));
	var submit = element(by.id('submit'));
	var error = element(by.binding('error'));

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

	it('password should match', function() {	
		username.sendKeys('ThisNewUser');
		password.sendKeys('bananan');
		submit.click();
    	expect(error.getText()).toEqual('Invalid password'); 
  });	

	
});