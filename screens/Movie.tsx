import React, { useState, useEffect, Props } from 'react';
import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableOpacity,
	Image,
	ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Notes from '../components/Notes';
import Genres from '../components/Genres';
import Plot from '../components/Plot';
import Infos from '../components/Infos';
import Cast from '../components/Cast';

const { width, height } = Dimensions.get('window');

const STATUSBAR_HEIGHT = StatusBar.currentHeight ?? 0;

interface Movie {
	id: number;
	title: string;
	backdrop: string;
	note: number;
	numberNote: number;
	year: string;
	runtime: number;
	genres: { id: number; name: string }[];
	plot: string;
	popularity: number;
}

export default function Movie({ route, navigation }: any) {
	const [movie, setMovie] = useState<Movie | null>(null);

	const { id } = route.params;

	useEffect(() => {
		fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=c059bd0849de3441fe8eaa21f8db479f')
			.then((response) => response.json())
			.then((responseJson) => {
				var movie: Movie = {
					id: id,
					title: responseJson.original_title,
					backdrop: 'https://image.tmdb.org/t/p/original' + responseJson.backdrop_path,
					note: responseJson.vote_average,
					numberNote: responseJson.vote_count,
					year: responseJson.release_date,
					runtime: responseJson.runtime,
					genres: responseJson.genres,
					plot: responseJson.overview,
					popularity: responseJson.popularity,
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
				<Image style={styles.backdrop} source={{ uri: movie.backdrop }}></Image>
				<TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
					<Ionicons name="ios-arrow-back" size={30} color="black" />
				</TouchableOpacity>
				<View style={styles.notes}>
					<Notes note={movie.note} nbNote={movie.numberNote} popularity={movie.popularity}></Notes>
				</View>
				<View style={styles.infos}>
					<Infos title={movie.title} year={movie.year} runtime={movie.runtime}></Infos>
				</View>
				<View style={styles.genres}>
					<Genres genres={movie.genres}></Genres>
				</View>
				<View style={styles.plot}>
					<Plot plot={movie.plot}></Plot>
				</View>
				<View style={styles.cast}>
					<Cast id={movie.id}></Cast>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	back: {
		position: 'absolute',
		width: 50,
		height: 50,
		left: width * 0.06,
		top: height * 0.055 + STATUSBAR_HEIGHT,
	},
	backdrop: {
		width: width,
		height: height * 0.345,
		borderBottomLeftRadius: 40,
	},
	notes: {
		alignItems: 'flex-end',
		marginTop: -height * 0.05,
	},
	genres: {
		marginTop: height * 0.02,
	},
	infos: {
		marginTop: height * 0.042,
	},
	plot: {
		marginTop: height * 0.042,
	},

	cast: {
		marginTop: height * 0.042,
	},
});
