import {useLikedStore} from '../zustand';

describe('test 1', () => {
  test('should return length of film appended', () => {
    const {likedMovies} = useLikedStore.getState();
    const logLines = 3;
    for (let index = 0; index < logLines; index++) {
      likedMovies.push(index);
    }
    expect(likedMovies.length).toBe(logLines);
  });
});

describe('test 2', () => {
  test('should return length of film appended empty', () => {
    const {likedMovies} = useLikedStore.getState();
    likedMovies.length = 0;
    expect(likedMovies.length).toBe(0);
  });
});
