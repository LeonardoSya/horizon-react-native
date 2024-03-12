import React, { useEffect, useTransition } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { Text } from '@rneui/themed'
import { fetchPosts } from '@/features/posts-slice'
import { Post } from '@/features/posts-slice'
import { styles } from '@/assets/styles/global'

export default function PostContainer() {
    const dispatch = useAppDispatch()
    const { posts, loading, error } = useAppSelector((state) => state.posts)
    const [isPending, startTransition] = useTransition()
    const isLoading = isPending || loading

    useEffect(() => {
        startTransition(() => {
            dispatch(fetchPosts())
        })
    }, [dispatch])

    return isLoading ? (
        <View style={styles.container}>
            <ActivityIndicator animating={true} />
        </View>
    ) : error ? (
        <View style={styles.container}>
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