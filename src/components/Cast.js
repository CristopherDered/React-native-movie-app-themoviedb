import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { image185 } from '../api/moviedb'

export default function Cast({ navigation, cast }) {
    let personName = 'Keanu Reevs'
    let characterName = 'John Wick'
    return (
        <View className='my-6'>
            <Text className='text-white text-2xl font-semibold mx-4 mb-5'>Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}>
                {
                    cast && cast.map((person, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                className='mr-4 items-center'
                                onPress={() => navigation.navigate('Person', person)}>
                                <View className='overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500'>
                                    <Image
                                        // source={require('../assets/bg.png')}
                                        source={{uri: image185(person?.profile_path)}}
                                        className='rounded-2xl h-24 w-20' />
                                </View>

                                <Text className='text-white text-xs mt-1'>
                                    {person?.character?.length > 10 ? person?.character.slice(0, 10) + '...' : person?.character}
                                </Text>
                                <Text className='text-white text-xs mt-1'>
                                    {person?.name?.length > 10 ? person?.name.slice(0, 10) + '...' : person?.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}