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
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useAppStore } from "@/utils/store";

import DriverMultiselect from "./DriverMultiselect";

import { handleLoadMembersForGroup } from "@/utils/handler";
const ConfigPanel: React.FC = () => {
	const { changeMembersFromGroup, group, changeGroup, allGroups, setIsFetchingMembers } = useAppStore();
	const hasGroups = allGroups.length > 0;

	// Removed auto-fetch useEffect

	const handleFetchRideSheet = async () => {
		if (!group || !group.name) return;

		let range = "";
		const churchName = group.name.toUpperCase(); // Assuming group.name matches RCG, CBC, LPC roughly, or we use abbreviation

		// Map group to range based on instructions
		// "RCG", "CBC", "LPC"
		// We'll try to match the abbreviation or name.
		const validChurches = ["RCG", "CBC", "LPC"];
		const churchIdentifier = validChurches.find(c => 
			group.name.toUpperCase().includes(c) || 
			group.abbreviation.toUpperCase().includes(c)
		);

		if (!churchIdentifier) {
			console.error("Selected group is not one of RCG, CBC, or LPC");
			// Defaulting or handling error. For now, let's alert or log.
			// If strictly following prompt: "the church_name can be one of 3 values"
			// I'll assume the selected group corresponds to one of these.
			return; 
		}

		if (churchIdentifier === "RCG") range = "A20:D34";
		else if (churchIdentifier === "CBC") range = "B37:E65";
		else if (churchIdentifier === "LPC") range = "B28:G52";

		const url = `http://localhost:3001/sheets/values?range=${churchIdentifier}!${range}`;

		try {
			setIsFetchingMembers(true);
			const response = await fetch(url);
			if (!response.ok) throw new Error("Failed to fetch sheet data");
			const rawData: string[][] = await response.json();

			// Map raw data to Member objects
			// rawData example: [["Derk","4152797926","11:15 AM","Sorrento"], ...]
			const newMembers = rawData.map((row, index) => ({
				id: `fetched-${index}-${Date.now()}`,
				group_id: group.group_id,
				name: row[0] || "Unknown",
				contact_info: { phone: row[1] || "" },
				service_time: row[2] || "",
				pickup_location: row[3] || "",
				latitude: 0, // Default as not provided in sheet
				longitude: 0, // Default as not provided in sheet
				available_seats: 0, // Default
				// Storing extra info if needed, maybe in name or a separate field if Member allowed
			}));

			changeMembersFromGroup(newMembers);
		} catch (error) {
			console.error("Error fetching ride sheet:", error);
		} finally {
			setIsFetchingMembers(false);
		}
	};

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
					Select your church.
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-6">
				<section className="space-y-3" aria-label="Route selection">
					<div className="flex items-center justify-between">
						<span className="text-sm font-semibold tracking-tight">Group</span>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									size="sm"
									className="flex items-center gap-1"
								>
									{group?.abbreviation ?? "Select group"}
									<ChevronDown className="size-3.5" aria-hidden />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-48">
								<DropdownMenuLabel>Select a church</DropdownMenuLabel>
								<Separator />
								<DropdownMenuRadioGroup
									value={hasGroups ? (group?.group_id ?? "") : ""}
									onValueChange={(groupId) => {
										const nextGroup = allGroups.find(
											(option) => option.group_id === groupId,
										);
										if (nextGroup) {
											changeGroup(nextGroup);
											changeMembersFromGroup([]); // Wipe clean on change
										}
									}}
								>
									{hasGroups ? (
										allGroups.map((option) => (
											<DropdownMenuRadioItem
												key={option.group_id}
												value={option.group_id}
											>
												{option.name}
											</DropdownMenuRadioItem>
										))
									) : (
										<DropdownMenuRadioItem value="" disabled>
											Loading groups…
										</DropdownMenuRadioItem>
									)}
								</DropdownMenuRadioGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<p className="text-xs text-muted-foreground">
						Routes control the pickup order and directions we surface to riders.
					</p>
				</section>

				<Separator />

				{group.service_times.map((service, index) => (
					<React.Fragment key={service.time}>
						<section className="space-y-3" aria-label={`${service.time} Service`}>
							<header className="space-y-1">
								<h2 className="text-sm font-semibold tracking-tight">
									{service.time}
								</h2>
								<p className="text-xs text-muted-foreground">
									{service.description}
									{/* insert time specific logic */}
								</p>
							</header>
							<DriverMultiselect state={[]} changeStateAction={() => {}} />
						</section>
						{index < group.service_times.length - 1 && <Separator />}
					</React.Fragment>
				))}
				<Separator />

				<div className="flex w-full flex-col gap-2">
					<Button 
						onClick={handleFetchRideSheet}
						className="w-full"
					>
						Fetch information from ridesheet
					</Button>
					<div className="flex w-full justify-center">
						<Button disabled className="pointer-events-none hover:cursor-default w-full" variant="secondary">
							Optimize Routes
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export { ConfigPanel };
