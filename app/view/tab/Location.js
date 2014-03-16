Ext.define('testapp.view.tab.Location', {

	extend: 'Ext.Container',
	xtype: 'location',

	config: {

		title: 'Location',
		iconCls: 'locate',

		layout: 'fit',

		items: [
			{
				docked: 'top',
				xtype: 'toolbar',
				title: 'Location'
			}
		]
	},

	initialize: function() {

		var position = new google.maps.LatLng(testapp.app.mapCenter[0], testapp.app.mapCenter[1]),
			infoWindow = new google.maps.InfoWindow({ content: testapp.app.mapText }),
			map, marker;

		this.callParent();

		map = this.add({
			xtype: 'map',
			mapOptions: {
				center: position,
		        mapTypeId: google.maps.MapTypeId.ROADMAP
			}
		});

		marker = new google.maps.Marker({
	        position: position,
	        map: map.getMap(),
	        visible: true
	    });

	    google.maps.event.addListener(marker, 'click', function() {
	        infoWindow.open(map, marker);
	    });

	    setTimeout(function() {
            map.getMap().panTo(position);
        }, 1000);
	}
});
