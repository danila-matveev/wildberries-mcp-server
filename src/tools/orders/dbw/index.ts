/**
 * Экспорт всех инструментов для работы с заказами DBW
 */

export { getNewOrdersDbwTool, getNewOrdersDbwHandler } from './get-new-orders.js';
export { getOrdersDbwTool, getOrdersDbwHandler } from './get-orders.js';
export { getDeliveryDateDbwTool, getDeliveryDateDbwHandler } from './get-delivery-date.js';
export { getClientInfoDbwTool, getClientInfoDbwHandler } from './get-client-info.js';
export { getOrdersStatusesDbwTool, getOrdersStatusesDbwHandler } from './get-orders-statuses.js';
export { confirmOrderDbwTool, confirmOrderDbwHandler } from './confirm-order.js';
export { assembleOrderDbwTool, assembleOrderDbwHandler } from './assemble-order.js';
export { cancelOrderDbwTool, cancelOrderDbwHandler } from './cancel-order.js';
export { getStickersDbwTool, getStickersDbwHandler } from './get-stickers.js';
export { getCourierDbwTool, getCourierDbwHandler } from './get-courier.js';
export { getMetadataDbwTool, getMetadataDbwHandler } from './get-metadata.js';
export { setMetadataDbwTool, setMetadataDbwHandler } from './set-metadata.js';

/**
 * Массив всех инструментов для заказов DBW
 */
import { getNewOrdersDbwTool } from './get-new-orders.js';
import { getOrdersDbwTool } from './get-orders.js';
import { getDeliveryDateDbwTool } from './get-delivery-date.js';
import { getClientInfoDbwTool } from './get-client-info.js';
import { getOrdersStatusesDbwTool } from './get-orders-statuses.js';
import { confirmOrderDbwTool } from './confirm-order.js';
import { assembleOrderDbwTool } from './assemble-order.js';
import { cancelOrderDbwTool } from './cancel-order.js';
import { getStickersDbwTool } from './get-stickers.js';
import { getCourierDbwTool } from './get-courier.js';
import { getMetadataDbwTool } from './get-metadata.js';
import { setMetadataDbwTool } from './set-metadata.js';

export const orderDbwTools = [
  getNewOrdersDbwTool,
  getOrdersDbwTool,
  getDeliveryDateDbwTool,
  getClientInfoDbwTool,
  getOrdersStatusesDbwTool,
  confirmOrderDbwTool,
  assembleOrderDbwTool,
  cancelOrderDbwTool,
  getStickersDbwTool,
  getCourierDbwTool,
  getMetadataDbwTool,
  setMetadataDbwTool,
];

/**
 * Карта обработчиков для заказов DBW
 */
import { getNewOrdersDbwHandler } from './get-new-orders.js';
import { getOrdersDbwHandler } from './get-orders.js';
import { getDeliveryDateDbwHandler } from './get-delivery-date.js';
import { getClientInfoDbwHandler } from './get-client-info.js';
import { getOrdersStatusesDbwHandler } from './get-orders-statuses.js';
import { confirmOrderDbwHandler } from './confirm-order.js';
import { assembleOrderDbwHandler } from './assemble-order.js';
import { cancelOrderDbwHandler } from './cancel-order.js';
import { getStickersDbwHandler } from './get-stickers.js';
import { getCourierDbwHandler } from './get-courier.js';
import { getMetadataDbwHandler } from './get-metadata.js';
import { setMetadataDbwHandler } from './set-metadata.js';

export const orderDbwHandlers: Record<string, typeof getNewOrdersDbwHandler> = {
  wb_get_new_orders_dbw: getNewOrdersDbwHandler,
  wb_get_orders_dbw: getOrdersDbwHandler,
  wb_get_delivery_date_dbw: getDeliveryDateDbwHandler,
  wb_get_client_info_dbw: getClientInfoDbwHandler,
  wb_get_orders_statuses_dbw: getOrdersStatusesDbwHandler,
  wb_confirm_order_dbw: confirmOrderDbwHandler,
  wb_assemble_order_dbw: assembleOrderDbwHandler,
  wb_cancel_order_dbw: cancelOrderDbwHandler,
  wb_get_stickers_dbw: getStickersDbwHandler,
  wb_get_courier_dbw: getCourierDbwHandler,
  wb_get_metadata_dbw: getMetadataDbwHandler,
  wb_set_metadata_dbw: setMetadataDbwHandler,
};
