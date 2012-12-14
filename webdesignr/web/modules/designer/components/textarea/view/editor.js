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
    'text!modules/designer/components/textarea/tpl/editor.html'
], function($, _, Backbone, HtmlTemplate){
    return Backbone.View.extend({
        render: function(){
            $(this.el).append(HtmlTemplate);
            return this;
        },

        onPropertyChange: function(key, value){
        	var $label = this.$("label"),
        		$textarea = this.$("textarea"),
        		$textareaDiv = this.$("textarea-div"),
        		$el = $(this.el);
            switch (key){
                case 'displayName':
                    $label.html(value);
                    if($label.css('float')=='left'){
                    	$el.width($textarea.width()+$label.width()+14);
                    }else{
                    	$el.height($textarea.height()+$label.height()+19);
                    }
                    
                    break;  
                case 'lablePosition':
                	if(value=='left'){
                		var $totalW = $el.width(),
                			$totalH = $el.height();
                		$label.css("float","left");
                		var $labelW = $label.width();
                		if($totalW-$labelW-14 > 0){
                			$textarea.width($totalW-$labelW-14);
                			$textarea.removeClass("hide");	
                		}else{
                			$textarea.addClass('hide');
                		}
                		$textarea.height($totalH-10>0 ? $totalH-10:'1px');
                	}else{
                		var $totalW = $el.width(),
                			$totalH = $el.height();
                		$label.css("float","none");
                		var $labelH = $label.height();
                		if($totalH-$labelH-19>0){
                			$textarea.height($totalH-$labelH-19);
                			$textarea.removeClass('hide');
                		}else{
                			$textarea.addClass('hide');
                		}
                		$textarea.width($totalW-14>0 ?$totalW-14:'1px');
                	}
                	break;
                case 'width':
                	$el.width(value);
                	if($label.css('float')=='left'){
                		if(value-$label.width()-14 > 0 && $textarea.height()>0){
                			$textarea.width(value-$label.width()-14);
                			$textarea.removeClass("hide");
                    	}else{
                    		$textarea.addClass("hide");
                    	}
                	}else{
                		if(value-14 > 0 && $textarea.height() > 0){
                			$textarea.width(value-14);
                		}else{
                			$textarea.width('1px');
                		}
                	}
                    break;
                case 'height':
                	$el.height(value);
                	if($label.css('float') == 'left'){
                		if(value-10 > 0 && $textarea.width()>0){
                			$textarea.height(value-10);
                    	}else{
                    		$textarea.height('1px');
                    	}
                	}else{
                		if(value-$label.height()-19 > 0 && $textarea.width() > 0){
                			$textarea.height(value-$label.height()-19);
                			$textarea.removeClass('hide');
                		}else{
                			$textarea.addClass('hide');
                		}
                	}
                    break; 
            };
        },
        
        onPropertyChangeByUi: function( propertyValue, key, value ) {
        	var $label = this.$("label"),
    			$textarea = this.$("textarea"),
    			$textareaDiv = this.$("textarea-div"),
    			$el = $(this.el);
            switch (key){
            case 'width':
            	$el.width(value);
            	if($label.css('float')=='left'){
            		if(value-$label.width()-14 > 0 && $textarea.height()>0){
            			$textarea.width(value-$label.width()-14);
            			$textarea.removeClass("hide");
                	}else{
                		$textarea.addClass("hide");
                	}
            	}else{
            		if(value-14 > 0 && $textarea.height() > 0){
            			$textarea.width(value-14);
            		}else{
            			$textarea.width('1px');
            		}
            	}
            	propertyValue[key] = value;
            	propertyValue.trigger( 'editorChangedInner', propertyValue, key, value );
                break;
            case 'height':
            	$el.height(value);
            	if($label.css('float') == 'left'){
            		if(value-10 > 0 && $textarea.width()>0){
            			$textarea.height(value-10);
                	}else{
                		$textarea.height('1px');
                	}
            	}else{
            		if(value-$label.height()-19 > 0 && $textarea.width() > 0){
            			$textarea.height(value-$label.height()-19);
            			$textarea.removeClass('hide');
            		}else{
            			$textarea.addClass('hide');
            		}
            	}
            	propertyValue[key] = value;
            	propertyValue.trigger( 'editorChangedInner', propertyValue, key, value );
                break; 
            };
        }
    });
});