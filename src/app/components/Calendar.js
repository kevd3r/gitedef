// app/components/Calendar.js
"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { isSameDay, startOfDay, isWithinInterval } from "date-fns";

const Calendar = ({ validatedReservations = [], onDateSelectionChange }) => {
  const daysShort = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août",
    "Septembre", "Octobre", "Novembre", "Décembre",
  ];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month");
  // Nouvelle variable d'état pour la sélection de l'utilisateur
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });

  // --- Fonctions de navigation (inchangées) ---
  const gotoPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };
  const gotoNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };
  const gotoPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };
  const gotoNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };
  const gotoToday = () => {
    const newDate = new Date();
    setCurrentDate(newDate);
    setViewMode("month");
  };

  // --- Fonctions de génération des jours (inchangées) ---
  const generateMonthlyCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const calendarDays = [];
    for (let i = 0; i < 42; i++) {
      if (i < startingDayOfWeek) {
        calendarDays.push(null);
      } else if (i < startingDayOfWeek + daysInMonth) {
        const dayNumber = i - startingDayOfWeek + 1;
        const dayDate = new Date(year, month, dayNumber);
        calendarDays.push(dayDate);
      } else {
        calendarDays.push(null);
      }
    }
    return calendarDays;
  };
  const generateWeeklyCalendarDays = () => {
    const weekDays = [];
    const currentDayOfWeek = (currentDate.getDay() + 6) % 7;
    const mondayOfWeek = new Date(currentDate);
    mondayOfWeek.setDate(currentDate.getDate() - currentDayOfWeek);
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(mondayOfWeek);
      dayDate.setDate(mondayOfWeek.getDate() + i);
      weekDays.push(dayDate);
    }
    return weekDays;
  };

  // --- Fonctions utilitaires ---
  const isToday = (dateObj) => {
    if (!dateObj) return false;
    return isSameDay(dateObj, new Date());
  };

  const isDayCompletelyBooked = (dateObj) => {
    if (!dateObj) return false;
    return validatedReservations.some((res) => {
      const resStartDate = startOfDay(new Date(res.startDate));
      const resEndDate = startOfDay(new Date(res.endDate));
      const currentDay = startOfDay(dateObj);
      const isMiddleDay = currentDay > resStartDate && currentDay < resEndDate;
      const isSingleDayBooking =
        isSameDay(resStartDate, resEndDate) && isSameDay(currentDay, resStartDate);
      return isMiddleDay || isSingleDayBooking;
    });
  };

  // --- Nouvelle fonction de gestion des clics ---
  const handleDayClick = (dayDate) => {
    if (!dayDate) return;
    const { startDate, endDate } = selectedDates;

    // Ne rien faire si le jour est complètement réservé
    if (isDayCompletelyBooked(dayDate)) {
      return;
    }

    if (!startDate) {
      // Premier clic : définit la date de début
      setSelectedDates({ startDate: dayDate, endDate: null });
      onDateSelectionChange(dayDate, null);
    } else if (startDate && !endDate) {
      // Deuxième clic : définit la date de fin
      if (dayDate > startDate) {
        // Vérifie qu'il n'y a pas de jours bloqués dans la plage
        let isRangeBlocked = false;
        let currentDateInLoop = new Date(startDate);
        while (currentDateInLoop <= dayDate) {
          if (isDayCompletelyBooked(currentDateInLoop)) {
            isRangeBlocked = true;
            break;
          }
          currentDateInLoop.setDate(currentDateInLoop.getDate() + 1);
        }

        if (!isRangeBlocked) {
          setSelectedDates({ startDate, endDate: dayDate });
          onDateSelectionChange(startDate, dayDate);
        } else {
          // La plage est invalide, on réinitialise avec la nouvelle date de début
          setSelectedDates({ startDate: dayDate, endDate: null });
          onDateSelectionChange(dayDate, null);
        }
      } else {
        // Le deuxième clic est avant le premier, on réinitialise
        setSelectedDates({ startDate: dayDate, endDate: null });
        onDateSelectionChange(dayDate, null);
      }
    } else {
      // Troisième clic : réinitialise la sélection
      setSelectedDates({ startDate: dayDate, endDate: null });
      onDateSelectionChange(dayDate, null);
    }
  };

  // --- Fonctions pour le rendu ---
  const getReservationGels = (dateObj) => {
  if (!dateObj) return null;
  const reservations = validatedReservations.filter((res) => {
    const startDate = startOfDay(new Date(res.startDate));
    const endDate = startOfDay(new Date(res.endDate));
    const currentDay = startOfDay(dateObj);
    return currentDay >= startDate && currentDay <= endDate;
  });
  if (reservations.length === 0) return null;

  return (
    <div className="mt-1 space-y-1 w-full flex">
      {reservations.map((res, index) => {
        const startDate = startOfDay(new Date(res.startDate));
        const endDate = startOfDay(new Date(res.endDate));
        const currentDay = startOfDay(dateObj);
        let gelClasses = "relative px-2 py-0.5 text-white text-xs whitespace-nowrap overflow-hidden text-ellipsis h-4";

        if (isSameDay(currentDay, startDate) && isSameDay(currentDay, endDate)) {
          gelClasses += " bg-red-400 rounded-full w-full";
        } else if (isSameDay(currentDay, startDate)) {
          gelClasses += " bg-red-400 rounded-l-full rounded-r-none w-4/12 ml-auto order-last"; // Aligné à droite
        } else if (isSameDay(currentDay, endDate)) {
          gelClasses += " bg-red-400 rounded-r-full rounded-l-none w-1/2 mr-auto order-first"; // Aligné à gauche
        } else {
          gelClasses += " bg-red-400 rounded-none w-full";
        }

        return (
          <div key={res.id + "-" + index} className={gelClasses}>
            Réservé
          </div>
        );
      })}
    </div>
  );
};


  const isDayInSelectedRange = (dayDate) => {
    const { startDate, endDate } = selectedDates;
    if (!startDate || !endDate) return false;
    const currentDay = startOfDay(dayDate);
    return isWithinInterval(currentDay, {
      start: startOfDay(startDate),
      end: startOfDay(endDate),
    });
  };

  const isStartOfSelection = (dayDate) =>
    selectedDates.startDate && isSameDay(dayDate, selectedDates.startDate);
  const isEndOfSelection = (dayDate) =>
    selectedDates.endDate && isSameDay(dayDate, selectedDates.endDate);

  const renderCalendarDays = (daysArray) =>
    daysArray.map((dayDate, index) => {
      const isCompletelyBooked = isDayCompletelyBooked(dayDate);
      const isSelected = isStartOfSelection(dayDate) || isEndOfSelection(dayDate);
      const isInRange = isDayInSelectedRange(dayDate);

      let cellClass = `text-center rounded-lg pt-3 pb-5 h-auto flex flex-col items-center justify-start cursor-pointer`;
      
      if (!dayDate) {
        cellClass += " bg-transparent";
      } else {
        // Applique les styles pour la sélection
        if (isSelected) {
          cellClass += ` bg-blue-600 text-white font-bold shadow-lg`;
        } else if (isInRange) {
          cellClass += ` bg-blue-400 text-white`;
        } else if (isToday(dayDate)) {
          cellClass += ` bg-[#FECD31] text-[#0C1824] font-bold shadow-lg`;
        } else {
          cellClass += ` bg-[#0C1824] text-white hover:bg-[#1a2832]`;
        }

        // Si la case est complètement réservée, on la stylise différemment
        if (isCompletelyBooked) {
          cellClass = `text-center bg-[#0C1824] rounded-lg pt-3 pb-5 h-auto flex flex-col items-center justify-start cursor-not-allowed`;
        }
      }

      return (
        <div
          key={index}
          className={cellClass}
          onClick={() => handleDayClick(dayDate)}
        >
          {dayDate && (
            <>
              <span>{dayDate.getDate()}</span>
              {getReservationGels(dayDate)}
            </>
          )}
        </div>
      );
    });

  return (
    <div className="bg-[#0C1824] text-white container mx-auto max-w-7xl rounded-2xl">
      <div className="bg-[#14273A] p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-[#FECD31] text-center">
          Nos Disponibilités
        </h2>
        <h2 className="text-2xl font-bold text-[#FECD31] text-center pb-2">
          {viewMode === "month"
            ? `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`
            : "Semaine en cours"}
        </h2>
        <div className="flex items-center space-x-2 pt-3 mb-4">
          {viewMode === "month" ? (
            <>
              <button onClick={gotoPreviousMonth} className="p-2 hover:bg-[#0C1824] rounded-lg transition-colors" aria-label="Previous Month">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={gotoNextMonth} className="p-2 hover:bg-[#0C1824] rounded-lg transition-colors" aria-label="Next Month">
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          ) : (
            <>
              <button onClick={gotoPreviousWeek} className="p-2 hover:bg-[#0C1824] rounded-lg transition-colors" aria-label="Previous Week">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={gotoNextWeek} className="p-2 hover:bg-[#0C1824] rounded-lg transition-colors" aria-label="Next Week">
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          <button onClick={gotoToday} className="p-2 hover:bg-[#0C1824] rounded-lg transition-colors">
            <p>Aujourd&apos;Hui</p>
          </button>
          <button onClick={() => setViewMode("month")} className={`px-4 py-2 rounded-lg transition-colors ${
            viewMode === "month" ? "bg-[#FECD31] text-[#0C1824]" : "bg-[#0C1824] text-white hover:bg-[#1a2832]"}`}>
            Mois
          </button>
          <button onClick={() => setViewMode("week")} className={`px-4 py-2 rounded-lg transition-colors ${
            viewMode === "week" ? "bg-[#FECD31] text-[#0C1824]" : "bg-[#0C1824] text-white hover:bg-[#1a2832]"}`}>
            Semaine
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysShort.map((day) => (
            <div key={day} className="text-center bg-[#0C1824] p-2 rounded-lg">
              {day}
            </div>
          ))}
        </div>
        {viewMode === "month" ? (
          <div className="grid grid-cols-7 gap-1">
            {renderCalendarDays(generateMonthlyCalendarDays())}
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-1">
            {renderCalendarDays(generateWeeklyCalendarDays())}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;