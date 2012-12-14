/**
 * Author: 李军
 * Date: 12-11-8
 * Time: 下午3:10
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    './../context',
    './../../components/component',
    './../../property-type',
    './../../component-type-collection',
    './toolbar'
], function($, _, Backbone, Context, ComponentType, PropertyType, ComponentTypeCollection, ToolbarView ) {
        return Backbone.View.extend({

            className: 'designer-editor-inner',

            events: {
                'click': 'onClick'
            },

            setPropertyValue: function( $e, propertyValue ){
                return $e.data('ComponentType').initPropertiesValues( $e, propertyValue );
            },

            onGlobalPropertyChange: function( key, value ){
                switch ( key ){
                    case 'width':
                        $( this.el ).css( 'width', value + 'px' );
                        this.trigger('change:size');
                        break;
                    case 'height':
                        $( this.el ).css( 'height', value + 'px' );
                        this.trigger('change:size');
                        break;
                };

            },

            resetContext: function(){
                this.getContext().reset();
            },

            initialize: function( options ){

                _.bindAll( this, 'onCopy', 'onPast', 'onUndo', 'onRedo', 'onSave', 'onGlobalPropertyChange' );

                $( document ).bind( 'keypress', 'ctrl+c', this.onCopy );
                $( document ).bind( 'keypress', 'ctrl+v', this.onPast );
                $( document ).bind( 'keypress', 'ctrl+z', this.onUndo );
                $( document ).bind( 'keypress', 'ctrl+r', this.onRedo );
                $( document ).bind( 'keypress', 'ctrl+s', this.onSave );


                this.on( 'copy', this.onCopy, this );
                this.on( 'past', this.onPast, this );
                this.on( 'undo', this.onUndo, this );
                this.on( 'redo', this.onRedo, this );
                this.on( 'save', this.onSave, this );
                this.on( 'delete', this.onDelete, this );

                this.__context__ = new Context({
                    editorBody: $(this.el)
                });

                this.settingModel = options.settingModel;

                this.__selectedArea__ = null;

                var CT = new ComponentType({
                    properties: {
                        events: {
                            name: '页面事件',
                            type: PropertyType.event
                        },
                        width: {
                            type: PropertyType.length, name: '页面宽度'
                        },
                        height: {
                            type: PropertyType.length, name: '页面高度'
                        }
                    }
                });

                $( this.el ).data( 'ComponentType', CT );

                this.globalPropertyValue = this.setPropertyValue( $( this.el ) );
                this.globalPropertyValue.on( 'inputChanged', this.onGlobalPropertyChange );

                var that = this;

                $(this.el).selectable({
                    cancel: 'a, .d-editor-element-toolbar, .cancel',
                    filter: '.d-editor-element',
                    start: function ( event, ui ) {
                        if( event.altKey ){
                            return;
                        }
                        that.selectReset();
                        that.onShowProperty();
                    },
                    selecting: function ( event, ui ) {
                        var $e = $(ui.selecting),
                            m = that.getElementModel( $e);
                        if( event.altKey && m.isSelected() ){
                            m.trigger( 'unSelect', m, true );
                        } else {
                            m.trigger( 'select', m, true );
                        }
                    },
                    unselecting: function ( event, ui ) {
                        if ( event.altKey ) {
                            return;
                        }
                        var $element = $(ui.unselecting);
                        var model = that.getElementModel( $element);
                        model.trigger( 'unSelect', model, true );
                    }
                });
            },

            render: function(){
                var that = this;
                $(this.el).droppable({
                    drop: function( event, ui ) {
                        if( ui.helper.isSelectedArea ){
                            that.drawSelectArea();
                            that.drawToolbar();
                        } else {
                            that.onDropComponent( $(this), event, ui );
                        }
                        that.addUndoPoint({});
                    }
                });

                return this;
            },

            renderByComponentXml: function( xml ) {
                this.resetContext();
                $(this.el).children().remove();
                if( !xml ) {
                    return;
                }
                var doc = $.parseXML( xml.substring(xml.indexOf('<root>'), xml.length )), that = this;
                $( doc ).find( 'component').each( function(){
                    var $de = $( this ),
                        left = $de.find('left').text(),
                        top = $de.find('top').text(),
                        uuid = $de.find('id').text(),
                        zIndex = $de.find('z-index').text(),
                        rs = ComponentTypeCollection.buildEditorViewByXMLDocument( $de ),
                        $e = $( rs.view.el );
                    $e.addClass('d-editor-element').append('<div class="d-editor-element-mask" />');
                    $e.css('position', 'absolute').css('left', left + 'px').css('top', top + 'px');
                    that.addElement( {
                        $e: $e,
                        ComponentType: rs.ComponentType,
                        propertyValue: rs.propertyValues,
                        uuid: uuid,
                        zIndex: zIndex
                    } );
                } );
            },

            onDropComponent: function( $e , dropEvent, dropUi ){

                var pos = dropUi.helper.offset(), dPos = $e.offset(),
                    left = pos.left - dPos.left, top = pos.top - dPos.top;

                if( dropUi.helper.droped ){
                    if( left<0 || top<0 ){
                        dropUi.draggable.draggable( "option", "revert", true );
                    } else {
                        dropUi.draggable.draggable( "option", "revert", false );
                    }
                    return;
                }

                var EditorView = dropUi.helper.ComponentType.getEditorView(),
                    view = new EditorView().render(),
                    $elem = $(view.el).addClass('d-editor-element').append('<div class="d-editor-element-mask" />');

                $elem.css('position', 'absolute').css('left', left).css('top', top);

                this.addElement( {
                    $e:$elem,
                    ComponentType: dropUi.helper.ComponentType
                });

            },

            addElement: function( options ){
                var $e = options.$e,
                    CT = options.ComponentType,
                    propertyValue = options.propertyValue,
                    EditorView = CT.getEditorView(),
                    editorView = new EditorView(),
                    that = this;

                $e.data( 'ComponentType', CT );

                $.extend( editorView, {
                    $el: $e,
                    el: $e.get(0)
                });

                $e.appendTo( (this.el) );

                var pv = this.setPropertyValue( $e, propertyValue );

                pv.on('inputChanged', function(key, value, propertiesValues){
                    if(editorView.onPropertyChange){
                        editorView.onPropertyChange(key, value, propertiesValues);
                    }
                    that.addUndoPoint();
                });
                pv.on( 'editorChanged', function( pv, key, value ) {
                    if(editorView.onPropertyChangeByUi){
                        editorView.onPropertyChangeByUi( pv, key, value );
                    } else {
                        pv[ key ] = value;
                        pv.trigger( 'editorChangedInner', pv, key, value );
                    }
                });

                editorView.on( 'changeEditor' , function( ) {
                    this.removeToolbar().drawToolbar();
                } , this );

                this.getContext().addElement( {
                    $el: $e,
                    uuid: options.uuid,
                    zIndex: options.zIndex
                } );

                var model = this.getElementModel( $e );
                model.on( 'select', this.onSelectModel, this );
                model.on( 'unSelect', this.onUnSelectModel, this );

                this.selectReset();
                model.trigger( 'select', model );

                $e.draggable({
                    revert: 'invalid',
                    zIndex: 9999,
                    containment: $(that.el),
                    scroll: false,
                    opacity: 0.8,
                    snap: '.d-snap-line',
                    start: function(event, ui){

                        that.selectReset();
                        var model = that.getElementModel( $(ui.helper) );
                        model.trigger( 'unSelect', model );

                        that.removeToolbar();

                        ui.helper.droped = true;

                        that.settingModel.isDropSnap() && that.getContext().drawSnapLine( $(ui.helper) );

                        // code below copy from jquery-ui-lib draggable start method
                        // fix bug: set snapElements here
                        // don't change
                        var i = $(this).data("draggable"), o = i.options;
                        i.snapElements = [];

                        $(o.snap.constructor != String ? ( o.snap.items || ':data(draggable)' ) : o.snap).each(function() {
                            var $t = $(this); var $o = $t.offset();
                            if(this != i.element[0]) i.snapElements.push({
                                item: this,
                                width: $t.outerWidth(), height: $t.outerHeight(),
                                top: $o.top, left: $o.left
                            });
                        });
                        // copy code end

                    },
                    drag: function ( event, ui ) {
                        var draggable = $(this).data("draggable");
                        $.each(draggable.snapElements, function(index, element) {
                            ui = $.extend({}, ui, {
                                snapElement: $(element.item),
                                snapping: element.snapping
                            });
                            if (element.snapping) {
                                if (!element.snappingKnown) {
                                    element.snappingKnown = true;
                                    draggable._trigger("snapOn", event, ui);
                                }
                            } else if (element.snappingKnown) {
                                element.snappingKnown = false;
                                draggable._trigger("snapOut", event, ui);
                            }
                        });
                    },
                    snapOn: function(event, ui) {
                        ui.snapElement.addClass("d-snaped");
                    },
                    snapOut: function(event, ui) {
                        ui.snapElement.removeClass("d-snaped");
                    },
                    stop: function( event, ui ) {
                        that.getContext().clearSnapLine();
                        var model = that.getElementModel( $(ui.helper) );
                        model.trigger( 'select', model );
                    }

                });
            },

            onClick: function( event ) {
                event.preventDefault();
                event.stopPropagation();
                var $sel = $(event.target).closest('.d-editor-element');
                if( event.altKey ){
                    if( $sel.length === 0 ){
                        var dPos = $(this.el).offset(),
                            $el = this.getElementByPosition( event.clientX - dPos.left, event.clientY - dPos.top );
                        if( $el ){
                            var model = this.getElementModel( $el );
                            if( model.isSelected() ) {
                                model.trigger( 'unSelect', model, true );
                            } else {
                                model.trigger( 'select', model, true );
                            }
                        }
                    } else {
                        var model = this.getElementModel( $sel );
                        if( model.isSelected() ) {
                            model.trigger( 'unSelect', model, true );
                        } else {
                            model.trigger( 'select', model, true );
                        }
                    }
                } else {
                    if( $sel.length > 0 ){
                        var model = this.getElementModel( $sel );
                        model.trigger( 'select', model );
                    } else {
                        this.selectReset();
                    }
                }
            },

            getContext: function(){
                return this.__context__;
            },

            onContextChange: function(){
                this.trigger('change:context', this.getContext());
            },

            onSave: function(){
                alert(this.getContext().getXml());
            },

            onCopy: function( event ){
                this.getContext().copy();
            },

            onRedo: function( event ) {
                var data = this.getContext().popRedoData();
                if ( typeof (data) === "undefined" ) return;
                this.renderByComponentXml( data.data ? data.data : '' );
            },

            onUndo: function ( event ) {
                var data = this.getContext().popUndoDataAndGetRecentData();
                if ( typeof (data) === "undefined" ) return;
                this.renderByComponentXml( data.data ? data.data : '' );
            },

            onPast: function( event ){
                var copyElements = this.getContext().getCopyElements();
                for( var i = 0,s = copyElements.length; i < s; i++){
                    var $e = copyElements[i],
                        $ce = $e.clone( false, false );
                    this.addElement( {
                        $e: $ce,
                        ComponentType: $e.data('ComponentType'),
                        propertyValue: $e.data('propertiesValue')
                    } );
                }
            },

            getElementByPosition: function(x, y){
                return this.getContext().getElementByPosition(x, y);
            },

            getSelectElements: function(){
                return this.getContext().getSelectElements();
            },

            onSelectModel: function( model, isAppend ) {
                var $el = this.getElementByModel( model );
                if( !isAppend ){
                    this.selectReset( model );
                }
                this.getContext().onSelectComponentEditorElement( $el );

                this.drawSelectArea();
                this.drawToolbar();
                this.onShowProperty();

                if( isAppend ){
                    return;
                }
                var that = this;
                var CT = $el ? $el.data('ComponentType') : '';
                if( $el && (CT.resizeAble || CT.resizeAbleX || CT.resizeAbleY) ) {
                    var hd = ( CT.resizeAbleX ^ CT.resizeAbleY )
                        ? ( CT.resizeAbleX ? 'e, w' : 'n, s' ) : 'n, e, s, w, ne, se, sw, nw';
                    $el.resizable( {
                        containment: 'parent',
                        handles: hd,
                        start: function( event, ui ) {
                            that.removeToolbar();
                        },
                        resize: function( event, ui ) {
                            var pv = ui.element.data('propertiesValue');
                            pv.trigger('editorChanged', pv, 'width', ui.element.width());
                            pv.trigger('editorChanged', pv, 'height', ui.element.height());
                        },
                        stop: function( event, ui ) {
                            var pv = ui.element.data('propertiesValue');
                            pv.trigger('editorChanged', pv, 'width', ui.element.width());
                            pv.trigger('editorChanged', pv, 'height', ui.element.height());
                            that.drawToolbar();
                            that.addUndoPoint();
                        }
                    } );
                }
                return this;
            },

            onUnSelectModel: function( model, isAppend ) {
                var $el = this.getElementByModel( model );
                this.getContext().onUnSelectComponentEditorElement( $el );
                this.drawSelectArea();
                this.drawToolbar();
                this.onShowProperty();
            },

            getSelectedArea: function(){
                return this.getContext().getSelectedArea();
            },

            moveSelectElements: function(moveX, moveY){
                this.getContext().moveSelectElements(moveX, moveY);
                return this;
            },

            selectReset: function( model ) {
                if( this.__selectedArea__ ){
                    this.__selectedArea__.remove();
                    this.__selectedArea__ = null;
                }

                if( model ) {
                    this.getContext().unSelectOtherModel( model );
                } else {
                    this.getContext().unSelectAllModel( );
                }


                this.removeToolbar();
                this.getContext().destroyResizable();
                return this;
            },

            removeToolbar: function(){
                if( this.__toolbar__ ) {
                    this.__toolbar__.remove();
                }
                return this;
            },

            onShowProperty: function(){
                var $e = this.getSelectElements();
                if ( $e.length === 1 ) {
                    this.trigger( 'show:property', $($e[0]) );
                } else {
                    this.trigger( 'show:property', $(this.el) );
                }

            },

            drawToolbar: function(){

                this.removeToolbar();

                var $e = this.getSelectElements();
                if ( $e.length < 1 ) {
                    return;
                }

                var isMulti = ( $e.length > 1 );
                if ( isMulti && !this.__selectedArea__ ) {
                    var c = 0;
                }
                var target =  isMulti ? this.__selectedArea__.get(0) : $e[0];

                this.__toolbar__ = new ToolbarView({
                    isMultiComponent: isMulti
                }).render();

                this.__toolbar__.on( 'show:property', this.onShowProperty, this );
                this.__toolbar__.on( 'move:up', this.onMoveUp, this );
                this.__toolbar__.on( 'move:down', this.onMoveDown, this );
                this.__toolbar__.on( 'delete', this.onDelete, this );

                var $tb = $(this.__toolbar__.el);
                $(this.el).append($tb);
                $tb.css('left', 0 + 'px').css('top', 0 + 'px').css('position', 'absolute').css('visibility', 'hidden');

                var e = target,
                    $e = $(e),
                    tp = e.offsetTop ,
                    lt = e.offsetLeft,
                    bt = tp + $e.height(),
                    pageWt = $(this.el).width(),
                    pageHt = $(this.el).height(),
                    h = $tb.height(),
                    w = $tb.width();

                var toolbarTop = ( tp - h ) > 0 ? ( tp - h ) : ( ( bt + h + 2) < pageHt ? ( bt + 2 ) : tp ),
                    toolbarLeft = ( lt + w ) < pageWt ? lt : ( pageWt - w );
                $tb.css('left', toolbarLeft + 'px').css('top', toolbarTop + 'px').css('visibility', 'visible');

            },

            drawSelectArea: function(){
                var $e = this.getSelectElements();

                if( this.__selectedArea__ ){
                    this.__selectedArea__.remove();
                    this.__selectedArea__ = null;
                }

                if( $e.length <= 1 ) return this;

                var sa = this.getSelectedArea();
                if( !sa ){
                    return this;
                }

                this.__selectedArea__ =
                    $('<div class="d-selected-area" style="position: absolute; z-index: 209090;'
                        +' width: ' + (sa.right-sa.left)
                        +'px; height: '+ (sa.bottom-sa.top)
                        +'px; left: '+ sa.left
                        +'px; top: '+ sa.top +'px;" />');

                this.__selectedArea__.appendTo($(this.el));

                var that = this;
                this.__selectedArea__.draggable({
                    revert: 'invalid',
                    zIndex: 9999,
                    containment: $(this.el),
                    scroll: false,
                    opacity: 0.8,
                    start: function(event, ui){
                        that.removeToolbar();
                        ui.helper.droped = true;
                        ui.helper.isSelectedArea = true;
                        _.extend(ui.helper, {
                            previousOffsetTop: ui.helper.offset().top,
                            previousOffsetLeft: ui.helper.offset().left
                        });
                    },
                    drag: function( event, ui ){
                        var pos = ui.helper.offset(),
                            moveX = pos.left - ui.helper.previousOffsetLeft,
                            moveY = pos.top - ui.helper.previousOffsetTop;
                        that.moveSelectElements(moveX, moveY);
                        ui.helper.previousOffsetTop = ui.helper.offset().top;
                        ui.helper.previousOffsetLeft = ui.helper.offset().left;
                    },
                    stop: function( event, ui ){
                        event.stopPropagation();
                        event.preventDefault();
                    }
                });
                return this;
            },

            onMoveUp: function(){
                var s = this.getSelectElements();
                for ( var i = 0,l = s.length; i<l; i++ ) {
                    var $e = $( s[i] );
                    this.getContext().moveUp( $e );
                }
                this.addUndoPoint();
            },

            onMoveDown: function(){
                var s = this.getSelectElements();
                for ( var i = 0,l = s.length; i<l; i++ ) {
                    var $e = $( s[i] );
                    this.getContext().moveDown( $e );
                }
                this.addUndoPoint();
            },

            onDelete: function(  ){
                var s = this.getSelectElements();
                for ( var i= 0,l = s.length; i<l; i++ ) {
                    var $e = $(s[i]);
                    this.getContext().removeElement( $e );
                }
                this.selectReset();
                this.addUndoPoint();
            },

            addUndoPoint: function( options ){
                this.getContext().pushUndoData( options );
            },

            getElementModel: function ( $e ) {
                return this.getContext().getElementModel( $e );
            },

            getElementByModel: function ( model ) {
                return this.getContext().getElementByModel( model );
            }

        });
    }
);