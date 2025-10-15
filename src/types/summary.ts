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
