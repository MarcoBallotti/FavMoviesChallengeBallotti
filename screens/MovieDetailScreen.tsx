import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import axiosInstance from '../utils/axios';
import {Movie} from '../models/movie';
import {ScrollView} from 'react-native-gesture-handler';
import {LikedStore, useLikedStore} from '../utils/zustand';
import AntDesign from 'react-native-vector-icons/AntDesign';
const MovieDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {id} = route.params as any;
  const [movie, setMovie] = useState(new Movie());
  const [loading, setLoading] = useState(false);
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const {addToLiked, removeFromLiked, likedMovies} = useLikedStore(
    (state: LikedStore) => state,
  );

  const handleHeartClick = () => {
    console.log('%c isHeartClicked', 'color:#FFB86C', isHeartClicked);
    console.log('%c movie.id', 'color:#FFB86C', movie.id);

    setIsHeartClicked(!isHeartClicked);
    if (isHeartClicked) {
      removeFromLiked(movie.id);
    } else {
      addToLiked(movie.id);
    }
  };

  useEffect(() => {
    getMovie();
    const movieIsLiked = likedMovies.includes(movie.id);
    setIsHeartClicked(movieIsLiked);
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleHeartClick} style={{marginRight: 10}}>
          <AntDesign
            name={isHeartClicked ? 'heart' : 'hearto'}
            size={30}
            color="red"
          />
        </TouchableOpacity>
      ),
    });
  }, [likedMovies, movie.id, navigation]);

  const getMovie = () => {
    setLoading(true);
    axiosInstance
      .get('movie/' + id)
      .then(response => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={'red'} />
        </View>
      ) : (
        <ScrollView style={{height: '100%'}}>
          <View style={styles.relativeContainer}>
            <Image
              source={{
                uri: 'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path,
              }}
              style={styles.image}
            />
            <View style={styles.overlay}>
              <Text style={styles.originalTitle}>{movie.original_title}</Text>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.description}>{movie.overview}</Text>
          </View>

          <TouchableOpacity onPress={handleHeartClick}>
            <AntDesign
              name={isHeartClicked ? 'heart' : 'hearto'}
              size={30}
              color="red"
            />
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 300,
  },
  contentContainer: {
    padding: 15,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  originalTitle: {
    color: 'white',
    fontSize: 32,
    marginBottom: 5,
    paddingLeft: 20,
    width: '100%',
  },
  description: {
    color: '#333333',
    fontSize: 20,
    margin: 10,
  },
  releaseDate: {
    color: '#999',
    fontSize: 14,
    marginBottom: 10,
  },
  starRating: {
    marginBottom: 10,
  },
  genres: {
    color: '#999',
    fontSize: 14,
    marginBottom: 10,
  },
  productionCompanies: {
    color: '#999',
    fontSize: 14,
    marginBottom: 10,
  },
  spokenLanguages: {
    color: '#999',
    fontSize: 14,
    marginBottom: 10,
  },
  runtime: {
    color: '#999',
    fontSize: 14,
    marginBottom: 10,
  },
  status: {
    color: '#999',
    fontSize: 14,
    marginBottom: 10,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16, // Regola la distanza tra il testo e il fondo
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Opacità del 50%
  },
  overlayText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  relativeContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
});
