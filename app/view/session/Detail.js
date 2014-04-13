Ext.define('testapp.view.session.Detail', {

	extend: 'Ext.Container',
	xtype: 'session',

	config: {
        
		layout: {
            pack: 'center',
            type: 'vbox',
            align: 'center'
        },
		title: '',

		items: [
            {
                flex: 1,
                layout: 'fit',
                width: document.documentElement.clientWidth,
                scrollable: 'vertical',
				xtype: 'sessionInfo'
			},
			{
                xtype: 'button',
                id: 'joinButton',
                ui: 'btnColor',
                text: 'Join',
                align: 'center',
                width: document.documentElement.clientWidth*0.98,
                hidden: false
            },
            {
                xtype: 'button',
                id: 'quitButton',
                ui: 'btnColor',
                text: 'Quit',
                align: 'center',
                width: document.documentElement.clientWidth*0.98,
                hidden: true
            },
            {
                xtype: 'button',
                id: 'closeSessionButton',
                ui: 'btnColor',
                text: 'Close this session',
                align: 'center',
                width: document.documentElement.clientWidth*0.98,
                hidden: true
            },
            /*
            {
                xtype: 'component',
                cls: 'dark',
                html: 'Students'
            },*/
			{
                flex: 5,
                layout: 'fit',
				xtype: 'speakers',
				store: 'WaitingUsers',
                width: document.documentElement.clientWidth

			}
		]

	}
});
