import React from 'react'
import { View, Image } from 'react-native'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import { Ionicons, SimpleLineIcons, AntDesign } from '@expo/vector-icons'

import Match from '../screens/Match'
import Reels from '../screens/reels/Reels'
import Profile from '../screens/profile/Profile'

import Bar from '../components/Bar'

import color from '../style/color'
import Header from '../components/Header'
import { useSelector } from 'react-redux'
import { nav } from '../style/navigation'
import Chat from '../screens/chat/Chat'

const { Navigator, Screen } = createMaterialBottomTabNavigator()

const BottomNavigation = () => {
  const { profile } = useSelector(state => state.user)

  return (
    <View style={nav.container}>
      <Bar color='dark' />

      <Header showLogo showAdd showAratar showNotification />

      <Navigator barStyle={nav.barStyle}>
        <Screen
          name='Match'
          component={Match}
          options={{
            tabBarIcon: () => <AntDesign name='find' size={20} color={color.black} />
          }}
        />

        <Screen
          name='Reels'
          component={Reels}
          options={{
            tabBarIcon: () => <Ionicons name='videocam-outline' size={20} color={color.black} />
          }}
        />

        <Screen
          name='Chat'
          component={Chat}
          options={{
            tabBarIcon: () => <Ionicons name='chatbubbles-outline' size={20} color={color.black} />
          }}
        />

        {/* {
          profile &&
          <Screen
            name='ProfileTab'
            component={Profile}
            listeners={({ navigation }) => ({
              tabPress: e => {
                e.preventDefault()
                navigation.navigate('Profile')
              }
            })}
            options={{
              tabBarIcon: () => (
                <>
                  {
                    profile?.photoURL &&
                    <View style={{ position: 'relative' }}>
                      {
                        profile?.paid &&
                        <View style={nav.paidImageContainer}>
                          <Image source={require('../assets/vip.png')} style={nav.paidImage} />
                        </View>
                      }
                      <Image source={{ uri: profile?.photoURL }} style={nav.avatar} />
                    </View>
                  }
                  {
                    !profile?.photoURL &&
                    <SimpleLineIcons name='user' size={20} color={color.dark} />
                  }
                </>
              ),
              tabBarLabel: false
            }}
          />
        } */}
      </Navigator>
    </View>
  )
}

export default BottomNavigation