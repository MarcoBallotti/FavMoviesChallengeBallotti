import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Movie} from '../models/movie';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const MovieCard = ({movie}: {movie: Movie}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleNavigation = () => {
    navigation.navigate('MovieDetailScreen', {id: movie.id});
  };

  useEffect(() => {});

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

export default MovieCard;
