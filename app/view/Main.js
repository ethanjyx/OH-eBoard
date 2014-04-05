Ext.define('testapp.view.Main', {

	extend: 'Ext.tab.Panel',
	xtype: 'main',
	id: 'mainTabPanel',

	config: {
		
		tabBarPosition: 'bottom',
		tabBar: {
			ui: 'gray'
		},

		items: [
			{ xclass: 'testapp.view.session.Card' },
			{ xclass: 'testapp.view.joined.Card' },
			{ xclass: 'testapp.view.owned.Card' }
/*
			,
			{ xclass: 'testapp.view.Tweets'   },
			{ xclass: 'testapp.view.Location' },
			{ xclass: 'testapp.view.about.Card'    }
			*/
		]
	}
});
