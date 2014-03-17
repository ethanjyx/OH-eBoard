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
			'<div class="avatar"> </div>',
			'<h3><div class="nametag">{firstName} {lastName}</div>',
			'<div class="postag">{position}</div></h3>'
		]
	}
});
