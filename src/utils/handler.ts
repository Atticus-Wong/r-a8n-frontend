

type LoadMembersArgs = {
	groupId: string;
	onMembers: (members: Member[]) => void;
}
async function handleLoadMembersForGroup({ groupId, onMembers }: LoadMembersArgs) {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/db/select/selectMembersFromGroup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				group_id: groupId,
			}),
		})

		if (!response.ok) {
			throw new Error(`Failed to fetch members: ${response.status}`);
		}

		const data = await response.json();
		onMembers(data.members)
		console.log("Changed members in selected group:", data.members);
	} catch (error) {
		console.error("Error fetching members:", error);
	}
}

export {
	handleLoadMembersForGroup
}
