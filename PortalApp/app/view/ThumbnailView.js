/* Copyright (C) 2018, University of Kansas Center for Research
 * 
 * Specify Software Project, specify@ku.edu, Biodiversity Institute,
 * 1345 Jayhawk Boulevard, Lawrence, Kansas, 66045, USA
 * 
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/
"use strict";
/*
 * SpWebPortal.view.ThumbnailView
 *
 * Individual thumbnail view.
 *
 */

function setParentDataWidth(self){
	// determine data value based on ratio
	var elem=self.parentNode;
	var ratio = self.naturalWidth / self.naturalHeight;
	var adjusted_width = 
		ratio > 2 ? "widest" :
		ratio > 1.8 ? "wider" :
		ratio > 1.4 ? "wide" :
		ratio < .6 ? "thinner" :
		ratio < .8 ? "thin" : false;
	if (adjusted_width) {
		elem.setAttribute('data-width', adjusted_width);
	}
}

Ext.define('SpWebPortal.view.ThumbnailView', {
    extend: 'Ext.view.View',
    xtype: 'spthumbnail',
    alias: 'widget.thumbnail',

    //localizable text...
    emptyText: 'No images to display',
    //...localizable text
    
    multiSelect: false,
    trackOver: true,
    overItemCls: 'tv-x-item-over',
    itemSelector: 'div.tv-thumb-wrap',
    /*plugins: [
	Ext.create('Ext.ux.DataView.DragSelector', {}),
	Ext.create('Ext.ux.DataView.LabelEditor', {dataIndex: 'name'})
    ],*/
    prepareData: function(data) {
	Ext.apply(data, {
	    shortName: Ext.util.Format.ellipsis(data.Title, 15)
	});
	return data;
    },

	

    initComponent: function() {
	var settingsStore =  Ext.getStore('SettingsStore');
	var settings = settingsStore.getAt(0);
	Ext.apply(this, {
	    tpl: [
		'<tpl for=".">',
		'<div class="tv-thumb-wrap" id="{AttachmentID}" style="background-image: url({ThumbSrc});">',
		//'<div class="tv-thumb"><img src="' + settings.get('imageBaseUrl') + '/{AttachmentLocation}" title="{AttachedToDescr} - {Title}"></div>',
		//'<div class="tv-thumb"><img src="{ThumbSrc}" title="{AttachedToDescr} - {Title}"></div>',
		'<img class="tv-thumb" src="{ThumbSrc}" title="{AttachedToDescr}"\
		onload="setParentDataWidth(this);"\
		>',
		//'<span class="x-editable">{shortName}</span>
		'</div>',
		'</tpl>',
		'<div class="x-clear"></div>'
	    ]
	});

//	this.callParent(arguments);
	this.superclass.initComponent.apply(this, arguments);
    }
		 
});

