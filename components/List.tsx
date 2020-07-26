import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { usePanGestureHandler, withOffset, translate, withDecay, diffClamp } from 'react-native-redash';
import Animated, { interpolate, Extrapolate, add } from 'react-native-reanimated';

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
	console.log(-CARD_HEIGHT * movies.length + visibleCards * CARD_HEIGHT);
	const x = diffClamp(
		withDecay({
			value: translation.x,
			velocity: velocity.x,
			state,
		}),
		-CONTAINER_WIDTH * movies.length + visibleCards * CONTAINER_WIDTH,
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
					const positionX = add(x, index * CONTAINER_HEIGHT);
					const isDisappearing = -CONTAINER_WIDTH;
					const isLeft = 0;
					const isRight = CONTAINER_WIDTH * (visibleCards - 1);
					const isAppearing = CONTAINER_WIDTH * visibleCards;
					const translateXWithScale = interpolate(positionX, {
						inputRange: [isRight, isAppearing],
						outputRange: [0, CONTAINER_WIDTH / 4],
					});
					const translateX = add(
						interpolate(x, {
							inputRange: [-CONTAINER_WIDTH * index, 0],
							outputRange: [-CONTAINER_WIDTH * index, 0],
							extrapolate: Extrapolate.CLAMP,
						}),
						translateXWithScale
					);
					const scale = interpolate(positionX, {
						inputRange: [isDisappearing, isLeft, isRight, isAppearing],
						outputRange: [0.5, 1, 1, 0.5],
						extrapolate: Extrapolate.CLAMP,
					});
					const opacity = interpolate(positionX, {
						inputRange: [isDisappearing, isLeft, isRight, isAppearing],
						outputRange: [0.5, 1, 1, 0.5],
						extrapolate: Extrapolate.CLAMP,
					});
					console.log(title);
					return (
						<Animated.View key={index} style={[{ opacity, transform: [{ translateX }, { scale }] }]}>
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
