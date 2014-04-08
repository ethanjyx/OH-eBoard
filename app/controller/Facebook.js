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
            connected: this.onFacebookConnected,
            unauthorized: this.onFacebookUnauthorized
/*
            ,
            connected: this.onFacebookConnected,
            logout: this.onFacebookLogout,
            
            scope: this
*/
        });
    },

    // Redirect to Facebook when the user taps the Facebook Login button
    onFacebookLogin: function() {
        Ext.Viewport.setMasked({xtype:'loadmask'});
        window.top.location = testapp.Facebook.redirectUrl();
    },

    onFacebookConnected: function() {
        // Ext.Viewport.add({ xtype: 'main' });
        // Ext.Viewport.setActiveItem({xtype: 'main'});

        Ext.getStore('Sessions').load(function(){
            Ext.Viewport.add({ xtype: 'main' });
            Ext.Viewport.setActiveItem(1);
            Ext.Viewport.setMasked(false);
        });
        
    },

    onFacebookUnauthorized: function() {
        Ext.Viewport.setMasked(false);
    }
});