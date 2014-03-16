Ext.define('testapp.view.about.List', {

	extend: 'Ext.List',
	xtype: 'aboutList',

	config: {
		title: 'About',
		ui: 'round',
		itemTpl: [ '{title}' ]
	},

	initialize: function() {
		this.callParent();
		this.setData(testapp.app.aboutPages);
	}
});
