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
        testapp.view.session.Load.loadCourseList(function() {
            Ext.Viewport.add({ xtype: 'main' });
            Ext.Viewport.setActiveItem(1);
        });
        
    }
});