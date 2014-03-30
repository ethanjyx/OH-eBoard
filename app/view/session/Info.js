Ext.define('testapp.view.session.Info', {

	extend: 'Ext.Container',
	xtype: 'sessionInfo',

	config: {

		cls: 'sessionInfo',

		tpl: Ext.create('Ext.XTemplate',
			//'<h3>{title} {courseSubject} {courseNumber} Office Hour</h3>',
			'<h3> From {startTime} to {endTime} at {location}</h3>',
			'<h4>Holder: {holderName}</h4>',
			{
				formatTime: function(time) {
					return ''; //Ext.Date.format(time, 'g:ia, m/d/Y')
				}
			}
		)
	}
});
