import React, {useState, useEffect} from 'react';
import {FlatList, TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {BaseSearch} from '../models/baseSearch';
import {Movie} from '../models/movie';
import {appendQueryParams} from '../utils/helpers';
import axiosInstance from '../utils/axios';
import MovieCard from '../components/movieCard';

const HomeScreen: React.FC = () => {
  const [baseSearch, setBaseSearch] = useState(new BaseSearch<Movie>());
  const endpoint = '/movie/top_rated';

  const [movieName, onChangeMovieName] = React.useState('');
  let onEndReachedCalledDuringMomentum: boolean;

  const requestAPI = () => {
    const endpointWithParams = appendQueryParams(endpoint, {
      query: movieName,
      page: baseSearch.page,
    });

    setBaseSearch(prevState => ({...prevState, loading: true}));
    axiosInstance
      .get(endpointWithParams)
      .then(response => {
        setBaseSearch(prevState => ({
          ...prevState,
          results: [...prevState.results!, ...response.data.results],
          page: response.data.page,
          total_pages: response.data.total_pages,
          total_results: response.data.total_results,
          loading: false,
        }));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setBaseSearch(prevState => ({...prevState, loading: false}));
      });
  };

  useEffect(() => {
    setBaseSearch(prevState => ({...prevState, page: 1, results: []}));
    requestAPI();
  }, [movieName]);

  const fetchMoreData = () => {
    if (baseSearch.page < baseSearch.total_pages && !baseSearch.loading) {
      setBaseSearch(prevState => ({
        ...prevState,
        page: (baseSearch.page += 1),
      }));
      console.log('%c baseSearch.page', 'color:#FFB86C', baseSearch.page);
      requestAPI();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{flexGrow: 1}}
        data={baseSearch.results}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item}) => <MovieCard movie={item} />}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum = false;
        }}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum) {
            fetchMoreData();
            onEndReachedCalledDuringMomentum = true;
          }
        }}
      />
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

export default HomeScreen;
