/**
 * Экспорт всех инструментов для работы с заказами FBS
 */

// Existing tools
export { getOrdersTool, getOrdersHandler } from './get-orders.js';
export { getPickingTasksTool, getPickingTasksHandler } from './get-picking-tasks.js';
export { updateStatusTool, updateStatusHandler } from './update-status.js';

// New Assembly Tasks tools
export { getNewOrdersTool, getNewOrdersHandler } from './get-new-orders.js';
export { getOrdersStatusesTool, getOrdersStatusesHandler } from './get-orders-statuses.js';
export { cancelOrderTool, cancelOrderHandler } from './cancel-order.js';
export { getStickersTool, getStickersHandler } from './get-stickers.js';
export { getCrossborderStickersTool, getCrossborderStickersHandler } from './get-crossborder-stickers.js';
export { getStatusHistoryTool, getStatusHistoryHandler } from './get-status-history.js';
export { getOrdersWithClientTool, getOrdersWithClientHandler } from './get-orders-with-client.js';
export { getReshipmentOrdersTool, getReshipmentOrdersHandler } from './get-reshipment-orders.js';

// Metadata tools
export { getOrderMetadataTool, getOrderMetadataHandler } from './get-order-metadata.js';
export { deleteOrderMetadataTool, deleteOrderMetadataHandler } from './delete-order-metadata.js';
export { setOrderMetadataTool, setOrderMetadataHandler } from './set-order-metadata.js';

// Supply tools
export { createSupplyTool, createSupplyHandler } from './create-supply.js';
export { getSuppliesTool, getSuppliesHandler } from './get-supplies.js';
export { getSupplyTool, getSupplyHandler } from './get-supply.js';
export { deleteSupplyTool, deleteSupplyHandler } from './delete-supply.js';
export { addOrdersToSupplyTool, addOrdersToSupplyHandler } from './add-orders-to-supply.js';
export { deliverSupplyTool, deliverSupplyHandler } from './deliver-supply.js';
export { getSupplyBarcodeTool, getSupplyBarcodeHandler } from './get-supply-barcode.js';
export { getSupplyBoxesTool, getSupplyBoxesHandler } from './get-supply-boxes.js';
export { manageSupplyBoxesTool, manageSupplyBoxesHandler } from './manage-supply-boxes.js';

// Pass tools
export { getPassesTool, getPassesHandler } from './get-passes.js';
export { managePassTool, managePassHandler } from './manage-pass.js';

/**
 * Массив всех инструментов для заказов FBS
 */
import { getOrdersTool } from './get-orders.js';
import { getPickingTasksTool } from './get-picking-tasks.js';
import { updateStatusTool } from './update-status.js';
import { getNewOrdersTool } from './get-new-orders.js';
import { getOrdersStatusesTool } from './get-orders-statuses.js';
import { cancelOrderTool } from './cancel-order.js';
import { getStickersTool } from './get-stickers.js';
import { getCrossborderStickersTool } from './get-crossborder-stickers.js';
import { getStatusHistoryTool } from './get-status-history.js';
import { getOrdersWithClientTool } from './get-orders-with-client.js';
import { getReshipmentOrdersTool } from './get-reshipment-orders.js';
import { getOrderMetadataTool } from './get-order-metadata.js';
import { deleteOrderMetadataTool } from './delete-order-metadata.js';
import { setOrderMetadataTool } from './set-order-metadata.js';
import { createSupplyTool } from './create-supply.js';
import { getSuppliesTool } from './get-supplies.js';
import { getSupplyTool } from './get-supply.js';
import { deleteSupplyTool } from './delete-supply.js';
import { addOrdersToSupplyTool } from './add-orders-to-supply.js';
import { deliverSupplyTool } from './deliver-supply.js';
import { getSupplyBarcodeTool } from './get-supply-barcode.js';
import { getSupplyBoxesTool } from './get-supply-boxes.js';
import { manageSupplyBoxesTool } from './manage-supply-boxes.js';
import { getPassesTool } from './get-passes.js';
import { managePassTool } from './manage-pass.js';

