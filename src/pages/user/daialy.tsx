import React, { useState } from 'react'
import { View, StyleSheet, Pressable, ScrollView, Image, ImageBackground } from 'react-native'
import { Text } from '@rneui/themed'
import { throttle } from 'lodash'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withDelay,
} from 'react-native-reanimated'
import { RFValue } from 'react-native-responsive-fontsize'
const background = require('../../../assets/identify-bg.png')

const Daialy = () => {
  // 为每个索引的展开状态维护一个数组
  const [isCollapsed, setIsCollapsed] = useState(data.map(() => false))
  const [rotations, setRotations] = useState(data.map(() => useSharedValue(-45)))
  const [extensions, setExtensions] = useState(data.map(() => useSharedValue(RFValue(80))))
  const [contentBackgroundColor, setContentBackgroundColor] = useState(
    data.map(() => useSharedValue('rgba(0,0,0,0)')),
  )
  const [contentFontColor, setContentFontColor] = useState(
    data.map(() => useSharedValue('rgba(0,0,0,0)')),
  )
  const [imageSize, setImageSize] = useState(data.map(() => useSharedValue(1)))

  const toggleCollapsing = throttle(
    (i: number) => {
      rotations[i].value = withTiming(isCollapsed[i] ? 45 : -45, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      })
      extensions[i].value = isCollapsed[i]
        ? withDelay(
            10,
            withTiming(RFValue(140), {
              duration: 600,
              easing: Easing.out(Easing.exp),
            }),
          )
        : withDelay(
            300,
            withTiming(RFValue(80), {
              duration: 600,
              easing: Easing.out(Easing.exp),
            }),
          )
      contentBackgroundColor[i].value = isCollapsed[i]
        ? withDelay(
            300,
            withTiming('#141a1c', {
              duration: 450,
              easing: Easing.out(Easing.ease),
            }),
          )
        : withTiming('rgba(0,0,0,0)', {
            duration: 300,
            easing: Easing.out(Easing.ease),
          })
      contentFontColor[i].value = isCollapsed[i]
        ? withDelay(
            300,
            withTiming('#FFFFFFD9', {
              duration: 450,
              easing: Easing.out(Easing.ease),
            }),
          )
        : withTiming('rgba(0,0,0,0)', {
            duration: 300,
            easing: Easing.out(Easing.ease),
          })
      imageSize[i].value = withTiming(isCollapsed[i] ? 1.3 : 1, {
        duration: 400,
        easing: Easing.inOut(Easing.exp),
      })
      setRotations([...rotations]) // 更新state以触发重新渲染
      setExtensions([...extensions])
      setContentBackgroundColor([...contentBackgroundColor])
      setContentFontColor([...contentFontColor])
      setImageSize([...imageSize])
      setIsCollapsed(prev => prev.map((_, j) => (j === i ? !prev[i] : prev[i])))
    },
    150,
    { leading: true, trailing: false },
  )

  return (
    <ImageBackground source={background} style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
      >
        {data.map((item, i) => {
          const arrowAnimatedStyle = useAnimatedStyle(() => {
            return {
              transform: [
                { translateX: RFValue(3) },
                { rotate: `${rotations[i].value}deg` },
                { translateX: RFValue(-3) },
              ],
            }
          })
          const extendedAnimatedStyle = useAnimatedStyle(() => {
            return {
              height: extensions[i].value,
            }
          })
          const contentBackgroundAnimatedStyle = useAnimatedStyle(() => {
            return {
              backgroundColor: contentBackgroundColor[i].value,
            }
          })
          const contentFontAnimatedStyle = useAnimatedStyle(() => {
            return {
              color: contentFontColor[i].value,
            }
          })
          const imageSizeAnimatedStyle = useAnimatedStyle(() => {
            return {
              transform: [{ scale: imageSize[i].value }],
            }
          })

          return (
            <View key={i} style={styles.timelineContainer}>
              <Pressable onPress={() => toggleCollapsing(i)}>
                <Animated.View style={[styles.arrow, arrowAnimatedStyle]} />
              </Pressable>
              <Pressable onPress={() => toggleCollapsing(i)}>
                <View style={styles.time}>
                  <View style={styles.circle} />
                  <Text style={{ color: '#FFFFFFD9', paddingHorizontal: RFValue(10) }}>
                    {item.time}
                  </Text>
                </View>
                <Animated.View style={[styles.item, extendedAnimatedStyle]}>
                  <View>
                    <Text h3 style={{ color: '#FFFFFFD9', fontWeight: '600' }}>
                      {item.title}
                    </Text>
                    <Animated.View
                      style={[styles.contentContainer, contentBackgroundAnimatedStyle]}
                    >
                      <Animated.Text style={[contentFontAnimatedStyle, { fontSize: RFValue(14) }]}>
                        {item.content}
                      </Animated.Text>
                    </Animated.View>
                  </View>
                  <Animated.Image
                    style={[styles.image, imageSizeAnimatedStyle]}
                    source={item.source}
                  />
                </Animated.View>
              </Pressable>
            </View>
          )
        })}
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    paddingLeft: '12%',
  },
  timelineContainer: {
    flexDirection: 'row',
  },
  arrow: {
    width: RFValue(10),
    height: RFValue(10),
    borderRightWidth: RFValue(2.5),
    borderBottomWidth: RFValue(2.5),
    borderColor: '#ffffffd9',
    marginRight: RFValue(18),
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: '#FFF',
    width: RFValue(12),
    height: RFValue(12),
    borderRadius: 100,
    marginLeft: RFValue(-4.9),
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderLeftWidth: RFValue(2),
    borderColor: '#FFF',
    marginTop: RFValue(-3),
    paddingHorizontal: RFValue(14),
    paddingTop: RFValue(8),
    fontSize: RFValue(14),
  },
  contentContainer: {
    borderRadius: RFValue(5),
    marginVertical: RFValue(10),
    padding: RFValue(5),
    maxWidth: RFValue(190),
  },
  image: {
    alignSelf: 'center',
    width: RFValue(70),
    height: RFValue(70),
    marginLeft: RFValue(40),
    marginTop: RFValue(-5),
    borderRadius: RFValue(8),
  },
})

