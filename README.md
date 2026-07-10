# KotTra — React Frontend

A React + Vite + Tailwind CSS rebuild of the KotTra UI (Dashboard, Goals, and
Calendar pages), reconstructed from the three screenshots provided
(`Dashboard.png`, `Calendar.png`, `Goal.png`). No original source code or
asset files were included in the uploaded ZIP, so colors, spacing, and icons
were reverse-engineered by eye and by sampling pixel values from the images —
close, but not a byte-for-byte pixel match.

## Stack
- React 19 + Vite
- React Router DOM (lazy-loaded routes)
- Tailwind CSS v4 (CSS-first `@theme` tokens in `src/index.css`, sampled from the screenshots)
- React Hook Form
- Axios (wired up, pointed at mock services for now)
- lucide-react icons (closest available stand-ins for the original icon set)
- Context API: Auth, Theme, User, Notifications

## Getting started
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
```

## Project structure
```
src/
├── assets/            # images/icons
├── components/
│   ├── common/         # StatCard, CategoryTag, IconCircleButton, Avatar, Loading/Empty/Error states
│   ├── layout/          # Sidebar, Topbar
│   ├── dashboard/       # StatsRow, TaskForm, MiniCalendar, ActivityList, ...
│   ├── calendar/         # CalendarHeader, DayHeaderBar, FilterSidebar, CalendarGrid
│   └── goals/            # CategoryInfoCard
├── layouts/MainLayout.jsx
├── pages/               # Dashboard.jsx, Calendar.jsx, Goals.jsx, NotFound.jsx
├── routes/AppRoutes.jsx
├── context/             # AuthContext, ThemeContext, UserContext, NotificationContext
├── services/            # authService, taskService, calendarService, habitService,
│                         # financeService, reportService (mock data now — see below)
├── hooks/               # useTasks, useTaskStats, useClickOutside
├── constants/categories.js
└── utils/dateUtils.js
```

## Connecting the real FastAPI backend
Every service function already has the real `axios` call written and commented
out directly above the mock implementation, e.g. in `src/services/taskService.js`:

```js
export async function getTasks() {
  // return (await api.get('/tasks')).data;
  return mockDelay(mockTasks);
}
```

To go live: set `VITE_API_BASE_URL` in `.env` (see `.env.example`), then in each
service uncomment the `api.*` line and delete the mock line below it.
`src/services/api.js` already has an Axios instance with an auth-token
interceptor ready to go.

## Known gaps vs. the original
Only 3 pages were visible in the source screenshots (Dashboard, Calendar,
Goals). Anything not shown in those images — a login screen, settings, modals
for editing/deleting a task, etc. — isn't in here, since inventing that UI
would mean guessing rather than rebuilding the actual source of truth. The
character avatar illustration in the top-right also couldn't be reproduced
(it's not an asset in the ZIP), so it's a generic placeholder avatar in the
same spot/size instead.
