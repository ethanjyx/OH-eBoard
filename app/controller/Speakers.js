Ext.define('testapp.controller.Speakers', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			speakerContainer: 'speakerContainer',
            userCourseList: 'speakerContainer tabs userCourseList',
            userCourseOwnList: 'speakerContainer tabs userCourseOwnList',
			speaker: 'speakerContainer speaker',
			speakerInfo: 'speakerContainer speakerInfo',
			sessions: 'speakerContainer speaker list',
			logoutButton: '#logoutButton',
			sessionJoinTab: 'tabpanel #ext-tab-2',
			sessionOwnTab: 'tabpanel #ext-tab-3'
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
			sessions: {
				itemtap: 'onSessionTap'
			},
			logoutButton: {
				tap: 'onLogoutButton'
			},
			sessionOwnTab: {
                tap: 'onSessionOwnTap'
            },
			sessionJoinTab: {
                tap: 'onSessionJoinTap'
            }
		}
	},

    onJoinCourseTap: function(list, idx, el, record) {
        console.log('onCourseTap');
        var that = this.getApplication().getController('Sessions');
        var speakerStore = Ext.getStore('SessionSpeakers');
        var queryJoinTable = {
                courseOH: {
                    __type:"Pointer",
                    className:"courseOH",
                    objectId:record.data.courseObjectId
                },
                history: false
            };

        speakerStore.getProxy().setExtraParams({
            where: JSON.stringify(queryJoinTable),
            include: 'user',
            order: 'createdAt'
        });

        speakerStore.load(function(){
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
        });
    },

    onOwnCourseTap: function(list, idx, el, record) {
        console.log('onCourseTap');
        var that = this.getApplication().getController('Sessions');
        var speakerStore = Ext.getStore('SessionSpeakers');
        var queryJoinTable = {
                courseOH: {
                    __type:"Pointer",
                    className:"courseOH",
                    objectId:record.data.objectId
                },
                history: false
            };

        speakerStore.getProxy().setExtraParams({
            where: JSON.stringify(queryJoinTable),
            include: 'user',
            order: 'createdAt'
        });

        speakerStore.load(function(){
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
        });
    },

	onSessionTap: function(list, idx, el, record) {
		console.log('onSessionTap');

		if (!this.sessionInfo) {
			this.sessionInfo = Ext.widget('sessionInfo');
		}

		this.sessionInfo.config.title = record.get('title');
		this.sessionInfo.setRecord(record);
		this.getSpeakerContainer().push(this.sessionInfo);
	},

	onSpeakersActivate: function() {
		if (this.speaker) {
			this.speaker.down('list').deselectAll();
		}
	},

	onLogoutButton: function() {
		var items = [
			{
				text: 'Log out',
				ui: 'decline',
				scope: this,
				handler: function() {

					/*var parse = new Parse("Wc5ZhPmum7iezzBsnuYkC9h2yQdrPseP4mzpyUPv", "6FgZ9ItKztfQOmQmtmZzvOdaVDSSNhOeZfuG2N1g");
					var relation = {
						waitingList : {
							__op : "RemoveRelation",
							objects: [{__type:"Pointer", className:"User", objectId:record.data.objectId}]
						}
					};

			 		console.log(relation);

					parse.updateRelation({
						object: relation,
						success: function(result) {
							console.log('Join in course: ' + result);
							console.log(result);
							Ext.getStore('SessionSpeakers').remove(record);
						},
						error: function(result) {
							console.log("A query error occured " + result);
						},
						className: 'courseOH/' + this.session.courseObjectId
					});*/
					
					        					
					FB.logout(function(response) {

						Ext.Viewport.setActiveItem(0);
					});
					this.actions.hide();

			
				}
			},
			{
				xtype: 'button',
				text: 'Cancel',
				scope: this,
				handler: function() {
					this.actions.hide();
				}
			}
		];
		if (!this.actions) {
			this.actions = Ext.create('Ext.ActionSheet', {
				items: items
			});
		}

		Ext.Viewport.add(this.actions);
		this.actions.show();
	},

	onSessionOwnTap: function() {
		if (testapp.controller.Speakers.lastTabHit == 1) {
			return;
		}
		testapp.controller.Speakers.lastTabHit = 1;
		Ext.getStore('UserCourseOwn').load();
	},

	onSessionJoinTap: function() {
		if (testapp.controller.Speakers.lastTabHit == 2)
		{
			return;
		}
		Ext.getStore('UserCourseStore').load();
	}
});
