import axios from 'axios';

const authToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjY5NmYwMWZkOThiYjFlYmE2NDQzMzgyNzIxZDVlZiIsInN1YiI6IjY1OWZjNzRjMWJmODc2MDEyZGFjNzM1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G6ehJusn3T0MOwH9gigMcwdfPtC0TCPjCn2DtlxP7LM';
// Create and configure an instance of Axios
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/', // Replace with your API base URL
  timeout: 30000, // Timeout for requests in milliseconds
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${authToken}`,
    // Add any other common headers here
  },
});

export default instance;

// import axios from 'axios';

// const BASE_URL = 'https://api.themoviedb.org/3/';
// const authToken = 'a74169393e0da3cfbc2c58c5feec63d7';

// let http = axios.create({
//   baseURL: BASE_URL,
//   timeout: 30000,
//   headers: {
//     accept: 'application/json',
//   },
// });

// export async function getTopRatedMovies(page: number) {
//   // example: https://api.themoviedb.org/3/movie/top_rated?api_key=a74169393e0da3cfbc2c58c5feec63d7&page=1
//   try {
//     const response = await http.get(
//       `/top_rated?api_key=${authToken}&page=${page}`,
//     );
//     return response.data;
//   } catch (error) {
//     handleError(error);
//   }
// }

// export async function getMovieDetails(movie_id: number) {
//   // example: https://api.themoviedb.org/3/movie/278?api_key=a74169393e0da3cfbc2c58c5feec63d7
//   try {
//     const response = await http.get(`/${movie_id}`);
//     return response.data;
//   } catch (error) {
//     handleError(error);
//   }
// }

// export async function getMovieImage(image_path: string) {
//   // example: https://image.tmdb.org/t/p/w500 + image_path
//   try {
//     const response = await http.get(`/${image_path}`);
//     return response.data;
//   } catch (error) {
//     handleError(error);
//   }
// }

// export function handleError(error: any) {
//   // TODO: handle error
//   console.log('🔴ERROR: ~', error);
//   console.log('🔴ERROR_RESPONSE: ~', error.response);
// }
