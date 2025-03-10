"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Book, Home, Info } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import ProfileDropdown from "../auth/ProfileDropdown";
import QuickSearch from "../books/QuickSearch";
import ModeToggle from "./ModeToggle";
import { useSession } from "next-auth/react";

const navigationItems = [
  {
    title: "Domov",
    href: "/",
    icon: Home,
    description: "Hlavná stránka",
  },
  {
    title: "Všetky knihy",
    href: "/books",
    icon: Book,
    description: "Zoznam dostupných kníh v knižnici",
  },
  {
    title: "O Knižnici",
    href: "/about",
    icon: Info,
    description: "Prečo bola applikácia vytvorená",
  },
];

const Navigation: FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center lg:h-16">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
              size="sm"
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
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] pr-0">
            <SheetHeader className="px-1">
              <SheetTitle className="flex items-center gap-2 text-lg font-medium">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Book className="h-4 w-4" />
                </div>
                Školská Knižnica
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <nav className="flex flex-col gap-2 px-1 py-4">
                <TooltipProvider>
                  {navigationItems.map((item) => (
                    <Tooltip key={item.href}>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "group flex flex-col gap-1 rounded-lg px-3 py-3 transition-colors hover:bg-accent",
                            pathname === item.href
                              ? "bg-accent"
                              : "transparent",
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon
                              className={cn(
                                "h-5 w-5",
                                pathname === item.href
                                  ? "text-primary"
                                  : "text-muted-foreground group-hover:text-primary",
                              )}
                            />
                            <span
                              className={cn(
                                "font-medium",
                                pathname === item.href
                                  ? "text-primary"
                                  : "text-muted-foreground group-hover:text-primary",
                              )}
                            >
                              {item.title}
                            </span>
                          </div>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>{item.description}</TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </nav>
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <Link
          href="/"
          className="mr-4 flex items-center gap-2 transition-colors hover:text-primary sm:mr-6"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground sm:h-8 sm:w-8">
            <Book className="h-4 w-4" />
          </div>
          <span className="hidden font-bold xs:inline-block">
            Školská knižnica
          </span>
        </Link>
        <nav className="hidden flex-1 lg:block">
          <ul className="flex gap-1">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                          pathname === item.href
                            ? "bg-accent text-primary"
                            : "text-muted-foreground",
                        )}
                      >
                        <item.icon className="h-4 w-4 transition-colors group-hover:text-primary" />
                        {item.title}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>{item.description}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="flex flex-1 items-center justify-end gap-1 lg:hidden xxs:hidden">
          {navigationItems.map((item) => (
            <TooltipProvider key={item.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-accent",
                      pathname === item.href
                        ? "bg-accent text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>{item.description}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <QuickSearch />
              </TooltipTrigger>
              <TooltipContent>Vyhľadať knihu</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {session?.user ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ProfileDropdown />
                </TooltipTrigger>
                <TooltipContent>Profil</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button variant={"link"}>
              <Link href="/sign-in">Prihlásiť sa</Link>
            </Button>
          )}
          <div className="ml-3">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
