"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, GraduationCap, Home, Info, LayoutGrid, Search, User} from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "~/components/ui/dialog"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Button } from "~/components/ui/button"
import { DialogHeader } from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, Sheet } from "~/components/ui/sheet"
import { cn } from "~/lib/utils"


const navigationItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
    description: "Return to the main page",
  },
  {
    title: "Books",
    href: "/books",
    icon: Book,
    description: "Browse our collection of books",
  },
  {
    title: "Resources",
    href: "/resources",
    icon: LayoutGrid,
    description: "Access study materials and resources",
  },
  {
    title: "Academic Support",
    href: "/academic-support",
    icon: GraduationCap,
    description: "Get help with your studies",
  },
  {
    title: "About",
    href: "/about",
    icon: Info,
    description: "Learn about our library",
  },
]

const Header: React.FC = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <svg
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <path
                  d="M3 5H11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M3 12H16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M3 19H21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] pr-0">
            <SheetHeader className="px-1">
              <SheetTitle className="flex items-center gap-2 text-lg font-medium">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Book className="h-4 w-4" />
                </div>
                School Library
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <nav className="flex flex-col gap-4 px-1 py-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "group flex flex-col gap-1 rounded-lg px-3 py-2 transition-colors hover:bg-accent",
                      pathname === item.href ? "bg-accent" : "transparent",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon
                        className={cn(
                          "h-4 w-4",
                          pathname === item.href ? "text-primary" : "text-muted-foreground group-hover:text-primary",
                        )}
                      />
                      <span
                        className={cn(
                          "font-medium",
                          pathname === item.href ? "text-primary" : "text-muted-foreground group-hover:text-primary",
                        )}
                      >
                        {item.title}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </Link>
                ))}
              </nav>
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 flex items-center gap-2 transition-colors hover:text-primary">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Book className="h-4 w-4" />
          </div>
          <span className="font-bold">School Library</span>
        </Link>
        <nav className="hidden flex-1 md:block">
          <ul className="flex gap-1">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                    pathname === item.href ? "bg-accent text-primary" : "text-muted-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4 transition-colors group-hover:text-primary" />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-accent">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Search Library</DialogTitle>
              </DialogHeader>
              <div className="flex gap-2 py-4">
                <Input placeholder="Search books, resources..." className="flex-1" />
                <Button>Search</Button>
              </div>
              <div className="space-y-4 divide-y">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Recent Searches</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" size="sm">
                      Programming Books
                    </Button>
                    <Button variant="secondary" size="sm">
                      Science Fiction
                    </Button>
                    <Button variant="secondary" size="sm">
                      Research Papers
                    </Button>
                  </div>
                </div>
                <div className="space-y-2 pt-4">
                  <h4 className="text-sm font-medium">Popular Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      Academic
                    </Button>
                    <Button variant="outline" size="sm">
                      Fiction
                    </Button>
                    <Button variant="outline" size="sm">
                      Non-Fiction
                    </Button>
                    <Button variant="outline" size="sm">
                      Reference
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="ghost" size="icon" className="hover:bg-accent">
            <User className="h-4 w-4" />
            <span className="sr-only">Account</span>
          </Button>
        </div>
      </div>
    </header>
  )
}


export default Header