/**
 * Экспорт всех инструментов для работы с товарами
 */

export { getProductsTool, getProductsHandler } from './get-products.js';
export { updateContentTool, updateContentHandler } from './update-content.js';
export { updatePricesTool, updatePricesHandler } from './update-prices.js';
export { updateStocksTool, updateStocksHandler } from './update-stocks.js';

/**
 * Массив всех инструментов для товаров
 */
import { getProductsTool } from './get-products.js';
import { updateContentTool } from './update-content.js';
import { updatePricesTool } from './update-prices.js';
import { updateStocksTool } from './update-stocks.js';

export const productTools = [
  getProductsTool,
  updateContentTool,
  updatePricesTool,
  updateStocksTool,
];

/**
 * Массив всех обработчиков для товаров
 */
import { getProductsHandler } from './get-products.js';
import { updateContentHandler } from './update-content.js';
import { updatePricesHandler } from './update-prices.js';
import { updateStocksHandler } from './update-stocks.js';

export const productHandlers = {
  wb_get_products: getProductsHandler,
  wb_update_product_content: updateContentHandler,
  wb_update_product_price: updatePricesHandler,
  wb_update_product_stock: updateStocksHandler,
};
