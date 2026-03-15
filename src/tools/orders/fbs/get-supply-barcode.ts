/**
 * Инструмент для получения штрихкода поставки FBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const getSupplyBarcodeTool: ToolDefinition = {
  name: 'wb_get_supply_barcode',
  description:
    'Получить штрихкод (QR-код) поставки FBS для маркировки при передаче на склад Wildberries.',
  inputSchema: {
    type: 'object',
    properties: {
      supplyId: {
        type: 'string',
        description: 'Идентификатор поставки (например, WB-GI-1234567)',
      },
      type: {
        type: 'string',
        enum: ['svg', 'png'],
        description: 'Формат штрихкода (svg или png)',
      },
    },
    required: ['supplyId'],
  },
};

export const getSupplyBarcodeHandler: ToolHandler = async (params) => {
  try {
    const { supplyId, type } = params as { supplyId: string; type?: string };

    logger.info('Getting FBS supply barcode', { supplyId, type });

    const response = await wbMarketplaceClient.get(
      `/api/v3/supplies/${supplyId}/barcode`,
      { ...(type && { type }) }
    );

    logger.info('FBS supply barcode retrieved successfully', { supplyId });

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to get FBS supply barcode', { error });
    return formatError(error, 'wb_get_supply_barcode');
  }
};
