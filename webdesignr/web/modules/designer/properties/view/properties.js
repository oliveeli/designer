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
    './../../components/component',
    './../../property-type',
    './string',
    './select',
    './select-multi',
    './event',
    './length',
    './border',
    './color',
    './image',
    './background-image',
    './int',
    './font',
    './map'
], function($, _, Backbone, Component, PropertyType, StringPropertyView, SelectPropertyView, SelectMultiPropertyView, EventPropertyView,
            LengthPropertyView, BorderPropertyView, ColorPropertyView, ImagePropertyView, BackgroundImagePropertyView,
            IntPropertyView, FontPropertyView, MapPropertyView){
        return Backbone.View.extend({

            className: 'designer-properties-inner',

            initialize: function(options){
                this.__propertyViews__ = {};
            },

            render: function(){
                var domElement = this.options.domElement,
                    CT = domElement.data('ComponentType'),
                    properties = CT.properties,
                    propertiesValue = domElement.data( 'propertiesValue' );

                propertiesValue.width = domElement.width();
                propertiesValue.height = domElement.height();

                this.addProperty(properties, 'width', propertiesValue);
                this.addProperty(properties, 'height', propertiesValue);

                for(var key in properties){
                    if(key=='width' || key=='height'){
                        continue;
                    }
                    this.addProperty(properties, key, propertiesValue);

                }

                propertiesValue.off('editorChangedInner', this.uiChanged);
                propertiesValue.on('editorChangedInner', this.uiChanged, this);

                return this;
            },


            addProperty: function(properties, key, propertiesValue){
                var view;
                var property = properties[key];
                var value = propertiesValue[key];
                switch (property.type){
                    case PropertyType.length:
                        view = new LengthPropertyView({property:property, value: value}).render();
                        break;
                    case PropertyType.select:
                        view = new SelectPropertyView({property:property, value: value}).render();
                        break;
                    case PropertyType.selectMulti:
                        view = new SelectMultiPropertyView({property:property, value: value}).render();
                        break;
                    case PropertyType.event:
                        view = new EventPropertyView({property:property, value: value}).render();
                        break;
                    case PropertyType.border:
                        view = new BorderPropertyView({property:property, value: value}).render();
                        break;
                    case PropertyType.color:
                        view = new ColorPropertyView({property:property, value: value}).render();
                        break;
                    case PropertyType.backgroundImage:
                        view = new BackgroundImagePropertyView({property:property, value: value}).render();
                        break;
                    case PropertyType.image:
                        view = new ImagePropertyView({property:property, value: value}).render();
                        break;
                    case PropertyType.int:
                        view = new IntPropertyView({property:property, value: value}).render();
                        break;
                    case PropertyType.font:
                        view = new FontPropertyView({property:property, value: value}).render();
                        break;
                    case PropertyType.mapCollection:
                        view = new MapPropertyView({property:property, value: value}).render();
                        break;
                    default:
                        view = new StringPropertyView({property:property, value: value}).render();
                        break;
                };
                if( !view ){
                    return;
                }
                this.__propertyViews__[key] = view;
                $(this.el).append($(view.el).addClass( 'designer-properties-item' ));
                view.on('inputChanged', function(newValue){
                    propertiesValue[key] = newValue;
                    propertiesValue.trigger('inputChanged', key, newValue, propertiesValue);
                });
            },

            uiChanged: function(propertyValue, propertyKey, propertyValue){
                var view = this.__propertyViews__[propertyKey];
                if(!view){
                    return;
                }
                if(view.setPropertyValue){
                    view.setPropertyValue(propertyValue);
                }
            }
        });
    }
);