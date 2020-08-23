define([
    'jquery',
    'ko',
    'uiComponent'
], function ($, ko, Component) {
    'use strict';
    let baseUrl = "https://api.logistia.app/app";
    return Component.extend({
        defaults: {
            template: 'Fespore_Logistia/delivery-date-block'
        },
        allDisabled: false,
        availableCountries: ko.bindingHandlers.observableArray = [],
        deliveryDateLabel: window.checkoutConfig.shipping.delivery_date.deliveryDateLabel,
        deliveryTimeLabel: window.checkoutConfig.shipping.delivery_date.deliveryTimeLabel,
        deliveryCommentsLabel: window.checkoutConfig.shipping.delivery_date.deliveryCommentsLabel,
        deliveryAllowComments: window.checkoutConfig.shipping.delivery_date.deliveryAllowComments,
        initialize: function () {
            this._super();
            var disabledDay = [];
            var format = 'yy-mm-dd';
            var maxDate;
            var minDate = 0;

            ko.bindingHandlers.datetimepicker = {
                init: function (element, valueAccessor, allBindingsAccessor) {
                    var $el = $(element);
                    //initialize datetimepicker

                    var options = {
                        timepicker: false,
                        minDate: minDate,
                        maxDate: maxDate,
                        dateFormat: format,
                        beforeShowDay: function (date) {
                            var day = ('0' + date.getDate()).slice(-2) + '/'
                                + ('0' + (date.getMonth() + 1)).slice(-2) + '/'
                                + date.getFullYear();
                            if (disabledDay.indexOf(day) > -1) {
                                return [false];
                            } else {
                                return [true];
                            }
                        }
                    };

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

            setTimeout(() => {
                $.get(baseUrl + "/shop-checkout/calendar?host=" + window.location.origin, (data) => {
                    this.allDisabled = data.allDisabled;
                    if (data.allDisabled == true) {
                        setTimeout(() => {
                            $("#logistia-calendar").remove();
                        }, 3000);
                        maxDate = -1;
                    } else {
                        this.availableCountries = data.availableTimeIntervals;
                        disabledDay = data.calendar.disabledDays;
                        if (data.calendar.maxDate != undefined) {
                            maxDate = data.calendar.maxDate;
                        }
                        if (data.calendar.minDate != undefined) {
                            minDate = data.calendar.minDate;
                        }
                        if (data.calendar.dateFormat != undefined) {
                            format = data.calendar.dateFormat;
                        }
                        $("#delivery_date").datepicker("option", JSON.parse(JSON.stringify({
                            dateFormat: data.calendar.dateFormat,
                            maxDate: data.calendar.maxDate,
                            minDate: data.calendar.minDate
                        })));
                    }
                });
            });

            return this;
        }
    });
});
