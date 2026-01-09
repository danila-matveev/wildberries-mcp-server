/**
 * Валидация данных с использованием Zod
 */

import { z, ZodSchema } from 'zod';

/**
 * Ошибка валидации
 */
export class ValidationError extends Error {
  constructor(
    message: string,
    public errors: z.ZodError
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Валидация данных с помощью Zod схемы
 */
export function validate<T>(schema: ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors
        .map((e) => `${e.path.join('.')}: ${e.message}`)
        .join(', ');
      throw new ValidationError(
        `Validation failed: ${errorMessages}`,
        error
      );
    }
    throw error;
  }
}

/**
 * Валидация данных с безопасным парсингом (не бросает исключения)
 */
export function validateSafe<T>(
  schema: ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Базовые схемы для распространённых типов
 */
export const commonSchemas = {
  /**
   * Схема для даты в формате ISO 8601
   */
  isoDate: z.string().datetime(),

  /**
   * Схема для положительного целого числа
   */
  positiveInt: z.number().int().positive(),

  /**
   * Схема для неотрицательного целого числа
   */
  nonNegativeInt: z.number().int().nonnegative(),

  /**
   * Схема для UUID
   */
  uuid: z.string().uuid(),

  /**
   * Схема для непустой строки
   */
  nonEmptyString: z.string().min(1),

  /**
   * Схема для пагинации
   */
  pagination: z.object({
    limit: z.number().int().positive().max(1000).optional().default(100),
    offset: z.number().int().nonnegative().optional().default(0),
  }),

  /**
   * Схема для даты начала и конца
   */
  dateRange: z.object({
    dateFrom: z.string().datetime(),
    dateTo: z.string().datetime(),
  }),
};
