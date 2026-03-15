/**
 * Инструмент для управления пропусками FBS
 */

import { wbMarketplaceClient } from '../../../client/wildberries-client.js';
import { ToolDefinition, ToolHandler } from '../../../types/tools.js';
import { formatApiResponse, formatError } from '../../../utils/formatter.js';
import { logger } from '../../../utils/logger.js';

export const managePassTool: ToolDefinition = {
  name: 'wb_manage_pass',
  description:
    'Управление пропусками для доставки на склады Wildberries: создание, обновление или удаление пропуска.',
  inputSchema: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        enum: ['create', 'update', 'delete'],
        description: 'Действие: create — создать, update — обновить, delete — удалить пропуск',
      },
      passId: {
        type: 'number',
        description: 'Идентификатор пропуска (не нужен для create)',
      },
      firstName: {
        type: 'string',
        description: 'Имя водителя',
      },
      lastName: {
        type: 'string',
        description: 'Фамилия водителя',
      },
      carModel: {
        type: 'string',
        description: 'Модель автомобиля',
      },
      carNumber: {
        type: 'string',
        description: 'Номер автомобиля',
      },
      officeId: {
        type: 'number',
        description: 'Идентификатор офиса/склада',
      },
    },
    required: ['action'],
  },
};

export const managePassHandler: ToolHandler = async (params) => {
  try {
    const { action, passId, firstName, lastName, carModel, carNumber, officeId } =
      params as {
        action: 'create' | 'update' | 'delete';
        passId?: number;
        firstName?: string;
        lastName?: string;
        carModel?: string;
        carNumber?: string;
        officeId?: number;
      };

    logger.info('Managing FBS pass', { action, passId });

    let response;
    const passData = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(carModel && { carModel }),
      ...(carNumber && { carNumber }),
      ...(officeId && { officeId }),
    };

    switch (action) {
      case 'create':
        response = await wbMarketplaceClient.post('/api/v3/passes', passData);
        break;
      case 'update':
        if (!passId) {
          return formatError(
            new Error('Параметр passId обязателен для действия update'),
            'wb_manage_pass'
          );
        }
        response = await wbMarketplaceClient.put(
          `/api/v3/passes/${passId}`,
          passData
        );
        break;
      case 'delete':
        if (!passId) {
          return formatError(
            new Error('Параметр passId обязателен для действия delete'),
            'wb_manage_pass'
          );
        }
        response = await wbMarketplaceClient.delete(
          `/api/v3/passes/${passId}`
        );
        break;
    }

    logger.info('FBS pass managed successfully', { action, passId });

    return formatApiResponse(response);
  } catch (error) {
    logger.error('Failed to manage FBS pass', { error });
    return formatError(error, 'wb_manage_pass');
  }
};
