Ext.define('testapp.view.speaker.List', {

	extend: 'Ext.List',
	requires: [
        'Ext.plugin.PullRefresh',
        'Ext.plugin.ListPaging'
    ],
	xtype: 'speakers',

	config: {
		title: 'Speakers',
		itemCls: 'speaker',
        variableHeights: true,
        plugins: [
            { type: 'listpaging' },
            { type: 'pullrefresh' }
        ],
		itemTpl: [
			'<div class="avatar" style="background-image: url({photo});"></div>',
			'<h3>{first_name} {last_name}</h3>',
			'<h4>{position}, {affiliation}</h4>'
		]
	}
});
