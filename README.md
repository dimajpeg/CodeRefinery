# CodeRefinery 💎 - Інструмент аналізу та рефакторингу JavaScript

Простий веб-застосунок (SPA) для аналізу коду JavaScript, виявлення антипатернів (на базовому рівні) та розрахунку метрик Холстеда.

## 🚀 Основний функціонал

*   **Введення коду:** Текстове поле для введення JavaScript коду.
*   **Аналіз коду:**
    *   Виявлення базових проблем за допомогою ESLint (наприклад, використання `var`, `console.log`).
    *   Розрахунок метрик Холстеда для оцінки складності коду за допомогою `escomplex`.
*   **Відображення результатів:**
    *   Список повідомлень від ESLint.
    *   Візуалізація метрик Холстеда у вигляді стовпчастої діаграми (використовуючи Recharts).
*   **Очищення:** Кнопка для очищення введеного коду та результатів аналізу.

## 🛠️ Стек технологій

*   **Фронтенд:** Next.js (React), Axios, Recharts, Tailwind CSS, TypeScript
*   **Бекенд:** NestJS, ESLint (програмне API), escomplex, TypeScript
*   **Інструменти:** pnpm

### Передумови
1.  Node.js (LTS)
2.  `pnpm` (`npm install -g pnpm`)

### Бекенд
1.  `cd backend` (перебуваючи в кореневій теці `CodeRefinery`)
2.  `pnpm install`
3.  `pnpm run start:dev` (зазвичай на `http://localhost:3000`)

### Фронтенд
1.  `cd frontend` (перебуваючи в кореневій теці `CodeRefinery`)
2.  `pnpm install`
3.  Переконайтеся, що URL для запиту до API у файлі `src/app/page.tsx` (або де знаходиться ваш компонент `CodeAnalyzer`) вказує на ваш бекенд (за замовчуванням `http://localhost:3000/analyze`).
4.  `pnpm run dev` (зазвичай на `http://localhost:3001`)

## 📸 Скріншоти

<img width="1455" alt="image" src="https://github.com/user-attachments/assets/ecc7438c-9db1-4bcd-a8bb-3caf4a273876" />
<img width="1456" alt="image" src="https://github.com/user-attachments/assets/620080d7-2431-4b47-a231-24bd5e0fd5a7" />
<img width="1454" alt="image" src="https://github.com/user-attachments/assets/600e194d-3c7f-4116-bf54-c55e85001504" />
