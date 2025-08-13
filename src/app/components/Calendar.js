// app/reservations/page.js
"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const Calendar = () => {
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
    setViewMode("month"); // Revenir à la vue mois par défaut pour "Aujourd'hui"
  };

  // --- Fonctions de génération des jours ---

  // Fonction pour générer toutes les cases du calendrier mensuel (42 cases = 7x6)
  const generateMonthlyCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    // getDay() retourne 0 pour Dimanche, 1 pour Lundi...
    // On ajuste pour que Lundi soit le premier jour (0)
    const startingDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // 0=Lun, 1=Mar, ..., 6=Dim

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];

    for (let i = 0; i < 42; i++) {
      if (i < startingDayOfWeek) {
        calendarDays.push(null); // Cases vides avant le début du mois
      } else if (i < startingDayOfWeek + daysInMonth) {
        calendarDays.push(i - startingDayOfWeek + 1); // Jours du mois actuel
      } else {
        calendarDays.push(null); // Cases vides après la fin du mois
      }
    }
    return calendarDays;
  };

  // Fonction pour générer les jours de la semaine actuelle
  const generateWeeklyCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    const weekDays = [];
    // Trouver le lundi de la semaine en cours
    const currentDayOfWeek = (currentDate.getDay() + 6) % 7; // 0=Lun, 1=Mar, ..., 6=Dim
    const mondayOfWeek = new Date(year, month, day - currentDayOfWeek);

    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(mondayOfWeek);
      dayDate.setDate(mondayOfWeek.getDate() + i);
      weekDays.push(dayDate);
    }
    return weekDays;
  };

  // Fonction pour vérifier si c'est aujourd'hui
  const isToday = (dayNumber, checkDate = currentDate) => {
    if (dayNumber === null) return false;

    const today = new Date();
    const currentYear = checkDate.getFullYear();
    const currentMonth = checkDate.getMonth();

    return (
      today.getDate() === dayNumber &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear
    );
  };

  // --- Rendu du composant ---
  return (
    <>
      <span className="text-[#FECD31] text-center text-xl block mb-4">
        {days[currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1]}{" "}
        {currentDate.getDate()} {months[currentDate.getMonth()]}{" "}
        {currentDate.getFullYear()}
      </span>

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
              {generateMonthlyCalendarDays().map((day, index) => (
                <div
                  key={index}
                  className={`
                    text-center p-3 rounded-lg h-20 flex items-center justify-center
                    ${
                      day !== null
                        ? isToday(day)
                          ? "bg-[#FECD31] text-[#0C1824] font-bold shadow-lg cursor-pointer hover:text-[#FECD31] hover:bg-[#0C1824]"
                          : "bg-[#0C1824] text-white hover:bg-[#1a2832] cursor-pointer"
                        : "bg-transparent"
                    }
                  `}
                >
                  {day}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-1">
              {generateWeeklyCalendarDays().map((dateObj, index) => (
                <div
                  key={index}
                  className={`
                    text-center p-3 rounded-lg h-50 flex flex-col items-center justify-center
                    ${
                      isToday(dateObj.getDate(), dateObj)
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

//la calendrier mensuel fonctionne très bien on passe maintenant au calendrier hebdomadaire
