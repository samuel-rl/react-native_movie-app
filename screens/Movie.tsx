import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Props } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Notes from '../components/Notes'

const { width, height } = Dimensions.get('window');

interface Movie {
	id: number;
	title: string;
	backdrop: string;
	note: number;
	numberNote: number;
	year: number;
	runtime: number;
	genre: { id: number; name: string }[];
    plot: string;
    popularity: number
}

export default function Movie({ route , navigation }: any) {
	const [movie, setMovie] = useState<Movie | null>(null);

	const { id } = route.params;

	useEffect(() => {
		fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=c059bd0849de3441fe8eaa21f8db479f&language=fr')
			.then((response) => response.json())
			.then((responseJson) => {
                console.log(responseJson)
				var movie: Movie = {
					id: id,
					title: responseJson.original_title,
					backdrop: 'https://image.tmdb.org/t/p/original' + responseJson.backdrop_path,
					note: responseJson.vote_average,
					numberNote: responseJson.vote_count,
					year: responseJson.release_date,
					runtime: responseJson.runtime,
					genre: responseJson.genres,
                    plot: responseJson.overview,
                    popularity: responseJson.popularity
				};
                setMovie(movie);
			});
	}, []);

	if (movie === null) {
		return (
			<View style={styles.container}>
				<ActivityIndicator></ActivityIndicator>
			</View>
		);
	} else {
		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
					<Ionicons name="ios-arrow-back" size={24} color="black" />
				</TouchableOpacity>
                <Image style={styles.backdrop} source={{ uri: movie.backdrop }}></Image>
                <Notes note={movie.note} nbNote={movie.numberNote} popularity={movie.popularity}></Notes>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	back: {
		marginLeft: width * 0.06,
		marginTop: height * 0.055,
    },
    backdrop:{
        width: width,
        height: height*0.346,
        borderBottomLeftRadius: 40
    }
});
