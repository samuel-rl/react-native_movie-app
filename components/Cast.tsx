import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');


interface CastProps {
	id: number;
}

interface Character {
	id: number;
	character: string;
	name: string;
	profile_path: string;
}

const Cast = ({ id }: CastProps) => {
	const [loading, setLoading] = useState(true);
	const [casting, setCasting] = useState<Character[] | []>([]);
	useEffect(() => {
		fetch('https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=c059bd0849de3441fe8eaa21f8db479f')
			.then((response) => response.json())
			.then((responseJson) => {
				const arrayCasting: Character[] = [];
				responseJson.cast.forEach((x: any) => {
					var character: Character = {
						id: x.id,
						character: x.character,
						name: x.name,
						profile_path: 'https://image.tmdb.org/t/p/original' + x.profile_path,
					};
					arrayCasting.push(character);
				});
				setCasting(arrayCasting);
				setLoading(false);
			});
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.titleCast}>Cast & Crew</Text>
			{loading ? (
				<ActivityIndicator></ActivityIndicator>
			) : (
				<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
					{casting.map((element: any, i: any, arr: any) => {
						return (
							<View key={i} style={[styles.char, i===0 ? styles.firstElement : null, arr.length - 1 === i ? styles.lastElement : null]}>
                                <Image style={styles.image} source={{ uri: element.profile_path }}></Image>
								<Text style={styles.name}>{element.name}</Text>
                                <Text style={styles.characterName}>{element.character}</Text>
							</View>
						);
					})}
				</ScrollView>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
        
    },
    titleCast:{
        fontSize: 22,
        color: "#12153D",
        marginLeft: width *0.06,
        marginBottom: height*0.015
    },
    char: {
        width: 80,
        marginRight: 28,
        alignItems: "center"

    },
	image: {
        width: 80,
        height: 80,
        borderRadius: 50
    },
    firstElement: {
        marginLeft: width *0.06
    }, 
    lastElement: {
        marginRight: width *0.06
    },
    name: {
        textAlign: "center",
        fontSize: 14,
        color: "#12153D"
    },
    characterName: {
        textAlign: "center",
        fontSize: 12,
        color: "#9A9BB2"
    }
});

export default Cast;
