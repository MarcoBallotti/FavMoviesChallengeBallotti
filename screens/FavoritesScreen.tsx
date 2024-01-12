import React, {useState, useEffect} from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {BaseSearch} from '../models/baseSearch';
import {Movie} from '../models/movie';
import {appendQueryParams} from '../utils/helpers';
import axiosInstance from '../utils/axios';
import MovieCard from '../components/movieCard';
import {LikedStore, useLikedStore} from '../utils/zustand';

const FavoritesScreen: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const {likedMovies} = useLikedStore();

  const getMovies = async () => {
    setLoading(true);

    try {
      const moviePromises = likedMovies.map(async id => {
        const response = await axiosInstance.get(`movie/${id}`);
        return response.data;
      });

      const movieResults = await Promise.all(moviePromises);
      setMovies(movieResults);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, [likedMovies]);

  const renderHeader = () => <></>;
  const renderFooter = () => (
    <View style={styles.footerText}>
      {/*newsModel.moreLoading && <ActivityIndicator />}
      {newsModel.isListEnd && <Text>No more articles at the moment</Text>*/}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No movies found</Text>
    </View>
  );

  return (
    <View style={styles.backgroundContainer}>
      <FlatList
        contentContainerStyle={{flexGrow: 1}}
        data={movies}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item}) => <MovieCard movie={item} />}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        onEndReachedThreshold={0.1}
      />
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={'red'} />
        </View>
      ) : (
        ''
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
  },
  footerText: {
    flex: 1,
  },
  input: {},
  buttonPress: {},
  emptyContainer: {},
  emptyText: {},
  refreshButton: {},
  refreshButtonText: {},
});

export default FavoritesScreen;