export const orderFbsTools = [
  getOrdersTool,
  getPickingTasksTool,
  updateStatusTool,
  getNewOrdersTool,
  getOrdersStatusesTool,
  cancelOrderTool,
  getStickersTool,
  getCrossborderStickersTool,
  getStatusHistoryTool,
  getOrdersWithClientTool,
  getReshipmentOrdersTool,
  getOrderMetadataTool,
  deleteOrderMetadataTool,
  setOrderMetadataTool,
  createSupplyTool,
  getSuppliesTool,
  getSupplyTool,
  deleteSupplyTool,
  addOrdersToSupplyTool,
  deliverSupplyTool,
  getSupplyBarcodeTool,
  getSupplyBoxesTool,
  manageSupplyBoxesTool,
  getPassesTool,
  managePassTool,
];

/**
 * Массив всех обработчиков для заказов FBS
 */
import { getOrdersHandler } from './get-orders.js';
import { getPickingTasksHandler } from './get-picking-tasks.js';
import { updateStatusHandler } from './update-status.js';
import { getNewOrdersHandler } from './get-new-orders.js';
import { getOrdersStatusesHandler } from './get-orders-statuses.js';
import { cancelOrderHandler } from './cancel-order.js';
import { getStickersHandler } from './get-stickers.js';
import { getCrossborderStickersHandler } from './get-crossborder-stickers.js';
import { getStatusHistoryHandler } from './get-status-history.js';
import { getOrdersWithClientHandler } from './get-orders-with-client.js';
import { getReshipmentOrdersHandler } from './get-reshipment-orders.js';
import { getOrderMetadataHandler } from './get-order-metadata.js';
import { deleteOrderMetadataHandler } from './delete-order-metadata.js';
import { setOrderMetadataHandler } from './set-order-metadata.js';
import { createSupplyHandler } from './create-supply.js';
import { getSuppliesHandler } from './get-supplies.js';
import { getSupplyHandler } from './get-supply.js';
import { deleteSupplyHandler } from './delete-supply.js';
import { addOrdersToSupplyHandler } from './add-orders-to-supply.js';
import { deliverSupplyHandler } from './deliver-supply.js';
import { getSupplyBarcodeHandler } from './get-supply-barcode.js';
import { getSupplyBoxesHandler } from './get-supply-boxes.js';
import { manageSupplyBoxesHandler } from './manage-supply-boxes.js';
import { getPassesHandler } from './get-passes.js';
import { managePassHandler } from './manage-pass.js';

export const orderFbsHandlers: Record<string, typeof getOrdersHandler> = {
  wb_get_orders_fbs: getOrdersHandler,
  wb_get_picking_tasks_fbs: getPickingTasksHandler,
  wb_update_order_status_fbs: updateStatusHandler,
  wb_get_new_orders_fbs: getNewOrdersHandler,
  wb_get_orders_statuses_fbs: getOrdersStatusesHandler,
  wb_cancel_order_fbs: cancelOrderHandler,
  wb_get_order_stickers: getStickersHandler,
  wb_get_crossborder_stickers: getCrossborderStickersHandler,
  wb_get_status_history: getStatusHistoryHandler,
  wb_get_orders_with_client: getOrdersWithClientHandler,
  wb_get_reshipment_orders: getReshipmentOrdersHandler,
  wb_get_order_metadata: getOrderMetadataHandler,
  wb_delete_order_metadata: deleteOrderMetadataHandler,
  wb_set_order_metadata: setOrderMetadataHandler,
  wb_create_supply: createSupplyHandler,
  wb_get_supplies: getSuppliesHandler,
  wb_get_supply: getSupplyHandler,
  wb_delete_supply: deleteSupplyHandler,
  wb_add_orders_to_supply: addOrdersToSupplyHandler,
  wb_deliver_supply: deliverSupplyHandler,
  wb_get_supply_barcode: getSupplyBarcodeHandler,
  wb_get_supply_boxes: getSupplyBoxesHandler,
  wb_manage_supply_boxes: manageSupplyBoxesHandler,
  wb_get_passes: getPassesHandler,
  wb_manage_pass: managePassHandler,
};
