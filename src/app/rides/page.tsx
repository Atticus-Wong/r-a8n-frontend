  import { SummaryCard } from "@/components/SummaryCard";

  const mockSummaries = [
    {
      driver: "Alex Johnson",
      leave_time: "2024-08-12T07:30:00.000Z",
      route_link: "https://maps.app.goo.gl/sample-route-alex",
      riders: [
        { name: "Priya K.", latitude: 38.5449, longitude: -121.7405 },
        { name: "Marco L.", latitude: 38.5382, longitude: -121.7617 },
      ],
    },
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
  ];

  export default function Rides() {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
        <header className="space-y-1 text-center sm:text-left">
          <h1 className="text-2xl font-semibold tracking-tight">Ride summaries</h1>
          <p className="text-sm text-muted-foreground">
            Preview of the card layout with mock data.
          </p>
        </header>

        {mockSummaries.map((summary) => (
          <SummaryCard key={summary.driver} summary={summary} />
        ))}
      </main>
    );
  }
