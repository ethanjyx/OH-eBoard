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
                html: 'Students'
            },
            {
                flex: 1,
                xtype: 'speakers',
                store: 'History'

            }
        ]

    }
});
