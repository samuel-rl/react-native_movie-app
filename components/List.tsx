import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { usePanGestureHandler, withDecay, diffClamp } from 'react-native-redash';
import Animated from 'react-native-reanimated';

import Card, { CONTAINER_WIDTH, CONTAINER_HEIGHT, CARD_HEIGHT } from './Card';

const { width, height } = Dimensions.get('window');

interface Movie {
	id: number;
	title: string;
	poster: string;
	note: number;
}

interface ListProps {
	movies: Movie[];
}

const List = ({ movies }: ListProps) => {
	const [containerHeight, setContainerHeight] = useState(height);
	const visibleCards = Math.floor(CONTAINER_HEIGHT / CARD_HEIGHT);
	const { gestureHandler, translation, velocity, state } = usePanGestureHandler();
	const translateX = diffClamp(
		withDecay({
			value: translation.x,
			velocity: velocity.x,
			state,
		}),
		-CONTAINER_WIDTH*movies.length + visibleCards* CONTAINER_WIDTH,
		0
	);
	return (
		<PanGestureHandler {...gestureHandler}>
			<Animated.View
				style={styles.container}
				onLayout={({
					nativeEvent: {
						layout: { height },
					},
				}) => setContainerHeight(height)}
			>
				{movies.map(({ title, poster, note, id }, index) => {
					return (
						<Animated.View key={index} style={[{ transform: [{ translateX }] }]}>
							<Card title={title} poster={poster} note={note} id={id}></Card>
						</Animated.View>
					);
				})}
			</Animated.View>
		</PanGestureHandler>
	);
};

const styles = StyleSheet.create({
	container: {
        flexDirection: 'row',
    },
	movie: {
		fontSize: 22,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 30,
	},
	list: {
		backgroundColor: 'red',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});

export default List;
