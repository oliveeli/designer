/**
 * Author: 李军
 * Date: 12-12-5
 * Time: 下午5:32
 *
 */
define([
    'jquery',
    './../property-type',
    './model/background-image',
    './model/font',
    './model/select-multi',
    './model/border',
    './collection/map'
], function( $, PropertyType, BackgroundImageModel, FontModel, SelectMultiModel, BorderModel, MapCollection ){
    var Converter = function(){

    }

    $.extend(Converter.prototype, {

        toValueObject: function( propertyType, savedData ){
            switch (propertyType) {
                case PropertyType.backgroundImage:
                    var jsonData = $.parseJSON( savedData );
                    return new BackgroundImageModel( jsonData );
                    break;
                case PropertyType.font:
                    var jsonData = $.parseJSON( savedData );
                    return new FontModel( jsonData );
                    break;
                case PropertyType.selectMulti:
                    return new SelectMultiModel().initFromSaveString( savedData );
                    break;
                case PropertyType.border:
                    var jsonData = $.parseJSON( savedData );
                    return new BorderModel( jsonData );
                    break;
                case PropertyType.mapCollection:
                    var jsonData = $.parseJSON( savedData );
                    return new MapCollection( jsonData, {} );
                    break;
            }
            return savedData;
        }

    });

    return new Converter();
});