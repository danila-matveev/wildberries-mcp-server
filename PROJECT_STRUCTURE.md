# Структура проекта

```
wildberries-mcp-server/
│
├── 📁 src/                          # Исходный код проекта
│   ├── index.ts                     # Точка входа MCP сервера
│   ├── 📁 config/                   # Конфигурация
│   │   ├── env.ts                   # Валидация переменных окружения
│   │   └── config.ts                # Централизованная конфигурация
│   ├── 📁 client/                   # Wildberries API клиент
│   │   ├── wildberries-client.ts    # Базовый HTTP клиент
│   │   ├── auth.ts                  # Авторизация
│   │   ├── rate-limiter.ts          # Rate limiting
│   │   └── error-handler.ts         # Обработка ошибок
│   ├── 📁 tools/                    # MCP инструменты
│   │   ├── index.ts                 # Регистрация всех инструментов
│   │   ├── 📁 products/             # Инструменты для товаров (4)
│   │   ├── 📁 orders/fbs/           # Инструменты для заказов FBS (3)
│   │   └── 📁 analytics/            # Инструменты для аналитики (3)
│   ├── 📁 types/                    # TypeScript типы
│   │   ├── api.ts                   # Типы Wildberries API
│   │   ├── tools.ts                 # Типы MCP инструментов
│   │   └── common.ts                # Общие типы
│   ├── 📁 utils/                    # Утилиты
│   │   ├── logger.ts                # Winston логирование
│   │   ├── validator.ts             # Zod валидация
│   │   └── formatter.ts             # Форматирование ответов
│   └── 📁 resources/                # MCP ресурсы (пусто)
│
├── 📁 docs/                         # Документация
│   ├── api-reference.md             # Справочник API инструментов
│   └── examples.md                  # Примеры использования
│
├── 📁 tests/                        # Тесты (пусто, планируется)
│   ├── 📁 unit/                     # Unit тесты
│   ├── 📁 integration/              # Integration тесты
│   └── 📁 fixtures/                 # Тестовые данные
│
├── 📁 logs/                         # Логи приложения
├── 📁 temp/                         # Временные файлы
│
├── 📁 archive/                      # Архив старых файлов
│   ├── TECHNICAL_SPECIFICATION.md   # Исходная спецификация
│   ├── архитектура_и_план...md      # План исследования
│   └── claude.md                    # Старые заметки
│
├── 📄 package.json                  # Зависимости и скрипты
├── 📄 tsconfig.json                 # Конфигурация TypeScript
├── 📄 .env.example                  # Пример переменных окружения
├── 📄 .env                          # Переменные окружения (не в git)
├── 📄 .gitignore                    # Git ignore
├── 📄 .cursorignore                 # Cursor ignore
│
├── 📖 README.md                     # Основная документация
├── 📖 ARCHITECTURE.md               # Архитектура проекта
├── 📖 ADR.md                        # Архитектурные решения
├── 📖 AGENTS.md                     # Правила работы над проектом
├── 📖 development-history.md        # История разработки
└── 📖 .CLAUDE-context.md            # Контекст для AI ассистента

```

## Ключевые файлы для старта

1. **README.md** - начните отсюда
2. **package.json** - установка зависимостей
3. **.env.example** - настройка переменных окружения
4. **src/index.ts** - точка входа приложения

## Документация

- **README.md** - инструкции по установке и использованию
- **docs/api-reference.md** - полный справочник всех инструментов
- **docs/examples.md** - практические примеры
- **ARCHITECTURE.md** - описание архитектуры и компонентов
- **ADR.md** - архитектурные решения с обоснованием

## Для разработчиков

- **AGENTS.md** - правила работы над проектом
- **development-history.md** - история всех изменений
- **.CLAUDE-context.md** - контекст для продолжения работы с AI
