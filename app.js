//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'testapp': 'app'
});
//</debug>

Ext.require('testapp.util.Proxy');

Ext.application({
    // Change the values below to re-configure the app for a different conference.

    title:   'OH eBoard',
    dataUrl: 'http://en.oreilly.com/web2010/public/mobile_app/all',

    twitterSearch: '#w2s',

    mapCenter: [37.788539, -122.401643],
    mapText: 'The Palace Hotel<br /><small>2 New Montgomery Street<br />San Francisco, CA 94105<br />(415) 512-1111</small>',

    aboutPages: [
        {
            title: 'Overview',
            xtype: 'htmlPage',
            url: 'data/about.html'
        },
        {
            title: 'Sponsors',
            xtype: 'htmlPage',
            url: 'data/sponsors.html'
        },
        {
            title: 'Credits',
            xtype: 'htmlPage',
            url: 'data/credits.html'
        },
        {
            title: 'Videos',
            xtype: 'videoList',
            playlistId: '2737D508F656CCF8',
            hideText: 'Web 2.0 Summit 2010: '
        }
    ],

    // App namespace

    name: 'testapp',

    startupImage: {
        '320x460': 'resources/startup/Default.jpg', // Non-retina iPhone, iPod touch, and all Android devices
        '640x920': 'resources/startup/640x920.png', // Retina iPhone and iPod touch
        '640x1096': 'resources/startup/640x1096.png', // iPhone 5 and iPod touch (fifth generation)
        '768x1004': 'resources/startup/768x1004.png', //  Non-retina iPad (first and second generation) in portrait orientation
        '748x1024': 'resources/startup/748x1024.png', //  Non-retina iPad (first and second generation) in landscape orientation
        '1536x2008': 'resources/startup/1536x2008.png', // : Retina iPad (third generation) in portrait orientation
        '1496x2048': 'resources/startup/1496x2048.png' // : Retina iPad (third generation) in landscape orientation
    },

    isIconPrecomposed: false,
    icon: {
        57: 'resources/icons/icon.png',
        72: 'resources/icons/icon@72.png',
        114: 'resources/icons/icon@2x.png',
        144: 'resources/icons/icon@72.png'
    },

    // Dependencies

    requires: ['testapp.util.Proxy'],

    models: [
        'Session',
        'Speaker',
        'JoinUser',
        'UserCourse'
    ],

    views: [
        'Main',
        'LoggedOut',

        'session.Card',
        'session.List',
        'session.Detail',
        'session.Info',
        'session.Add',
        'session.History',
        'session.Join',
        //'session.TimePickerField',

        'speaker.Card',
        'speaker.List',
        'speaker.Detail',
        'speaker.Info',
        'speaker.UserCourseList',
        'speaker.UserCourseOwnList',
        'speaker.Tabs'

    ],

    controllers: [
        'Facebook',
        'Sessions',
        'Speakers'
    ],

    stores: [
        'Sessions',
        'SpeakerSessions',
        'Speakers',
        'SessionSpeakers',
        'UserCourseStore',
        'UserCourseOwn',
        'History'
    ],

    launch: function() {
        testapp.controller.Speakers.lastTabHit = 2;

        testapp.Facebook.initialize('241720436011519');
        Ext.Viewport.add({xtype: 'loggedOut'});
        /*
        Ext.getStore('Sessions').load(function(){
            Ext.Viewport.add({ xtype: 'main' });
        });
        */
        // Ext.Viewport.setMasked({ xtype: 'loadmask' });
        
        
        // setInterval(function(){
        //     Ext.DomQuery.select('link')[0].href = "resources/css/oreilly.css?" + Math.ceil(Math.random() * 100000000)
        // }, 1000);
    }

});
