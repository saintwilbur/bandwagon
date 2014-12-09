//navBar.js
describe('test navBar', function() {
	var username = element(by.id('username'));
	var password = element(by.id('password'));
	var submit = element(by.id('submit'));
	var error = element(by.binding('error'));
	var droptoggle = element(by.id('droptoggle'));
	var myCalendar = element(by.id('myCalendar'));
	var myArtists = element(by.id('myArtists'));
	var editProfile = element(by.id('editProfile'));
	var manageMusic = element(by.id('manageMusic'));
	var changePassword = element(by.id('changePassword'));
	var signout = element(by.id('signout'));

	function signin() {
		browser.get('http://localhost:3000/#!/signin');
		username.sendKeys('ThisNewUser');
		password.sendKeys('password');
		submit.click();
		droptoggle.click();
	}

	beforeEach(function() {
		browser.get('http://localhost:3000/#!/');
	});

	it('My Calendar button should load /gigs', function() {	
		signin();
		myCalendar.click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/gigs');
  	});	

  	it('My Artists button should load /artists', function() {	
		myArtists.click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/artists');
  	});	

  	it('Edit profile button should load /settings/profile', function() {	
		droptoggle.click();
		editProfile.click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/settings/profile');
  	});	

  	it('Manage music button should load /integrations', function() {	
		droptoggle.click();
		manageMusic.click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/integrations');
  	});	

  	it('Change password button should load /settings/password', function() {	
		droptoggle.click();
		changePassword.click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/settings/password');
  	});	

  	it('Signout button should redirect to home', function() {	
		droptoggle.click();
		signout.click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/');
  	});	
});