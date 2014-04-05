Ext.define('testapp.view.session.Card', {

    extend: 'Ext.NavigationView',
    xtype: 'sessionContainer',

    config: {

        title: 'Sessions',
        iconCls: 'time',

        autoDestroy: false,

        navigationBar: {
            splitNavigation: (Ext.theme.name == "Blackberry") ? {
                xtype: 'toolbar',
                items: [{
                    docked: 'right',
                    xtype: 'button',
                    iconCls: 'time',
                    hidden: true
                }]
            } : false,
            //ui: (Ext.theme.name == "Blackberry") ? 'light' : 'sencha',
            items: [
                {
                    xtype: 'button',
                    id: 'historyButton',
                    text: 'History',
                    align: 'right',
                    hidden: true
                    // ,
                    // hideAnimation: Ext.os.is.Android ? false : {
                    //     type: 'fadeOut',
                    //     duration: 200
                    // },
                    // showAnimation: Ext.os.is.Android ? false : {
                    //     type: 'fadeIn',
                    //     duration: 200
                    // }
                },

                {
                    xtype: 'button',
                    id: 'logoutButton',
                    text: 'Logout',
                    align: 'left',
                    //hidden: true,
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                } 
            ]
        },

        items: [
            {
                xtype: 'sessions',
                store: 'Sessions',
                grouped: true,
                pinHeaders: false
            }
        ]
    }
});
