Ext.define('testapp.view.session.Info', {

	extend: 'Ext.Container',
	xtype: 'sessionInfo',

	config: {

		cls: 'sessionInfo',

		tpl: Ext.create('Ext.XTemplate',
			'<h3>{title} {courseSubject} {courseNumber} Office Hour</h3>',
			'<h4> from {startTime} to {endTime} at {location}</h4>',
			'<p>Holder: {holderName}</p>',
			{
				formatTime: function(time) {
					return ''; //Ext.Date.format(time, 'g:ia, m/d/Y')
				}
			}
		)
	}
});
