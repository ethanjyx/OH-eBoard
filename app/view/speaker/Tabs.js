Ext.define('testapp.view.speaker.Tabs', {
    extend: 'Ext.tab.Panel',
    xtype: 'tabs',
    id: 'tabs',
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
                //cls: 'card dark',
                iconCls: Ext.theme.is.Blackberry || Ext.theme.is.CupertinoClassic || Ext.theme.is.Tizen ? 'home' : null,
                xtype: 'userCourseList',
                store: 'UserCourseStore',
                pinHeaders: false
            },
            {
                title: 'session owned',
                cls  : 'card',
                iconCls: Ext.theme.is.Blackberry || Ext.theme.is.CupertinoClassic|| Ext.theme.is.Tizen ? 'organize' : null,
                xtype: 'userCourseOwnList',
                store: 'UserCourseOwn',
                pinHeaders: false
            }
        ]
    }
});
