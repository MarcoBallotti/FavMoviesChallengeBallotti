import React, {useCallback, useEffect, useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Movie} from '../models/movie';
import {useLikedStore} from '../utils/zustand';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const LikeButton = ({movie}: {movie: Movie}) => {
  const {addToLiked, removeFromLiked, likedMovies} = useLikedStore();

  useEffect(() => {});

  const movieIsLiked = useMemo(
    () => likedMovies.includes(movie.id),
    [likedMovies, movie],
  );

  const handleHeartClick = useCallback(() => {
    console.log('handleHeartClick', movie);
    if (movieIsLiked) {
      removeFromLiked(movie.id);
    } else {
      addToLiked(movie.id);
    }
  }, [movieIsLiked]);

  return (
    <TouchableOpacity onPress={handleHeartClick} style={{marginRight: 10}}>
      <AntDesign
        name={movieIsLiked ? 'heart' : 'hearto'}
        size={30}
        color="#007aff"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
