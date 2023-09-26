import { View, Text, Dimensions, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import { fetchSearchMovies, image500 } from '../api/moviedb';

var { width, height } = Dimensions.get('window')
const ios = Platform.OS == 'ios';
export default function SearchScreen() {
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    
    const handleResults = async(title)=>{
        setLoading(true)
        const data = await fetchSearchMovies(title)
        if (data && data.results) setResults(data.results)
        setLoading(false)
    }
    const navigation = useNavigation()
    return (
        <SafeAreaView className='bg-neutral-900 flex-1' >
            <View
                className='mx-4 my-2 mb-3 flex-row justify-between items-center border border-neutral-400 rounded-3xl'>
                <TextInput
                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    className='pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider'
                    onChangeText={(title)=> handleResults(title)} />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    className='rounded-full p-3 m-1 bg-neutral-500'>
                    <XMarkIcon size={'25'} color={'white'} />
                </TouchableOpacity>
            </View>

            {/* Results */}
            {
                loading ? (
                    <Loading />
                ) :
                    results.length > 0 ? (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                            className='space-y-3'>
                            <Text className='text-white font-semibold ml-1'>Results  ({results.length})</Text>
                            <View className='flex-row justify-between flex-wrap'>
                                {
                                    results.map((item, index) => {
                                        return (
                                            <TouchableWithoutFeedback
                                                key={index}
                                                onPress={() => navigation.push('Movie', item)}>
                                                <View>
                                                    <Image
                                                        className='rounded-3xl'
                                                        // source={require('../assets/bg.png')}
                                                        source={{uri: image500(item.poster_path)}}
                                                        style={{
                                                            width: width * 0.44,
                                                            height: height * 0.3
                                                        }} />
                                                    <Text className='text-neutral-300 my-3 text-lg font-semibold'>
                                                        {item?.title?.length > 22 ? item?.title?.slice(0, 18) + '...' : item?.title}
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    ) : (
                        <View className='flex-row justify-center'>

                            <Text className='text-white text-lg font-semibold' >No results</Text>
                            {/* <Image
                                source={require('../assets/bg.png')}
                                className='w-96 h-96' /> */}
                        </View>
                    )
            }


        </SafeAreaView>
    )
}