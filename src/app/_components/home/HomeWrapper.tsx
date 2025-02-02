"use client";

import { FC } from "react";
import { ArrowRight, BookMarked, BrainCircuit } from "lucide-react";
import Link from "next/link";

const Hero: FC = () => {
  return (
    <>
      <div className="overflow-hidden px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="animate-[fadeIn_1s_ease-in] space-y-8">
              <div className="inline-block">
                <span className="animate-bounce rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
                  Vitajte v školskej knižnici SPŠT Bardejov
                </span>
              </div>
              <h1 className="text-5xl font-bold leading-tight text-gray-900 dark:text-sky-100 md:text-6xl">
                SPŠT
                <br />
                Školská knižnica
              </h1>
              <p className="text-xl leading-relaxed text-gray-600 dark:text-sky-200">
                <q>Knihy sú jedinečne prenosné kúzlo</q> - Stephen King
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <button className="group flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-white transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <Link href="/books">Všetky knihy</Link>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="rounded-xl border-2 border-blue-600 px-8 py-4 text-blue-600 transition-all duration-300 hover:bg-blue-50 hover:shadow-lg">
                  <Link href="https://www.spsbj.sk/">
                    Návrat na školskú stránku
                  </Link>
                </button>
              </div>
            </div>
            <div className="relative animate-[slideIn_1s_ease-out]">
              <div className="relative">
                <div className="absolute -inset-4 animate-pulse rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 blur-lg" />
                <img
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Library"
                  className="relative z-10 rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
