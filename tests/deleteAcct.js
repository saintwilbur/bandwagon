// deleteAcct.js
describe('test delete account', function() {
	var username = element(by.id('username'));
	var password = element(by.id('password'));
	var submit = element(by.id('submit'));
	var error = element(by.binding('error'));
	var droptoggle = element(by.id('droptoggle'));
	var deleteAccount = element(by.id('deleteAccount'));
	var cancelDelete = element(by.id('cancelDelete'));
	var confirmDelete = element(by.id('confirmDelete'));

	function signin() {
		browser.get('http://localhost:3000/#!/signin');
		username.sendKeys('ThisNewUser');
		password.sendKeys('password');
		submit.click();
	}

	beforeEach(function() {
		browser.get('http://localhost:3000/#!/');
	});

  	it('Cancel delete account button should load /gigs', function() {	
  		signin();
		droptoggle.click();
		deleteAccount.click();
		cancelDelete.click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/gigs');
  	});	

  	it('Confirm delete account button should delete user and load /', function() {	
		droptoggle.click();
		deleteAccount.click();
		confirmDelete.click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/');
  	});	

  	it('User should no longer exist', function() {	
		signin();
		expect(error.getText()).toEqual('Unknown user');
  	});	
 });