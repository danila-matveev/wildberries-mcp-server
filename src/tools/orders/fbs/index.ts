/**
 * Экспорт всех инструментов для работы с заказами FBS
 */

export { getOrdersTool, getOrdersHandler } from './get-orders.js';
export { getPickingTasksTool, getPickingTasksHandler } from './get-picking-tasks.js';
export { updateStatusTool, updateStatusHandler } from './update-status.js';

/**
 * Массив всех инструментов для заказов FBS
 */
import { getOrdersTool } from './get-orders.js';
import { getPickingTasksTool } from './get-picking-tasks.js';
import { updateStatusTool } from './update-status.js';

export const orderFbsTools = [
  getOrdersTool,
  getPickingTasksTool,
  updateStatusTool,
];

/**
 * Массив всех обработчиков для заказов FBS
 */
import { getOrdersHandler } from './get-orders.js';
import { getPickingTasksHandler } from './get-picking-tasks.js';
import { updateStatusHandler } from './update-status.js';

export const orderFbsHandlers = {
  wb_get_orders_fbs: getOrdersHandler,
  wb_get_picking_tasks_fbs: getPickingTasksHandler,
  wb_update_order_status_fbs: updateStatusHandler,
};
