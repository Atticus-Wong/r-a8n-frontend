type RideSummary = {
	driver: string;
	leave_time: string;
	route_link: string;
	riders: {
		name: string;
		latitude: number | string;
		longitude: number | string;
	}[];
};

type Member = {
	id: string
	group_id: string
	latitude: number 
	longitude: number
	name: string
	is_driver?: boolean
	available_seats: number
	contact_info: {}
}

type Group = {
	group_id: string
	name: string
	latitude: number
	longitude: number
	abbreviation: string
}
