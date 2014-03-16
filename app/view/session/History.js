Ext.define('testapp.view.session.History', {
    extend: 'Ext.Container',
    xtype: 'list-history',

    config: {

        layout: 'vbox',
        title: '',

        items: [
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
