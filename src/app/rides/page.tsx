  "use client";

  import * as React from "react";
  import { ConfigPanel } from "@/components/ConfigPanel";
  import { SummaryCard } from "@/components/SummaryCard";

  type RouteConfig = {
    id: string;
    label: string;
    leaveTime: string;
    routeLink: string;
    description: string;
  };

  type RiderConfig = {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    defaultSelected?: boolean;
  };

  const routes: RouteConfig[] = [
    {
      id: "midtown-shuttle",
      label: "Midtown shuttle",
      leaveTime: "2024-08-12T07:30:00.000Z",
      routeLink: "https://maps.app.goo.gl/sample-route-alex",
      description: "Weekday commute from Davis to Midtown Sacramento.",
    },
    {
      id: "campus-loop",
      label: "Campus loop",
      leaveTime: "2024-08-12T08:15:00.000Z",
      routeLink: "https://maps.app.goo.gl/sample-route-sarah",
      description: "Morning pickup loop covering the east campus apartments.",
    },
    {
      id: "farmers-market",
      label: "Farmers Market express",
      leaveTime: "2024-08-12T09:00:00.000Z",
      routeLink: "https://maps.app.goo.gl/sample-route-daniel",
      description: "Saturday shuttle to the Davis Farmers Market.",
    },
  ];

  const routeOptions = routes.map((route) => ({
    value: route.id,
    label: route.label,
  }));

  const routeLookup: Record<string, RouteConfig> =
  routes.reduce(
    (acc, route) => {
      acc[route.id] = route;
      return acc;
    },
    {} as Record<string, RouteConfig>
  );

  const drivers = [
    { id: "alex-johnson", name: "Alex Johnson" },
    { id: "sarah-lee", name: "Sarah Lee" },
    { id: "daniel-kim", name: "Daniel Kim" },
  ];

  const riderRoster: RiderConfig[] = [
    {
      id: "priya-k",
      name: "Priya K.",
      latitude: 38.5449,
      longitude: -121.7405,
      defaultSelected: true,
    },
    {
      id: "marco-l",
      name: "Marco L.",
      latitude: 38.5382,
      longitude: -121.7617,
      defaultSelected: true,
    },
    {
      id: "jamie-w",
      name: "Jamie W.",
      latitude: 38.5513,
      longitude: -121.7598,
    },
    {
      id: "luis-r",
      name: "Luis R.",
      latitude: 38.5301,
      longitude: -121.7526,
    },
    {
      id: "anya-p",
      name: "Anya P.",
      latitude: 38.5357,
      longitude: -121.7469,
    },
  ];

  const additionalSummaries: RideSummary[] = [
    {
      driver: "Sarah Lee",
      leave_time: "2024-08-12T08:15:00.000Z",
      route_link: "https://maps.app.goo.gl/sample-route-sarah",
      riders: [
        { name: "Jamie W.", latitude: 38.5513, longitude: -121.7598 },
        { name: "Luis R.", latitude: 38.5301, longitude: -121.7526 },
        { name: "Anya P.", latitude: 38.5357, longitude: -121.7469 },
      ],
    },
    {
      driver: "Daniel Kim",
      leave_time: "2024-08-12T09:00:00.000Z",
      route_link: "https://maps.app.goo.gl/sample-route-daniel",
      riders: [
        { name: "Priya K.", latitude: 38.5449, longitude: -121.7405 },
        { name: "Marco L.", latitude: 38.5382, longitude: -121.7617 },
      ],
    },
  ];

  export default function Rides() {
    const defaultRouteId = routes[0]?.id ?? "";
    const defaultDriverId = drivers[0]?.id;

    const [selectedRouteId, setSelectedRouteId] = React.useState(defaultRouteId);
    const [selectedDriverId, setSelectedDriverId] = React.useState<string | undefined>(defaultDriverId);
    const [selectedRiders, setSelectedRiders] = React.useState<Set<string>>(
      () =>
        new Set(
          riderRoster
            .filter((rider) => rider.defaultSelected)
            .map((rider) => rider.id)
        )
    );

    const ridersForPanel = riderRoster.map((rider) => ({
      id: rider.id,
      name: rider.name,
      selected: selectedRiders.has(rider.id),
    }));

    const activeRoute =
      routeLookup[selectedRouteId] ??
      routeLookup[defaultRouteId] ??
      routes[0] ??
      ({
        id: "placeholder",
        label: "Configure a route",
        leaveTime: new Date().toISOString(),
        routeLink: "https://maps.app.goo.gl/",
        description: "Preview the ride summary card with configurable data.",
      } satisfies RouteConfig);

    const configuredSummary: RideSummary = {
      driver:
        drivers.find((driver) => driver.id ===
  selectedDriverId)?.name ??
        "Assign a driver",
      leave_time: activeRoute.leaveTime,
      route_link: activeRoute.routeLink,
      riders: riderRoster
        .filter((rider) =>
  selectedRiders.has(rider.id))
        .map((rider) => ({
          name: rider.name,
          latitude: rider.latitude,
          longitude: rider.longitude,
        })),
    };

    const handleToggleRider = React.useCallback(
      (riderId: string, nextSelected: boolean) => {
        setSelectedRiders((prev) => {
          const next = new Set(prev);
          if (nextSelected) {
            next.add(riderId);
          } else {
            next.delete(riderId);
          }
          return next;
        });
      },
      []
    );

  return (
    <main className="mx-auto grid w-full gap-6 p-6 md:grid-cols-3"> {/* max-w-7xl */}
      <aside className="space-y-6 md:col-span-1">
        <ConfigPanel
          routeOptions={routeOptions}
          selectedRoute={selectedRouteId}
          onRouteChange={setSelectedRouteId}
          drivers={drivers}
          selectedDriverId={selectedDriverId}
          onSelectDriver={setSelectedDriverId}
          riders={ridersForPanel}
          onToggleRider={handleToggleRider}
        />
      </aside>

      <div className="space-y-6 md:col-span-1 md:col-start-2">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Ride summaries
          </h1>
          <p className="text-sm text-muted-foreground">
            {activeRoute.description}
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <SummaryCard summary={configuredSummary} />
          {additionalSummaries.map((summary) => (
            <SummaryCard
              key={`${summary.driver}-${summary.leave_time}`}
              summary={summary}
            />
          ))}
        </div>
      </div>

      <div aria-hidden className="hidden md:block md:col-span-1 md:col-start-3" />
    </main>
  );
}
