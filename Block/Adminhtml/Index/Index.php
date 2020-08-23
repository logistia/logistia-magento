<?php

namespace Fespore\Logistia\Block\Adminhtml\Index;

use Magento\Integration\Model\IntegrationFactory;


class Index extends \Magento\Backend\Block\Widget\Container
{

    protected $integrationFactory;

    public function __construct(\Magento\Backend\Block\Widget\Context $context, array $data = [],
                                \Magento\Integration\Model\IntegrationFactory $integrationFactory)
    {
        parent::__construct($context, $data);
        $this->integrationFactory = $integrationFactory;
    }


    function getLogistiaIntegrationStatus()
    {
        $integrationExists = $this->integrationFactory->create()->load("Logistia Integration", 'name')->getData();
        if (empty($integrationExists)) {
            return false;
        }
        if ($integrationExists["status"] == "0") {
            return false;
        }

        return true;
    }


}
