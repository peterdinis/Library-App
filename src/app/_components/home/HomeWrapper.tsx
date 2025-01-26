"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import Features from "./Features";
import { Card } from "~/components/ui/card";
import schollImage from "../../../public/img/main.png";
import Image from "next/image";

const HomeWrapper: FC = () => {
  return (
    <div className="min-h-max bg-gradient-to-b from-blue-50 to-white dark:from-zinc-900 dark:to-stone-800">
      <main>
        <section className="relative overflow-hidden">
          <div className="bg-grid-slate-100 absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          <div className="container relative pb-32 pt-20 md:pb-40 md:pt-32">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_500px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-6"
              >
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                  🎉 <span className="ml-2">Vitajte v školskej knižnici</span>
                </div>
                <h1 className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl">
                  SPŠT
                  <br />
                  Knižnica
                </h1>
                <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugit, eos.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" variant={"default"}>
                    Všetky knihy
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Návrat na školskú stránku
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="relative mx-auto w-full max-w-[500px] lg:mr-0"
              >
                <Card className="relative overflow-hidden border-2">
                  <Image
                    src={schollImage}
                    alt="Scholl homepage"
                    width={1200}
                    height={1200}
                    priority={true}
                  />
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
        <Features />
      </main>
    </div>
  );
};

export default HomeWrapper;
