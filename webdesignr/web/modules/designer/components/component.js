/**
 * Author: 李军
 * Date: 12-11-13
 * Time: 下午5:48
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    './../properties/converter',
    './../property-type'
], function($, _, Backbone, PropertyConverter , PropertyType ){

    var getTempView = function(){
        return Backbone.View.extend({
            render: function(){
                $(this.el).append('test');
                return this;
            }
        });
    };


    var Component = function(){
        this.properties = {};
        this.resizeAble = false;
        this.resizeAbleX = false;
        this.resizeAbleY = false;
        this.typeName = 'component';
        this.typeNameCN = '';
        this._toolbarView = null;
        this._editorView = null;
        this._previewView = null;
        this.initialize.apply(this,arguments);
    };

    Component.extend = function(protoProps, classProps){
        return Backbone.View.extend.apply(this, arguments);
    };

    $.extend(Component.prototype, {
        initialize: function(options){
            if(!options){
                return;
            }
            if(options.properties){
                this.properties = options.properties;
            }
            if(options.resizeAble){
                this.resizeAble = options.resizeAble;
            }
            if(options.resizeAbleX){
                this.resizeAbleX = options.resizeAbleX;
            }
            if(options.resizeAbleY){
                this.resizeAbleY = options.resizeAbleY;
            }
            if(options.typeName){
                this.typeName = options.typeName;
            }
            if(options.typeNameCN){
                this.typeNameCN = options.typeNameCN;
            }
            if(options.toolbarView){
                this._toolbarView = options.toolbarView;
            }
            if(options.editorView){
                this._editorView = options.editorView;
            }
            if(options.previewView){
                this._previewView = options.previewView;
            }

            var resizeAble = this.resizeAble;
            var resizeAbleX = this.resizeAbleX;
            var resizeAbleY = this.resizeAbleY;

            resizeAble = resizeAble?true:false;

            if ( ( resizeAbleX | resizeAbleY ) === 0 ) {
                resizeAbleX = resizeAble;
                resizeAbleY = resizeAble;
            }

            if(!this.properties.width){
                this.properties.width = {readonly: !resizeAbleX, type: PropertyType.length, name: '宽度'};
            }
            if(!this.properties.height){
                this.properties.height = {readonly: !resizeAbleY, type: PropertyType.length, name: '高度'};
            }

        },

        getToolbarView: function(){
            var v = this._toolbarView?this._toolbarView:getTempView();
            v.ComponentType = this;
            return v;
        },
        getEditorView: function(){
            var v = this._editorView?this._editorView:getTempView();
            v.element = this;
            return v;
        },
        getPreviewView: function(){
            var v = this._previewView?this._previewView:getTempView();
            v.element = this;
            return v;
        },

        initPropertiesValues: function( $e, propertyValue ){
            if ( !$e ) {
                return;
            }

            var ps = this.properties;

            if( propertyValue ){
                var newPv = {};
                _.extend(newPv, Backbone.Events);
                for(var key in ps){
                    if( !propertyValue.hasOwnProperty( key ) ){
                        continue;
                    }
                    newPv[key] = _.clone( propertyValue[key] );
                }
                $e.data( 'propertiesValue', newPv );
                return newPv;
            }

            var pvs = $e.data('propertiesValue');
            if ( pvs ) {
                return pvs;
            }
            pvs = {};
            $.extend(pvs, Backbone.Events);
            $e.data('propertiesValue', pvs);

            for(var key in ps){
                var v = ps[key].defaultValue;
                if(v && typeof(v)==='function'){
                    v = v.apply();
                }
                v && (pvs[key] = v);
            }

            return pvs;
        },

        getPropertyType: function( key ){
            return this.properties[key].type;
        },

        toXML: function( model ) {
            if ( !model ) {
                return '';
            }
            var xmlBuffer = new Array(),
                $element = model.get( '$element'),
                element = $element.get(0),
                propertiesValue = $element.data('propertiesValue'),
                element = $element.get(0);
            xmlBuffer.push('<component>');
            xmlBuffer.push('<id>');
            xmlBuffer.push( model.get( 'id' ) );
            xmlBuffer.push('</id>');
            xmlBuffer.push('<type>');
            xmlBuffer.push( model.get( 'typeName' ) );
            xmlBuffer.push('</type>');
            xmlBuffer.push('<left>');
            xmlBuffer.push( element.offsetLeft );
            xmlBuffer.push('</left>');
            xmlBuffer.push('<top>');
            xmlBuffer.push( element.offsetTop );
            xmlBuffer.push('</top>');
            xmlBuffer.push('<z-index>');
            xmlBuffer.push( model.get( 'zIndex' ) );
            xmlBuffer.push('</z-index>');
            xmlBuffer.push('<properties>');
            for ( var key in this.properties ) {
                if ( !propertiesValue.hasOwnProperty( key ) ) {
                    continue;
                }
                var value = propertiesValue[key];
                if ( value && value.toSaveString ) {
                    value = value.toSaveString();
                }
                xmlBuffer.push('<property>');
                xmlBuffer.push('<key>');
                xmlBuffer.push(key);
                xmlBuffer.push('</key>');
                xmlBuffer.push('<p-type>');
                xmlBuffer.push( this.getPropertyType( key ) );
                xmlBuffer.push('</p-type>');
                xmlBuffer.push('<value>');
                xmlBuffer.push( value );
                xmlBuffer.push('</value>');
                xmlBuffer.push('</property>');
            }
            xmlBuffer.push('</properties>');
            xmlBuffer.push('</component>');
            return xmlBuffer.join( '' );
        },

        createEditorViewByXMLDocument: function( $xmlDoc ){
            var EditorView = this.getEditorView(),
                propertyValues = {},
                that = this;

            $xmlDoc.find('property').each( function(){
                var key = $(this).find('key').text(),
                    type = that.getPropertyType( key),
                    value = $(this).find('value').text();
                propertyValues[key] =  PropertyConverter.toValueObject( type, value );
            } );

            var view = new EditorView().render();

            for ( var key in propertyValues ){
                if(view.onPropertyChange){
                    view.onPropertyChange(key, propertyValues[key], propertyValues);
                }
            }

            return {
                ComponentType: this,
                propertyValues: propertyValues,
                view : view
            };
        }

    });

    return Component;
});