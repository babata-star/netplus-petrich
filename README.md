# НЕТПЮС ПЕТРИЧ — Уебсайт и клиентски портал

Професионален сайт за локален интернет доставчик с пълен клиентски портал и админ панел. Бърз оптичен интернет (GPON), цифрова (GDN) и интерактивна (UNITV) телевизия.

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)

## ✨ Функционалност

### 🌐 Публичен сайт (маркетинг)

- **Начална страница** — hero, услуги, предимства, проверка на покритие, пакети, новини, отзиви
- **Услуги** — детайлни страници за GPON, GDN, UNITV
- **Цени/Пакети** — интернет, ТВ и комбо оферти
- **За нас, Контакти** (с форма + карта), **Новини** (блог със списък и детайли)
- **Заявка за услуга** — 3-стъпкова форма
- **Двуезичен** (БГ/EN) с превключвател

### 👤 Клиентски портал (с вход)

- Вход / Регистрация (имейл + парола)
- Табло — преглед на заявки и сигнали
- **Сигнали** — подаване, списък, детайл с чат с екипа
- **Заявки** — статус на всички заявки
- **Отзиви** — оценка и коментар

### 🔐 Админ панел (за екипа)

- Табло със статистики (нови заявки, отворени сигнали, чакащи отзиви)
- Управление на заявки (промяна на статус)
- Управление на сигнали (статус + чат с клиента)
- Управление на новини (CRUD, двуезично)
- Модерация на отзиви (одобри/скрий/изтрий)

## 🛠 Технологичен стек

| Компонент     | Технология                                     |
| ------------- | ---------------------------------------------- |
| Фреймуърк     | Next.js 16 (App Router) + TypeScript           |
| Стилове       | Tailwind CSS v4                                |
| Анимации      | Framer Motion                                  |
| База данни    | Prisma ORM (SQLite за dev, PostgreSQL за prod) |
| Автентикация  | NextAuth.js v5 (Credentials)                   |
| Многоезичност | next-intl (БГ + EN)                            |
| Имейли        | Nodemailer (SMTP)                              |
| Валидация     | Zod                                            |

## 🎨 Бранд

- **Цветове:** Дълбоко синьо `#0A2540`, циан `#00B4D8`, оранжево `#FF9F0A`
- **Типография:** Inter (с кирилица)
- **Лого:** Стилизирано „N" като възли на GPON мрежа + плюс (+)

## 🚀 Бърз старт

### Изисквания

- Node.js 20+
- npm

### Инсталация

```bash
npm install
```

### Настройка на базата данни

Базата е SQLite за локална разработка (файлова, без инсталация).

```bash
# Създай схемата
npm run db:push

# (По избор) Зареди демо данни
npm run db:seed
```

### Стартиране

```bash
npm run dev
```

Сайтът ще е на http://localhost:3000

## 🔑 Демо акаунти (след `db:seed`)

| Роля   | Имейл                      | Парола      |
| ------ | -------------------------- | ----------- |
| Клиент | `client@example.com`       | `client123` |
| Админ  | `admin@netplus-petrich.bg` | `admin123`  |

## 📁 Структура

```
src/
├── app/
│   ├── [locale]/              # Всички страници (БГ/EN)
│   │   ├── (публични страници: page, services, pricing, ...)
│   │   ├── portal/            # Клиентски портал
│   │   │   ├── login/         # Вход/регистрация
│   │   │   └── (app)/         # Защитени страници (dashboard, tickets, ...)
│   │   └── admin/             # Админ панел (само ADMIN)
│   ├── api/                   # API routes (извън локала)
│   │   ├── auth/              # NextAuth + регистрация
│   │   ├── requests/          # Заявки за услуга
│   │   ├── tickets/           # Сигнали + съобщения
│   │   ├── news/, feedback/, contact/
│   │   └── admin/             # Админ endpoints (статус, CRUD)
│   └── layout.tsx, not-found.tsx
├── components/                # UI компоненти
│   ├── home/                  # Секции на началната
│   ├── portal/, admin/        # Портал/админ компоненти
│   ├── layout/                # Header, Footer
│   └── ui/, icons/            # Базови UI + икони
├── lib/                       # Утиилити (prisma, email, validations, news)
├── i18n/                      # next-intl конфигурация
└── messages/                  # Преводи (bg.json, en.json)
prisma/
├── schema.prisma              # База: User, ServiceRequest, SupportTicket, ...
└── seed.ts                    # Демо данни
```

## 🌍 Двуезичност

Всички текстове са в `src/messages/bg.json` и `en.json`. URL структура:

- Български (по подразбиране): `/`, `/services`, `/pricing`
- English: `/en`, `/en/services`, `/en/pricing`

## 📧 Имейл известия

Настрой SMTP в `.env`:

```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-user
SMTP_PASSWORD=your-pass
SMTP_FROM=netplus.petrich@gmail.com
```

Без SMTP (dev) имейлите се пропускат тихо.

## 🏗 Production деплой

1. Промени `prisma/schema.prisma` → `provider = "postgresql"` и `DATABASE_URL`
2. Генерирай `AUTH_SECRET`: `openssl rand -base64 32`
3. `npm run build && npm start`
4. Препоръчителен хостинг: Vercel (frontend) + ваш PostgreSQL сървър

## 📝 Бележки

- Цените и скоростите са **заместващи** — попълнете реалните тарифи в `pricing/page.tsx`
- Логото е SVG концепция — дайте на дизайнер за финализиране
- Правните страници (privacy/terms) са шаблони — консултирайте юрист
- ЕИК, телефон и адрес в `src/components/layout/Footer.tsx` (константа `COMPANY`)

## 📜 Скриптове

| Команда             | Действие                      |
| ------------------- | ----------------------------- |
| `npm run dev`       | Дев сървър                    |
| `npm run build`     | Production билд               |
| `npm run start`     | Production сървър             |
| `npm run db:push`   | Sync на схемата с базата      |
| `npm run db:seed`   | Зареди демо данни             |
| `npm run db:studio` | Prisma Studio (GUI за базата) |
| `npm run lint`      | ESLint                        |

npm install
npm run db:push # създава базата
npm run db:seed # демо данни (client@example.com / client123, admin@netplus-petrich.bg / admin123)
npm run dev # http://localhost:3000
