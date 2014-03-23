Ext.define('testapp.view.session.Detail', {

	extend: 'Ext.Container',
	xtype: 'session',

	config: {

		layout: 'vbox',
		title: '',

		items: [
            {
                flex: 1,
                layout: 'fit',
                scrollable: 'vertical',
				xtype: 'sessionInfo'
			},
			{
                xtype: 'button',
                id: 'joinButton',
                ui: 'btnColor',
                text: 'join',
                align: 'right',
                hidden: false
            },
            /*
            {
                xtype: 'component',
                cls: 'dark',
                html: 'Students'
            },*/
			{
                flex: 3,
				xtype: 'speakers',
				store: 'SessionSpeakers'

			}
		]

	}
});
