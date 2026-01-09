# Примеры использования

Практические примеры использования Wildberries MCP сервера.

## Базовые операции

### Получение списка товаров

**Получить первые 20 товаров:**

```json
{
  "tool": "wb_get_products",
  "arguments": {
    "limit": 20,
    "offset": 0
  }
}
```

**Поиск товаров по названию:**

```json
{
  "tool": "wb_get_products",
  "arguments": {
    "search": "футболка",
    "limit": 50
  }
}
```

**Получить товары обновлённые за последнюю неделю:**

```json
{
  "tool": "wb_get_products",
  "arguments": {
    "updatedAtFrom": "2024-01-02T00:00:00Z",
    "updatedAtTo": "2024-01-09T23:59:59Z",
    "limit": 100
  }
}
```

---

## Управление товарами

### Обновление цены товара

```json
{
  "tool": "wb_update_product_price",
  "arguments": {
    "nmID": 123456789,
    "price": 1499,
    "discount": 10
  }
}
```

### Обновление остатков

```json
{
  "tool": "wb_update_product_stock",
  "arguments": {
    "nmID": 123456789,
    "warehouseID": 12345,
    "quantity": 75
  }
}
```

### Обновление описания товара

```json
{
  "tool": "wb_update_product_content",
  "arguments": {
    "nmID": 123456789,
    "title": "Футболка хлопковая премиум",
    "description": "Комфортная футболка из 100% хлопка премиального качества",
    "characteristics": [
      {
        "id": 1,
        "name": "Материал",
        "value": "100% хлопок"
      },
      {
        "id": 2,
        "name": "Страна производства",
        "value": "Россия"
      },
      {
        "id": 3,
        "name": "Уход",
        "value": "Машинная стирка при 30°C"
      }
    ]
  }
}
```

---

## Работа с заказами

### Получение новых заказов за сегодня

```json
{
  "tool": "wb_get_orders_fbs",
  "arguments": {
    "dateFrom": "2024-01-09T00:00:00Z",
    "dateTo": "2024-01-09T23:59:59Z",
    "status": "new",
    "take": 100
  }
}
```

### Получение всех заказов за месяц

```json
{
  "tool": "wb_get_orders_fbs",
  "arguments": {
    "dateFrom": "2024-01-01T00:00:00Z",
    "dateTo": "2024-01-31T23:59:59Z",
    "take": 1000
  }
}
```

### Получение сборочных заданий

```json
{
  "tool": "wb_get_picking_tasks_fbs",
  "arguments": {
    "dateFrom": "2024-01-09T00:00:00Z",
    "dateTo": "2024-01-09T23:59:59Z",
    "status": "new"
  }
}
```

### Подтверждение заказа

```json
{
  "tool": "wb_update_order_status_fbs",
  "arguments": {
    "orderUID": "WB-ORDER-12345",
    "status": "confirm"
  }
}
```

### Завершение заказа

```json
{
  "tool": "wb_update_order_status_fbs",
  "arguments": {
    "orderUID": "WB-ORDER-12345",
    "status": "complete"
  }
}
```

---

## Аналитика

### Получение поисковых запросов за неделю

```json
{
  "tool": "wb_get_search_queries",
  "arguments": {
    "dateFrom": "2024-01-02T00:00:00Z",
    "dateTo": "2024-01-09T23:59:59Z"
  }
}
```

### Получение поисковых запросов для конкретного товара

```json
{
  "tool": "wb_get_search_queries",
  "arguments": {
    "dateFrom": "2024-01-01T00:00:00Z",
    "dateTo": "2024-01-31T23:59:59Z",
    "nmID": 123456789
  }
}
```

### История остатков товара

```json
{
  "tool": "wb_get_stock_history",
  "arguments": {
    "dateFrom": "2024-01-01T00:00:00Z",
    "dateTo": "2024-01-31T23:59:59Z",
    "nmID": 123456789
  }
}
```

