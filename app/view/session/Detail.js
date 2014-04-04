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
                width: Ext.Viewport.getWindowWidth(),
                scrollable: 'vertical',
				xtype: 'sessionInfo'
			},
			{
                xtype: 'button',
                id: 'joinButton',
                ui: 'btnColor',
                text: 'join',
                align: 'center',
                width: Ext.Viewport.getWindowWidth()*0.98,
                hidden: false
            },
            {
                xtype: 'button',
                id: 'quitButton',
                ui: 'btnColor',
                text: 'quit',
                align: 'center',
                width: Ext.Viewport.getWindowWidth()*0.98,
                hidden: true
            },
            {
                xtype: 'button',
                id: 'closeSessionButton',
                ui: 'btnColor',
                text: 'Close this session',
                align: 'center',
                width: Ext.Viewport.getWindowWidth()*0.98,
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
				store: 'SessionSpeakers',
                width: Ext.Viewport.getWindowWidth()

			}
		]

	}
});
