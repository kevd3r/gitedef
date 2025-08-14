// app/components/Calendar.js
"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { isSameDay, startOfDay, getDay } from "date-fns";

const Calendar = ({ validatedReservations = [] }) => {
  // ... Le reste du code est inchangé
  const days = [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche",
  ];

  const daysShort = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month"); // 'month' ou 'week'

  // --- Fonctions de navigation ---
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

  // --- Fonctions de génération des jours ---
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
    const currentDayOfWeek = (currentDate.getDay() + 6) % 7; // Lundi = 0
    const mondayOfWeek = new Date(currentDate);
    mondayOfWeek.setDate(currentDate.getDate() - currentDayOfWeek);

    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(mondayOfWeek);
      dayDate.setDate(mondayOfWeek.getDate() + i);
      weekDays.push(dayDate);
    }
    return weekDays;
  };

  const isToday = (dateObj) => {
    if (!dateObj) return false;
    return isSameDay(dateObj, new Date());
  };

  // --- Nouvelle fonction pour vérifier les réservations ---
  const getReservationsForDay = (dateObj) => {
    if (!dateObj) return [];
    return validatedReservations.filter((res) => {
      const startDate = startOfDay(new Date(res.startDate));
      const endDate = startOfDay(new Date(res.endDate));
      const currentDay = startOfDay(dateObj);
      return currentDay >= startDate && currentDay <= endDate;
    });
  };

  const getReservationGels = (dateObj) => {
    if (!dateObj) return null;
    const reservations = getReservationsForDay(dateObj);

    if (reservations.length === 0) {
      return null;
    }

    return (
      <div className="mt-1 space-y-1 w-full">
        {reservations.map((res, index) => {
          const startDate = startOfDay(new Date(res.startDate));
          const endDate = startOfDay(new Date(res.endDate));
          const currentDay = startOfDay(dateObj);

          let gelClasses =
            "relative px-2 py-0.5 text-white text-xs whitespace-nowrap overflow-hidden text-ellipsis";

          // C'est le jour de l'arrivée (à partir de 16h)
          const isArrivalDay = isSameDay(currentDay, startDate);
          // C'est le jour du départ (avant 12h)
          const isDepartureDay = isSameDay(currentDay, endDate);
          // C'est un jour entre l'arrivée et le départ
          const isMiddleDay = currentDay > startDate && currentDay < endDate;

          if (isArrivalDay && isDepartureDay) {
            // Réservation sur une seule journée
            gelClasses += " bg-red-400 rounded-full";
          } else if (isArrivalDay) {
            // Début de la réservation
            gelClasses +=
              " bg-red-400 rounded-l-full pr-1 right-0 left-1/2 w-1/2";
          } else if (isDepartureDay) {
            // Fin de la réservation
            gelClasses +=
              " bg-red-400 rounded-r-full pl-1 right-1/2 w-1/2 left-0";
          } else if (isMiddleDay) {
            // Milieu de la réservation
            gelClasses += " bg-red-400 rounded-none";
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

  // --- Rendu du composant ---
  return (
    <>
      <div>
        <h1 className="text-5xl font-bold mb-6 text-[#FECD31] text-center">
          Calendrier
        </h1>
      </div>

      <div className="min-h-screen bg-[#0C1824] text-white pt-10 pb-10 container mx-auto md:px-8 max-w-7xl rounded-2xl ">
        <div className="bg-[#14273A] p-8 rounded-lg shadow-lg mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#FECD31]">
            Nos Disponibilités
          </h2>
          <h2 className="text-2xl font-bold text-[#FECD31]">
            {viewMode === "month"
              ? `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`
              : "Semaine en cours"}
          </h2>

          <div className="flex items-center space-x-2 pt-3 mb-4">
            {viewMode === "month" ? (
              <>
                <button
                  onClick={gotoPreviousMonth}
                  className="p-2 hover:bg-[#0C1824] rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={gotoNextMonth}
                  className="p-2 hover:bg-[#0C1824] rounded-lg transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={gotoPreviousWeek}
                  className="p-2 hover:bg-[#0C1824] rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={gotoNextWeek}
                  className="p-2 hover:bg-[#0C1824] rounded-lg transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
            <button
              onClick={gotoToday}
              className="p-2 hover:bg-[#0C1824] rounded-lg transition-colors"
            >
              <p>Aujourd&apos;Hui</p>
            </button>

            {/* Boutons de changement de vue */}
            <button
              onClick={() => setViewMode("month")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === "month"
                  ? "bg-[#FECD31] text-[#0C1824]"
                  : "bg-[#0C1824] text-white hover:bg-[#1a2832]"
              }`}
            >
              Mois
            </button>
            <button
              onClick={() => setViewMode("week")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === "week"
                  ? "bg-[#FECD31] text-[#0C1824]"
                  : "bg-[#0C1824] text-white hover:bg-[#1a2832]"
              }`}
            >
              Semaine
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysShort.map((day) => (
              <div
                key={day}
                className="text-center bg-[#0C1824] p-2 rounded-lg"
              >
                {day}
              </div>
            ))}
          </div>

          {viewMode === "month" ? (
            <div className="grid grid-cols-7 gap-1">
              {generateMonthlyCalendarDays().map((dayDate, index) => (
                <div
                  key={index}
                  className={`
                    text-center p-3 rounded-lg min-h-[120px] h-auto flex flex-col items-center justify-start
                    ${
                      dayDate
                        ? isToday(dayDate)
                          ? "bg-[#FECD31] text-[#0C1824] font-bold shadow-lg cursor-pointer hover:text-[#FECD31] hover:bg-[#0C1824]"
                          : "bg-[#0C1824] text-white hover:bg-[#1a2832] cursor-pointer"
                        : "bg-transparent"
                    }
                  `}
                >
                  {dayDate && (
                    <>
                      <span>{dayDate.getDate()}</span>
                      {getReservationGels(dayDate)}
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-1">
              {generateWeeklyCalendarDays().map((dateObj, index) => (
                <div
                  key={index}
                  className={`
                    text-center p-3 rounded-lg min-h-[120px] h-auto flex flex-col items-center justify-start
                    ${
                      isToday(dateObj)
                        ? "bg-[#FECD31] text-[#0C1824] font-bold shadow-lg cursor-pointer hover:text-[#FECD31] hover:bg-[#0C1824]"
                        : "bg-[#0C1824] text-white hover:bg-[#1a2832] cursor-pointer"
                    }
                  `}
                >
                  <span className="text-xs text-gray-400">
                    {daysShort[(dateObj.getDay() + 6) % 7]}
                  </span>
                  <span className="text-xl font-semibold">
                    {dateObj.getDate()}
                  </span>
                  {getReservationGels(dateObj)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Calendar;
