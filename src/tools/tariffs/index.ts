/**
 * Экспорт всех инструментов для работы с тарифами
 */

import { ToolDefinition, ToolHandler } from '../../types/tools.js';

import { getCommissionsTool, getCommissionsHandler } from './get-commissions.js';
import { getBoxTariffsTool, getBoxTariffsHandler } from './get-box-tariffs.js';
import { getPalletTariffsTool, getPalletTariffsHandler } from './get-pallet-tariffs.js';
import { getAcceptanceCoefficientsTool, getAcceptanceCoefficientsHandler } from './get-acceptance-coefficients.js';
import { getReturnTariffsTool, getReturnTariffsHandler } from './get-return-tariffs.js';

export const tariffTools: ToolDefinition[] = [
  getCommissionsTool,
  getBoxTariffsTool,
  getPalletTariffsTool,
  getAcceptanceCoefficientsTool,
  getReturnTariffsTool,
];

export const tariffHandlers: Record<string, ToolHandler> = {
  wb_get_commission_tariffs: getCommissionsHandler,
  wb_get_box_tariffs: getBoxTariffsHandler,
  wb_get_pallet_tariffs: getPalletTariffsHandler,
  wb_get_acceptance_tariffs: getAcceptanceCoefficientsHandler,
  wb_get_return_tariffs: getReturnTariffsHandler,
};
