import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
export interface LikedStore {
  likedMovies: number[]; // Array of movie IDs that are liked
  addToLiked: (movieId: number) => void;
  removeFromLiked: (movieId: number) => void;
}

export const useLikedStore = create<LikedStore>()(
  persist(
    (set, get) => ({
      likedMovies: [],
      addToLiked: movieId =>
        set(state => ({likedMovies: [...state.likedMovies, movieId]})),
      removeFromLiked: movieId =>
        set(state => ({
          likedMovies: state.likedMovies.filter(id => id !== movieId),
        })),
    }),
    {
      name: 'likedStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export function likesCounter() {
  const likedMoviesCount = useLikedStore(state => state.likedMovies.length);
  return likedMoviesCount;
}
