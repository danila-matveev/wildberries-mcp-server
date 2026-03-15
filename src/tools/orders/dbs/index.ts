/**
 * Экспорт всех инструментов для работы с заказами DBS
 */

export { getNewOrdersDbsTool, getNewOrdersDbsHandler } from './get-new-orders.js';
export { getOrdersDbsTool, getOrdersDbsHandler } from './get-orders.js';
export { getGroupsInfoDbsTool, getGroupsInfoDbsHandler } from './get-groups-info.js';
export { getClientInfoDbsTool, getClientInfoDbsHandler } from './get-client-info.js';
export { getB2bInfoDbsTool, getB2bInfoDbsHandler } from './get-b2b-info.js';
export { getDeliveryDateDbsTool, getDeliveryDateDbsHandler } from './get-delivery-date.js';
export { getStatusesDbsTool, getStatusesDbsHandler } from './get-statuses.js';
export { cancelOrdersDbsTool, cancelOrdersDbsHandler } from './cancel-orders.js';
export { confirmOrdersDbsTool, confirmOrdersDbsHandler } from './confirm-orders.js';
export { deliverOrdersDbsTool, deliverOrdersDbsHandler } from './deliver-orders.js';
export { receiveOrdersDbsTool, receiveOrdersDbsHandler } from './receive-orders.js';
export { rejectOrdersDbsTool, rejectOrdersDbsHandler } from './reject-orders.js';
export { getStickersDbsTool, getStickersDbsHandler } from './get-stickers.js';

/**
 * Массив всех инструментов для заказов DBS
 */
import { getNewOrdersDbsTool } from './get-new-orders.js';
import { getOrdersDbsTool } from './get-orders.js';
import { getGroupsInfoDbsTool } from './get-groups-info.js';
import { getClientInfoDbsTool } from './get-client-info.js';
import { getB2bInfoDbsTool } from './get-b2b-info.js';
import { getDeliveryDateDbsTool } from './get-delivery-date.js';
import { getStatusesDbsTool } from './get-statuses.js';
import { cancelOrdersDbsTool } from './cancel-orders.js';
import { confirmOrdersDbsTool } from './confirm-orders.js';
import { deliverOrdersDbsTool } from './deliver-orders.js';
import { receiveOrdersDbsTool } from './receive-orders.js';
import { rejectOrdersDbsTool } from './reject-orders.js';
import { getStickersDbsTool } from './get-stickers.js';

export const orderDbsTools = [
  getNewOrdersDbsTool,
  getOrdersDbsTool,
  getGroupsInfoDbsTool,
  getClientInfoDbsTool,
  getB2bInfoDbsTool,
  getDeliveryDateDbsTool,
  getStatusesDbsTool,
  cancelOrdersDbsTool,
  confirmOrdersDbsTool,
  deliverOrdersDbsTool,
  receiveOrdersDbsTool,
  rejectOrdersDbsTool,
  getStickersDbsTool,
];

/**
 * Карта обработчиков для заказов DBS
 */
import { getNewOrdersDbsHandler } from './get-new-orders.js';
import { getOrdersDbsHandler } from './get-orders.js';
import { getGroupsInfoDbsHandler } from './get-groups-info.js';
import { getClientInfoDbsHandler } from './get-client-info.js';
import { getB2bInfoDbsHandler } from './get-b2b-info.js';
import { getDeliveryDateDbsHandler } from './get-delivery-date.js';
import { getStatusesDbsHandler } from './get-statuses.js';
import { cancelOrdersDbsHandler } from './cancel-orders.js';
import { confirmOrdersDbsHandler } from './confirm-orders.js';
import { deliverOrdersDbsHandler } from './deliver-orders.js';
import { receiveOrdersDbsHandler } from './receive-orders.js';
import { rejectOrdersDbsHandler } from './reject-orders.js';
import { getStickersDbsHandler } from './get-stickers.js';

export const orderDbsHandlers: Record<string, typeof getNewOrdersDbsHandler> = {
  wb_get_new_orders_dbs: getNewOrdersDbsHandler,
  wb_get_orders_dbs: getOrdersDbsHandler,
  wb_get_groups_info_dbs: getGroupsInfoDbsHandler,
  wb_get_client_info_dbs: getClientInfoDbsHandler,
  wb_get_b2b_info_dbs: getB2bInfoDbsHandler,
  wb_get_delivery_date_dbs: getDeliveryDateDbsHandler,
  wb_get_statuses_dbs: getStatusesDbsHandler,
  wb_cancel_orders_dbs: cancelOrdersDbsHandler,
  wb_confirm_orders_dbs: confirmOrdersDbsHandler,
  wb_deliver_orders_dbs: deliverOrdersDbsHandler,
  wb_receive_orders_dbs: receiveOrdersDbsHandler,
  wb_reject_orders_dbs: rejectOrdersDbsHandler,
  wb_get_stickers_dbs: getStickersDbsHandler,
};
