/**
 * Типы для Wildberries API
 * Основаны на документации: https://dev.wildberries.ru/
 */

import { DateRange, PaginationParams } from './common.js';

/**
 * Типы для работы с товарами
 */
export namespace Products {
  /**
   * Товар
   */
  export interface Product {
    nmID: number; // Артикул WB
    vendorCode: string; // Артикул продавца
    title: string; // Название
    description?: string; // Описание
    brand: string; // Бренд
    price: number; // Цена
    discount?: number; // Скидка в процентах
    quantity: number; // Количество
    createdAt: string; // Дата создания
    updatedAt: string; // Дата обновления
    photos?: Photo[]; // Фотографии
    characteristics?: Characteristic[]; // Характеристики
  }

  /**
   * Фотография товара
   */
  export interface Photo {
    big: string; // URL большого изображения
    c246x328: string; // URL изображения 246x328
    c516x688: string; // URL изображения 516x688
    square: string; // URL квадратного изображения
    tm: string; // URL миниатюры
  }

  /**
   * Характеристика товара
   */
  export interface Characteristic {
    id: number;
    name: string;
    value: string | number;
  }

  /**
   * Параметры для обновления контента
   */
  export interface UpdateContentParams {
    nmID: number;
    title?: string;
    description?: string;
    characteristics?: Characteristic[];
  }

  /**
   * Параметры для обновления цен
   */
  export interface UpdatePriceParams {
    nmID: number;
    price: number;
    discount?: number;
  }

  /**
   * Параметры для обновления остатков
   */
  export interface UpdateStockParams {
    nmID: number;
    warehouseID: number;
    quantity: number;
  }

  /**
   * Параметры для получения списка товаров
   */
  export interface GetProductsParams extends PaginationParams {
    search?: string;
    brandID?: number;
    updatedAtFrom?: string;
    updatedAtTo?: string;
  }
}

/**
 * Типы для работы с заказами
 */
export namespace Orders {
  /**
   * Заказ
   */
  export interface Order {
    id: number; // ID заказа
    rid: string; // ID сборочного задания
    orderUID: string; // Уникальный идентификатор заказа
    article: string; // Артикул продавца
    nmID: number; // Артикул WB
    barcode: string; // Штрихкод
    quantity: number; // Количество
    totalPrice: number; // Цена
    createdAt: string; // Дата создания
    status: OrderStatus; // Статус
    warehouseName?: string; // Название склада
    oblast?: string; // Область
    incomeID?: number; // ID поставки
  }

  /**
   * Статус заказа
   */
  export type OrderStatus =
    | 'new' // Новый
    | 'confirm' // Подтверждён
    | 'complete' // Выполнен
    | 'cancel' // Отменён
    | 'cancel_by_client'; // Отменён клиентом

  /**
   * Сборочное задание
   */
  export interface PickingTask {
    id: number;
    orderUID: string;
    nmID: number;
    chrtID: number;
    barcode: string;
    quantity: number;
    warehouseID: number;
    dateCreated: string;
    status: OrderStatus;
  }

  /**
   * Параметры для получения заказов
   */
  export interface GetOrdersParams extends DateRange {
    status?: OrderStatus;
    take?: number;
    skip?: number;
  }

  /**
   * Параметры для получения сборочных заданий
   */
  export interface GetPickingTasksParams extends DateRange {
    status?: OrderStatus;
  }

  /**
   * Параметры для обновления статуса
   */
  export interface UpdateStatusParams {
    orderUID: string;
    status: OrderStatus;
  }
}

/**
 * Типы для аналитики
 */
export namespace Analytics {
  /**
   * Поисковый запрос
   */
  export interface SearchQuery {
    keyword: string; // Поисковый запрос
    frequency: number; // Частота запросов
    avgPrice: number; // Средняя цена
    date: string; // Дата
  }

  /**
   * История остатков
   */
  export interface StockHistory {
    nmID: number; // Артикул WB
    warehouseName: string; // Название склада
    quantity: number; // Количество
    date: string; // Дата
  }

  /**
   * Воронка продаж
   */
  export interface SalesFunnel {
    nmID: number; // Артикул WB
    date: string; // Дата
    views: number; // Просмотры
    addToCart: number; // Добавления в корзину
    orders: number; // Заказы
    buyouts: number; // Выкупы
    cancels: number; // Отмены
  }

  /**
   * Параметры для получения поисковых запросов
   */
  export interface GetSearchQueriesParams extends DateRange {
    nmID?: number;
  }

  /**
   * Параметры для получения истории остатков
   */
  export interface GetStockHistoryParams extends DateRange {
    nmID: number;
  }

  /**
   * Параметры для получения воронки продаж
   */
  export interface GetSalesFunnelParams extends DateRange {
    nmID?: number;
  }
}

/**
 * Типы для маркетинга
 */
export namespace Marketing {
  /**
   * Рекламная кампания
   */
  export interface Campaign {
    id: number;
    name: string;
    type: CampaignType;
    status: CampaignStatus;
    budget: number;
    spent: number;
    createdAt: string;
  }

  /**
   * Тип кампании
   */
  export type CampaignType = 'search' | 'carousel' | 'catalog';

  /**
   * Статус кампании
   */
  export type CampaignStatus = 'active' | 'paused' | 'finished';
}

/**
 * Типы для отчётов
 */
export namespace Reports {
  /**
   * Отчёт по товару
   */
  export interface ProductReport {
    nmID: number;
    vendorCode: string;
    barcode: string;
    quantity: number;
    price: number;
    discount: number;
    saleDate: string;
  }

  /**
   * Параметры для получения отчёта
   */
  export interface GetReportParams extends DateRange {
    type: ReportType;
  }

  /**
   * Тип отчёта
   */
  export type ReportType = 'sales' | 'orders' | 'returns' | 'commissions';
}
