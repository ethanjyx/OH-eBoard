Ext.define('testapp.view.joined.Card', {

    extend: 'Ext.Container',
    xtype: 'joinedContainer',

    config: {
        tab: {
            title: 'Joined',
            id: 'joinedTab',
            iconCls: 'user',
        },

        autoDestroy: false,
        layout: 'fit',

        items: [
            {
                xtype: 'titlebar',
                title: 'Session Joined',
                docked: 'top',
            },

            {
                xtype: 'userCourseJoinList',
                store: 'UserCourseJoin',
                pinHeaders: false
            }
        ]
    }
});
