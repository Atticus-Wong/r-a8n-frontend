import Link from "next/link";
import { 
	Card, 
	CardHeader, 
	CardTitle, 
	CardDescription, 
	CardContent,
	CardFooter
} from "./ui/card";


type SummaryCardProps = {
	summary: RideSummary;
};

const formatLeaveTime = (leaveTime: string) => {
	const parsed = new Date(leaveTime);
	if (Number.isNaN(parsed.getTime())) return leaveTime;

	return new Intl.DateTimeFormat("en-US", {
		weekday: "short",
		hour: "numeric",
		minute: "2-digit",
	}).format(parsed);
};

const SummaryCard = ({ summary }: SummaryCardProps) => {
	const { driver, leave_time, route_link, riders } = summary;

	return (
		<Card className="w-full">
			<CardHeader className="gap-1">
				<CardTitle className="text-xl">{driver}</CardTitle>
				<CardDescription>
					Leaves {formatLeaveTime(leave_time)}
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-3">
				<section>
					<h3 className="text-sm font-semibold tracking-tight text-muted-foreground">
						Riders
					</h3>
					<ul className="mt-2 space-y-1 text-sm">
						{riders.map((rider) => (
							<li
								key={rider.name}
								className="flex items-center justify-between rounded-md border border-transparent px-2 py-1 transition hover:border-muted"
							>
								<span className="font-medium">{rider.name}</span>
								<span className="text-xs text-muted-foreground">
									{rider.latitude}, {rider.longitude}
								</span>
							</li>
						))}
					</ul>
				</section>
			</CardContent>

			<CardFooter className="justify-end">
				<Link
					href={route_link}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex h-9 items-center gap-1 rounded-md border px-3 text-sm font-medium transition hover:bg-accent"
				>
					View route →
				</Link>
			</CardFooter>
		</Card>
	);
};

export { SummaryCard };
