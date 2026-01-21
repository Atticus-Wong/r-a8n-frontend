"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAppStore } from "@/utils/store";
import { Member } from "@/types/summary";

type DriverMultiSelectProps = {
	state: Member[],
	changeStateAction: (members: Member[]) => void
}
export default function DriverMultiselect({ state, changeStateAction }: DriverMultiSelectProps) {
	const {
		membersFromGroup,
		selectedDrivers,
		toggleDriverSelection,
	} = useAppStore();
	const [isOpen, setIsOpen] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [activeIndex, setActiveIndex] = React.useState(-1);
	const searchInputRef = React.useRef<HTMLInputElement>(null);

	const drivers = React.useMemo(
		() => membersFromGroup.filter((member) => member.is_driver),
		[membersFromGroup],
	);

	const selectedIds = React.useMemo(
		() => new Set(selectedDrivers.map((driver) => driver.id)),
		[selectedDrivers],
	);

	const filteredDrivers = React.useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		if (!query) return drivers;
		return drivers.filter((driver) =>
			driver.name.toLowerCase().includes(query),
		);
	}, [drivers, searchQuery]);

	React.useEffect(() => {
		setActiveIndex(filteredDrivers.length ? 0 : -1);
	}, [filteredDrivers]);

	React.useEffect(() => {
		if (isOpen) {
			searchInputRef.current?.focus();
		}
	}, [isOpen]);

	const summaryLabel =
		selectedDrivers.length > 0
			? `${selectedDrivers.length} driver${
					selectedDrivers.length > 1 ? "s" : ""
				} selected`
			: "Select drivers";

	const handleFocusInput = () => setIsOpen(true);
	const handleCloseOptions = () => {
		requestAnimationFrame(() => setIsOpen(false));
	};

	const handleSelectDriver = React.useCallback(
		(driver: Member) => {
			if (selectedIds.has(driver.id)) return;
			toggleDriverSelection(driver);
			setSearchQuery("");
		},
		[selectedIds, toggleDriverSelection],
	);

	const handleRemoveDriver = React.useCallback(
		(driver: Member) => {
			if (!selectedIds.has(driver.id)) return;
			toggleDriverSelection(driver);
		},
		[selectedIds, toggleDriverSelection],
	);

	const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Backspace" && searchQuery === "" && selectedDrivers.length) {
			event.preventDefault();
			handleRemoveDriver(selectedDrivers[selectedDrivers.length - 1]);
			return;
		}
		if (event.key === "ArrowDown") {
			event.preventDefault();
			setActiveIndex((prev) =>
				Math.min(prev + 1, filteredDrivers.length - 1),
			);
			return;
		}
		if (event.key === "ArrowUp") {
			event.preventDefault();
			setActiveIndex((prev) => Math.max(prev - 1, 0));
			return;
		}
		if (event.key === "Enter") {
			event.preventDefault();
			if (activeIndex >= 0 && filteredDrivers[activeIndex]) {
				handleSelectDriver(filteredDrivers[activeIndex]);
			}
		}
	};

	return (
		<div className="relative w-full max-w-xs">
			<div
				className={cn(
					"rounded-lg border bg-card text-card-foreground transition-shadow",
					isOpen ? "shadow-xl ring-1 ring-primary/20" : "shadow-sm",
				)}
			>
			<div className="flex flex-col gap-2 px-4 py-3 text-sm">
				<div className="flex items-center justify-between">
					<div>
						<p className="font-medium">Drivers</p>
						<p className="text-xs text-muted-foreground">{summaryLabel}</p>
					</div>
				</div>

				<div className="relative">
					<div className={cn(
						"flex flex-wrap items-center gap-1 rounded-md border px-2 py-1 text-sm focus-within:border-primary",
						!selectedDrivers.length && !searchQuery ? "text-muted-foreground" : ""
					)}>
						{selectedDrivers.map((driver) => (
							<button
								key={driver.id}
								type="button"
								className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground transition hover:bg-muted/70"
								onMouseDown={(event) => event.preventDefault()}
								onClick={() => handleRemoveDriver(driver)}
							>
								<span className="text-foreground">
									{driver.name}
									{typeof driver.available_seats === "number"
										? ` (${driver.available_seats})`
										: ""}
								</span>
								<X className="size-3" aria-hidden />
							</button>
						))}
						<input
							type="text"
							ref={searchInputRef}
							value={searchQuery}
							onChange={(event) => setSearchQuery(event.target.value)}
							onKeyDown={handleSearchKeyDown}
							onFocus={handleFocusInput}
							onBlur={handleCloseOptions}
							placeholder={selectedDrivers.length ? "" : "Search drivers…"}
							className="min-w-[80px] flex-1 border-none bg-transparent py-1 text-sm outline-none"
						/>
					</div>

					{isOpen && (
						<div className="pointer-events-none absolute left-0 right-0 top-full z-20">
							<div className="pointer-events-auto mt-2 rounded-lg border bg-card p-3 shadow-2xl">
								{drivers.length === 0 ? (
									<p className="text-sm text-muted-foreground">
										No drivers available for this group.
									</p>
								) : (
									<ul className="max-h-48 space-y-1 overflow-auto">
										{filteredDrivers.length === 0 ? (
											<li className="px-2 py-1 text-sm text-muted-foreground">
												No matches
											</li>
										) : (
											filteredDrivers.map((driver, index) => {
												const isSelected = selectedIds.has(driver.id);
												const isActive = index === activeIndex;
												return (
													<li key={driver.id}>
														<button
															type="button"
															className={cn(
																"flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition",
																isActive && !isSelected
																	? "bg-muted text-foreground"
																	: "",
																isSelected
																	? "bg-muted text-muted-foreground"
																	: "hover:bg-muted",
															)}
															onMouseDown={(event) => event.preventDefault()}
															onClick={() => handleSelectDriver(driver)}
															disabled={isSelected}
														>
															<span>{driver.name}</span>
															{typeof driver.available_seats === "number" && (
																<span className="text-xs text-muted-foreground">
																	Seats: {driver.available_seats}
																</span>
															)}
														</button>
													</li>
												);
											})
										)}
									</ul>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
			</div>
		</div>
	);
}
