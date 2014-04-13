Ext.define('testapp.view.LoggedOut', {
	extend: 'Ext.Container',

	xtype: 'loggedOut',
	style: 'background-color:#3c9dd0',

	config: {

		layout: 'fit',
		cls: 'loggedOut',

		items: [
			{
				xtype: 'container',
				cls: 'loginScreen',
				items: [
					{
						xtype: 'image',
						/*
						src: 'resources/images/background.png',
						id: 'home_background',
						width: 600,
						height: 500,
						centered: true,
						style: 'position:relative;'
						*/
						html: '<script src="http://src.sencha.io/screen.js"></script><center><img src="http://src.sencha.io/screen.width/http://oheboard.parseapp.com/resources/images/background.png" /></center>'
					},
		            {
		                xtype: 'image',
		                src: 'resources/images/facebook-login-button.png',
		                id: 'fbLogin',
		                cls: 'fbLogin',
		                width: 246,
		                height: 47,
		                centered: true,
		                style: 'position:relative; top:160px; '
		            // },
		            // {
		            // 	xtype: 'component',
		            // 	id: 'facePile',
		            // 	html: '<div class="fb-facepile" data-app-id="358904677456171" data-max-rows="1" data-width="220" data-colorscheme="dark"></div>'
					}
				]
			}
		]
	}
});