/**
 * Author: 李军
 * Date: 12-11-8
 * Time: 上午10:23
 *
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'app-core',
    'moduleTemplate',
    './component-type-collection',
    './layout/view/layout',
    './editor/view/editor',
    './scale/view/scale',
    './toolbar/view/toolbar',
    './outline/view/outline',
    './property/view/property',
    './setting/view/setting',
    './setting/model/setting',
    './help/view/help'
], function( $, _, Backbone, AppCore, ModuleTemplate,
             ComponentTypeCollection, LayoutView, EditorView,
             ScaleView, ToolbarEditorView, OutlineView,
             PropertyView, SettingView, SettingModel,
             HelpView ){

        return ModuleTemplate.extend({

                start: function(){

                    this.settingModel = new SettingModel();
                    this.settingModel.on( 'confirm', this.onResetSetting, this );

                    this.layout = new LayoutView().render();
                    $(this.el).append(this.layout.el);

                    var toolbarViews = ComponentTypeCollection.getToolbarViews();

                    for ( var key in toolbarViews ) {
                        this.addToolbarView( toolbarViews[key] );
                    }

                    this.editorView = new EditorView({
                        settingModel: this.settingModel,
                        ComponentTypeCollection: ComponentTypeCollection
                    }).render();
                    this.layout.getEditorContainer().append($(this.editorView.el));
                    this.renderScaleView();
                    var toolbarEditorView = new ToolbarEditorView().render();
                    this.layout.getToolbarContainer().append($(toolbarEditorView.el));
                    this.renderOutlineView( this.editorView.getContext() );

                    toolbarEditorView.on('save', this.onSave, this);
                    toolbarEditorView.on('redo', this.onRedo, this);
                    toolbarEditorView.on('undo', this.onUndo, this);
                    toolbarEditorView.on('copy', this.onCopy, this);
                    toolbarEditorView.on('past', this.onPast, this);
                    toolbarEditorView.on('delete', this.onDelete, this);
                    toolbarEditorView.on('setting', this.onSetting, this);
                    toolbarEditorView.on('help', this.onHelp, this);


                    this.editorView.on( 'render:property', this.renderPropertiesView, this );
                    this.editorView.on( 'show:property', this.showPropertyView, this );
                    this.editorView.on( 'change:context', this.renderOutlineView, this );
                    this.editorView.on( 'change:size', this.renderScaleView, this );
                    this.editorView.on( 'change:size', this.layout.onChangeEditorSize, this.layout );

                    this.layout.onChangeEditorSize();

                    return this;

                },

                onResetSetting: function(){
                    this.renderScaleView();
                },

                onSave: function(){
                    this.editorView.trigger( 'save' );
                },

                onRedo: function(){
                    this.editorView.trigger( 'redo' );
                },

                onUndo: function(){
                    this.editorView.trigger( 'undo' );
                },

                onCopy: function(){
                    this.editorView.trigger( 'copy' );
                },

                onPast: function(){
                    this.editorView.trigger( 'past' );
                },

                onDelete: function(){
                    this.editorView.trigger( 'delete' );
                },

                onSetting: function( event ){
                    var $target = $( event.target),
                        that = this;;
                    $target.popEditor({
                        placement: 'bottom',
                        html: true,
                        content: function(){
                            return $(new SettingView({
                                $target: $target,
                                model: that.settingModel
                            }).render().el);
                        }
                    });
                    $(event.target).popEditor('show', event );
                },

                onHelp: function( event ){
                    var $target = $( event.target );
                    $target.popEditor({
                        placement: 'bottom',
                        html: true,
                        content: function(){
                            return $(new HelpView({
                                $target: $target
                            }).render().el);
                        }
                    });
                    $(event.target).popEditor('show', event );
                },

                renderScaleView: function(){
                    if ( this.scaleView ) {
                        this.scaleView.remove();
                    }
                    if ( !this.settingModel.isShowScale() ) {
                        return;
                    }
                    this.scaleView = new ScaleView({
                        $target: this.layout.getEditorContainer()
                    }).render();

                },

                renderOutlineView: function(contentContext){
                    this.layout.getOutLineContainer().html('');
                    var outlineView = new OutlineView({collection: contentContext.collections()}).render();
                    this.layout.getOutLineContainer().append($(outlineView.el));
                },

                renderPropertiesView: function ( $e ) {
                    if ( this.propertiesView ){
                        this.propertiesView.remove();
                        delete this.propertiesView;
                    }
                    this.propertiesView = new PropertyView({ domElement: $e }).render();
                    this.layout.getPropertyContainer().html('').append( $( this.propertiesView.el ) );
                },

                showPropertyView: function() {
                    this.layout.showPropertyView();
                },

                addToolbarView: function( ToolbarItemView ){
                    var $container = this.layout.getDraggableComponentContainer(),
                        EditorView = ToolbarItemView.ComponentType.getEditorView();

                    $(new ToolbarItemView().render().el)
                        .addClass( 'wd-draggable-comp-item' )
                        .appendTo( $container )
                        .draggable({
                            zIndex: 9999,
                            appendTo: 'body',
                            containment: 'window',
                            scroll: false,
                            helper: function(){
                                return $( new EditorView().render().el );
                            },
                            opacity: 0.8,
                            start: function(event, ui){
                                $.extend(ui.helper, {
                                    ComponentType: ToolbarItemView.ComponentType
                                });
                            }
                        });
                }

            }
        );
    }
);