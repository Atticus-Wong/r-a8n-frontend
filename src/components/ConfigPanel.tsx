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
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MemberBubble } from "@/components/MemberBubble";
import { cn } from "@/lib/utils";

type RouteOption = {
	value: string;
	label: string;
};

type DriverOption = {
	id: string;
	name: string;
};

type RiderOption = {
	id: string;
	name: string;
	selected?: boolean;
};

type ConfigPanelProps = {
	routeOptions: RouteOption[];
	selectedRoute?: string;
	onRouteChange?: (value: string) => void;
	drivers: DriverOption[];
	selectedDriverId?: string;
	onSelectDriver?: (driverId: string | undefined)
=> void;
	riders: RiderOption[];
	onToggleRider?: (riderId: string, selected: boolean) => void;
	disabled?: boolean;
};

const ConfigPanel: React.FC<ConfigPanelProps> = ({
	routeOptions,
	selectedRoute,
	onRouteChange,
	drivers,
	selectedDriverId,
	onSelectDriver,
	riders,
	onToggleRider,
	disabled = false,
}) => {
	const activeRoute = routeOptions.find(
		(option) => option.value === selectedRoute
	);

	const handleRouteSelect = React.useCallback(
		(value: string) => {
			onRouteChange?.(value);
		},
		[onRouteChange]
	);

	const handleDriverClick = React.useCallback(
		(driverId: string) => {
			const next = driverId === selectedDriverId ?
undefined : driverId;
			onSelectDriver?.(next);
		},
		[onSelectDriver, selectedDriverId]
	);

	return (
		<Card
			data-testid="config-panel"
			className={cn(
				"space-y-6",
				disabled && "pointer-events-none opacity-70"
			)}
		>
			<CardHeader className="space-y-1">
				<CardTitle className="text-xl">Ride configuration</CardTitle>
				<CardDescription> Adjust the route, driver, and riders before publishing.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<section className="space-y-3" aria-label="Route selection">
					<div className="flex items-center justify-between">
						<span className="text-sm font-semibold tracking-tight">Route</span>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="sm">
									{activeRoute ? activeRoute.label : "Select a route"}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<DropdownMenuLabel>Available routes</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{routeOptions.length === 0 ? (
									<DropdownMenuItem disabled>
										No routes configured
									</DropdownMenuItem>
								) : (
									routeOptions.map((option) => (
										<DropdownMenuItem
											key={option.value}
											data-selected={option.value === selectedRoute}
											onSelect={() => handleRouteSelect(option.value)}
										>
											{option.label}
										</DropdownMenuItem>
									))
								)}
							</DropdownMenuContent>
						</DropdownMenu>
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
							Choose who is driving this route.
						</p>
					</header>

					<div className="flex flex-wrap gap-2">
						{drivers.length === 0 ? (
							<p className="text-xs text-muted-foreground">
								No drivers available yet.
							</p>
						) : (
							drivers.map((driver) => {
								const isSelected = driver.id ===
selectedDriverId;
								return (
									<Button
										key={driver.id}
										type="button"
										size="sm"
										variant="outline"
										aria-pressed={isSelected}
										data-selected={isSelected}
										className={cn( "rounded-full px-4 py-1 transition-colors", "hover:bg-primary/10", "data-[selected=true]:border- primary data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground data-[selected=true]:hover:bg-primary/90"
										)}
										onClick={() => handleDriverClick(driver.id)}
									>
										{driver.name}
									</Button>
								);
							})
						)}
					</div>
				</section>

				<Separator />

				<section className="space-y-3" aria-label="Riders">
					<header className="space-y-1">
						<h2 className="text-sm font-semibold tracking-tight">Riders</h2>
						<p className="text-xs text-muted- foreground">
							Toggle passengers to include them in this trip.
						</p>
					</header>

					<div className="flex flex-wrap gap-2">
						{riders.length === 0 ? (
							<p className="text-xs text-muted- foreground">
								No riders have been added yet.
							</p>
						) : (
							riders.map((rider) => (
								<MemberBubble
									key={rider.id}
									name={rider.name}
									selected={rider.selected}
									onToggle={(nextSelected: boolean) =>
										onToggleRider?.(rider.id, nextSelected)
									}
								/>
							))
						)}
					</div>
				</section>
			</CardContent>
		</Card>
	);
};

export { ConfigPanel };

