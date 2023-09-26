import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { Dimensions } from 'react-native';
import { styles } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import MovieList from '../components/MovieList'
import Cast from '../components/Cast';
import Loading from '../components/Loading';
import { fetchCreditsMovies, fetchDetailsMovie, fetchSimilarMovies, image500 } from '../api/moviedb';

var { width, height } = Dimensions.get('window')
const ios = Platform.OS == 'ios';
const topMargin = ios ? ' absolute' : ' mt-3'

export default function MovieScreen() {
  const [isFavourite, setIsFavourite] = useState(false)
  const [cast, setCast] = useState([1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3])
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3])
  const [loading, setLoading] = useState(false)
  const [movie, setMovie] = useState({})

  const { params: item } = useRoute();
  const navigation = useNavigation()

  useEffect(() => {
    setLoading(true)
    getMovieDetails(item.id)
    getMoviesSimilar(item.id)
    getMovieCredits(item.id)
    
  }, [item])

  const getMovieDetails = async (id) => {
    const data = await fetchDetailsMovie(id)
    if (data) setMovie(data)
  }

  const getMoviesSimilar = async (id) => {
    const data = await fetchSimilarMovies(id)
    if (data && data.results ) setSimilarMovies(data.results)
  }

  const getMovieCredits = async (id) => {
    const data = await fetchCreditsMovies(id)
    if (data && data.cast) setCast(data.cast)
    setLoading(false)
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className='flex-1 bg-neutral-900'>

      {/* Back button and movie poster */}
      <View className='w-full'>
      <SafeAreaView className={'absolute z-20 w-full flex-row justify-between items-center px-4 ' + topMargin}>
          <TouchableOpacity style={styles.background} className='rounded-xl p-1'
            onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size="28" strokeWidth={2.5} color='white' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
            <HeartIcon size='35' color={isFavourite ? 'red' : 'white'} />
          </TouchableOpacity>
        </SafeAreaView>

        {
          loading ? (
            <Loading />
          ) : (
            <View>
              <View>
                
                <Image
                  // source={require('../assets/bg.png')}
                  source={{ uri: image500(movie.poster_path) }}
                  style={{ width, height: height * 0.55 }}
                />
                <LinearGradient
                  colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                  style={{ width, height: height * 0.40 }}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  className='absolute bottom-0' />
              </View>
              {/* movie details */}
              <View style={{ marginTop: -(height * 0.09) }} className='space-y-3'>
                {/* title */}
                <Text className='text-white text-center text-3xl font-bold tracking-wider'>
                  {movie?.title ? movie?.title : ""}
                </Text>
                {/* Status, relase, runtime */}
                <Text className='text-neutral-400 font-semibold text-base text-center'>
                  {movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime} min

                </Text>

                {/* Genres */}
                <View className='flex-row justify-center mx-4 space-x-2'>
                  {
                    movie?.genres?.map((genre, index ) => {
                      let showDot = index+1 != movie.genres.length;
                      return (
                        <Text key={index}
                          className='text-neutral-400 font-semibold text-base text-center'>
                          {genre.name} {showDot ? ' •': null}
                        </Text>
                      )
                    })
                  }


                </View>

                {/* Description */}
                <Text className='text-neutral-400 mx-4 tracking-wide'>
                  {movie.overview ? movie.overview : ''}
                </Text>

                {/* Cast */}
                <Cast navigation={navigation} cast={cast} />

                {/* Similar movies */}
                <MovieList title='Similar Movies' hideSeeAll={true} data={similarMovies} />
              </View>

            </View>
          )
        }
      </View>
    </ScrollView>
  )
}