### Воронка продаж за месяц

```json
{
  "tool": "wb_get_sales_funnel",
  "arguments": {
    "dateFrom": "2024-01-01T00:00:00Z",
    "dateTo": "2024-01-31T23:59:59Z"
  }
}
```

### Воронка продаж для конкретного товара

```json
{
  "tool": "wb_get_sales_funnel",
  "arguments": {
    "dateFrom": "2024-01-01T00:00:00Z",
    "dateTo": "2024-01-31T23:59:59Z",
    "nmID": 123456789
  }
}
```

---

## Комплексные сценарии

### Сценарий 1: Массовое обновление цен со скидкой

1. Получить список товаров:

```json
{
  "tool": "wb_get_products",
  "arguments": {
    "limit": 1000
  }
}
```

2. Для каждого товара установить скидку 15%:

```json
{
  "tool": "wb_update_product_price",
  "arguments": {
    "nmID": 123456789,
    "price": 1299,
    "discount": 15
  }
}
```

### Сценарий 2: Обработка новых заказов

1. Получить новые заказы:

```json
{
  "tool": "wb_get_orders_fbs",
  "arguments": {
    "dateFrom": "2024-01-09T00:00:00Z",
    "dateTo": "2024-01-09T23:59:59Z",
    "status": "new"
  }
}
```

2. Для каждого заказа проверить остатки:

```json
{
  "tool": "wb_get_products",
  "arguments": {
    "limit": 1
  }
}
```

3. Подтвердить заказы с достаточными остатками:

```json
{
  "tool": "wb_update_order_status_fbs",
  "arguments": {
    "orderUID": "WB-ORDER-12345",
    "status": "confirm"
  }
}
```

### Сценарий 3: Анализ эффективности товара

1. Получить воронку продаж:

```json
{
  "tool": "wb_get_sales_funnel",
  "arguments": {
    "dateFrom": "2024-01-01T00:00:00Z",
    "dateTo": "2024-01-31T23:59:59Z",
    "nmID": 123456789
  }
}
```

2. Получить поисковые запросы:

```json
{
  "tool": "wb_get_search_queries",
  "arguments": {
    "dateFrom": "2024-01-01T00:00:00Z",
    "dateTo": "2024-01-31T23:59:59Z",
    "nmID": 123456789
  }
}
```

3. Проверить историю остатков:

```json
{
  "tool": "wb_get_stock_history",
  "arguments": {
    "dateFrom": "2024-01-01T00:00:00Z",
    "dateTo": "2024-01-31T23:59:59Z",
    "nmID": 123456789
  }
}
```

---

## Обработка ошибок

### Пример обработки ошибки авторизации

```json
{
  "content": [
    {
      "type": "text",
      "text": "{\"error\": \"Authentication failed. Please check your API token.\"}"
    }
  ],
  "isError": true
}
```

**Решение:** Проверьте корректность токена в файле `.env`.

### Пример обработки ошибки валидации

```json
{
  "content": [
    {
      "type": "text",
      "text": "{\"error\": \"Validation failed: price: Expected number, received string\"}"
    }
  ],
  "isError": true
}
```

**Решение:** Проверьте типы параметров согласно документации.

---

## Советы по использованию

### 1. Формат дат

Всегда используйте ISO 8601 формат с временной зоной UTC:

```
2024-01-09T10:30:00Z
```

### 2. Пагинация

Для больших наборов данных используйте пагинацию:

```json
{
  "limit": 100,
  "offset": 0
}
```

Для следующей страницы:

```json
{
  "limit": 100,
  "offset": 100
}
```

### 3. Rate Limiting

Сервер автоматически обрабатывает rate limits Wildberries API. Если лимит превышен, запрос будет автоматически повторён после задержки.

### 4. Логирование

Все запросы и ответы логируются в папку `logs/`:
- `combined.log` - все события
- `error.log` - только ошибки

Используйте логи для отладки и мониторинга.
