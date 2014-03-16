Ext.define('testapp.view.session.Detail', {

	extend: 'Ext.Container',
	xtype: 'session',

	config: {

		layout: 'vbox',
		title: '',

		items: [
			{
                xtype: 'button',
                id: 'joinButton',
                text: 'join',
                align: 'right',
                hidden: false
            },
            {
                xtype: 'component',
                cls: 'dark',
                html: 'Speakers'
            },
			{
                flex: 1,
				xtype: 'speakers',
				store: 'SessionSpeakers'

			}
		]

	}
});
