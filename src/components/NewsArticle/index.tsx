import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useCallback } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import styles from './styles';

export type Post = {
    title: string;
    image_url: string;
    publishedAt: string;
    url: string;
    author: string;
};

export const NewsArticle: React.FC<{
    post: Post;
    index: number;
}> = ({ post, index }) => {
    const navigation: any = useNavigation();
    const handleNavigate = useCallback(() => {
        navigation.navigate('NewsDetails', { article: post, articleIndex: index });
    }, [index, navigation, post]);
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.container}
            onPress={handleNavigate}>
            <SharedElement
                style={styles.imageContainer}
                id={`article#${index}-Image`}>
                <Image
                    source={{
                        uri:
                            post?.image_url ??
                            `https://picsum.photos/${Math.floor(Math.random() * 1000)}`,
                        cache: 'force-cache',
                    }}
                    resizeMode={'cover'}
                    style={styles.image}
                />
            </SharedElement>
            <View
                style={styles.titleContainer}>
                <Text style={styles.text}>{post?.title}</Text>
                <Text style={styles.timestamp}>
                    {moment(post?.publishedAt).format('HH:MM DD, MMMM')}
                </Text>
            </View>
        </TouchableOpacity>
    );
};