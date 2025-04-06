"use client";

import {
  BarChart3,
  BookMarked,
  BookOpen,
  ChartColumnStacked,
  Library,
  Loader2,
  Menu,
  Users,
  Users2,
  X,
} from "lucide-react";
import Link from "next/link";
import { type FC, ReactNode, useState } from "react";
import { api } from "~/trpc/react";
import ModeToggle from "../../shared/ModeToggle";
import ProfileDropdown from "../../auth/ProfileDropdown";
import AdminQuickSearch from "./AdminQuickSearch";

type AdminSharedComponentProps = {
  showStats?: boolean;
  children?: ReactNode;
};

const AdminSharedComponent: FC<AdminSharedComponentProps> = ({
  showStats,
  children,
}) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const { data: bookData, isLoading: bookLoading } =
    api.book.getAllBooks.useQuery();
  const { data: categoryData, isLoading: categoryLoading } =
    api.category.getAllCategories.useQuery();
  const { data: genreData, isLoading: genreLoading } =
    api.genre.getAllGenres.useQuery();
  const { data: authorsData, isLoading: authorLoading } =
    api.author.getAllAuthors.useQuery();
  const { data: bookingData, isLoading: bookingLoading } =
    api.booking.getAllBookings.useQuery();
  const { data: userData, isLoading: userDataLoading } =
    api.user.getAllUsers.useQuery();

  if (
    bookLoading ||
    categoryLoading ||
    genreLoading ||
    userDataLoading ||
    authorLoading ||
    bookingLoading
  )
    return <Loader2 className="h-8 w-8 animate-spin" />;

  return (
    <div className="flex h-screen flex-col overflow-hidden lg:flex-row">
      <div className="flex items-center justify-between bg-indigo-700 p-4 lg:hidden dark:bg-stone-900">
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
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed top-0 left-0 z-30 h-full w-64 transform bg-blue-800 p-6 text-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 dark:bg-stone-900`}
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
              <item.icon className="h-5 w-5 shrink-0" />
              <Link href={item.link} className="whitespace-nowrap">
                {item.label}
              </Link>
            </button>
          ))}
        </nav>
      </div>

      {isSidebarOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-20 bg-black lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex h-[calc(100vh-64px)] min-w-0 flex-1 flex-col bg-gray-50 lg:h-screen dark:bg-stone-800">
        <header className="shrink-0 border-b border-gray-200 bg-white px-4 py-4 sm:px-6 dark:bg-stone-900">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div className="relative max-w-xs flex-1" />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <AdminQuickSearch />
                <span className="hidden text-sm font-medium sm:inline">
                  <ProfileDropdown />
                </span>
              </div>
              <ModeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {showStats && (
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {[
                {
                  title: "Všetky knihy",
                  value: bookData?.length,
                  color: "bg-blue-500",
                },
                {
                  title: "Všetky kategórie",
                  value: categoryData?.length,
                  color: "bg-green-500",
                },
                {
                  title: "Všetky žánre",
                  value: genreData?.length,
                  color: "bg-yellow-500",
                },
                {
                  title: "Všetky spisovateľia/ky",
                  value: authorsData?.length,
                  color: "bg-red-500",
                },
                {
                  title: "Všetky objednávky",
                  value: bookingData?.length,
                  color: "bg-orange-500",
                },
                {
                  title: "Všetci používatelia",
                  value: userData?.length,
                  color: "bg-fuchsia-500",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="dark:bg-background rounded-lg bg-white p-4 shadow-sm sm:p-6"
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
                    <div className={`${stat.color} shrink-0 rounded-lg p-3`} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminSharedComponent;
