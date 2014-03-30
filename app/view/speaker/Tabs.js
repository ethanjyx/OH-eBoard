Ext.define('testapp.view.speaker.Tabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'tabs',
    config: {
        //ui: 'dark',
        tabBar: {
            //ui: 'dark',
            layout: {
                pack: Ext.filterPlatform('ie10') ? 'start' : 'center'
            }
        },
        activeTab: 1,
        defaults: {
            scrollable: true
        },
        items: [
            {
                title: 'session joined',
                //html : 'By default, tabs are aligned to the top of a view.',
                //cls: 'card dark',
                iconCls: Ext.theme.is.Blackberry || Ext.theme.is.CupertinoClassic || Ext.theme.is.Tizen ? 'home' : null,
                xtype: 'userCourseList',
                store: 'UserCourseStore',
                grouped: true,
                pinHeaders: false
            },
            {
                title: 'session owned',
                html : 'A TabPanel can use different animations by setting <code>layout.animation.</code>',
                cls  : 'card',
                iconCls: Ext.theme.is.Blackberry || Ext.theme.is.CupertinoClassic|| Ext.theme.is.Tizen ? 'organize' : null
            }
        ]
    }
});
