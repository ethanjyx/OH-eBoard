Ext.define('testapp.view.speaker.List', {

	extend: 'Ext.List',
	requires: [
        'Ext.plugin.PullRefresh'
    ],
	xtype: 'speakers',

	config: {
		title: 'Speakers',
		itemCls: 'speaker',
        variableHeights: true,
        plugins: [
            { type: 'pullrefresh' }
        ],
		itemTpl: [
			'<div class="avatar" style="background-image: url(http://graph.facebook.com/{facebookId}/picture);"> </div>',
			'<h3><div class="nametag">{firstName} {lastName}</div>',
			'<div class="postag">{position}</div></h3>'
		]
	}
});
