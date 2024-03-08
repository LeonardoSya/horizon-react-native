import React, { useEffect, useState } from 'react'
import { useAppDispatch, usseAppSelector } from '@/hooks/hooks'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { Text } from '@rneui/themed'
import { fetchPosts } from '@/pages/user/posts-slice'
import { Post } from '@/pages/user/posts-slice'

export default function PostContainer() {
    const dispatch = useAppDispatch()
    const { posts, loading, error } = usseAppSelector((state) => state.posts)

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    return loading ? (
        <View >
            <ActivityIndicator animating={true} />
        </View>
    ) : error ? (
        <View>
            <Text>Failed to load posts!</Text>
        </View>
    ) : (
        <FlatList

            keyExtractor={(post: Post) => post.id}
            data={posts}
            renderItem={({ item, index }) => (
                <View key={item.id}>
                    <Text >
                        {index}. {item.title}
                    </Text>
                    <Text >{item.body}</Text>
                </View>
            )}
        />
    );
}