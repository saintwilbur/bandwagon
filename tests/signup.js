// signup.js
describe('angularjs homepage', function() {
	var firstName = element(by.id('firstName'));
	var lastName = element(by.id('lastName'));
	var email = element(by.id('email'));
	var username = element(by.id('username'));
	var password = element(by.id('password'));
	var submit = element(by.id('submit'));
	var error = element(by.binding('error'));
	var droptoggle = element(by.id('droptoggle'));
	var signout = element(by.id('signout'));

	function createUser(a, b, c, d, e){
	firstName.sendKeys(a);
  	lastName.sendKeys(b);
  	email.sendKeys(c);
  	username.sendKeys(d);
  	password.sendKeys(e);
  	submit.click();
	}

	beforeEach(function() {
		browser.get('http://localhost:3000/#!/signup');
	});

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('bandwagon - Development Environment'); 
  });

  it('should need a first name', function() {
  	firstName.sendKeys('');
  	lastName.sendKeys('test');
  	email.sendKeys('test@test.com');
  	username.sendKeys('test');
  	password.sendKeys('password');
  	submit.click();
  	expect(error.getText()).toEqual('Please fill in your first name');
  });

  it('should need a last name', function() {
  	firstName.sendKeys('test');
  	lastName.sendKeys('');
  	email.sendKeys('test@test.com');
  	username.sendKeys('test');
  	password.sendKeys('password');
  	submit.click();
  	expect(error.getText()).toEqual('Please fill in your last name');
  });

  it('should need an email', function() {
  	firstName.sendKeys('test');
  	lastName.sendKeys('test');
  	email.sendKeys('');
  	username.sendKeys('test');
  	password.sendKeys('password');
  	submit.click();
  	expect(error.getText()).toEqual('Please fill in your email');
  });

  it('email should need an @ ', function() {
  	firstName.sendKeys('test');
  	lastName.sendKeys('test');
  	email.sendKeys('test');
  	username.sendKeys('test');
  	password.sendKeys('password');
  	submit.click();
  	expect(error.getText()).toEqual('Please fill in your email');
  });

  it('should need a username', function() {
  	firstName.sendKeys('test');
  	lastName.sendKeys('test');
  	email.sendKeys('test@test.com');
  	username.sendKeys('');
  	password.sendKeys('password');
  	submit.click();
  	expect(error.getText()).toEqual('Please fill in a username');
  });

  it('should need a password', function() {
  	firstName.sendKeys('test');
  	lastName.sendKeys('test');
  	email.sendKeys('test@test.com');
  	username.sendKeys('test');
  	password.sendKeys('');
  	submit.click();
  	expect(error.getText()).toEqual('Password should be longer');
  });

  it('should error if user exists', function() {
  	firstName.sendKeys('test');
  	lastName.sendKeys('test');
  	email.sendKeys('test@test.com');
  	username.sendKeys('test');
  	password.sendKeys('password');
  	submit.click();
  	expect(error.getText()).toEqual('Username already exist');
  });

  it('creates a newuser', function() {
  	createUser('ThisNewUser', 'ThisNewUser', 'ThisNewUser@ThisNewUser.com', 'ThisNewUser', 'password');
  	droptoggle.click();
  	signout.click();
  });

});