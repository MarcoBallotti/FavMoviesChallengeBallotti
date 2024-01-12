import AsyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock';

import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
export interface LikedStore {
  likedMovies: number[];
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
      storage: createJSONStorage(() => AsyncStorageMock),
    },
  ),
);
