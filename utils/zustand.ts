import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
export interface LikedStore {
  likedMovies: number[]; // Array of movie IDs that are liked
  addToLiked: (movieId: number) => void;
  removeFromLiked: (movieId: number) => void;
  clearStore: () => void;
}

export const useLikedStore = create<LikedStore>()(
  persist(
    (set, get) => ({
      likedMovies: [],
      addToLiked(movieId) {
        console.log('like', movieId);
        const {likedMovies} = get();
        if (likedMovies.includes(movieId)) return;
        set({likedMovies: [...likedMovies, movieId]});
      },
      removeFromLiked(movieId) {
        console.log('unlike', movieId);
        const {likedMovies} = get();
        if (likedMovies.includes(movieId)) {
          set({likedMovies: likedMovies.filter(id => id !== movieId)});
        }
      },
      clearStore() {
        set({likedMovies: []});
      },
    }),
    {
      name: 'likedStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
