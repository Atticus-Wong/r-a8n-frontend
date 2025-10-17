"use client";

import * as React from "react";

import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MemberBubble } from "@/components/MemberBubble";
import { cn } from "@/lib/utils";


const ConfigPanel: React.FC = () => {

	return (
		<Card
			data-testid="config-panel"
			className={cn(
				"space-y-6",
			)}
		>
			<CardHeader className="space-y-1">
				<CardTitle className="text-xl">Ride configuration</CardTitle>
				<CardDescription>
					Select your church, driver, and riders.
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-6">
				<section className="space-y-3" aria-label="Route selection">
					<div className="flex items-center justify-between">
						<span className="text-sm font-semibold tracking-tight">Group</span>
						<Button
							variant="outline"
							size="sm"
							disabled
							className="pointer-events-none"
						>
							Church
							{/*insert logic for choosing which church to choose*/}
						</Button>
					</div>
					<p className="text-xs text-muted-foreground">
						Routes control the pickup order and directions we surface to riders.
					</p>
				</section>

				<Separator />

				<section className="space-y-3" aria-label="Drivers">
					<header className="space-y-1">
						<h2 className="text-sm font-semibold tracking-tight">Drivers</h2>
						<p className="text-xs text-muted-foreground">
							Choose who is driving.
							{/*insert logic for drivers*/}
						</p>
					</header>

				</section>

				<Separator />

				<section className="space-y-3" aria-label="Riders">
					<header className="space-y-1">
						<h2 className="text-sm font-semibold tracking-tight">Riders</h2>
						<p className="text-xs text-muted-foreground">
							Toggle passengers to include them in this trip.
							{/*insert logic for passengers*/}
						</p>
					</header>
				</section>
				<Separator />

				<div className="flex w-full justify-center">
					<Button disabled className="pointer-events-none hover:cursor-default">
						Optimize Routes
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export { ConfigPanel };
