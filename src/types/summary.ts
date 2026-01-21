export type RideSummary = {
	driver: string;
	leave_time: string;
	route_link: string;
	riders: {
		name: string;
		latitude: number | string;
		longitude: number | string;
	}[];
};

export type Member = {
	id: string
	group_id: string
	latitude: number 
	longitude: number
	name: string
	is_driver?: boolean
	available_seats: number
	contact_info: {
		phone?: string
		email?: string
	}
	service_time?: string
	pickup_location?: string
}

export type Group = {
	group_id: string
	name: string
	latitude: number
	longitude: number
	abbreviation: string
	service_times: {
		time: string
		description: string
	}[]
}


interface Church {
	name: string
	number: string
	pickup_location: string
}

export interface CBC extends Church {
	service: "9:00" | "11:15"
}

export interface RCG extends Church {
	service: "9:00" | "10:30"
}

export interface Eastside extends Church {
	service: "10"
}

export interface West extends Church {
	service: "8:30" | "10:00"
}
