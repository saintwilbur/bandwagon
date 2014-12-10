//soundcloudIntegration.js
describe('test Soundcloud integration', function() {
	var username = element(by.id('username'));
	var password = element(by.id('password'));
	var submit = element(by.id('submit'));
	var error = element(by.binding('error'));
	var droptoggle = element(by.id('droptoggle'));
	var soundcloudImg = element(by.id('soundcloudImg'));
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

	it('Soundcloud icon should load Soundcloud login', function() {	
		signin();
		browser.get('http://localhost:3000/#!/integrations');
		soundcloudImg.click();
		expect(browser.driver.getCurrentUrl()).toEqual('https://soundcloud.com/connect?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fsoundcloud%2Fcallback&client_id=e4e0fdb81cf9639598a43f9071cd48c1');
  		browser.driver.navigate().to('http://localhost:3000/#!/integrations');
  		droptoggle.click();
  		signout.click();
  	});

});