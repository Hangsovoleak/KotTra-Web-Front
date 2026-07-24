import { useState } from 'react';
import CalendarHeader from '@/components/calendar/CalendarHeader';
import FilterSidebar from '@/components/calendar/FilterSidebar';
import CalendarGrid from '@/components/calendar/CalendarGrid';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { CATEGORY_LIST } from '@/constants/categories';
import { useTasks } from '@/hooks/useTasks';

export default function CalendarPage() {
  const { tasks: allTasks, isLoading } = useTasks();

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'week'
  const [activeFilters, setActiveFilters] = useState(CATEGORY_LIST.map((c) => c.key));

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const [selectedDate, setSelectedDate] = useState(todayStr);

  const updateSelectedDateForMonth = (newYear, newMonth) => {
    const todayDate = new Date();
    if (todayDate.getFullYear() === newYear && todayDate.getMonth() === newMonth) {
      const currentTodayStr = `${newYear}-${String(newMonth + 1).padStart(2, '0')}-${String(todayDate.getDate()).padStart(2, '0')}`;
      setSelectedDate(currentTodayStr);
    } else {
      setSelectedDate(`${newYear}-${String(newMonth + 1).padStart(2, '0')}-01`);
    }
  };

  function toggleFilter(key) {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  function handleToday() {
    const now = new Date();
    const nowStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    setYear(now.getFullYear());
    setMonth(now.getMonth());
    setSelectedDate(nowStr);
  }

  function handleSelectDate(dateStr) {
    setSelectedDate(dateStr);
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      setYear(d.getFullYear());
      setMonth(d.getMonth());
    }
  }

  function goPrev() {
    if (viewMode === 'month') {
      setMonth((m) => {
        let nextMonth = m - 1;
        let nextYear = year;
        if (m === 0) {
          nextYear = year - 1;
          setYear(nextYear);
          nextMonth = 11;
        }
        updateSelectedDateForMonth(nextYear, nextMonth);
        return nextMonth;
      });
    } else {
      // Navigate backward by 1 week
      const current = new Date(selectedDate);
      current.setDate(current.getDate() - 7);
      const nextDateStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
      setSelectedDate(nextDateStr);
      setYear(current.getFullYear());
      setMonth(current.getMonth());
    }
  }

  function goNext() {
    if (viewMode === 'month') {
      setMonth((m) => {
        let nextMonth = m + 1;
        let nextYear = year;
        if (m === 11) {
          nextYear = year + 1;
          setYear(nextYear);
          nextMonth = 0;
        }
        updateSelectedDateForMonth(nextYear, nextMonth);
        return nextMonth;
      });
    } else {
      // Navigate forward by 1 week
      const current = new Date(selectedDate);
      current.setDate(current.getDate() + 7);
      const nextDateStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
      setSelectedDate(nextDateStr);
      setYear(current.getFullYear());
      setMonth(current.getMonth());
    }
  }

  function handlePlanActivity(targetDateStr) {
    const activeDate = typeof targetDateStr === 'string' ? targetDateStr : selectedDate;
    setEditingTask({
      title: '',
      description: '',
      categories: activeFilters.length === 1 ? [activeFilters[0]] : ['general'],
      from: '09:00',
      to: '10:00',
      period: 'AM',
      date: activeDate,
      completed: false,
    });
    setIsModalOpen(true);
  }

  return (
    <div className="-m-8 flex h-[calc(100vh-64px)] flex-col overflow-hidden rounded-none border border-gray-200 bg-white">
      <CalendarHeader
        month={month}
        year={year}
        viewMode={viewMode}
        selectedDate={selectedDate}
        onPrev={goPrev}
        onNext={goNext}
        onToday={handleToday}
        onToggleViewMode={setViewMode}
      />
      <div className="flex flex-1 overflow-hidden">
        <FilterSidebar activeFilters={activeFilters} onToggle={toggleFilter} />
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <CalendarGrid
            year={year}
            month={month}
            tasks={allTasks}
            activeFilters={activeFilters}
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
            viewMode={viewMode}
            onPlanActivity={handlePlanActivity}
          />
        )}
      </div>
    </div>
  );
}