const images = {
  东方大苇莺: require('../../../assets/images/东方大苇莺.jpg'),
  小天鹅: require('../../../assets/images/小天鹅.jpg'),
  鸿雁: require('../../../assets/images/鸿雁.jpg'),
  白尾海雕: require('../../../assets/images/白尾海雕.jpg'),
  大鸨: require('../../../assets/images/大鸨.jpg'),
  金雕: require('../../../assets/images/金雕.jpg'),
  白眉山鹧鸪: require('../../../assets/images/白眉山鹧鸪.jpg'),
  乌鸫: require('../../../assets/images/乌鸫.jpg'),
}

const data = [
  {
    time: 'June 17, 2024',
    title: '白眉山鹧鸪',
    content:
      '雉科山鹧鸪属的鸟类,俗名山鸡、新竹鸡，分布于福建、广东、广西等地，一般生活于树木茂密的山地',
    source: images['白眉山鹧鸪'],
  },
  {
    time: 'June 10, 2024',
    title: '东方大苇莺',
    content: '东方大苇莺是一种杂食性鸟类，既吃昆虫、蜘蛛、蚯蚓等小动物，也吃植物的果实种子等',
    source: images['东方大苇莺'],
  },
  {
    time: 'May 25, 2024',
    title: '乌鸫',
    content: '乌鸫在以往被视为是欧乌鸫的亚种，如今独立成种。体色整体为黑色或棕色，喙橙黄色',
    source: images['乌鸫'],
  },
  {
    time: 'May 12, 2024',
    title: '小天鹅',
    content:
      '小天鹅栖息在开阔的湖泊、河流和邻近的苔原沼泽地上，冬季多栖息在有芦苇、蒲草的湖泊和水库中',
    source: images['小天鹅'],
  },
  {
    time: 'April 30, 2024',
    title: '鸿雁',
    content:
      '体长80~90公分左右，体重2.8~5千克，黑且长的嘴与前额成一直线，额部有一条很窄的棕白色条纹',
    source: images['鸿雁'],
  },
  {
    time: 'April 19, 2024',
    title: '白尾海雕',
    content:
      '白尾海雕分布于欧亚大陆北部，繁殖期为4—6月，每窝通常产卵2枚，属于中国国家一级重点保护野生动物',
    source: images['白尾海雕'],
  },
  {
    time: 'April 13, 2024',
    title: '大鸨',
    content:
      '大鸨在世界范围内的种群数量普遍处于下降趋势，在中国的种群数量近年来数量已经变得相当稀少',
    source: images['大鸨'],
  },
  {
    time: 'April 8, 2024',
    title: '金鵰',
    content: '金鵰是北半球上一种广为人知的猛禽，鹰科。金鵰以其突出的外观和敏捷有力的飞行以著名',
    source: images['金雕'],
  },
]

export default Daialy
