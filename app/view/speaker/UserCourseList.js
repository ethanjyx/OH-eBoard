Ext.define('testapp.view.speaker.UserCourseList', {

	extend: 'Ext.List',
	requires: [
        'Ext.plugin.PullRefresh',
        'Ext.plugin.ListPaging'
    ],
	xtype: 'userCourseList',

	config: {
		
        plugins: [
            { type: 'listpaging' },
            { type: 'pullrefresh' }
        ],
		itemTpl: [
		/*
			'<div class="avatar" style="background-image: url(http://graph.facebook.com/{facebookId}/picture);"> </div>',
			'<h3><div class="nametag">{firstName} {lastName}</div>',
			'<div class="postag">{position}</div></h3>'
			*/
			'<div class="session"><div class="courseSubject">{courseSubject}&nbsp;{courseNumber}</div></div>'
		]
	}
});
