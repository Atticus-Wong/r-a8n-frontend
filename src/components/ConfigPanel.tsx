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
import { handleLoadMembersForGroup } from "@/utils/handler";

const ConfigPanel: React.FC = () => {
	const { membersFromGroup, changeMembersFromGroup, group, changeGroup, allGroups } = useAppStore();
	const hasGroups = allGroups.length > 0;

	React.useEffect(() => {
		handleLoadMembersForGroup({groupId: group.group_id, onMembers: changeMembersFromGroup})
	}, [group.group_id, changeMembersFromGroup])

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
										if (nextGroup) changeGroup(nextGroup);
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
