Ext.define('testapp.view.session.Info', {

	extend: 'Ext.Container',
	xtype: 'sessionInfo',

	config: {

		cls: 'sessionInfo',

		tpl: Ext.create('Ext.XTemplate',
			'<h3>{title} <small>{courseSubject}</small></h3>',
			'<h4>{courseNumber} at {startTime}</h4>',
			'<p>{description}</p>',
			{
				formatTime: function(time) {
					return ''; //Ext.Date.format(time, 'g:ia, m/d/Y')
				}
			}
		)
	}
});
