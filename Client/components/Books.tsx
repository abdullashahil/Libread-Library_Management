"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Book, Bookmark, ChevronRight, Heart, HelpCircle, Settings } from "lucide-react"

export default function Page() {

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-6 md:flex md:gap-6">
        <div className="flex-1">



          {/* Book Grid */}
          <div className="bg-gray-100 p-4 rounded-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 ">
              {[
                { title: "Bubble", price: 39.99, rating: 4.5, image: "/placeholder.svg" },
                { title: "1984", price: 19.99, rating: 4.5, image: "/placeholder.svg" },
                { title: "Hobbit", price: 32.46, rating: 4.5, image: "/placeholder.svg" },
              ].map((book) => (
                <Card key={book.title} className="overflow-hidden">
                  <CardContent className="p-3 md:p-4">
                    <div className="aspect-[3/4] relative mb-3">
                      <Image
                        src={book.image || "/placeholder.svg"}
                        alt={book.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <h4 className="font-semibold text-sm md:text-base mb-1">{book.title}</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">{book.rating}</span>
                      <span className="font-semibold">${book.price}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Sidebar */}
        {/* <div className="hidden md:block w-80 shrink-0">
          <DesktopSidebar />
        </div> */}
      </main>


    </div>
  )
}

function DesktopSidebar() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Image src="/placeholder.svg" alt="Profile" width={48} height={48} className="rounded-full" />
          <div>
            <h3 className="font-semibold">Dercio JdS</h3>
            <p className="text-sm text-muted-foreground">@derciojds</p>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-2">Your Reading Progress</h4>
          <p className="text-sm text-muted-foreground mb-2">800 Pages left from 2 eBooks</p>
          <Progress value={33} className="bg-pink-100" />
        </div>

        <nav className="space-y-2">
          {[
            { label: "Reading list", icon: Book, count: 2 },
            { label: "Wish list", icon: Heart, count: 8 },
            { label: "Bookmarks", icon: Bookmark, count: 6 },
            { label: "Settings", icon: Settings },
            { label: "Help & Feedback", icon: HelpCircle },
          ].map((item) => (
            <Button key={item.label} variant="ghost" className="w-full justify-between font-normal">
              <span className="flex items-center gap-2">
                <item.icon className="w-4 h-4" />
                {item.label}
              </span>
              <span className="flex items-center gap-2">
                {item.count && <span className="text-muted-foreground">{item.count}</span>}
                <ChevronRight className="w-4 h-4" />
              </span>
            </Button>
          ))}
        </nav>
      </CardContent>
    </Card>
  )
}

// function MobileMenu() {
//   return (
//     <nav className="space-y-2 bg-white">
//       {[
//         { label: "Reading list", icon: Book, count: 2 },
//         { label: "Wish list", icon: Heart, count: 8 },
//       ].map((item) => (
//         <Button key={item.label} variant="ghost" className="w-full justify-between font-normal">
//           <span className="flex items-center gap-2">
//             <item.icon className="w-4 h-4" />
//             {item.label}
//           </span>
//           <span className="flex items-center gap-2">
//             {item.count && <span className="text-muted-foreground">{item.count}</span>}
//             <ChevronRight className="w-4 h-4" />
//           </span>
//         </Button>
//       ))}
//     </nav>
//   )
// }

