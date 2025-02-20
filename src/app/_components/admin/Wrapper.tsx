"use client";

import { FC, useState } from "react";
import {
  BookOpen,
  Users,
  Clock,
  BarChart3,
  BookText,
  ChartColumnStacked,
  BookMarked,
  UserCheck,
  Library,
  AlertCircle,
  Menu,
  X,
  Users2,
  Loader2,
} from "lucide-react";
import AdminProfileDropdown from "./AdminProfileDropdown";
import ModeToggle from "../shared/ModeToggle";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { api } from "~/trpc/react";
import WrapperTable from "./WrapperTable";

const Wrapper: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const {data: bookData, isLoading: bookLoading} = api.book.getAllBooks.useQuery()
  const {data: categoryData, isLoading: categoryLoading} = api.category.getAllCategories.useQuery()  
  const {data: genreData, isLoading: genreLoading} = api.genre.getAllGenres.useQuery()
  const {data: authorsData, isLoading: authorLoading} = api.author.getAllAuthors.useQuery()

  if(bookLoading || categoryLoading || genreLoading || authorLoading) return <Loader2 className="animate-spin w-8 h-8" />

  return (
    <div className="flex h-screen flex-col overflow-hidden lg:flex-row">
      <div className="flex items-center justify-between bg-indigo-700 p-4 dark:bg-stone-900 lg:hidden">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-white" />
          <h1 className="text-lg font-bold text-white">Knižnica Admin</h1>
        </div>
        <button onClick={toggleSidebar} className="text-white">
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      <div
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed left-0 top-0 z-30 h-full w-64 transform bg-blue-800 p-6 text-white transition-transform duration-200 ease-in-out dark:bg-stone-900 lg:static lg:translate-x-0`}
      >
        <div className="mb-8 hidden items-center gap-2 lg:flex">
          <BookOpen className="h-8 w-8" />
          <h1 className="text-xl font-bold">Knižnica Admin</h1>
        </div>

        <nav className="space-y-2">
          {[
            {
              id: "dashboard",
              icon: BarChart3,
              label: "Admin",
              link: "/admin",
            },
            {
              id: "books",
              icon: BookMarked,
              label: "Knihy",
              link: "/admin/books",
            },
            {
              id: "members",
              icon: Users,
              label: "Všetci používatelia",
              link: "/admin/users",
            },
            {
              id: "categories",
              icon: ChartColumnStacked,
              label: "Kategórie",
              link: "/admin/categories",
            },
            {
              id: "authors",
              icon: Users2,
              label: "Spisovatelia/ky",
              link: "/admin/authors",
            },
            {
              id: "genres",
              icon: Library,
              label: "Žánre",
              link: "/admin/genres",
            },
            {
              id: "borrowedBooks",
              icon: BookText,
              label: "Všetky objednávky",
              link: "/admin/booking",
            },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-2 transition-colors ${
                activeTab === item.id
                  ? "bg-indigo-800 text-white"
                  : "text-indigo-100 hover:bg-indigo-600"
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <Link href={item.link} className="whitespace-nowrap">
                {item.label}
              </Link>
            </button>
          ))}
        </nav>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex h-[calc(100vh-64px)] min-w-0 flex-1 flex-col bg-gray-50 dark:bg-stone-800 lg:h-screen">
        <header className="flex-shrink-0 border-b border-gray-200 bg-white px-4 py-4 dark:bg-stone-900 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div className="relative max-w-xs flex-1" />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="hidden text-sm font-medium sm:inline">
                  <AdminProfileDropdown />
                </span>
              </div>
              <ModeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {[
              {
                title: "Všetky knihy",
                value: bookData?.length,
                icon: BookMarked,
                color: "bg-blue-500",
              },
              {
                title: "Všetky kategórie",
                value: categoryData?.length,
                icon: UserCheck,
                color: "bg-green-500",
              },
              {
                title: "Všetky žánre",
                value: genreData?.length,
                icon: Clock,
                color: "bg-yellow-500",
              },
              {
                title: "Všetky spisovateľia/ky",
                value: authorsData?.length,
                icon: AlertCircle,
                color: "bg-red-500",
              },
              {
                title: "Všetky objednávky",
                value: "123", // TODO: replace later
                icon: AlertCircle,
                color: "bg-red-500",
              },
              {
                title: "Všetci používatelia",
                value: "123", // TODO: Replace later
                icon: AlertCircle,
                color: "bg-red-500",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="rounded-lg bg-white p-4 shadow dark:bg-background sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-gray-600 dark:text-sky-50">
                      {stat.title}
                    </p>
                    <p className="mt-1 text-xl font-semibold sm:text-2xl">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color} flex-shrink-0 rounded-lg p-3`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-background">
            <div className="border-b border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg font-semibold">Posledné objednávky kníh</h2>
            </div>
            <WrapperTable />
          </div>

          <div className="mt-14">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">{currentPage}</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, 6))
                    }
                    disabled={currentPage === 6}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Wrapper;
