/**
 * Инструмент для изменения площадок размещения
 */

import { wbAdvClient } from '../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../types/tools.js';
import { formatApiResponse, formatError } from '../../utils/formatter.js';
import { logger } from '../../utils/logger.js';

export const changePlacementsTool: ToolDefinition = {
  name: 'wb_change_placements',
  description: 'Изменить площадки размещения рекламной кампании.',
  inputSchema: {
    type: 'object',
    properties: {
      advertId: {
        type: 'number',
        description: 'ID кампании',
      },
      placementIds: {
        type: 'array',
        items: { type: 'number' },
        description: 'Массив ID площадок размещения',
      },
    },
    required: ['advertId', 'placementIds'],
  },
};

export const changePlacementsHandler: ToolHandler = async (params) => {
  try {
    logger.info('Changing placements', { advertId: params.advertId });
    const response = await wbAdvClient.put('/adv/v0/auction/placements', {
      advertId: params.advertId,
      placementIds: params.placementIds,
    });
    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to change placements', { error });
    return formatError(error, 'wb_change_placements');
  }
};
