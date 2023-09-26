import { View, Text, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles } from '../theme';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { fetchCreditsMoviesPerson, fetchDetailsPerson, image500 } from '../api/moviedb';


var { width, height } = Dimensions.get('window')
const ios = Platform.OS == 'ios';
const topMargin = ios ? ' absolute' : ' mt-3'
export default function PersonScreen() {
  const [isFavourite, setIsFavourite] = useState(false)
  const [person, setPerson] = useState({})

  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5])
  const [loading, setLoading] = useState(false)


  const { params: item } = useRoute();
  const navigation = useNavigation()

  useEffect(()=>{
    getPersonDetails(item.id)
    getPersonCreditsMovie(item.id)
  },[])

  const getPersonDetails = async(id) => {
    const data = await fetchDetailsPerson(id)
    if ( data ) setPerson(data)
  }

  const getPersonCreditsMovie = async(id) => {
    const data = await fetchCreditsMoviesPerson(id)
    if ( data && data.cast) setPersonMovies(data.cast)
  }
  
  return (
    <ScrollView className='flex-1 bg-neutral-900 ' contentContainerStyle={{ paddingBottom: 20 }}>

      {/* Back button */}
      <SafeAreaView className={' z-20 w-full flex-row justify-between items-center px-4' + topMargin}>
        <TouchableOpacity style={styles.background} className='rounded-xl p-1'
          onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size="28" strokeWidth={2.5} color='white' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
          <HeartIcon size='35' color={isFavourite ? 'red' : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Person details */}
      {
        loading ? (
          <Loading />
        ) : (
          <View>
            <View
              className='flex-row justify-center'
              style={{
                shadowColor: 'gray',
                shadowRadius: 40,
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 1
              }}>
              <View className='items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500'>
                <Image
                  // source={require('../assets/bg.png')}
                  source={{uri: image500(person.profile_path)}}
                  style={{
                    height: height * 0.43,
                    width: width * 0.74
                  }} />
              </View>
            </View>

            <View className='mt-6'>
              <Text className='text-3xl text-white font-bold text-center'>
                {person?.name}
              </Text>
              <Text className='text-base text-neutral-500 text-center'>
                {person?.place_of_birth}
              </Text>
            </View>

            <View className='mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-3xl'>
              <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                <Text className='text-white font-semibold'>Gender</Text>
                <Text className='text-neutral-300 text-sm'>{person?.gender === 1 ?"Female":"Male" }</Text>
              </View>
              <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                <Text className='text-white font-semibold'>Birthday</Text>
                <Text className='text-neutral-300 text-sm'>{person?.birthday}</Text>
              </View>
              <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                <Text className='text-white font-semibold'>Known for</Text>
                <Text className='text-neutral-300 text-sm'>{person?.known_for_department}</Text>
              </View>
              <View className=' px-2 items-center'>
                <Text className='text-white font-semibold'>Popularity</Text>
                <Text className='text-neutral-300 text-sm'>{person?.popularity}</Text>
              </View>
            </View>

            <View className='my-6 mx-4 space-y-2'>
              <Text className='text-white text-lg'>Biography</Text>
              <Text className='text-neutral-400 tracking-wide'>
                {person?.biography}
              </Text>
            </View>

            {/* Movies */}

            <MovieList title={'Movie'} hideSeeAll={true} data={personMovies} />

          </View>
        )
      }

    </ScrollView>
  )
}