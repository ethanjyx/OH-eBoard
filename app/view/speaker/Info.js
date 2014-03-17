Ext.define('testapp.view.speaker.Info', {

	extend: 'Ext.Container',
	xtype: 'speakerInfo',

	config: {

		cls: 'speakerInfo',
		tpl: [
			'<div class="header">',
				'<h3>{firstName} {lastName}</h3>',
				'<h4>{position}</h4>',
			'</div>',
			'<p>{bio}</p>'
		]
	}
});
