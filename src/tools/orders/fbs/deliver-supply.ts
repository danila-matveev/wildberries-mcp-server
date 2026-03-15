/**
 * Инструмент для передачи поставки FBS в доставку
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const deliverSupplyTool: ToolDefinition = {
  name: 'wb_deliver_supply',
  description:
    'Передать поставку FBS в доставку. После этого действия поставка закрывается и её нельзя изменить.',
  inputSchema: {
    type: 'object',
    properties: {
      supplyId: {
        type: 'string',
        description: 'Идентификатор поставки (например, WB-GI-1234567)',
      },
    },
    required: ['supplyId'],
  },
};

export const deliverSupplyHandler: ToolHandler = async (params) => {
  try {
    const { supplyId } = params as { supplyId: string };

    logger.info('Delivering FBS supply', { supplyId });

    const response = await wbMarketplaceClient.patch(
      `/api/v3/supplies/${supplyId}/deliver`
    );

    logger.info('FBS supply delivered successfully', { supplyId });

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to deliver FBS supply', { error });
    return formatError(error, 'wb_deliver_supply');
  }
};
