Ext.define('testapp.view.session.List', {

	extend: 'Ext.List',
	//requires: 'Ext.SegmentedButton',

	xtype: 'sessions',

	config: {
		items: [
			{
				docked: 'top',
				xtype: 'toolbar',
				ui: 'gray',

				items: [
					{
	                    xtype: 'button',
	                    id: 'addButton',
	                    text: 'Add new session',
	                    align: 'right',
	                    hidden: false
	                }
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

		var segmentedButton = this.down('toolbar');

		//Ext.Array.each(testapp.sessionDays, function(day) {
			//segmentedButton.add(day);
		//});
		//segmentedButton.add(testapp.sessionDays[0]);
	}
});
