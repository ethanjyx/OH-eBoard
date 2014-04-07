/**
 * This class wraps the Facebook Javascript SDK authentication methods.
 * Once initialized with a Facebook app ID, the following events will be fired:
 *
 * - `loginStatus`  Fired when the login status call has returned with a result. Useful for taking actions whether
 *                  the result of the loginStatus call was successful or not.
 * - `connected`    Fired when the Facebook user is connected to the app
 * - `unauthorized` Fired when the Facebook user is not authorized for the app
 * - `logout`       Fired when the user logs out fo Facebook
 * - `exception`    Fired when there is a Facebook excpetion (such as a timeout)
 */
Ext.define('testapp.Facebook', {

    mixins: ['Ext.mixin.Observable'],

    singleton: true,

    /**
     * @event loginStatus   Fired when the loginStatus method has returned
     * @event connected     User has logged in and it connected
     * @event unauthorized  User has logged in but has not authorized the app
     * @event logout        User has logged out
     * @event exception     Facebook exception
     *   @param {Object} exception
     *   @param {String} exception.type
     *   @param {String} exception.msg
     */

    fbTimeout: 10000,
    userObjectId: null,

    /**
     * @constructor
     * Load the Facebook Javascript SDK asynchronously
     * @param {String} appId  Facebook application ID
     */
    initialize: function(appId) {

        this.appId = appId;

        window.fbAsyncInit = Ext.bind(this.onFacebookInit, this);
/*
        (function(d){
            var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
            js = d.createElement('script'); js.id = id; js.async = true;
            
            //js.src = "app/facebook-sdk.js";
            //d.getElementsByTagName('head')[0].appendChild(js);

            // js.src = "app/facebookSDK/facebook-js-sdk.js";
            // d.getElementsByTagName('head')[0].appendChild(js);

            // js.src = "app/facebookSDK/cdv-plugin-fb-connect.js";
            // d.getElementsByTagName('head')[0].appendChild(js);
        }(document));
*/
    },

    /**
     * This fucntion is run when the Facebook JS SDK has been successfully laoded onto the page.
     */
    onFacebookInit: function() {

        if (!this.appId) {
            Ext.Logger.error('No Facebook Application ID set.');
            return;
        }

        FB.init({
            appId: this.appId,
            cookie: true,
            frictionlessRequests: true
        });

        var me = this;
        me.hasCheckedStatus = false;

        FB.Event.subscribe('auth.logout', function() {
            // This event can be fired as soon as the page loads which may cause undesired behaviour, so we wait
            // until after we've specifically checked the login status.
            if (me.hasCheckedStatus) {
                me.fireEvent('logout');
            }
        });

        // Get the user login status from Facebook.
        FB.getLoginStatus(function(response) {
            //alert('456');
            //me.fireEvent('loginStatus');

            clearTimeout(me.fbLoginTimeout);
            me.hasCheckedStatus = true;

            if (response.status == 'connected') {
                me.checkUserTable(response.authResponse.userID, function(){
                    var userCourseOwn = Ext.getStore('UserCourseOwn');
                    var queryUserCourseOwn = {
                        holder: {
                            __type: "Pointer",
                            className: "User",
                            objectId: testapp.Facebook.userObjectId
                        }
                    };

                    userCourseOwn.getProxy().setExtraParams({
                        where: JSON.stringify(queryUserCourseOwn)
                    });

                    userCourseOwn.load();

                    var userCourseJoin = Ext.getStore('UserCourseJoin');
                    var queryUserCourseJoin = {
                            user: {
                               __type: "Pointer",
                                className: "User",
                                objectId: testapp.Facebook.userObjectId
                            },
                            history: false
                        };

                    userCourseJoin.getProxy().setExtraParams({
                        where: JSON.stringify(queryUserCourseJoin),
                        include: 'courseOH'
                    });

                    me.fireEvent('connected');
                });
            } else {
                me.fireEvent('unauthorized');
            }
        });

        // We set a timeout in case there is no response from the Facebook `init` method. This often happens if the
        // Facebook application is incorrectly configured (for example if the browser URL does not match the one
        // configured on the Facebook app.)
        me.fbLoginTimeout = setTimeout(function() {
            me.fireEvent('loginStatus');
            me.fireEvent('exception', {
                type: 'timeout',
                msg: 'The request to Facebook timed out.'
            });
        }, me.fbTimeout);
    },

    checkUserTable: function(fb_id, callback) {
        var parse = new Parse("Wc5ZhPmum7iezzBsnuYkC9h2yQdrPseP4mzpyUPv", "6FgZ9ItKztfQOmQmtmZzvOdaVDSSNhOeZfuG2N1g");
        var query_fb_id = {
            facebookId : fb_id
        }
        var that = this;
        parse.query({
            success: function(result) {
                if (result.results.length != 0){
                    that.userObjectId = result.results[0].objectId;
                    callback();
                    return;
                }
                that.insert_fb_id(fb_id);
            },
            error: function(result) {
                alert("A query error occured");
            },
            className: 'User',
            params: query_fb_id
        });
    }, 

    insert_fb_id: function(fb_id) {
        var that = this;
        FB.api('me?fields=first_name,last_name', function(response) {
            var parse = new Parse("Wc5ZhPmum7iezzBsnuYkC9h2yQdrPseP4mzpyUPv", "6FgZ9ItKztfQOmQmtmZzvOdaVDSSNhOeZfuG2N1g");
            parse.create({
                object: {facebookId:fb_id, id:fb_id, firstName:response.first_name, lastName:response.last_name },
                success: function(result) {
                    console.log("objectId created " + result.objectId);
                    that.userObjectId = result.objectId;
                },
                error: function(result) {
                    return console.log("A creation error occured");
                },
                className: 'User'
            });                
        });
    },

    /**
     * Returns the app location. If we're inside an iFrame, return the top level path
     */
    currentLocation: function() {
        if (window.top.location.host) {
            return window.top.location.protocol + "//" + window.top.location.host + window.top.location.pathname
        } else {
            return window.location.protocol + "//" + window.location.host + window.location.pathname
        }
    },

    /**
     * The Facebook authentication URL.
     */
    redirectUrl: function() {

        var redirectUrl = Ext.Object.toQueryString({
            redirect_uri: this.currentLocation(),
            client_id: this.appId,
            scope: 'publish_actions,share_item'
        });

        if (!Ext.os.is.Android && !Ext.os.is.iOS && /Windows|Linux|MacOS/.test(Ext.os.name)) {
            return "https://www.facebook.com/dialog/oauth?" + redirectUrl;
        } else {
            return "https://m.facebook.com/dialog/oauth?" + redirectUrl;
        }
    },

    error: function(err) {

        var errMsg = "Unknown Facebook error";

        if (typeof err == 'object') {

            if (err.type && err.message && err.code) {

                if (err.type == 'OAuthException' && err.code == 100) {

                    errMsg = [
                        "<p>Activate your Facebook Timeline to share actions with friends.</p>",
                        "<p>Click 'Get Timeline' on the bottom of the Facebook page, then come back here.</p>"
                    ].join('');

                    Ext.create('testapp.view.Dialog', {
                        msg: errMsg,
                        buttons: [
                            {
                                ui: 'green',
                                text: 'Activate Timeline on Facebook',
                                handler: function() {
                                    window.location = 'http://www.facebook.com/timeline';
                                }
                            },
                            {
                                ui: 'red',
                                text: "Don't ask again.",
                                handler: function() {
                                    this.getParent().hide()
                                }
                            }
                        ]
                    }).show();

                    return;

                } else if (err.type == 'OAuthException' && err.code == 200) {

                    errMsg = [
                        "<p>We need permission to share your Watchlist activity with friends.</p>",
                        "<p>Go to Facebook and grant permission?</p>"
                    ].join('');

                    Ext.create('testapp.view.Dialog', {
                        msg: errMsg,
                        buttons: [
                            {
                                ui: 'green',
                                text: 'Grant permissions.',
                                handler: function() {
                                    window.top.location = testapp.Facebook.redirectUrl();
                                }
                            },
                            {
                                ui: 'red',
                                text: "Don't ask again.",
                                handler: function() {
                                    this.getParent().hide()
                                }
                            }
                        ]
                    }).show();

                    return;
                }

                errMsg = err.message;
            }
        }

        Ext.create('testapp.view.Dialog', { msg: errMsg }).show();
    }
});