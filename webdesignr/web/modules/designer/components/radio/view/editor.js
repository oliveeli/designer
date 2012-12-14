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
    'text!modules/designer/components/radio/tpl/editor.html'
], function($, _, Backbone, HtmlTemplate){
    return Backbone.View.extend({
        render: function(){
            $(this.el).append(HtmlTemplate);
            return this;
        },

        onPropertyChange: function(key, value){
        	var $radioDiv = this.$(".radio-div"),
        		$label = this.$("label");
            switch (key){
            	case 'radioItems':
            		var radioNum = value.models.length;
            		var radios="";
            			if($radioDiv.hasClass("radio-inline")){
            				for(var i=0;i<radioNum;i++){
            					var radioitem = value.models[i];
                				radios=radios+"<label class='radio inline'><input type='radio' value='"+radioitem.attributes.value+"'><span>"+radioitem.attributes.key+"</span></label>";
                			}
            			}else{
            				for(var i=0;i<radioNum;i++){
            					var radioitem = value.models[i];
                				radios=radios+"<label class='radio'><input type='radio' value='"+radioitem.attributes.value+"'><span>"+radioitem.attributes.key+"</span></label>";
                			}
            			}
            		$radioDiv.html($(radios));
            		this.$("input").attr("name",$radioDiv.parent().attr("cmp_uuid"));
            		break;
            	case "sortWay":
            		if(value=="horizontal"){
            			$radioDiv.addClass("radio-inline");
            			$label.addClass("inline");
            		}else{
            			$radioDiv.removeClass("radio-inline");
            			$label.removeClass("inline");
            		}
            		break;
            };
        }
    });
});