"use client"

import React from "react";
import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";
import { CalendarDays, Search, GanttChartSquare } from "lucide-react";
import AllLinks from "./AllLinks";



export default function TabsDisplay() {
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
    </div>  
  );
}
