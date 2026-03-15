/**
 * Экспорт всех инструментов для работы с поставками FBW
 */

import { ToolDefinition, ToolHandler } from '../../types/tools.js';

import { getAcceptanceOptionsTool, getAcceptanceOptionsHandler } from './get-acceptance-options.js';
import { getWarehousesTool, getWarehousesHandler } from './get-warehouses.js';
import { getTransitTariffsTool, getTransitTariffsHandler } from './get-transit-tariffs.js';
import { getFbwSuppliesTool, getFbwSuppliesHandler } from './get-fbw-supplies.js';
import { getFbwSupplyTool, getFbwSupplyHandler } from './get-fbw-supply.js';
import { getFbwSupplyGoodsTool, getFbwSupplyGoodsHandler } from './get-fbw-supply-goods.js';
import { getFbwSupplyPackageTool, getFbwSupplyPackageHandler } from './get-fbw-supply-package.js';

export const supplyTools: ToolDefinition[] = [
  getAcceptanceOptionsTool,
  getWarehousesTool,
  getTransitTariffsTool,
  getFbwSuppliesTool,
  getFbwSupplyTool,
  getFbwSupplyGoodsTool,
  getFbwSupplyPackageTool,
];

export const supplyHandlers: Record<string, ToolHandler> = {
  wb_get_acceptance_options: getAcceptanceOptionsHandler,
  wb_get_warehouses: getWarehousesHandler,
  wb_get_transit_tariffs: getTransitTariffsHandler,
  wb_get_fbw_supplies: getFbwSuppliesHandler,
  wb_get_fbw_supply: getFbwSupplyHandler,
  wb_get_fbw_supply_goods: getFbwSupplyGoodsHandler,
  wb_get_fbw_supply_package: getFbwSupplyPackageHandler,
};
