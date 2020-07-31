import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	ActivityIndicator,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../components/Header';
import List from '../components/List';
import Genres from '../components/Genres';

const { width, height } = Dimensions.get('window');

const genres = [
	{
		id: 28,
		name: 'Action',
	},
	{
		id: 12,
		name: 'Adventure',
	},
	{
		id: 16,
		name: 'Animation',
	},
	{
		id: 35,
		name: 'Comedy',
	},
	{
		id: 80,
		name: 'Crime',
	},
	{
		id: 99,
		name: 'Documentary',
	},
	{
		id: 18,
		name: 'Drama',
	},
	{
		id: 10751,
		name: 'Family',
	},
	{
		id: 14,
		name: 'Fantasy',
	},
	{
		id: 36,
		name: 'History',
	},
	{
		id: 27,
		name: 'Horror',
	},
	{
		id: 10402,
		name: 'Music',
	},
	{
		id: 9648,
		name: 'Mystery',
	},
	{
		id: 10749,
		name: 'Romance',
	},
	{
		id: 878,
		name: 'Science Fiction',
	},
	{
		id: 10770,
		name: 'TV Movie',
	},
	{
		id: 53,
		name: 'Thriller',
	},
	{
		id: 10752,
		name: 'War',
	},
	{
		id: 37,
		name: 'Western',
	},
];

const arrayFetch = [
	{
		id: 0,
		name: 'In Theater',
		url:
			'https://api.themoviedb.org/3/movie/now_playing?api_key=c059bd0849de3441fe8eaa21f8db479f&language=fr&page=1',
	},
	{
		id: 1,
		name: 'Box Office',
		url: 'https://api.themoviedb.org/3/movie/popular?api_key=c059bd0849de3441fe8eaa21f8db479f&language=fr&page=1',
	},
	{
		id: 2,
		name: 'Coming Soon',
		url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=c059bd0849de3441fe8eaa21f8db479f&language=fr&page=1',
	},
];

interface Movie {
	id: number;
	title: string;
	poster: string;
	note: number;
}

export default function Home() {
	const [selected, setSelected] = useState(0);

	const [loading, setLoading] = useState(true);

	const [movies, setMovies] = useState([]);

	useEffect(() => {
		changingPage(0);
	}, []);

	const changingPage = (nb: number) => {
		setLoading(true);
		setSelected(nb);
		fetch(arrayFetch[nb].url)
			.then((response) => response.json())
			.then((responseJson) => {
				setMovies(responseJson.results);
				var res: any = [];
				responseJson.results.map((x: any) => {
					var movie: Movie = {
						id: x.id,
						title: x.original_title,
						poster: x.poster_path,
						note: x.vote_average,
					};
					res.push(movie);
				});
				setMovies(res);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<View style={styles.container}>
			<Header></Header>
			<View style={styles.pager}>
				<ScrollView horizontal decelerationRate="fast" bounces={true} showsHorizontalScrollIndicator={false}>
					<TouchableOpacity activeOpacity={1} onPress={() => changingPage(0)}>
						<Text style={[styles.label, selected == 0 ? styles.select : null]}>In Theater</Text>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={1} onPress={() => changingPage(1)}>
						<Text style={[styles.label, selected == 1 ? styles.select : null]}>Box Office</Text>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={1} onPress={() => changingPage(2)}>
						<Text style={[styles.label, selected == 2 ? styles.select : null, { marginRight: 32 }]}>
							Coming Soon
						</Text>
					</TouchableOpacity>
				</ScrollView>
				<View style={styles.pinkElement}></View>
			</View>
			<View style={styles.genres}>
				<Genres genres={genres}></Genres>
			</View>

			{loading ? (
				<View style={styles.rendering}>
					<ActivityIndicator size="large" />
				</View>
			) : (
				<View style={styles.movies}>
					<List movies={movies}></List>
				</View>
			)}
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	pager: {
		marginTop: height * 0.047,
	},
	label: {
		marginLeft: 32,
		fontSize: 32,
		color: '#B9B9C5',
	},
	select: {
		color: '#12153D',
	},
	rendering: {
		height: height * 0.8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	pinkElement: {
		width: width * 0.085,
		height: height * 0.006,
		backgroundColor: '#FE6D8E',
		borderRadius: 50,
		marginLeft: 32,
		marginTop: height * 0.0157,
	},
	genres: {
		marginTop: height * 0.047,
    },
    movies: {
        marginTop: height* 0.07
    }
});
