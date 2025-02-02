"use client";

import { FC } from "react";
import { ArrowRight, BookMarked, BrainCircuit, } from "lucide-react";
import Link from "next/link";

const Hero: FC = () => {
  return (
    <>
     <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-[fadeIn_1s_ease-in]">
              <div className="inline-block">
                <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold animate-bounce">
                  Vitajte v školskej knižnici SPŠT Bardejov
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold dark:text-sky-100 text-gray-900 leading-tight">
                SPŠT
                <br />Školská knižnica
              </h1>
              <p className="text-xl text-gray-600 dark:text-sky-200 leading-relaxed">
              <q>Knihy sú jedinečne prenosné kúzlo</q> - Stephen King
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                   <Link href="/books">Všetky knihy</Link>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:shadow-lg">
                  <Link href="https://www.spsbj.sk/">Návrat na školskú stránku</Link>
                </button>
              </div>
            </div>
            <div className="relative animate-[slideIn_1s_ease-out]">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-20 animate-pulse" />
                <img
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Library"
                  className="rounded-2xl shadow-2xl relative z-10 hover:scale-[1.02] transition-transform duration-300"
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
