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
			//'<h3>{firstName} {lastName}</h3>',
			//'<h4>{position}</h4>',
			'<table>',
			 ' <tr>',
			   ' <td><div class="nametag">{firstName} {lastName}</div></td>',
			    '<td>{position}{lastName}</td>',
			  '</tr>',
			'</table>'
		]
	}
});
