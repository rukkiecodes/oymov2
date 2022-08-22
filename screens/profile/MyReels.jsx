import React, { useState, useLayoutEffect } from 'react'
import { View, Text, Pressable, Image, FlatList, ActivityIndicator } from 'react-native'

import color from '../../style/color'

import { useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native'
import { collection, getDocs, limit, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../hooks/firebase'
import OymoFont from '../../components/OymoFont'

import { pReels } from '../../style/profileReels'

const MyReels = ({ profile, user }) => {
  const navigation = useNavigation()

  const [reels, setReels] = useState([])
  const [reelsLimit, setLimit] = useState(20)

  useLayoutEffect(() => {
    return onSnapshot(query(collection(db, 'reels'),
      where('user.id', '==', user?.uid), limit(reelsLimit)),
      snapshot => setReels(
        snapshot?.docs?.map(doc => ({
          id: doc?.id,
          ...doc?.data()
        }))
      )
    )
  }, [reelsLimit, db])

  const getReels = async () => {
    const queryReels = await getDocs(query(collection(db, 'reels'), where('user.id', '==', user?.uid), limit(reelsLimit)))

    setReels(
      queryReels?.docs?.map(doc => ({
        id: doc?.id,
        ...doc?.data()
      }))
    )
  }

  const [loaded] = useFonts({
    text: require('../../assets/fonts/Montserrat_Alternates/MontserratAlternates-Medium.ttf'),
    boldText: require('../../assets/fonts/Montserrat_Alternates/MontserratAlternates-Bold.ttf')
  })

  if (!loaded) return null

  return (
    <>
      {
        reels?.length < 1 ?
          <View style={pReels.indicatorContainer}>
            <ActivityIndicator size='large' color={color.black} />
          </View> :
          <FlatList
            data={reels}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            style={pReels.container}
            onEndReached={() => {
              setLimit(reelsLimit + 4)
              getReels()
            }}
            ListFooterComponent={() => <View style={pReels.listFooterComponent} />}
            renderItem={({ item: reel }) => (
              <Pressable
                onPress={() => navigation.navigate('ViewReel', { reel })}
                onLongPress={() => navigation.navigate('ReelsOption', { reel })}
                delayLongPress={500}
                style={pReels.reelsList}
              >
                <Image source={{ uri: reel?.thumbnail }} style={pReels.reelsThumb} />

                <View style={{ flex: 1 }}>
                  <OymoFont message={reel?.description} lines={1} fontStyle={pReels.desctiption} />
                  <OymoFont message={`Video - ${profile?.username}`} lines={1} fontStyle={pReels.username} />

                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-end'
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row'
                      }}
                    >
                      <OymoFont message={reel?.likesCount} lines={1} fontStyle={pReels.desctiption} />
                      <Text
                        style={{
                          color: color.lightText,
                          fontFamily: 'text'
                        }}
                      >
                        {reel?.likesCount == 1 ? 'Like' : 'Likes'}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: 10
                      }}
                    >
                      <OymoFont message={reel?.commentsCount} lines={1} fontStyle={pReels.desctiption} />
                      <Text
                        style={{
                          color: color.lightText,
                          fontFamily: 'text'
                        }}
                      >
                        {reel?.commentsCount == 1 ? 'Comment' : 'Comments'}
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            )}
          />
      }
    </>
  )
}

export default MyReels
// in use