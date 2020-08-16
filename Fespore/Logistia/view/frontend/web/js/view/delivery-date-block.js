define([
    'jquery',
    'ko',
    'uiComponent'
], function ($, ko, Component) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Fespore_Logistia/delivery-date-block'
        },
        availableCountries: ko.bindingHandlers.observableArray = ['10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00'],
        deliveryDateLabel: window.checkoutConfig.shipping.delivery_date.deliveryDateLabel,
        deliveryTimeLabel: window.checkoutConfig.shipping.delivery_date.deliveryTimeLabel,
        deliveryCommentsLabel: window.checkoutConfig.shipping.delivery_date.deliveryCommentsLabel,
        deliveryAllowComments: window.checkoutConfig.shipping.delivery_date.deliveryAllowComments,
        initialize: function () {
            this._super();
            console.log(window.checkoutConfig.shipping);
            /*var disabled = window.checkoutConfig.shipping.delivery_date.disabled;
            var noday = window.checkoutConfig.shipping.delivery_date.noday;
            var hourMin = parseInt(window.checkoutConfig.shipping.delivery_date.hourMin);
            var hourMax = parseInt(window.checkoutConfig.shipping.delivery_date.hourMax);
            var format = window.checkoutConfig.shipping.delivery_date.format;*/
            var disabled = "3,6";
            var noday = false;
            var hourMin = '08';
            var hourMax = '20';
            var format = 'yy-mm-dd';
            if (!format) {
                format = 'yy-mm-dd';
            }
            var disabledDay = disabled.split(",").map(function (item) {
                return parseInt(item, 10);
            });

            ko.bindingHandlers.datetimepicker = {
                init: function (element, valueAccessor, allBindingsAccessor) {
                    var $el = $(element);
                    //initialize datetimepicker
                    if (noday) {
                        var options = {
                            timepicker: false,
                            minDate: 0,
                            dateFormat: format,
                            hourMin: hourMin,
                            hourMax: hourMax
                        };
                    } else {
                        var options = {
                            timepicker: false,
                            minDate: 0,
                            dateFormat: format,
                            hourMin: hourMin,
                            hourMax: hourMax,
                            beforeShowDay: function (date) {
                                var day = date.getDay();
                                if (disabledDay.indexOf(day) > -1) {
                                    return [false];
                                } else {
                                    return [true];
                                }
                            }
                        };
                    }

                    $el.datepicker(options);

                    var writable = valueAccessor();
                    if (!ko.isObservable(writable)) {
                        var propWriters = allBindingsAccessor()._ko_property_writers;
                        if (propWriters && propWriters.datetimepicker) {
                            writable = propWriters.datetimepicker;
                        } else {
                            return;
                        }
                    }
                    writable($(element).datetimepicker("getDate"));
                },
                update: function (element, valueAccessor) {
                    var widget = $(element).data("DateTimePicker");
                    //when the view model is updated, update the widget
                    if (widget) {
                        var date = ko.utils.unwrapObservable(valueAccessor());
                        widget.date(date);
                    }
                }
            };

            return this;
        }
    });
});
