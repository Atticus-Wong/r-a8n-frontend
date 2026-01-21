'use client';

import { useEffect } from "react";
import { useAppStore } from "@/utils/store";
import { fetchGroupMembers } from "@/utils/handler";
import Rides from "./client";

export default function RidesHydrator() {
	const { allGroups, changeAllGroups } = useAppStore();

	// hydrates zustand state with all groups
	useEffect(() => {
		if (!allGroups || allGroups.length === 0) {
			fetchGroupMembers({ onChange: changeAllGroups});
		}
	}, [allGroups, changeAllGroups]);

	return <Rides />;
}
