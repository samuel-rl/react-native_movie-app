import React from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

const { width, height } = Dimensions.get('window');

const ratio = 480 / 320;

export const CONTAINER_WIDTH = width;
export const CONTAINER_HEIGHT = height*0.64;

export const CARD_WIDTH = width * 0.65;
export const CARD_HEIGHT = CARD_WIDTH * ratio;

interface CardProps {
	id: number;
	title: string;
	poster: string;
	note: number;
}

const Card = ({ id, title, poster, note }: CardProps) => {
	return (
		<View style={styles.container}>
			<Image style={styles.image} source={{ uri: 'https://image.tmdb.org/t/p/original' + poster }}></Image>
			<View style={styles.containerTitle}>
				<Text numberOfLines={1} style={styles.title}>{title}</Text>
                <View style={styles.notes}>
                    <FontAwesome name="star" size={24} color="#fcc418" />
				    <Text style={styles.note}>{Math.round(note/10 * 10) / 10}</Text>
                </View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
        width: CONTAINER_WIDTH,
        height: CONTAINER_HEIGHT,
        alignItems: "center",
        marginTop: 72
    },
	image: {
		width: CARD_WIDTH,
		height: CARD_HEIGHT,
		borderRadius: 50,
	},
	containerTitle: {
        alignItems: "center",
        marginTop: height*0.04,
        height: height*0.06
    },
    title: {
        color: "#12153e",
        fontSize: 32,
    },
    notes: {
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
        marginTop: 3,
    },
    note: {
        color: "#12153e",
        fontSize: 18,
        marginStart: 8
    }
});

export default Card;
