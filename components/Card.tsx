import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ratio = 480 / 320;

export const CONTAINER_WIDTH = width*0.65;
export const CONTAINER_HEIGHT = height*0.64;

export const CARD_HEIGHT = height * 0.45;
export const CARD_WIDTH = CARD_HEIGHT / ratio;


interface CardProps {
	id: number;
	title: string;
	poster: string;
    note: number;
}

const Card = ({ id, title, poster, note }: CardProps) => {
    const navigation = useNavigation();
	return (
        <TouchableOpacity activeOpacity={1} onPress={()=> {navigation.navigate(`Movie`, {id: id})}}>
		<View style={styles.container}>
			<Image style={styles.image} source={{ uri: 'https://image.tmdb.org/t/p/original' + poster }}></Image>
			<View style={styles.containerTitle}>
				<Text numberOfLines={1} style={styles.title}>{title}</Text>
                <View style={styles.notes}>
                    <FontAwesome name="star" size={24} color="#fcc418" />
				    <Text style={styles.note}>{note*2}</Text>
                </View>
			</View>
		</View>
        </TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
        width: CONTAINER_WIDTH,
        height: CONTAINER_HEIGHT,
        alignItems: "center",
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
