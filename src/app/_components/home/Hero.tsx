import { Search, BookOpen, Users, BookMarked } from "lucide-react";
import { FC } from "react";
import { Input } from "~/components/ui/input";
import { BookScene } from "../books/BookScene";
import { Button } from "~/components/ui/button";

const Hero: FC = () => {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#fdf4ff,transparent)]" />
      <div
        className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-primary/5 to-transparent"
        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%, 100% 0)" }}
      />

      <div className="container relative px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary animate-in fade-in slide-in-from-bottom-3 duration-1000">
                  Welcome to Your Library
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-5 duration-1000">
                  Discover Your Next Great Read
                </h1>
              </div>
              <p className="max-w-[600px] text-muted-foreground md:text-xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
                Explore our vast collection of books, journals, and digital resources. Your gateway to knowledge starts
                here.
              </p>
            </div>

            <div className="flex items-center space-x-2 max-w-lg animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="relative flex-1 group">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                <Input
                  type="search"
                  placeholder="Search for books, authors, or subjects..."
                  className="pl-10 h-12 bg-background/60 backdrop-blur-sm border-muted-foreground/20 transition-colors hover:border-primary/50 focus-visible:ring-primary"
                />
              </div>
              <Button
                className="h-12 px-8 shadow-lg shadow-primary/20 hover:shadow-primary/10 transition-shadow"
              >
                Search
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-background/50 to-primary/5 backdrop-blur-sm p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative flex items-center space-x-4">
                  <div className="rounded-full bg-primary/10 p-3 ring-1 ring-primary/20 transition-colors group-hover:bg-primary/20">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">50,000+</h3>
                    <p className="text-sm text-muted-foreground">Books</p>
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-background/50 to-primary/5 backdrop-blur-sm p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative flex items-center space-x-4">
                  <div className="rounded-full bg-primary/10 p-3 ring-1 ring-primary/20 transition-colors group-hover:bg-primary/20">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">10,000+</h3>
                    <p className="text-sm text-muted-foreground">Active Readers</p>
                  </div>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-background/50 to-primary/5 backdrop-blur-sm p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative flex items-center space-x-4">
                  <div className="rounded-full bg-primary/10 p-3 ring-1 ring-primary/20 transition-colors group-hover:bg-primary/20">
                    <BookMarked className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">24/7</h3>
                    <p className="text-sm text-muted-foreground">Digital Access</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center lg:h-[600px] animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-3xl" />
              <div className="relative w-full h-full">
                <BookScene />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero