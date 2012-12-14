/**
 * Author: 李军
 * Date: 12-11-13
 * Time: 下午6:02
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!modules/designer/components/table/tpl/editor.html'
], function($, _, Backbone, HtmlTemplate){
    return Backbone.View.extend({

        render: function(){
            $(this.el).append( HtmlTemplate );
            $(this.el).css( 'width', '400px' );
            return this;
        },

        renderTable: function ( pvs ){
            var rows = pvs.rows ? pvs.rows : 1,
                cols = pvs.cols ? pvs.cols : 1,
                style = pvs.style ? pvs.style : '',
                buffer = new Array();
            $(this.el).html('');

            var newClass = style ? style.getSelected() : [],
                newClassValue = newClass.join( ' ' );

            buffer.push( '<table class="table '+ newClassValue +'">' );
            buffer.push( '<thead><tr>' );
            for( var c=0; c < cols; c++ ){
                buffer.push( '<th>表头</th>' );
            }
            buffer.push( '</tr></thead>' );

            buffer.push( '<tbody>' );
            for( var r=0; r < rows; r++ ){
                buffer.push( '<tr>' );
                for( var c=0; c < cols; c++ ){
                    buffer.push( '<td>类容</td>' );
                }
                buffer.push( '</tr>' );
            }

            buffer.push( '</tbody>' );
            buffer.push( '</table>' );

            $(this.el).html( buffer.join('') );

            this.trigger( 'changeEditor' );

        },

        onPropertyChange: function( key, value, propertiesValues ){
            switch (key){
            	case 'width':
                    $(this.el).css( 'width', value + 'px' );
            		break;
            	case 'height':
            		break;  
                case 'style':
                    var newClass = value ? value.getSelected() : [];
                    this.$('table').attr('class', 'table');
                    for( var i= 0; i < newClass.length; i++ ){
                        this.$('table').addClass( newClass[i] );
                    }
                    this.trigger( 'changeEditor' );
                    break;
                case 'rows':
                	this.renderTable(propertiesValues);
                    break;  
                case 'cols':
                    this.renderTable(propertiesValues);
                    break;
                case 'rowHeight':
                    this.$("td").css("height",value);
                    break;
                case 'theadHeight':
                    this.$("th").css("height",value);
                    break;
                case 'theadHorizontalAlign':
                    this.$('thead').attr('align', value);
                    break;
                case 'tbodyHorizontalAlign':
                    this.$('tbody').attr('align', value);
                    break;
                case 'tbodyVerticalAlign':
                    this.$('tbody').attr('valign', value);
                    break;
            };
        },

        onPropertyChangeByUi: function( propertyValue, key, value ) {
            switch (key){
                case 'width':
                    $(this.el).css( 'height', 'auto' );
                    propertyValue[key] = value;
                    break;
                case 'height':
                    $(this.el).css( 'height', 'auto' );
                    break;
            };
            propertyValue.trigger( 'editorChangedInner', propertyValue, key, value );
        }
    });
});