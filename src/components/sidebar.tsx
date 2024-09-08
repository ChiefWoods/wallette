import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button"
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";

export default function Sidebar() {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Button variant="outline" size="icon">
            <svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>menu</title><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-x-2">
              <svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>wallet-bifold</title><path d="M17 3H7C4.79 3 3 4.79 3 7V17C3 19.21 4.79 21 7 21H19C20.11 21 21 20.11 21 19V9C21 7.9 20.11 7 19 7V5C19 3.9 18.11 3 17 3M17 5V7H7C6.27 7 5.59 7.2 5 7.54V7C5 5.9 5.9 5 7 5M15.5 15.5C14.67 15.5 14 14.83 14 14S14.67 12.5 15.5 12.5 17 13.17 17 14 16.33 15.5 15.5 15.5Z" /></svg>
              <h1 className="text-2xl font-semibold">Wallette</h1>
            </SheetTitle>
            <SheetDescription className="flex flex-col gap-y-4 items-start">
              <Button asChild variant="outline" className="w-full flex justify-start">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Badge variant="outline">More Pages and Features Coming Soon!</Badge>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  )
}