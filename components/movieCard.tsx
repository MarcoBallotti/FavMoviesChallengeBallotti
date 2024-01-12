import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Movie} from '../models/movie';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
        <View style={styles.subTitle}>
          <View style={styles.iconContainer}>
            <AntDesign name="calendar" size={15} color="#999" />
            {movie.release_date && (
              <Text style={styles.text}>
                {new Date(movie.release_date).getFullYear()}
              </Text>
            )}
          </View>

          <View style={styles.iconContainer}>
            <AntDesign name="star" size={15} color="#f8cc1c" />
            {movie.vote_average && (
              <Text style={styles.text}>
                {parseFloat(movie.vote_average.toFixed(1))}
              </Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <AntDesign name="right" size={20} color="#d9d9d9" />
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
    alignItems: 'center',
  },
  image: {
    width: 80,
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
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  subTitle: {
    flexDirection: 'row',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    marginLeft: 5,
  },
  subTitleText: {
    color: '#999',
    fontWeight: 'bold',
    fontSize: 14,
  },
  heartIcon: {
    color: 'red',
    fontSize: 24,
    paddingRight: 10,
  },
});

export default MovieCard;
