import { create } from 'zustand'
import { Member, Group } from '@/types/summary'

type AppStore = {
	selectedRiders: Member[]
	addRider: (rider: Member) => void
	selectedDrivers: Member[]
	toggleDriverSelection: (driver: Member) => void
	allGroups: Group[]
	changeAllGroups: (groups: Group[]) => void
	group: Group
	changeGroup: (newGroup: Group) => void
	membersFromGroup: Member[]
	changeMembersFromGroup: (members: Member[]) => void
	isFetchingMembers: boolean
	setIsFetchingMembers: (isFetching: boolean) => void
}

export const useAppStore = create<AppStore>((set) => ({
	selectedRiders: [],
	addRider: (rider) =>
		set((state) => ({
			selectedRiders: [...state.selectedRiders, rider]
		})),

	selectedDrivers: [],
	toggleDriverSelection: (driver) =>
		set((state) => {
			const isSelected = state.selectedDrivers.some((d) => d.id === driver.id)
			return {
				selectedDrivers: isSelected
					? state.selectedDrivers.filter((d) => d.id !== driver.id)
					: [...state.selectedDrivers, driver]
			}
		}),

	allGroups: [],
	changeAllGroups: (groups) => set(() => ({ allGroups: groups })),

	group: { group_id: "275f1234-0e4f-45a0-bf70-47665f9b1ba3", name: "Select a Church", latitude: 38.5654446327135, longitude: -121.441821857672, abbreviation: "Select a Church", service_times: [ { "time": "7:30 AM", "description": "Coffee and Counseling" }, { "time": "9:00 AM", "description": "Service 1" }, { "time": "11:15 PM", "description": "Service 2" } ]},
	changeGroup: (newGroup) =>
		set((state) =>
			state.group !== newGroup ? { group: newGroup } : state
		),
	membersFromGroup: [],
	changeMembersFromGroup: (newMembers) =>
		set(() => ({ membersFromGroup: newMembers })),
	isFetchingMembers: false,
	setIsFetchingMembers: (isFetching) => set(() => ({ isFetchingMembers: isFetching }))
}))
