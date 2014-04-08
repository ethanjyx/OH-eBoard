Ext.define('testapp.controller.Speakers', {
	extend: 'Ext.app.Controller',

    requires: ['testapp.Facebook'],
    requires: ['testapp.util.Requests'],

	config: {
		refs: {
			//speakerContainer: 'speakerContainer',
            userCourseList: 'joinedContainer userCourseJoinList',
            userCourseOwnList: 'ownedContainer userCourseOwnList',
			//speaker: 'speakerContainer speaker',
			//speakerInfo: 'speakerContainer speakerInfo',
			sessionJoinTab: 'tabpanel #joinedTab',
			sessionOwnTab: 'tabpanel #ownedTab',
			sessionTab: 'tabpanel #ext-tab-1'
		},
		control: {
			userCourseList: {
                itemtap: 'onJoinCourseTap',
                activate: 'onSpeakersActivate'
            },
            userCourseOwnList: {
                itemtap: 'onOwnCourseTap',
                activate: 'onSpeakersActivate'
            },
			sessionOwnTab: {
                tap: 'onSessionOwnTap'
            },
			sessionJoinTab: {
                tap: 'onSessionJoinTap'
            },
            sessionTab: {
            	tap: 'onSessionTap'
            }
		}
	},

    onJoinCourseTap: function(list, idx, el, record) {
        Ext.Viewport.setMasked({xtype:'loadmask'});

        console.log('onCourseTap');
        var that = this.getApplication().getController('Sessions');
        
        testapp.util.Requests.loadWaitingUsers(record.data.courseObjectId, 
            function(){
                if (!that.session) {
                    that.session = Ext.widget('session');
                }

                that.session.setTitle(record.get('courseSubject') + ' ' + record.get('courseNumber'));
                that.session.courseObjectId = record.get('objectId');
                that.isGSI = (record.get('holder')['objectId'] === testapp.Facebook.userObjectId) ? true : false;
                //console.log(that.getSessionContainer().getActiveItem());
                //if(that.getSessionContainer.getActiveItem().id)
                console.log(that.getSessionContainer().getInnerItems().length);
                that.getSessionContainer().pop(that.getSessionContainer().getInnerItems().length - 1);
                that.getSessionContainer().push(that.session);
                that.getSessionInfo().setRecord(record);

                Ext.getCmp('mainTabPanel').setActiveItem(0);
                Ext.Viewport.setMasked(false);
            }
        );
    },

    onOwnCourseTap: function(list, idx, el, record) {
        Ext.Viewport.setMasked({xtype:'loadmask'});

        console.log('onCourseTap');
        var that = this.getApplication().getController('Sessions');
        
        testapp.util.Requests.loadWaitingUsers(record.data.courseObjectId, 
            function(){
                if (!that.session) {
                    that.session = Ext.widget('session');
                }

                that.session.setTitle(record.get('courseSubject') + ' ' + record.get('courseNumber'));
                that.session.courseObjectId = record.get('objectId');
                that.isGSI = (record.get('holder')['objectId'] === testapp.Facebook.userObjectId) ? true : false;
                //console.log(that.getSessionContainer().getActiveItem());
                //if(that.getSessionContainer.getActiveItem().id)
                console.log(that.getSessionContainer().getInnerItems().length);
                that.getSessionContainer().pop(that.getSessionContainer().getInnerItems().length - 1);
                that.getSessionContainer().push(that.session);
                that.getSessionInfo().setRecord(record);

                Ext.getCmp('mainTabPanel').setActiveItem(0);
                Ext.Viewport.setMasked(false);
            }
        );
    },

	onSpeakersActivate: function() {
		if (this.speaker) {
			this.speaker.down('list').deselectAll();
		}
	},

	onSessionOwnTap: function() {
		if (testapp.controller.Speakers.lastTabHit == 3) {
			return;
		}
		testapp.controller.Speakers.lastTabHit = 3;
		Ext.getStore('UserCourseOwn').load(function() {

        });
	},

	onSessionJoinTap: function() {
		if (testapp.controller.Speakers.lastTabHit == 2)
		{
			return;
		}
		testapp.controller.Speakers.lastTabHit = 2;
        var userCourseJoinStore = Ext.getStore('UserCourseJoin');
		userCourseJoinStore.load(function() {
            console.log(userCourseJoinStore.getData());
        });
	},

	onSessionTap: function() {
		if (testapp.controller.Speakers.lastTabHit == 1)
		{
			return;
		}
		testapp.controller.Speakers.lastTabHit = 1;		
	}
});
