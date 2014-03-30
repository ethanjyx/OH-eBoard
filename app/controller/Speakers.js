Ext.define('testapp.controller.Speakers', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			speakerContainer: 'speakerContainer',
			speakers: 'speakerContainer speakers',
			speaker: 'speakerContainer speaker',
			speakerInfo: 'speakerContainer speakerInfo',
			sessions: 'speakerContainer speaker list',
			logoutButton: '#logoutButton',
			sessionOwnTab: 'tabs #sessionOwnTab'
		},
		control: {
			speakers: {
				itemtap: 'onSpeakerTap',
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
            }
		}
	},

	onSpeakerTap: function(list, idx, el, record) {
		var sessionStore = Ext.getStore('SpeakerSessions'),
			sessionIds = record.get('sessionIds');

		sessionStore.clearFilter(true);
		sessionStore.filterBy(function(session) {
			return Ext.Array.contains(sessionIds, session.get('id'));
		});

		if (!this.speaker) {
			this.speaker = Ext.widget('speaker');
		}

		this.speaker.config.title = record.getFullName();
		this.getSpeakerContainer().push(this.speaker);
		this.getSpeakerInfo().setRecord(record);
	},

	onSessionTap: function(list, idx, el, record) {

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
		console.log('onSessionOwnTap');
		var userCourseStore = Ext.getStore('UserCourseStore');
        var queryJoinTable = {
            holder: {
                __type: "Pointer",
                className: "User",
                objectId: testapp.Facebook.userObjectId
            },
        };

        userCourseStore.getProxy().setExtraParams({
            where: JSON.stringify(queryJoinTable)
        });
	}
});
