'use client';

import { useEffect } from "react";
import { useAppStore } from "@/utils/store";
import Rides from "./client";

export default function RidesHydrator() {
	const { allGroups, changeAllGroups } = useAppStore();

	// hydrates zustand state with all groups
	useEffect(() => {
		async function fetchGroupMembers() {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/db/select/groups`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					throw new Error(`Failed to fetch groups: ${response.status}`);
				}

				const data = await response.json();

				changeAllGroups(data.groups);
				console.log("Fetched all groups:", data.groups);
			} catch (error) {
				console.error("Error fetching members:", error);
			}
		}

		if (!allGroups || allGroups.length === 0) {
			fetchGroupMembers();
		}
	}, [allGroups, changeAllGroups]);

	return <Rides />;
}
