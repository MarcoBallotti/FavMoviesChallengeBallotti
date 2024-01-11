import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Movie} from '../models/movie';
import {useNavigation, useRoute} from '@react-navigation/native';
import {LikedStore, useLikedStore} from '../utils/zustand';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: 'row',
    borderBottomColor: '#e1e1e1',
    borderWidth: 0.2,
    backgroundColor: '#fff',
  },
  image: {
    width: 80, // Increase the width for larger images
    height: 80,
    borderRadius: 6,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    minHeight: 100,
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  subTitle: {
    color: '#999',
    fontWeight: 'bold',
    fontSize: 14,
  },
  heartIcon: {
    color: 'red',
    fontSize: 24,
    paddingRight: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

const MovieCard = ({movie}: {movie: Movie}) => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {addToLiked, removeFromLiked, likedMovies} = useLikedStore(
    (state: LikedStore) => state,
  );

  const handleHeartClick = () => {
    setIsHeartClicked(!isHeartClicked);
    if (isHeartClicked) {
      removeFromLiked(movie.id);
    } else {
      addToLiked(movie.id);
    }
  };

  const handleNavigation = () => {
    navigation.navigate('MovieDetailScreen', {id: movie.id});
  };

  useEffect(() => {
    const movieIsLiked = likedMovies.includes(movie.id);
    setIsHeartClicked(movieIsLiked);
  }, [likedMovies, movie.id]);

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={handleNavigation}>
      <Image
        source={{uri: 'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path}}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.subTitle}>
          Anno:
          {movie.release_date && new Date(movie.release_date).getFullYear()} |
          Voto:
          {movie.vote_average && parseFloat(movie.vote_average.toFixed(1))}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <Text>{'>'}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MovieCard;
