"use client";

import { FC } from "react";
import { ArrowRight, BookMarked, BrainCircuit, } from "lucide-react";

const Hero: FC = () => {
  return (
    <>
     <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-[fadeIn_1s_ease-in]">
              <div className="inline-block">
                <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold animate-bounce">
                  Welcome to the Future of Learning
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Your Gateway to
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text"> Knowledge</span>
                <br />and Discovery
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Access thousands of books, research materials, and educational resources at your fingertips.
                Learn, explore, and grow with our comprehensive digital library.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                  <span>Start Exploring</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:shadow-lg">
                  Take a Tour
                </button>
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/40?img=${i}`}
                      alt={`User ${i}`}
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <div className="text-gray-600">
                  <span className="font-bold text-blue-600">10,000+</span> students already joined
                </div>
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
              <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl shadow-xl animate-bounce">
                <div className="flex items-center space-x-2">
                  <BrainCircuit className="h-6 w-6 text-blue-600" />
                  <span className="font-semibold text-gray-800">Smart Learning</span>
                </div>
              </div>
              <div className="absolute -top-8 -right-8 bg-white p-4 rounded-xl shadow-xl animate-bounce delay-100">
                <div className="flex items-center space-x-2">
                  <BookMarked className="h-6 w-6 text-blue-600" />
                  <span className="font-semibold text-gray-800">24/7 Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
