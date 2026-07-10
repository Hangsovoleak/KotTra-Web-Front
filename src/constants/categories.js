import { PersonStanding, LayoutGrid, CalendarDays, BookOpen } from 'lucide-react';

/**
 * Single source of truth for the four activity categories used across
 * the Dashboard, Calendar, and Goals pages. Colors map to CSS variables
 * defined in src/index.css (sampled from the original KotTra screenshots).
 */
export const CATEGORIES = {
  meeting: {
    key: 'meeting',
    label: 'meeting',
    title: 'Meeting',
    icon: PersonStanding,
    color: 'var(--color-meeting)',
    bold: 'var(--color-meeting-bold)',
    light: 'var(--color-meeting-light)',
    border: 'var(--color-meeting-border)',
    description:
      'Used to schedule discussions with team members, clients, or partners. Helps everyone stay informed about the meeting time and purpose.',
  },
  learning: {
    key: 'learning',
    label: 'learning',
    title: 'Learning',
    icon: LayoutGrid,
    color: 'var(--color-learning)',
    bold: 'var(--color-learning-bold)',
    light: 'var(--color-learning-light)',
    border: 'var(--color-learning-border)',
    description:
      'Used to plan study sessions, training, workshops, or online courses. Helps track learning progress and build new skills consistently.',
  },
  event: {
    key: 'event',
    label: 'event',
    title: 'Event',
    icon: CalendarDays,
    color: 'var(--color-event)',
    bold: 'var(--color-event-bold)',
    light: 'var(--color-event-light)',
    border: 'var(--color-event-border)',
    description:
      "Used for important activities such as seminars, competitions, conferences, or celebrations. Ensures you don't miss special occasions or deadlines.",
  },
  general: {
    key: 'general',
    label: 'general',
    title: 'General',
    icon: BookOpen,
    color: 'var(--color-general)',
    bold: 'var(--color-general-bold)',
    light: 'var(--color-general-light)',
    border: 'var(--color-general-border)',
    description:
      "Used for personal reminders or everyday tasks that don't fit other categories. Keeps miscellaneous notes and activities organized in one place.",
  },
};

export const CATEGORY_LIST = Object.values(CATEGORIES);

export const WEEKDAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
