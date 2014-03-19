Ext.define('testapp.view.LoggedOut', {
	extend: 'Ext.Container',

	xtype: 'loggedOut',
	style: 'background-color:#ffffff',

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
						src: 'resources/images/OH-eBoard_original.png',
						id: 'home_logo',
						width: 243,
						height: 79,
						centered: true,
						style: 'position:relative;'
					},
		            {
		                xtype: 'image',
		                src: 'resources/images/facebook-login-button.png',
		                id: 'fbLogin',
		                cls: 'fbLogin',
		                width: 246,
		                height: 47,
		                centered: true,
		                style: 'position:relative; top:90px; '
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