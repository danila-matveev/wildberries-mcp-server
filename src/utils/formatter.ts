/**
 * Утилиты для форматирования данных
 */

/**
 * Форматирует дату в ISO 8601 строку
 */
export function formatDate(date: Date): string {
  return date.toISOString();
}

/**
 * Парсит дату из строки
 */
export function parseDate(dateString: string): Date {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date string: ${dateString}`);
  }
  return date;
}

/**
 * Форматирует ответ API в структурированный формат
 */
export function formatApiResponse<T>(data: T, metadata?: Record<string, unknown>): {
  content: Array<{
    type: 'text';
    text: string;
  }>;
} {
  const formattedData = {
    data,
    ...(metadata && { metadata }),
  };

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(formattedData, null, 2),
      },
    ],
  };
}

/**
 * Форматирует ошибку для ответа MCP
 */
export function formatError(error: Error | unknown, context?: string): {
  content: Array<{
    type: 'text';
    text: string;
  }>;
  isError: true;
} {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;

  const formattedError = {
    error: errorMessage,
    ...(context && { context }),
    ...(errorStack && { stack: errorStack }),
  };

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(formattedError, null, 2),
      },
    ],
    isError: true,
  };
}

/**
 * Форматирует список элементов с пагинацией
 */
export function formatList<T>(
  items: T[],
  pagination?: {
    total?: number;
    limit?: number;
    offset?: number;
    hasMore?: boolean;
  }
) {
  return formatApiResponse(items, {
    count: items.length,
    ...(pagination && { pagination }),
  });
}

/**
 * Обрезает строку до указанной длины с добавлением многоточия
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Форматирует число в денежный формат (рубли)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
  }).format(amount);
}

/**
 * Форматирует большое число с разделителями тысяч
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ru-RU').format(num);
}
