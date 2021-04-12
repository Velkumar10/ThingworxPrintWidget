/*global Encoder,TW */

TW.IDE.Widgets.printbutton = function () {
	this.widgetIconUrl = function() {
        return  "../Common/extensions/PrintButton/ui/printbutton/printbutton.ide.png";
    }
    var roundedCorners = true;
    this.widgetProperties = function () {
        return {
            'name': 'Print Button',
            'description': 'Panel Print Button',
            'category': ['Common'],
            'iconImage': 'printbutton.ide.png',
			'supportsAutoResize': true,
            'properties': {
                'Label': {
                    'description': 'The text that appears on the button',
                    'defaultValue': 'Print',
                    'baseType': 'STRING',
                    'isLocalizable': true
                },
                'Width': {
                    'description': 'width of widget',
                    'baseType': 'NUMBER',
                    'defaultValue': 75
                },
                'Height': {
                    'description': 'height of widget',
                    'baseType': 'NUMBER',
                    'defaultValue': 30,
                    'isEditable': false
                },
                'TabSequence': {
                    'description': 'Tab sequence index',
                    'baseType': 'NUMBER',
                    'defaultValue': 0
                },
				'UnitName': {
                    'description': 'This UnitName',
                    'baseType': 'STRING',
					'isBindingTarget': true
                },
				
                'ConfirmationRequired': {
                    'description': 'Require a confirmation dialog',
                    'defaultValue': false,
                    'baseType': 'BOOLEAN'
                },
                'ConfirmationTitle': {
                    'description': 'Title for the optional confirmation dialog',
                    'defaultValue': 'Confirm Action',
                    'baseType': 'STRING',
                    'isLocalizable': true
                },
                'ConfirmationPrompt': {
                    'description': 'Prompt for the optional confirmation dialog',
                    'defaultValue': 'Do Action?',
                    'baseType': 'STRING',
                    'isLocalizable': true
                },
                'ConfirmationButton1Label': {
                    'description': 'Label for the first confirmation dialog button',
                    'defaultValue': 'Yes',
                    'baseType': 'STRING',
                    'isLocalizable': true
                },
                'ConfirmationButton2Label': {
                    'description': 'Label for the second confirmation dialog button',
                    'defaultValue': 'No',
                    'baseType': 'STRING',
                    'isLocalizable': true
                },
                'DefaultConfirmationButton': {
                    'description': 'Default button for the confirmation dialog',
                    'baseType': 'STRING',
                    'defaultValue': 'button1',
                    'selectOptions': [
                        { value: 'button1', text: 'First Button' },
                        { value: 'button2', text: 'Second Button' }
                    ]
                },
                'CancelConfirmationButton': {
                    'description': 'Cancel button for the confirmation dialog',
                    'baseType': 'STRING',
                    'defaultValue': 'button2',
                    'selectOptions': [
                        { value: 'button1', text: 'First Button' },
                        { value: 'button2', text: 'Second Button' }
                    ]
                },
                'RoundedCorners': {
                    'description': 'Do you want the corners on the button rounded',
                    'baseType': 'BOOLEAN',
                    'defaultValue': true
                },
                'Disabled': {
                    'description':     'Button is disabled.',
                    'baseType':        'BOOLEAN',
                    'defaultValue':    false,
                    'isBindingTarget': true
                },
                'Style': {
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultButtonStyle'
                },
                'HoverStyle': {
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultButtonHoverStyle'
                },
                'ActiveStyle': {
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultButtonActiveStyle'
                },
                'FocusStyle': {
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultButtonFocusStyle'
                },
                'DisabledStyle': {
                    'baseType':     'STYLEDEFINITION',
                    'defaultValue': 'DefaultButtonDisabledStyle'
                },
                'IconAlignment': {
                    'description': 'Either align the icon for the button to the left or the right of the text',
                    'baseType': 'STRING',
                    'defaultValue': 'left',
                    'selectOptions': [
                        { value: 'left', text: 'Left' },
                        { value: 'right', text: 'Right' }
                    ]
                }
            }
        };
    };

    this.widgetEvents = function () {
        return {
            'Clicked': { 'warnIfNotBound': true }
        };
    };

    this.afterSetProperty = function (name, value) {
        var result = false;
        switch (name) {
            case 'Label' :
            case 'Style':
            case 'Width':
            case 'Height':
            case 'RoundedCorners':
            case 'HoverStyle':
            case 'IconAlignment':
                result = true;
                break;
            default:
                break;
        }
        return result;
    };


    this.renderHtml = function () {

        var formatResult = TW.getStyleFromStyleDefinition(this.getProperty('Style', 'DefaultButtonStyle'));
        var formatResult2 = TW.getStyleFromStyleDefinition(this.getProperty('HoverStyle', 'DefaultButtonHoverStyle'));
        var formatResult3 = TW.getStyleFromStyleDefinition(this.getProperty('ActiveStyle', 'DefaultButtonActiveStyle'));
        var textSizeClass = 'textsize-normal';
        if (this.getProperty('Style') !== undefined) {
            textSizeClass = TW.getTextSizeClassName(formatResult.textSize);
        }

        var html = '';

        html +=
            '<div class="widget-content widget-printbutton">'
                + '<div class="widget-printbutton-overflow">'
                    + '<div class="widget-printbutton-wrapper">'
                        + '<div class="widget-printbutton-element">'
                            + '<div class="widget-printbutton-content">'
                                + '<span class="widget-printbutton-icon">'
                                    + ((formatResult.image !== undefined && formatResult.image.length > 0) ? '<img class="default" src="' + formatResult.image + '"/>' : '')
                                    + ((formatResult2.image !== undefined && formatResult2.image.length > 0) ? '<img class="hover" src="' + formatResult2.image + '"/>' : '')
                                    + ((formatResult3.image !== undefined && formatResult3.image.length > 0) ? '<img class="active" src="' + formatResult3.image + '"/>' : '')
                                + '</span>'
                                + '<span class="widget-printbutton-text ' + textSizeClass + '" >' + (this.getProperty('Label') === undefined ? 'Button' : Encoder.htmlEncode(this.getProperty('Label'))) + '</span>'
                            + '</div>'
                        + '</div>'
                    + '</div>'
                + '</div>'
          + '</div>';
        return html;
    };

    this.afterRender = function () {
        var thisWidget = this;

        var buttonStyle = TW.getStyleFromStyleDefinition(thisWidget.getProperty('Style'));
        var buttonHoverStyle = TW.getStyleFromStyleDefinition(thisWidget.getProperty('HoverStyle'));
        var buttonActiveStyle = TW.getStyleFromStyleDefinition(thisWidget.getProperty('ActiveStyle'));

        var buttonBackground = TW.getStyleCssGradientFromStyle(buttonStyle);
        var buttonText = TW.getStyleCssTextualNoBackgroundFromStyle(buttonStyle);
        var buttonBorder = TW.getStyleCssBorderFromStyle(buttonStyle);
        var buttonHoverBG = TW.getStyleCssGradientFromStyle(buttonHoverStyle);
        var buttonHoverText = TW.getStyleCssTextualNoBackgroundFromStyle(buttonHoverStyle);
        var buttonHoverBorder = TW.getStyleCssBorderFromStyle(buttonHoverStyle);
        var cssButtonActiveBackground = TW.getStyleCssGradientFromStyle(buttonActiveStyle);
        var cssButtonActiveBorder = TW.getStyleCssBorderFromStyle(buttonActiveStyle);

        roundedCorners = this.getProperty('RoundedCorners');
        if (roundedCorners === undefined) {
            roundedCorners = true;
        }

        if (roundedCorners === true) {
            thisWidget.jqElement.addClass('roundedCorners');
        }

        thisWidget.jqElement.mousedown(function() {
            thisWidget.jqElement.addClass('active');
        }).mouseup(function(){
            thisWidget.jqElement.removeClass('active');
        });

        if (buttonStyle.image.length > 0) {
            thisWidget.jqElement.addClass('hasImage');
        }

        if (buttonHoverStyle.image.length === 0) {
            thisWidget.jqElement.addClass('singleImageOnly');
        }

        var buttonBorderWidth = TW.getStyleCssBorderWidthOnlyFromStyle(buttonStyle);
        var buttonHeight = this.getProperty('Height');
        var adjBtnHeight = (buttonHeight - (2 * buttonBorderWidth));

        thisWidget.jqElement.find('.widget-printbutton-element').css('height',adjBtnHeight);

        var resource = TW.IDE.getMashupResource();
        var widgetStyles =
            '#' + thisWidget.jqElementId + ' .widget-printbutton-overflow { ' + buttonBackground + buttonBorder +' } ' +
            '#' + thisWidget.jqElementId + ' .widget-printbutton-overflow:hover { ' + buttonHoverBG + buttonHoverBorder + ' } ' +
            '#' + thisWidget.jqElementId + ' .widget-printbutton-overflow:hover .widget-printbutton-text {'+ buttonHoverText + '} ' +
            '#' + thisWidget.jqElementId + '.active .widget-printbutton-overflow {'+ cssButtonActiveBackground + cssButtonActiveBorder +'}' +
            '#' + thisWidget.jqElementId + ' .widget-printbutton-text {'+ buttonText + '} ';
        resource.styles.append(widgetStyles);

        var iconAlignment = this.getProperty('IconAlignment');
        var iconElement = thisWidget.jqElement.find('.widget-printbutton-icon');
        buttonText = thisWidget.jqElement.find('.widget-printbutton-text');

        if (buttonText.html().length === 0) {
            thisWidget.jqElement.addClass('iconOnly'); // don't pad for text
        }
        else {
            if (iconAlignment === 'right') {
                $(iconElement).insertAfter(buttonText);
                thisWidget.jqElement.addClass('iconRight');
            }
        }
    };
};
