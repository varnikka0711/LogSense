import React, { useEffect, useState, useCallback } from "react";
import UploadBox from "../components/UploadBox.jsx";
import FilterBar from "../components/FilterBar.jsx";
import EventList from "../components/EventList.jsx";
import EventModal from "../components/EventModal.jsx";
import { getEvents, filterEvents } from "../services/api.js";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filters, setFilters] = useState({
    severity: "",
    type: "",
    ip: "",
    user: ""
  });

  const loadEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getEvents();
      setEvents(Array.isArray(data) ? data : data?.events || []);
    } catch (err) {
      // Swallow errors for a clean, silent demo UI
      // eslint-disable-next-line no-console
      console.error("Failed to load events", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleApplyFilters = async (nextFilters) => {
    setFilters(nextFilters);
    setIsFiltering(true);
    try {
      const data = await filterEvents({
        severity: nextFilters.severity,
        type: nextFilters.type,
        ip: nextFilters.ip,
        user: nextFilters.user
      });
      setEvents(Array.isArray(data) ? data : data?.events || []);
    } catch (err) {
      // Swallow errors for a clean, silent demo UI
      // eslint-disable-next-line no-console
      console.error("Failed to filter events", err);
    } finally {
      setIsFiltering(false);
    }
  };

  const handleClearFilters = async () => {
    setFilters({
      severity: "",
      type: "",
      ip: "",
      user: ""
    });
    await loadEvents();
  };

  const handleUploadSuccess = async () => {
    await loadEvents();
  };

  const handleSelectEvent = (evt) => {
    setSelectedEvent(evt);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-slate-950 to-black text-slate-100">
      <main className="mx-auto flex max-w-6xl flex-col gap-5 px-4 pb-10 pt-6 md:pt-8">
        <UploadBox onUploadSuccess={handleUploadSuccess} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] md:items-start">
          <FilterBar
            initialFilters={filters}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
            isLoading={isFiltering || isLoading}
          />
          <div className="h-[460px] md:h-[540px]">
            <EventList
              events={events}
              isLoading={isLoading || isFiltering}
              onSelect={handleSelectEvent}
            />
          </div>
        </div>
      </main>

      <EventModal event={selectedEvent} onClose={handleCloseModal} />
    </div>
  );
}

export default Dashboard;

