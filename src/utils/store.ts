import { create } from 'zustand'

type AppStore = {
	selectedRiders: Member[]
	addRider: (rider: Member) => void
	selectedDrivers: Member[]
	addDriver: (driver: Member) => void
	allGroups: Group[]
	changeAllGroups: (groups: Group[]) => void
	group: Group
	changeGroup: (newGroup: Group) => void
	membersFromGroup: Member[]
	changeMembersFromGroup: (members: Member[]) => void
}

export const useAppStore = create<AppStore>((set) => ({
	selectedRiders: [],
	addRider: (rider) =>
		set((state) => ({
			selectedRiders: [...state.selectedRiders, rider]
		})),

	selectedDrivers: [],
	addDriver: (driver) =>
		set((state) => ({
			selectedDrivers: [...state.selectedDrivers, driver]
		})),

	allGroups: [],
	changeAllGroups: (groups) => set(() => ({ allGroups: groups })),

	group: { group_id: "275f1234-0e4f-45a0-bf70-47665f9b1ba4", name: "City Bible Church", latitude: 38.5654446327135, longitude: -121.441821857672, abbreviation: "CBC" },
	changeGroup: (newGroup) =>
		set((state) =>
			state.group !== newGroup ? { group: newGroup } : state
		),
	membersFromGroup: [],
	changeMembersFromGroup: (newMembers) =>
		set(() => ({ membersFromGroup: newMembers }))
}))
