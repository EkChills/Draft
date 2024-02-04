"use client"

import React from "react";
import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";
import { CalendarDays, Search, GanttChartSquare, Trash2 } from "lucide-react";
import AllLinks from "./AllLinks";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";



export default function TabsDisplay() {
  const pathName = usePathname()
  const tabs = [
    {
      id: "View",
      label: "View",
      icon:GanttChartSquare,
      content:AllLinks
    },
    {
      id: "Calendar",
      label: "Calendar",
      icon:CalendarDays,
      content:AllLinks
    },
    {
      id: "Search",
      label: "Search",
      icon:Search,
      content:AllLinks
    }
  ];

  return (
    <div className="flex w-full flex-col pt-2">
      <Tabs aria-label="Dynamic tabs" className="w-full" fullWidth items={tabs}>
        {(item) => (
          <Tab key={item.id} title={
            <div className="w-full">
                <item.icon />
            </div>
          }>
              <div>
                <item.content/>
              </div>
          </Tab>
        )}
      </Tabs>
      <div className="bg-black/10s w-full h-[1px]" />
      <div  className={cn('flex items-center cursor-pointer p-4 rounded-lg gap-4', pathName === '/recently-deleted' ? 'bg-[#F2F2F2]' : '')}>
                    <Trash2 />
                    <span className='text-base font-semibold'>{'Recently Deleted'}</span>
                </div>
    </div>  
  );
}
