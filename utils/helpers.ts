// Function to append query parameters to an endpoint
export const appendQueryParams = (endpoint: string, queryParams: { [x: string]: string | number | boolean; }) => {
	if (!queryParams) {
		return endpoint;
	}

	const queryString = Object.entries(queryParams)
		.filter(([key, value]) => value !== undefined && value !== '') // Exclude undefined values
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
		.join('&');

	return `${endpoint}?${queryString}`;
};