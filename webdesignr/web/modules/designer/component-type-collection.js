/**
 * Author: 李军
 * Date: 12-11-14
 * Time: 上午9:25
 *
 */
define([
    'jquery',
    './components/button/main',
    './components/div/main',
    './components/checkbox/main',
    './components/input/main',
    './components/radio/main',
    './components/select/main',
    './components/table/main',
    './components/text/main',
    './components/textarea/main',
    './components/tree/main',
    './components/link/main',
    './components/image/main'
], function( $ , ButtonComponent, DivComponent,
             CheckBoxComponent, InputComponent, RadioComponent,
             SelectComponent, TableComponent, TextComponent,
             TextAreaComponent, TreeComponent, LinkComponent,
             ImageComponent ){

    var ComponentTypeCollection = function( options ){
        this.__componentTypes__ = {};
        var that = this;
        options.components && $.each(
            options.components,
            function() {
                that.add( this );
            }
        );
    };

    $.extend( ComponentTypeCollection.prototype, {

        add: function( CT ) {
            this.__componentTypes__[CT.typeName] = CT;
            return this;
        },

        getToolbarViews: function() {
            var views = new Array();
            for (var i in this.__componentTypes__) {
                views.push( this.__componentTypes__[i].getToolbarView() );
            }
            return views;
        },

        getComponentType: function( t ) {
            return this.__componentTypes__[t];
        },

        buildEditorViewByXMLDocument: function( $x ) {
            var type = $x.find('type').text(),
                ComponentType = this.getComponentType( type );
            return ComponentType.createEditorViewByXMLDocument( $x );
        }

    });

    return new ComponentTypeCollection({
        components:
            [
                ButtonComponent, DivComponent, LinkComponent,
                ImageComponent, TextComponent, InputComponent,
                TextAreaComponent, SelectComponent, RadioComponent,
                CheckBoxComponent, TableComponent, TreeComponent
            ]
    });

});