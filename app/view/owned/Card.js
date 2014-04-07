Ext.define('testapp.view.owned.Card', {

    extend: 'Ext.Container',
    xtype: 'ownedContainer',

    config: {
        tab: {
            title: 'Owned',
            id: 'ownedTab',
            iconCls: 'team',
        },

        autoDestroy: false,
        layout: 'fit',

        items: [
            {
                xtype: 'titlebar',
                title: 'Session Owned',
                docked: 'top',
            },

            {
                xtype: 'userCourseOwnList',
                store: 'UserCourseOwn',
                pinHeaders: false
            }
        ]
    }
});
