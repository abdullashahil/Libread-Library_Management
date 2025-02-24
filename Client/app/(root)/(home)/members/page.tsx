"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

// Skeleton shimmers
function Skeleton() {
  return (
    <div className="space-y-3">
      {[...Array(6)].map((_, i) => (
        <Card
          key={i}
          className="flex justify-between items-center p-4 rounded-xl bg-gray-400 animate-pulse border-none"
        >
          <CardContent>
            <div className="h-5 bg-gray-600 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-600 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-gray-600 rounded w-1/4"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface Member {
  id: number;
  name: string;
  phone: string;
  email: string;
}

export default function MembersList() {
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Timer reference to clear previous timeouts if user keeps typing
  const searchTimer = useRef<NodeJS.Timeout | null>(null);

  // Fetch members on mount
  useEffect(() => {
    fetchMembers();
  }, []);

  // Debounce search
  useEffect(() => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }
    // If search is empty, fetch all members
    if (!search.trim()) {
      fetchMembers();
      return;
    }
    // Otherwise, search
    searchTimer.current = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => {
      if (searchTimer.current) {
        clearTimeout(searchTimer.current);
      }
    };
  }, [search]);

  // 1. Updated fetchMembers to include Authorization header
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Retrieve JWT from localStorage

      const res = await fetch("https://libread-server.vercel.app/members", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) {
        console.error("Error fetching members:", res.status);
        setMembers([]);
        return;
      }

      const data = await res.json();
      const transformed = data.map((item: any) => ({
        id: item.mem_id,
        name: item.mem_name,
        phone: item.mem_phone,
        email: item.mem_email,
      }));
      setMembers(transformed);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Updated handleSearch to include Authorization header
  const handleSearch = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Retrieve JWT from localStorage

      const res = await fetch(`https://libread-server.vercel.app/members?q=${search}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) {
        console.error("Error searching members:", res.status);
        setMembers([]);
        return;
      }

      const data = await res.json();
      const transformed = data.map((item: any) => ({
        id: item.mem_id,
        name: item.mem_name,
        phone: item.mem_phone,
        email: item.mem_email,
      }));
      setMembers(transformed);
    } catch (error) {
      console.error("Error searching members:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Search Bar */}
      <div className="flex flex-col justify-center items-center gap-2 mb-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Members List
        </h1>
        <div className="flex items-center justify-center w-full">
          <Search className="mr-2 h-5 w-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl bg-gray-100 border border-gray-300 placeholder:text-gray-500 text-sm"
          />
        </div>
      </div>

      {/* Members List or Skeleton */}
      <div className="space-y-3">
        {loading ? (
          <Skeleton />
        ) : members.length > 0 ? (
          members.map((member) => (
            <Card
              key={member.id}
              className="flex justify-between items-center p-3 rounded-xl bg-gray-900 text-white"
            >
              <CardContent>
                <p className="text-lg font-semibold">{member.name}</p>
                <p className="text-sm text-gray-300">{member.email}</p>
                <p className="text-sm text-gray-300">Phone: {member.phone}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No members found
          </p>
        )}
      </div>
    </div>
  );
}
