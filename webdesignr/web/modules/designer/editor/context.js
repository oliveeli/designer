/**
 * Author: 李军
 * Date: 12-11-14
 * Time: 下午4:01
 *
 */
define([
    'jquery',
    './model/component',
    './collection/components',
    './model/save-point',
    './collection/save-points'
], function($, ComponentModel, ComponentCollection, SavepointModel, SavepointCollection ){

    var Context = function( options ){
        this.__snapLineX__ = {};
        this.__snapLineY__ = {};
        this.__copyID__ = new Array();
        this.__componentCollection__ = new ComponentCollection();
        this.__editorBody__ = options.editorBody;
        this.__undoCollection__ = new SavepointCollection();
        this.__undoShifted__ = null;
        this.__redoCollection__ = new SavepointCollection();
    };

    $.extend(Context.prototype, {

        _clear: function(a){
            for(var k in a){
                a[k].remove();
                delete a[k];
            }
            return this;
        },

        reset: function(){
            this.__componentCollection__.clear()
            delete this.__copyID__;
            this.__copyID__ = new Array();
            this.clearSnapLine();
        },

        collections: function(){
            return this.__componentCollection__;
        },

        uuid: function(){
            var max = 1;
            for( var i = 0, s = this.__componentCollection__.length; i < s; i++ ){
                var key = this.__componentCollection__.at( i ).get( 'id'),
                    n = key.substring(1, key.length);
                if(max < Number(n)){
                    max = n;
                }
            }
            return 'c' + (++max);
        },

        getZIndex: function(){
            var max = 0;
            for( var i = 0, s = this.__componentCollection__.length; i < s; i++ ){
                var zIndex = this.__componentCollection__.at( i ).get( 'zIndex' );
                max < Number( zIndex ) && ( max = zIndex );
            }
            return ( ++ max) ;
        },

        getElementZIndex: function( $e ){
            return this.getElementModel( $e ).get( 'zIndex' ) ;
        },

        getElementModel: function( $e ){
            return this.__componentCollection__.get( this.getElementUuid($e) );
        },

        getElementUuid: function ( $e ) {
            return $e.attr( 'cmp_uuid' );
        },

        setElementUuid: function ($e, uuid) {
            $e.attr( 'cmp_uuid', uuid );
        },

        removeElementUuid: function ($e) {
            $e.attr( 'cmp_uuid', '' );
        },

        setElementZIndex: function ( $e , zIndex ) {
            $e.css( 'z-index', zIndex );
        },

        setModelZIndex: function ( model , zIndex ) {
            model.set( 'zIndex', zIndex );
            this.setElementZIndex( model.get( '$element' ) ,  zIndex );
        },

        addElement: function ( options ) {
            if( !options || !options.$el ) return;

            var $e = options.$el;

            var uuid, zIndex, de = $e.data( 'ComponentType');

            // set z-index
            if( options.zIndex ) {
                zIndex = options.zIndex;
            } else {
                zIndex = this.getZIndex();
            }
            this.setElementZIndex ( $e , zIndex );

            // set uuid
            if( options.uuid ) {
                uuid = options.uuid;
            } else {
                uuid = this.uuid();
            }
            this.setElementUuid ( $e , uuid );

            var model = new ComponentModel({
                id: uuid,
                zIndex: zIndex,
                typeName: de.typeName,
                typeNameCN: de.typeNameCN,
                $element: $e
            });

            model.on( 'select', this.onSelectComponentModel, this );
            model.on( 'move:up', this.handleMoveUpModel, this );
            model.on( 'move:down', this.handleMoveDownModel, this );

            this.__componentCollection__.add( model );
        },

        removeElement: function ( $e ) {
            var uuid = this.getElementUuid($e),
                model = this.__componentCollection__.get(uuid);
            if ( model ) {
                this.__componentCollection__.remove(model);
                model.trigger('remove');
                delete model;
                $e.remove();
            }
        },

        destroyResizable: function(){
            var that = this;
            this.__editorBody__.find('.ui-resizable').each( function(){
                if( $(this).data('ui-resizable') ){
                    $(this).resizable('destroy');
                }
            });
        },

        unSelectAllModel: function(){
            for( var i = 0,s=this.__componentCollection__.length; i < s; i++ ){
                var model = this.__componentCollection__.at(i);
                if( model.isSelected() ) {
                    model.trigger( 'unSelect', model );
                }
            }
        },

        unSelectOtherModel: function( exceptModel ) {
            this.__componentCollection__.each( function( model ){
                if( exceptModel.get( 'id' ) !==model.get( 'id' ) &&  model.isSelected() ) {
                    model.trigger( 'unSelect', model );
                }
            } );
        },

        onSelectComponentModel: function( model, isAppend ) {
            if( !isAppend ) this.unSelectOtherModel( model );
        },

        onSelectComponentEditorElement: function ( $e ) {
            $e.css( 'z-index', '209000' );
            $e.addClass('wd-editor-comp-selected');
            $( '<div class="wd-editor-comp-selected-append wd-editor-comp-selected-append-n"></div>' ).appendTo( $e );
            $( '<div class="wd-editor-comp-selected-append wd-editor-comp-selected-append-s"></div>' ).appendTo( $e );
            $( '<div class="wd-editor-comp-selected-append wd-editor-comp-selected-append-e"></div>' ).appendTo( $e );
            $( '<div class="wd-editor-comp-selected-append wd-editor-comp-selected-append-w"></div>' ).appendTo( $e );
        },

        onUnSelectComponentEditorElement: function ( $e ) {
            $e.css( 'z-index', this.getElementZIndex( $e ) );
            $e.removeClass('wd-editor-comp-selected');
            $e.find('.wd-editor-comp-selected-append').remove();
        },

        getSelectElements: function(){
            return this.__editorBody__.find('.wd-editor-comp-selected');
        },

        getSelectElementSize: function (  ) {
            return this.getSelectElements().length;
        },

        hasSelectElement: function ( $e ) {
            return $e.hasClass('wd-editor-comp-selected');
        },

        getElementByUuid: function ( uuid ) {
            return this.__componentCollection__.get(uuid).get( '$element' );
        },

        getElementByModel: function( model ) {
            return model.get( '$element' );
        },

        getElementByPosition: function ( x, y ) {
            for( var i = 0, s = this.__componentCollection__.length; i < s; i++ ){
                var $element = this.__componentCollection__.at( i ).get( '$element'),
                    element = $element.get(0);
                var top = element.offsetTop,
                    left = element.offsetLeft,
                    height = element.offsetHeight,
                    width = element.offsetWidth,
                    right = left + width,
                    bottom = top + height;
                if(left <= x && right >= x && top <= y && bottom >= y){
                    return $element;
                }
            }
        },

        handleMoveUpModel: function( model, switchModel ){
            var zIndex = model.get( 'zIndex');
            this.setModelZIndex( model, switchModel.get( 'zIndex' ) );
            this.setModelZIndex( switchModel, zIndex );
        },

        moveUp: function( $e ) {
            var uuid = this.getElementUuid( $e ),
                model = this.__componentCollection__.get( uuid),
                zIndex = model.get( 'zIndex'),
                s = this.__componentCollection__.length,
                nearBy = Number.MAX_VALUE,
                switchModel = null;
            if( s < 2 ) {
                return;
            }
            for( var i = 0; i < s; i++ ) {
                var iModel = this.__componentCollection__.at( i ),
                    iZIndex = iModel.get( 'zIndex'),
                    distance = Number(iZIndex) - Number(zIndex);
                if( distance > 0 && distance < nearBy) {
                    nearBy = distance;
                    switchModel = iModel;
                }
            }
            if ( switchModel ) {
                model.trigger( 'move:up', model, switchModel );
            }
        },

        handleMoveDownModel: function( model, switchModel ){
            var zIndex = model.get( 'zIndex');
            this.setModelZIndex( model, switchModel.get( 'zIndex' ) );
            this.setModelZIndex( switchModel, zIndex );
        },

        moveDown: function( $e ) {
            var uuid = this.getElementUuid( $e ),
                model = this.__componentCollection__.get( uuid ),
                zIndex = model.get( 'zIndex'),
                s = this.__componentCollection__.length,
                nearBy = zIndex,
                switchModel = null;
            if( s < 2 ) {
                return;
            }
            for( var i = 0; i < s; i++ ) {
                var iModel = this.__componentCollection__.at( i ),
                    iZIndex = iModel.get( 'zIndex'),
                    distance = Number(zIndex) - Number(iZIndex);
                if( distance > 0 && distance < nearBy) {
                    nearBy = distance;
                    switchModel = iModel;
                }
            }
            if ( switchModel ) {
                model.trigger( 'move:down', model, switchModel );
            }

        },

        clearSnapLine: function(){
            this._clear(this.__snapLineX__)
                ._clear(this.__snapLineY__);
        },

        drawSnapLine: function ( $e ) {
            this.clearSnapLine();
            var exceptID = $e ? this.getElementUuid( $e ) : '' ;
            for( var i = 0, s = this.__componentCollection__.length; i < s; i++ ){
                var model = this.__componentCollection__.at( i),
                    $element = model.get( '$element'),
                    element = $element.get(0);
                if ( model.get( 'id' ) === exceptID ) continue;
                var top = element.offsetTop,
                    left = element.offsetLeft,
                    height = element.offsetHeight,
                    width = element.offsetWidth,
                    right = left + width,
                    bottom = top + height,
                    centerTop = top + height/ 2,
                    centerLeft = left + width/2;

                var topLineID = 'x' + top,
                    bottomLineID = 'x' + bottom,
                    leftLineID = 'y' + left,
                    rightLineID = 'y' + right,
                    centerTopID = 'cx' + centerTop,
                    centerLeftID = 'cy' + centerLeft;

                if(!this.__snapLineX__[topLineID]){
                    this.__snapLineX__[topLineID] = $('<div class="wd-editor-snap-line wd-editor-snap-line-x" style="position: absolute; z-index: 99999; left:0; right: 0; top: '+ top +'px;" />').appendTo(this.__editorBody__);
                }
                if(!this.__snapLineX__[bottomLineID]){
                    this.__snapLineX__[bottomLineID] = $('<div class="wd-editor-snap-line wd-editor-snap-line-x" style="position: absolute; z-index: 99999; left:0; right: 0; top: '+ bottom +'px;" />').appendTo(this.__editorBody__);
                }
                if(!this.__snapLineY__[leftLineID]){
                    this.__snapLineY__[leftLineID] = $('<div class="wd-editor-snap-line wd-editor-snap-line-y" style="position: absolute; z-index: 99999; top:0; bottom: 0; left: '+ left +'px;" />').appendTo(this.__editorBody__);
                }
                if(!this.__snapLineY__[rightLineID]){
                    this.__snapLineY__[rightLineID] = $('<div class="wd-editor-snap-line wd-editor-snap-line-y" style="position: absolute; z-index: 99999; top:0; bottom: 0; left: '+ right +'px;" />').appendTo(this.__editorBody__);
                }
            }
        },

        getSelectedArea: function(){
            var rs = {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                selected = this.getSelectElements();

            if(selected.length===0) return;

            for(var i=0 ,len = selected.length; i<len; i++){
                var e = selected[i],
                    $e = $(e),
                    t = e.offsetTop,
                    l = e.offsetLeft,
                    h = $e.height(),
                    w = $e.width(),
                    r = l + w,
                    b = t + h;
                if ( i === 0 ){
                    rs.top = t;
                    rs.left = l;
                    rs.right = r;
                    rs.bottom = b;
                    continue;
                }
                rs.top > t && (rs.top = t);
                rs.left > l && (rs.left = l);
                rs.right < r && (rs.right = r);
                rs.bottom < b && (rs.bottom = b);
            }
            return rs;
        },

        moveSelectElements: function(x, y){
            var s = this.getSelectElements();
            for ( var i=0 ,l = s.length; i<l; i++ ) {
                var e = s[i],
                    nX = e.offsetLeft + x,
                    nY = e.offsetTop + y;
                $(e).css('left',nX + 'px').css('top',nY + 'px');
            }
        },

        getXml: function(){
            var xmlBuffer = new Array();
            xmlBuffer.push('<?xml version="1.0" encoding="UTF-8"?>');
            xmlBuffer.push('<root>');
            for( var i = 0, s = this.__componentCollection__.length; i < s; i++ ){
                var model = this.__componentCollection__.at( i ),
                    $element = model.get( '$element'),
                    ComponentType = $element.data('ComponentType');
                xmlBuffer.push( ComponentType.toXML( model ) );
            }
            xmlBuffer.push('</root>');
            var result =  xmlBuffer.join('');
            delete xmlBuffer;
            return result;
        },

        copy: function(){
            delete this.__copyID__;
            this.__copyID__ = new Array();

            var selected = this.getSelectElements(),
                that = this;
            if(selected.length===0) {
                return;
            }

            selected.each( function(){
                that.__copyID__.push( that.getElementUuid( $(this) ) );
            } );
        },

        getCopyElements: function(){
            var rs = new Array();
            for( var i= 0,s=this.__copyID__.length; i<s ; i++){
                rs.push( this.getElementByUuid( this.__copyID__[i] ) );
            }
            return rs;
        },

        pushUndoData: function( options ) {
            if ( this.__undoCollection__.length >=   20 ) {
                this.__undoShifted__ = this.__undoCollection__.shift();
            }
            var model = new SavepointModel({
                time: new Date().getTime(),
                data: this.getXml()
            });
            this.__undoCollection__.push( model );
            this.__redoCollection__.clear();
        },

        popUndoDataAndGetRecentData: function(){

            var model = this.__undoCollection__.pop();
            if ( !model ) return;

            this.__redoCollection__.push( model );

            if( this.__undoCollection__.length > 0 ) {
                var m = this.__undoCollection__.at( this.__undoCollection__.length -1 );
                return {
                    data: m.get( 'data' )
                };
            } else if( this.__undoShifted__ ){
                var m = this.__undoShifted__;
                return {
                    data: m.get( 'data' )
                };
            } else {
                return {};
            }
        },

        popRedoData: function(){
            var model = this.__redoCollection__.pop();
            if ( !model ) {
                return;
            }
            this.__undoCollection__.push( model );
            return {
                data: model.get( 'data' )
            };
        }

    });

    return Context;
});