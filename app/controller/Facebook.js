Ext.define('testapp.controller.Facebook', {
    extend: 'Ext.app.Controller',

    requires: ['testapp.Facebook'],

    config: {
        control: {
            '#fbLogin': {
                tap: 'onFacebookLogin'
            }
        }
    },

    init: function() {
        testapp.Facebook.on({
            exception: function() {
                Ext.create('testapp.view.Dialog', { msg: 'The connection to Facebook has timed out' }).show();
            },
            connected: this.onFacebookConnected
/*
            ,
            connected: this.onFacebookConnected,
            logout: this.onFacebookLogout,
            unauthorized: this.onFacebookUnauthorized,
            scope: this
*/
        });
    },

    // Redirect to Facebook when the user taps the Facebook Login button
    onFacebookLogin: function() {
        window.top.location = testapp.Facebook.redirectUrl();
    },

    onFacebookConnected: function() {
        // Ext.Viewport.add({ xtype: 'main' });
        // Ext.Viewport.setActiveItem({xtype: 'main'});

        var userCourseStore = Ext.getStore('UserCourseStore');
        var queryJoinTable = {
                user: {
                    __type: "Pointer",
                    className: "User",
                    objectId: testapp.Facebook.userObjectId
                },
                history: false
            };

        userCourseStore.getProxy().setExtraParams({
            where: JSON.stringify(queryJoinTable),
            include: 'courseOH'
        });

        userCourseStore.load();

        Ext.getStore('Sessions').load(function(){
            Ext.Viewport.add({ xtype: 'main' });
            Ext.Viewport.setActiveItem(1);
        });
        
    }
});