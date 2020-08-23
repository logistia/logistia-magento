<?php
namespace Logistia\Logistia\Model;

use Magento\Checkout\Model\ConfigProviderInterface;
use Magento\Store\Model\ScopeInterface;

class DeliveryDateConfigProvider implements ConfigProviderInterface
{
    const deliveryDateLabel = 'Logistia_Logistia/general/deliveryDateLabel';
    const deliveryTimeLabel = 'Logistia_Logistia/general/deliveryTimeLabel';
    const deliveryCommentsLabel = 'Logistia_Logistia/general/deliveryCommentsLabel';
    const deliveryAllowComments = 'Logistia_Logistia/general/deliveryAllowComments';

    /**
     * @var \Magento\Store\Model\StoreManagerInterface
     */
    protected $storeManager;

    /**
     * @var \Magento\Framework\App\Config\ScopeConfigInterface
     */
    protected $scopeConfig;

    /**
     * @param \Magento\Store\Model\StoreManagerInterface $storeManager
     * @param \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig
     */
    public function __construct(
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig
    ) {
        $this->storeManager = $storeManager;
        $this->scopeConfig = $scopeConfig;
    }

    /**
     * {@inheritdoc}
     */
    public function getConfig()
    {
        $store = $this->getStoreId();
        $deliveryDateLabel = $this->scopeConfig->getValue(self::deliveryDateLabel, ScopeInterface::SCOPE_STORE, $store);
        $deliveryTimeLabel = $this->scopeConfig->getValue(self::deliveryTimeLabel, ScopeInterface::SCOPE_STORE, $store);
        $deliveryCommentsLabel = $this->scopeConfig->getValue(self::deliveryCommentsLabel, ScopeInterface::SCOPE_STORE, $store);
        $deliveryAllowComments = $this->scopeConfig->getValue(self::deliveryAllowComments, ScopeInterface::SCOPE_STORE, $store);
        
        $config = [
            'shipping' => [
                'delivery_date' => [
                    'deliveryDateLabel'=> $deliveryDateLabel,
                    'deliveryTimeLabel'=> $deliveryTimeLabel,
                    'deliveryCommentsLabel'=> $deliveryCommentsLabel,
                    'deliveryAllowComments'=> $deliveryAllowComments,

                ]
            ]
        ];

        return $config;
    }

    public function getStoreId()
    {
        return $this->storeManager->getStore()->getStoreId();
    }
}