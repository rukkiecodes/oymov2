import { View, Text } from 'react-native'
import React from 'react'

import { useFonts } from 'expo-font'

const Font = ({ style, font, text }) => {
  const [loaded] = useFonts({
    pacifico: require('../assets/fonts/Pacifico/Pacifico-Regular.ttf'),
    montserrat_medium: require('../assets/fonts/Montserrat_Alternates/MontserratAlternates-Medium.ttf')
  })

  if (!loaded) return null

  return (
    <>
      {
        text &&
        <Text style={{ ...style, fontFamily: font }}>
          {text}
        </Text>
      }
    </>
  )
}

export default Font