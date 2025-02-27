"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpenIcon, UserIcon, Book } from "lucide-react";

interface PendingReturn {
  issuance_id: string;
  member_name: string;
  book_name: string;
  target_return_date: string;
}

export default function Dashboard() {
  const [pendingReturns, setPendingReturns] = useState<PendingReturn[]>([]);
  const [loading, setLoading] = useState(true);

  // Instead of using new Date() during initial render, use an empty string
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("pending");

  // On mount (client-side), set today's date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

  useEffect(() => {
    const fetchPendingReturns = async () => {
      // If selectedDate hasn't been set yet, don't fetch
      if (!selectedDate) return;

      setLoading(true);
      try {
        // Get JWT from localStorage
        const token = localStorage.getItem("token");

        const res = await fetch(
          `https://libread-server.vercel.app/issuances?status=${selectedStatus}&date=${selectedDate}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        if (!res.ok) {
          console.error("Failed to fetch pending returns:", res.status);
          setPendingReturns([]);
          return;
        }

        const data = await res.json();
        setPendingReturns(data);
      } catch (err) {
        console.error("Error fetching pending returns:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingReturns();
  }, [selectedDate, selectedStatus]);

  return (
    <div className="min-h-screen dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 flex flex-row items-center gap-2 md:gap-4">
          {/* Date Filter */}
          <div className="flex items-center">
            <label htmlFor="dateFilter" className="mr-2 text-gray-600 dark:text-gray-300">
              Date:
            </label>
            <Input
              id="dateFilter"
              type="date"
              value={selectedDate}
              // min is now static or derived after the client sets selectedDate
              // Alternatively, you could store minDate in a useEffect if needed
              min="2025-02-22"
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full max-w-xs border border-gray-300 px-1 md:px-2 rounded-xl bg-gray-50"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center">
            <label htmlFor="statusFilter" className="mr-2 text-gray-600 dark:text-gray-300">
              Status:
            </label>
            <select
              id="statusFilter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 px-1 md:px-3 rounded-xl py-2 bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
            >
              <option value="pending">Pending</option>
              <option value="issued">Issued</option>
              <option value="returned">Returned</option>
            </select>
          </div>
        </header>

        <main>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)} Returns
          </h2>
          {loading ? (
            <LoadingSkeleton />
          ) : pendingReturns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-scroll p-2 border-none rounded-xl ">
              {pendingReturns.map((item) => (
                <PendingReturnCard key={item.issuance_id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              No {selectedStatus} returns for this day.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}

const PendingReturnCard: React.FC<{ item: PendingReturn }> = ({ item }) => {
  // Convert the string to a Date object
  const dateObj = new Date(item.target_return_date);

  // Format the date (e.g., "Feb 23, 2025")
  const formattedDate = dateObj.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Format the time in 12-hour format without seconds (e.g., "10:30 AM")
  const formattedTime = dateObj.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <Card className="bg-white border-gray-300 dark:bg-gray-800 rounded-xl h-fit shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gray-900 text-white rounded-t-xl">
        <div className="w-fit flex items-center justify-between gap-3">
          <Book />
          <CardTitle className="text-lg font-semibold">{item.book_name || "N/A"}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center mb-2">
          <UserIcon className="mr-2 h-4 w-4 text-gray-500" />
          <span className="text-gray-700 dark:text-gray-300">{item.member_name || "N/A"}</span>
        </div>
        <div className="flex items-center">
          <BookOpenIcon className="mr-2 h-4 w-4 text-gray-500" />
          <span className="text-gray-600 dark:text-gray-400">
            Return By: {formattedDate} at {formattedTime}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
    {[...Array(3)].map((_, index) => (
      <Card
        key={index}
        className="bg-white border-gray-300 dark:bg-gray-800 rounded-xl shadow animate-pulse"
      >
        <CardHeader className="bg-gray-900 rounded-t-xl h-24"></CardHeader>
        <CardContent className="pt-4">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </CardContent>
      </Card>
    ))}
  </div>
);
