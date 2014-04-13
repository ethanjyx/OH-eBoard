Ext.define('testapp.view.owned.UserCourseOwnList', {

	extend: 'Ext.List',
	requires: [
        'Ext.plugin.PullRefresh'
    ],
	xtype: 'userCourseOwnList',

	config: {
		
        plugins: [
            { type: 'pullrefresh' }
        ],
		itemTpl: [
		/*
			'<div class="avatar" style="background-image: url(http://graph.facebook.com/{facebookId}/picture);"> </div>',
			'<h3><div class="nametag">{firstName} {lastName}</div>',
			'<div class="postag">{position}</div></h3>'
			*/
			'<div class="session"><div class="title">{courseSubject}&nbsp;{courseNumber}</div></div>'
		]
	}
});
