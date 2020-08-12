var config = {
    'config': {
        'mixins': {
            'Magento_Checkout/js/view/shipping': {
                'Fespore_Logistia/js/view/shipping-payment-mixin': true
            },
            'Magento_Checkout/js/view/payment': {
                'Fespore_Logistia/js/view/shipping-payment-mixin': true
            }
        }
    }
}
