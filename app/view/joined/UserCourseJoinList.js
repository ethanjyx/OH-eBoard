Ext.define('testapp.view.joined.UserCourseJoinList', {

	extend: 'Ext.List',
	requires: [
        'Ext.plugin.PullRefresh'
    ],
	xtype: 'userCourseJoinList',

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
			'<div class="UserCourse"><div class="courseSubject">{courseSubject}&nbsp;{courseNumber} &nbsp; {queuePosition}</div></div>'
		]
	}
});
