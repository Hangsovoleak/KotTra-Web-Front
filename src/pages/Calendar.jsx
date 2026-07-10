import { useState, useEffect } from 'react';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import DayHeaderBar from '@/components/calendar/DayHeaderBar';
import FilterSidebar from '@/components/calendar/FilterSidebar';
import CalendarGrid from '@/components/calendar/CalendarGrid';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { CATEGORY_LIST } from '@/constants/categories';
import * as calendarService from '@/services/calendarService';

export default function CalendarPage() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(6); // July
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState(CATEGORY_LIST.map((c) => c.key));

  useEffect(() => {
    setIsLoading(true);
    calendarService.getEventsForMonth(year, month).then((data) => {
      setTasks(data);
      setIsLoading(false);
    });
  }, [year, month]);

  function toggleFilter(key) {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  function goPrev() {
    setMonth((m) => {
      if (m === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }

  function goNext() {
    setMonth((m) => {
      if (m === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }

  return (
    <div className="-m-8 flex h-full flex-col overflow-hidden rounded-none border border-gray-200">
      <CalendarHeader month={month} onPrev={goPrev} onNext={goNext} />
      <DayHeaderBar />
      <div className="flex flex-1 overflow-y-auto scrollbar-thin">
        <FilterSidebar activeFilters={activeFilters} onToggle={toggleFilter} />
        {isLoading ? (
          <div className="flex-1">
            <LoadingSpinner />
          </div>
        ) : (
          <CalendarGrid year={year} month={month} tasks={tasks} activeFilters={activeFilters} />
        )}
      </div>
    </div>
  );
}
