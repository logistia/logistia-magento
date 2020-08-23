<?php

namespace Logistia\Logistia\Setup;

use Magento\Eav\Setup\EavSetup;
use Magento\Eav\Setup\EavSetupFactory;
use Magento\Framework\Setup\InstallDataInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Integration\Model\ConfigBasedIntegrationManager;

/**
 * @codeCoverageIgnore
 */
class InstallData implements InstallDataInterface
{
    /**
     * EAV setup factory
     *
     * @var EavSetupFactory
     */
    private $eavSetupFactory;
    private $integrationManager;

    /**
     * Init
     *
     * @param EavSetupFactory $eavSetupFactory
     */
    public function __construct(EavSetupFactory $eavSetupFactory, ConfigBasedIntegrationManager $integrationManager)
    {
        $this->eavSetupFactory = $eavSetupFactory;
        $this->integrationManager = $integrationManager;
    }

    /**
     * {@inheritdoc}
     * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
     */
    public function install(ModuleDataSetupInterface $setup, ModuleContextInterface $context)
    {
        /** @var EavSetup $eavSetup */
        $eavSetup = $this->eavSetupFactory->create(['setup' => $setup]);
        if (version_compare($context->getVersion(), '0.0.1') < 0) {

            $objectManager = \Magento\Framework\App\ObjectManager::getInstance();
            $customerSetup = $objectManager->create('Logistia\Logistia\Setup\CustomerSetup');
            $customerSetup->installAttributes($customerSetup);
        }

        $this->integrationManager->processIntegrationConfig(['Logistia Integration']);

    }
}