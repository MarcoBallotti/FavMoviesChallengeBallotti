import AsyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock';

import {useLikedStore} from '../zustand';

describe('useLikedStore', () => {
  beforeEach(async () => {
    // Pulisci lo storage prima di ogni test
    await AsyncStorageMock.clear();
  });

  it('should initialize the store with an empty array', () => {
    const {likedMovies} = useLikedStore.getState();
    expect(likedMovies).toEqual([]);
  });

  it('should add a movie to the liked list', () => {
    const movieId = 123;
    useLikedStore.getState().addToLiked(movieId);

    const {likedMovies} = useLikedStore.getState();
    expect(likedMovies).toEqual([movieId]);
  });
});
