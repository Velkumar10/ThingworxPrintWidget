/*global Encoder,TW */

(function () {
    var addedDefaultButtonStyles = false;

    TW.Runtime.Widgets.printbutton = function () {
        var thisWidget = this;
        var roundedCorners = true;

        this.runtimeProperties = function () {
            return {
                'needsDataLoadingAndError': false,
                'propertyAttributes': {
                    'Label': {
                        'isLocalizable': true
                    },
                    'ConfirmationTitle': {
                        'isLocalizable': true
                    },
                    'ConfirmationPrompt': {
                        'isLocalizable': true
                    },
                    'ConfirmationButton1Label': {
                        'isLocalizable': true
                    },
                    'ConfirmationButton2Label': {
                        'isLocalizable': true
                    }
                }

            };
        };

        this.renderHtml = function () {
            var formatResult = TW.getStyleFromStyleDefinition(thisWidget.getProperty('Style', 'DefaultButtonStyle'));
            var formatResult2 = TW.getStyleFromStyleDefinition(thisWidget.getProperty('HoverStyle', 'DefaultButtonHoverStyle'));
            var formatResult3 = TW.getStyleFromStyleDefinition(thisWidget.getProperty('ActiveStyle', 'DefaultButtonActiveStyle'));
            var textSizeClass = 'textsize-normal';
            if (this.getProperty('Style') !== undefined) {
                textSizeClass = TW.getTextSizeClassName(formatResult.textSize);
            }

            // The Disabled property is used for programmatic control of the button state. There is
            // also a class, widget-printbutton-disabled, which is used internally to debounce button
            // click events.
            var buttonState = thisWidget.getProperty('Disabled', false) ? ' disabled' : '';

            var html =
                '<div class="widget-content widget-printbutton">'
                    + '<button class="button-element ' + textSizeClass + '" tabindex="' + thisWidget.getProperty('TabSequence') + '"' + buttonState + '>'
                        + '<span class="widget-printbutton-icon">'
                            + ((formatResult.image !== undefined && formatResult.image.length > 0) ? '<img class="default" src="' + formatResult.image + '"/>' : '')
                            + ((formatResult2.image !== undefined && formatResult2.image.length > 0) ? '<img class="hover" src="' + formatResult2.image + '"/>' : '')
                            + ((formatResult3.image !== undefined && formatResult3.image.length > 0) ? '<img class="active" src="' + formatResult3.image + '"/>' : '')
                        + '</span>'
                        + '<span class="widget-printbutton-text">' + (thisWidget.getProperty('Label') === undefined ? 'Button' : Encoder.htmlEncode(thisWidget.getProperty('Label'))) + '</span>'
                    + '</button>'
                + '</div>';
            return html;
        };

        this.afterRender = function () {
            var formatResult = TW.getStyleFromStyleDefinition(thisWidget.getProperty('Style', 'DefaultButtonStyle'));
            var buttonHoverStyle = TW.getStyleFromStyleDefinition(thisWidget.getProperty('HoverStyle', 'DefaultButtonHoverStyle'));
            var buttonActiveStyle = TW.getStyleFromStyleDefinition(thisWidget.getProperty('ActiveStyle', 'DefaultButtonActiveStyle'));
            var buttonFocusStyle = TW.getStyleFromStyleDefinition(thisWidget.getProperty('FocusStyle', 'DefaultButtonFocusStyle'));
            var buttonDisabledStyle = TW.getStyleFromStyleDefinition(thisWidget.getProperty('DisabledStyle', 'DefaultButtonDisabledStyle'));

            var cssInfo = TW.getStyleCssTextualNoBackgroundFromStyle(formatResult);
            var cssButtonBackground = TW.getStyleCssGradientFromStyle(formatResult);
            var cssButtonBorder = TW.getStyleCssBorderFromStyle(formatResult);

            var cssButtonHoverText = TW.getStyleCssTextualNoBackgroundFromStyle(buttonHoverStyle);
            var cssButtonHoverBackground = TW.getStyleCssGradientFromStyle(buttonHoverStyle);
            var cssButtonHoverBorder = TW.getStyleCssBorderFromStyle(buttonHoverStyle);

            var cssButtonActiveText = TW.getStyleCssTextualNoBackgroundFromStyle(buttonActiveStyle);
            var cssButtonActiveBackground = TW.getStyleCssGradientFromStyle(buttonActiveStyle);
            var cssButtonActiveBorder = TW.getStyleCssBorderFromStyle(buttonActiveStyle);

            var cssButtonFocusBorder = TW.getStyleCssBorderFromStyle(buttonFocusStyle);

            var cssButtonDisabledText = TW.getStyleCssTextualNoBackgroundFromStyle(buttonDisabledStyle);
            var cssButtonDisabledBackground = TW.getStyleCssGradientFromStyle(buttonDisabledStyle);
            var cssButtonDisabledBorder = TW.getStyleCssBorderFromStyle(buttonDisabledStyle);

            roundedCorners = this.getProperty('RoundedCorners');
            if (roundedCorners === undefined) {
                roundedCorners = true;
            }

            if (roundedCorners === true) {
                thisWidget.jqElement.addClass('roundedCorners');
            }

            if (formatResult.image.length > 0) {
                thisWidget.jqElement.addClass('hasImage');
            }

            if (buttonHoverStyle.image.length === 0) {
                thisWidget.jqElement.addClass('singleImageOnly');
            }

            if (thisWidget.getProperty('Style', 'DefaultButtonStyle') === 'DefaultButtonStyle'
                && thisWidget.getProperty('HoverStyle', 'DefaultButtonHoverStyle') === 'DefaultButtonHoverStyle'
                && thisWidget.getProperty('ActiveStyle', 'DefaultButtonActiveStyle') === 'DefaultButtonActiveStyle'
                && thisWidget.getProperty('FocusStyle', 'DefaultButtonFocusStyle') === 'DefaultButtonFocusStyle'
                && thisWidget.getProperty('DisabledStyle', 'DefaultButtonDisabledStyle') === 'DefaultButtonDisabledStyle') {
                if (!addedDefaultButtonStyles) {
                    addedDefaultButtonStyles = true;
                    var defaultStyles = '.widget-printbutton .button-element { ' + cssButtonBackground + cssButtonBorder +' }' +
                        ' .widget-printbutton .button-element span { ' + cssInfo + ' } ' +
                        ' .widget-printbutton .button-element:hover { ' + cssButtonHoverBackground + cssButtonHoverBorder +' }' +
                        ' .widget-printbutton .button-element:hover span { ' + cssButtonHoverText + ' } ' +
                        ' .widget-printbutton .button-element:active { ' + cssButtonActiveBackground + cssButtonActiveBorder +' }' +
                        ' .widget-printbutton .button-element:active span { ' + cssButtonActiveText + ' } ' +
                        ' .widget-printbutton .button-element:disabled {' + cssButtonDisabledBackground + cssButtonDisabledBorder + '}' +
                        ' .widget-printbutton .button-element:disabled span {' + cssButtonDisabledText + '}' +
                        ' .widget-printbutton.focus .button-element { ' + cssButtonFocusBorder + ' }';
                     $.rule(defaultStyles).appendTo(TW.Runtime.globalWidgetStyleEl);
                }
            } else {
                var styleBlock;

                styleBlock = '<style>' +
                        '#' + thisWidget.jqElementId + ' .button-element { ' + cssButtonBackground + cssButtonBorder +' } ' +
                        '#' + thisWidget.jqElementId + ' .button-element:hover { ' + cssButtonHoverBackground + cssButtonHoverBorder +' } ' +
                        '#' + thisWidget.jqElementId + ' .button-element:active { ' + cssButtonActiveBackground + cssButtonActiveBorder +' }' +
                        '#' + thisWidget.jqElementId + ' .button-element:disabled {' + cssButtonDisabledBackground + cssButtonDisabledBorder + '}' +
                        '#' + thisWidget.jqElementId + ' .button-element span { ' + cssInfo + ' } ' +
                        '#' + thisWidget.jqElementId + ' .button-element:hover span { ' + cssButtonHoverText + ' } ' +
                        '#' + thisWidget.jqElementId + ' .button-element:active span { ' + cssButtonActiveText + ' } ' +
                        '#' + thisWidget.jqElementId + ' .button-element:disabled span {' + cssButtonDisabledText + '}' +
                        '#' + thisWidget.jqElementId + '.focus .button-element { ' + cssButtonFocusBorder + ' }' +
                    '</style>';

                $(styleBlock).prependTo(thisWidget.jqElement);
            }

            var iconAlignment = this.getProperty('IconAlignment');
            var iconElement = thisWidget.jqElement.find('.widget-printbutton-icon');
            var buttonText = thisWidget.jqElement.find('.widget-printbutton-text');

            if (buttonText.html().length === 0) {
                thisWidget.jqElement.addClass('iconOnly'); // don't pad for text
            }
            else {
                if (iconAlignment === 'right') {
                    $(iconElement).insertAfter(buttonText);
                    thisWidget.jqElement.addClass('iconRight');
                }
            }

            var widgetProperties = thisWidget.properties;

            var widgetSelector = '#' + thisWidget.jqElementId + ' .button-element';
            var widgetContainer = '#' + thisWidget.jqElementId;

            $(widgetSelector).on('focus', function () {
                $(widgetContainer).addClass('focus');
            });

            $(widgetSelector).on('blur', function (e) {
                $(widgetContainer).removeClass('focus');

            });

            thisWidget.jqElement.bind('click', function (e) {
                // ignore clicks if button is disabled

                var isDisabled = widgetProperties.Disabled ||
                    thisWidget.jqElement.hasClass('widget-printbutton-disabled');

                if (!isDisabled) {
                    //TW.log.info('button enabled');
                    if (widgetProperties['ConfirmationRequired']) {
                        var label1 = Encoder.htmlEncode(thisWidget.getProperty('ConfirmationButton1Label'));
                        var label2 = Encoder.htmlEncode(thisWidget.getProperty('ConfirmationButton2Label'));

                        var button1default = widgetProperties['DefaultConfirmationButton'] === 'button1';
                        var button1cancel = widgetProperties['CancelConfirmationButton'] === 'button1';

                        var buttons = {};

                        buttons[label1] = {
                            'class': 'blue',
                            'action': function () {
                                if (!button1cancel) {
                                    thisWidget.jqElement.triggerHandler('Clicked');
									//logout function
                                    printfind();
                                }
                            },
                            'default': button1default
                        };

                        buttons[label2] = {
                            'class': 'gray',
                            'action': function () {
                                if (button1cancel) {
                                    thisWidget.jqElement.triggerHandler('Clicked');
                                    printfind();
                                }
                            },
                            'default': !button1default
                        };

                        $.confirm({
                            'title': Encoder.htmlEncode(thisWidget.getProperty('ConfirmationTitle')),
                            'message': Encoder.htmlEncode(thisWidget.getProperty('ConfirmationPrompt')),
                            'buttons': buttons
                        });
                    }
                    else {
                        thisWidget.jqElement.triggerHandler('Clicked');
                        printfind();
                    }
                } else {
                    //TW.log.info('button disabled');
                }
                e.preventDefault();
            });

        };
		
         var printfind = function(){
              window.print();
       }      
        
		 


        this.beforeDestroy = function () {
            try {
                thisWidget.jqElement.unbind();
            } catch (err) {
                TW.log.error('Error in TW.Runtime.Widgets.button.beforeDestroy', err);
            }
        };

        this.updateProperty = function (updatePropertyInfo) {
            if (updatePropertyInfo.TargetProperty === 'Disabled') {
                this.jqElement.find('button').prop('disabled', updatePropertyInfo.RawSinglePropertyValue);
                this.setProperty('Disabled', updatePropertyInfo.RawSinglePropertyValue);
            }else if(updatePropertyInfo.TargetProperty === 'UnitName') {
        	var url= updatePropertyInfo.SinglePropertyValue;
				if( url === undefined ) {
					url = '';
				}
				this.setProperty('UnitName', url);
			}
        };
    };
}());
