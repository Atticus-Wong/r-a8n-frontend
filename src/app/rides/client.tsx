"use client";

import * as React from "react";
import { ConfigPanel } from "@/components/ConfigPanel";
import { useAppStore } from "@/utils/store";
import { Skeleton } from "@/components/ui/skeleton";

export default function Rides() {
  const { membersFromGroup, isFetchingMembers } = useAppStore();

  return (
    <main className="mx-auto grid w-full grid-cols-1 gap-6 p-6 md:grid-cols-[minmax(0,_1fr)_minmax(0,_3fr)]"> {/* max-w-7xl */}
      <aside className="space-y-6 md:col-span-1">
        <ConfigPanel />
      </aside>

      <div className="space-y-6 md:col-span-2 md:col-start-2">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Members
          </h1>
          <p className="text-sm text-muted-foreground">
            {isFetchingMembers ? "Loading members..." : `${membersFromGroup.length} members found.`}
          </p>
        </header>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isFetchingMembers ? (
             Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-3 w-[100px]" />
                  </div>
                </div>
             ))
          ) : membersFromGroup.length === 0 ? (
            <div className="col-span-full text-center text-muted-foreground py-8">
              No members loaded. Select a church and fetch data.
            </div>
          ) : (
            membersFromGroup.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {member.contact_info?.phone || "No phone"}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 text-sm text-muted-foreground">
                    {member.service_time && <span>{member.service_time}</span>}
                    {member.pickup_location && <span>{member.pickup_location}</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
