"use client";

import React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NavBar() {
  const pathname = usePathname()
  const router = useRouter()

  const pathToTab: Record<string, string> = {
    "/dashboard": "dashboard",
    "/members": "members",
    "/books": "books",
  }

  // If the path is not in the map, default to an empty string
  const currentTabValue = pathToTab[pathname] || ""

  // When the user switches tabs, push a new route
  const handleTabChange = (value: string) => {
    // Reverse map: find the path that corresponds to the tab
    const tabToPath: Record<string, string> = {
      dashboard: "/dashboard",
      members: "/members",
      books: "/books",
      issuance: "/issuance",
    }
    router.push(tabToPath[value])
  }

  return (
    <header className=" flex flex-col justify-between items-center">
      {/* Logo Section */}
      <div className="w-full px-4 py-4 flex items-center justify-center gap-4 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center gap-2">
          <h1 className="text-lg md:text-xl font-bold whitespace-nowrap">
            <span className="text-gray-900">LIB</span>
            <span className="text-orange-600">READ</span>
          </h1>
        </Link>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6 mt-6 md:mt-8 md:mb-8 overflow-auto flex items-center justify-center">
        <Tabs
          // Control the Tabs with the current path-based value
          value={currentTabValue}
          onValueChange={handleTabChange}
          className="bg-orange-600 text-white rounded-xl p-1 px-2 w-min"
        >
          <TabsList className="w-full justify-start md:justify-center gap-3">
            {/* Dashboard Tab */}
            <TabsTrigger
              className="cursor-pointer hover:bg-orange-400 transition-all rounded-xl data-[state=active]:bg-orange-400"
              value="dashboard"
            >
              Dashboard
            </TabsTrigger>

            {/* Members Tab */}
            <TabsTrigger
              className="cursor-pointer hover:bg-orange-400 transition-all rounded-xl data-[state=active]:bg-orange-400"
              value="members"
            >
              Members
            </TabsTrigger>

            {/* Books Tab */}
            <TabsTrigger
              className="cursor-pointer hover:bg-orange-400 transition-all rounded-xl data-[state=active]:bg-orange-400"
              value="books"
            >
              Books
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </header>
  )
}
