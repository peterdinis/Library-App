"use client"

import { FC, useState, FormEvent } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { BookOpen, Calendar, ChevronRight } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "~/components/ui/dialog"
import { Label } from "~/components/ui/label"
import { Button } from "~/components/ui/button"
import { DialogHeader, DialogFooter } from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"

const BorrowBookModal: FC = () => {
  const [step, setStep] = useState(1)
  const [open, setOpen] = useState(false)

  const handleNext = () => {
    setStep(2)  // Only change the step, no modal closing
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setOpen(false)  // Close the modal after submitting the form
    setStep(1)      // Reset step to 1 when reopening modal
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) setStep(1)  // Reset to step 1 when modal is closed
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <BookOpen className="mr-2 h-4 w-4" />
          Borrow Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Borrow Book</DialogTitle>
            <DialogDescription>
              {step === 1 ? "Confirm the book details before proceeding." : "Select your preferred borrowing period."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 my-4">
            <div className="flex h-2 w-full rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: step === 1 ? "50%" : "100%" }}
              />
            </div>
            <span className="text-sm text-muted-foreground">Step {step}/2</span>
          </div>
          {step === 1 ? (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="book-title">Book Title</Label>
                <Input id="book-title" defaultValue="The Great Gatsby" readOnly className="bg-muted" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="book-id">Book ID</Label>
                <Input id="book-id" defaultValue="GB-1925-01" readOnly className="bg-muted" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="current-status">Current Status</Label>
                <Input id="current-status" defaultValue="Available" readOnly className="bg-muted text-green-600" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="borrow-period">Borrowing Period</Label>
                <Select defaultValue="2-weeks">
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-week">1 Week</SelectItem>
                    <SelectItem value="2-weeks">2 Weeks</SelectItem>
                    <SelectItem value="3-weeks">3 Weeks</SelectItem>
                    <SelectItem value="4-weeks">4 Weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="return-date">Return Date</Label>
                <Input
                  id="return-date"
                  type="date"
                  className="bg-muted"
                  defaultValue={new Date(Date.now() + 12096e5).toISOString().split("T")[0]}
                  readOnly
                />
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-between">
            {step === 2 && (
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
            )}
            {step === 1 ? (
              <Button type="button" onClick={handleNext}>
                Next Step
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit">
                <Calendar className="mr-2 h-4 w-4" />
                Confirm Borrowing
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default BorrowBookModal;
