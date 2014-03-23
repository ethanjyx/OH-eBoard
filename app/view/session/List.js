Ext.define('testapp.view.session.List', {

	extend: 'Ext.List',
	//requires: 'Ext.SegmentedButton',
	requires: [
        'Ext.plugin.PullRefresh',
        'Ext.plugin.ListPaging',
        'Ext.tab.Panel',
        'Ext.field.Search'
    ],
	xtype: 'sessions',

	config: {
		plugins: [
            { type: 'listpaging' },
            { type: 'pullrefresh' }
        ],
		items: [
			{
				docked: 'top',
				xtype: 'toolbar',
				ui: 'gray',

				items: [
					{
	                    xtype: 'button',
	                    id: 'addButton',
	                    //text: 'Add new session',
	                    iconCls: 'add',
	                    align: 'right',
	                    hidden: false
	                },
	                { xtype: 'spacer' },
                    {
                        xtype: 'searchfield',
                        placeHolder: 'Search...',
                        listeners: {
                            scope: this,
                            clearicontap: function() {
							        //call the clearFilter method on the store instance
							        Ext.getStore('Sessions').clearFilter();
							    },
                            keyup: function(field) {
						        //get the store and the value of the field
						        var value = field.getValue(),
						            store = Ext.getStore('Sessions');
						    
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
						                        didMatch = search.test(record.get('courseSubject') + ' ' + record.get('courseNumber'));

						                    //if it matched the first or last name, push it into the matches array
						                    matched.push(didMatch);
						                }

						                return (regexps.length && matched.indexOf(true) !== -1);
						            });
						        }
						    }
                        }
                    },
                    { xtype: 'spacer' }
				]
			}
		],
        variableHeights: true,
        useSimpleItems: true,
		itemTpl: [
			'<div class="session"><div class="courseSubject">{courseSubject}&nbsp;{courseNumber}</div></div>'
		]
	},

	initialize: function() {
		this.config.title = testapp.app.title;
		this.callParent();

		//var segmentedButton = this.down('toolbar');

		//Ext.Array.each(testapp.sessionDays, function(day) {
			//segmentedButton.add(day);
		//});
		//segmentedButton.add(testapp.sessionDays[0]);
	},

	/**
     * Called when the search field has a keyup event.
     *
     * This will filter the store based on the fields content.
     *
    onSearchKeyUp: function(field) {
        //get the store and the value of the field
        var value = field.getValue(),
            store = Ext.getStore('Sessions');
        console.log(store);
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
                        didMatch = search.test(record.get('courseSubject') + ' ' + record.get('courseNumber'));

                    //if it matched the first or last name, push it into the matches array
                    matched.push(didMatch);
                }

                return (regexps.length && matched.indexOf(true) !== -1);
            });
        }
    },

    /**
     * Called when the user taps on the clear icon in the search field.
     * It simply removes the filter form the store
     *
    onSearchClearIconTap: function() {
        //call the clearFilter method on the store instance
        Ext.getStore('Sessions').clearFilter();
    }*/
});
