Ext.define('testapp.view.LoggedOut', {
	extend: 'Ext.Container',

	xtype: 'loggedOut',

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
		                src: 'resources/images/facebook-login-button.png',
		                id: 'fbLogin',
		                cls: 'fbLogin',
		                width: 246,
		                height: 47,
		                centered: true,
		                top: '70%'
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