import React, { useState } from 'react'
import { View, StyleSheet, Pressable, ScrollView, Image } from 'react-native'
import { Text } from '@rneui/themed'
import { throttle } from 'lodash'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withDelay,
} from 'react-native-reanimated'

const images = {
  东方大苇莺: require('../../../assets/images/东方大苇莺.jpg'),
  小天鹅: require('../../../assets/images/小天鹅.jpg'),
  鸿雁: require('../../../assets/images/鸿雁.jpg'),
  白尾海雕: require('../../../assets/images/白尾海雕.jpg'),
  大鸨: require('../../../assets/images/大鸨.jpg'),
}

const data = [
  {
    time: 'May 28, 2024',
    title: '东方大苇莺',
    content: '东方大苇莺是一种杂食性鸟类，既吃昆虫、蜘蛛、蚯蚓等小动物，也吃植物的果实种子等',
    source: images['东方大苇莺'],
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
    time: 'April 13, 2024',
    title: '金雕',
    content:
      '大鸨在世界范围内的种群数量普遍处于下降趋势，在中国的种群数量近年来数量已经变得相当稀少',
    source: images['大鸨'],
  },
]

const Daialy = () => {
  // 为每个索引的展开状态维护一个数组
  const [isCollapsed, setIsCollapsed] = useState(data.map(() => false))
  const [rotations, setRotations] = useState(data.map(() => useSharedValue(-45)))
  const [extensions, setExtensions] = useState(data.map(() => useSharedValue(80)))
  const [contentBackgroundColor, setContentBackgroundColor] = useState(
    data.map(() => useSharedValue('#1f3037')),
  )
  const [contentFontColor, setContentFontColor] = useState(
    data.map(() => useSharedValue('#1f3037')),
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
            withTiming(130, {
              duration: 600,
              easing: Easing.out(Easing.exp),
            }),
          )
        : withDelay(
            300,
            withTiming(80, {
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
        : withTiming('#1f3037', {
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
        : withTiming('#1f3037', {
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
    <ScrollView
      style={styles.container}
      automaticallyAdjustKeyboardInsets={true}
      showsVerticalScrollIndicator={false}
    >
      {data.map((item, i) => {
        const arrowAnimatedStyle = useAnimatedStyle(() => {
          return {
            transform: [
              { translateX: 3 },
              { rotate: `${rotations[i].value}deg` },
              { translateX: -3 },
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
                <Text style={{ color: '#FFFFFFD9', paddingHorizontal: 10 }}>{item.time}</Text>
              </View>
              <Animated.View style={[styles.item, extendedAnimatedStyle]}>
                <View>
                  <Text h4 style={{ color: '#FFFFFFD9', fontWeight: '600' }}>
                    {item.title}
                  </Text>
                  <Animated.View style={[styles.contentContainer, contentBackgroundAnimatedStyle]}>
                    <Animated.Text style={contentFontAnimatedStyle}>{item.content}</Animated.Text>
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
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: '10%',
    paddingLeft: '12%',
  },
  timelineContainer: {
    flexDirection: 'row',
    marginTop: -2,
  },
  arrow: {
    width: 10,
    height: 10,
    borderRightWidth: 2.5,
    borderBottomWidth: 2.5,
    borderColor: '#ffffffd9',
    marginRight: 18,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: '#FFF',
    width: 12,
    height: 12,
    borderRadius: 20,
    marginLeft: -4.9,
  },
  item: {
    flexDirection: 'row',
    borderLeftWidth: 2,
    borderColor: '#FFF',
    marginTop: -3,
    paddingHorizontal: 14,
    paddingTop: 8,
  },
  contentContainer: {
    borderRadius: 5,
    marginVertical: 10,
    padding: 5,
    maxWidth: 170,
  },
  image: {
    alignSelf: 'center',
    width: 70,
    height: 70,
    marginLeft: 18,
    marginTop: -5,
    borderRadius: 8,
  },
})

export default Daialy
