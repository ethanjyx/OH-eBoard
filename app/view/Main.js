Ext.define('OHeBoard.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'Ext.data.Store',
        'Ext.List',
        'Ext.field.Search',
        'Ext.Toolbar',
        'Ext.Panel'
    ],
    config: {
        listConfiguration: null,

        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Welcome',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Welcome to Sencha Touch 2'
                },

                html: [
                    "You've just generated a new Sencha Touch 2 project. What you're looking at right now is the ",
                    "contents of <a target='_blank' href=\"app/view/Main.js\">app/view/Main.js</a> - edit that file ",
                    "and refresh to change what's rendered here."
                ].join("")
            },
            {
                title: 'Get Started',
                iconCls: 'action',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Getting Started'
                    },
                    {
                        xtype: 'video',
                        url: 'http://av.vimeo.com/64284/137/87347327.mp4?token=1330978144_f9b698fea38cd408d52a2393240c896c',
                        posterUrl: 'http://b.vimeocdn.com/ts/261/062/261062119_640.jpg'
                    }
                ]
            },
            {
                title: 'Me',
                iconCls: 'user',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Getting Started'
                    },
                    {
                        xtype: 'video',
                        url: 'http://av.vimeo.com/64284/137/87347327.mp4?token=1330978144_f9b698fea38cd408d52a2393240c896c',
                        posterUrl: 'http://b.vimeocdn.com/ts/261/062/261062119_640.jpg'
                    }
                ]
            }, 
            {
                title: "Course List",
                iconCls: 'home',
                id: 'courseList',

                items: []
            }
        ]
    },
    initialize: function() {
        this.callParent(arguments);
        listConfiguration = this.getListConfiguration();
        //var courseList = Ext.getCmp("courseList");
        //courseList.add(listConfiguration);
    },
    getListConfiguration: function() {
        return {
            //give it an xtype of list
            xtype: 'list',

            ui: 'round',

            pinHeaders: false,

            //itemTpl defines the template for each item in the list
            itemTpl: '<div class="contact">{firstName} <strong>{lastName}</strong></div>',

            //give it a link to the store instance
            store: this.getStore(),

            useSimpleItems: true,

            grouped: true,
            emptyText: '<div style="margin-top: 20px; text-align: center">No Matching Items</div>',
            disableSelection: true,

            items: [
                {
                    xtype: 'toolbar',
                    docked: 'top',

                    items: [
                        { xtype: 'spacer' },
                        {
                            xtype: 'searchfield',
                            placeHolder: 'Search...',
                            listeners: {
                                scope: this,
                                clearicontap: this.onSearchClearIconTap,
                                keyup: this.onSearchKeyUp
                            }
                        },
                        { xtype: 'spacer' }
                    ]
                }
            ]
        };
    },
    getStore: function() {
        //check if a store has already been set
        if (!this.store) {
            Ext.Msg.alert("init store!");
            
            //if not, create one
            this.store = Ext.create('Ext.data.Store', {
                //define the stores fields
                fields: ['firstName', 'lastName'],

                //sort the store using the lastname field
                sorters: 'lastName',

                //group the store using the lastName field
                groupField: 'lastName',

                //and give it some data
                data: [
                    { firstName: 'Tommy',   lastName: 'Maintz' },
                    { firstName: 'Rob',     lastName: 'Dougan' },
                    { firstName: 'Ed',      lastName: 'Avins' },
                    { firstName: 'Jamie',   lastName: 'Avins' },
                    { firstName: 'Dave',    lastName: 'Dougan' },
                    { firstName: 'Abraham', lastName: 'Elias' },
                    { firstName: 'Jacky',   lastName: 'Ngyuyen' },
                    { firstName: 'Jay',   lastName: 'Ngyuyen' },
                    { firstName: 'Jay',     lastName: 'Robinson' },
                    { firstName: 'Rob',   lastName: 'Avins' },
                    { firstName: 'Ed',     lastName: 'Dougan' },
                    { firstName: 'Jamie',    lastName: 'Poulden' },
                    { firstName: 'Dave',      lastName: 'Spencer' },
                    { firstName: 'Abraham',   lastName: 'Avins' },
                    { firstName: 'Jacky',   lastName: 'Avins' },
                    { firstName: 'Rob',    lastName: 'Kaneda' },
                    { firstName: 'Ed', lastName: 'Elias' },
                    { firstName: 'Tommy',    lastName: 'Dougan' },
                    { firstName: 'Rob',     lastName: 'Robinson' }
                ]
            });
        }

        //return the store instance
        return this.store;
    },
    onSearchKeyUp: function(field) {
        //get the store and the value of the field
        var value = field.getValue(),
            store = this.getStore();

        //first clear any current filters on the store. If there is a new value, then suppress the refresh event
        store.clearFilter(!!value);

        //check if a value is set first, as if it isnt we dont have to do anything
        if (value) {
            //the user could have entered spaces, so we must split them so we can loop through them all
            var searches = value.split(','),
                regexps = [],
                i, regex;

            //loop them all
            for (i = 0; i < searches.length; i++) {
                //if it is nothing, continue
                if (!searches[i]) continue;

                regex = searches[i].trim();
                regex = regex.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

                //if found, create a new regular expression which is case insenstive
                regexps.push(new RegExp(regex.trim(), 'i'));
            }

            //now filter the store by passing a method
            //the passed method will be called for each record in the store
            store.filter(function(record) {
                var matched = [];

                //loop through each of the regular expressions
                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i],
                        didMatch = search.test(record.get('firstName') + ' ' + record.get('lastName'));

                    //if it matched the first or last name, push it into the matches array
                    matched.push(didMatch);
                }

                return (regexps.length && matched.indexOf(true) !== -1);
            });
        }
    },
    onSearchClearIconTap: function() {
        //call the clearFilter method on the store instance
        this.getStore().clearFilter();
    }
});
