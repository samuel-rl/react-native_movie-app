import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { usePanGestureHandler, withDecay, diffClamp, withOffset } from 'react-native-redash';
import Animated, { interpolate, Extrapolate, add } from 'react-native-reanimated';

import Card, { CONTAINER_WIDTH, CONTAINER_HEIGHT, CARD_HEIGHT, CARD_WIDTH } from './Card';

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
	const [containerWidth, setContainerWidth] = useState(height);
    const visibleCards = Math.floor(1);
    console.log(CONTAINER_WIDTH)
	const { gestureHandler, translation, velocity, state } = usePanGestureHandler();
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
						layout: { width : w},
					},
				}) => setContainerWidth(w)}
			>
				{movies.map(({ title, poster, note, id }, index) => {
                        const positionX = add(x, index * CONTAINER_WIDTH);
                        const isDisappearing = -CARD_WIDTH;
                        const isLeft = 0;
                        const isRight = CONTAINER_WIDTH * (visibleCards - 1);
                        const isAppearing = CONTAINER_WIDTH * visibleCards;
                        var translateX;
                        if(index == 0 ){
                            translateX = interpolate(x, {
                                inputRange: [-CONTAINER_WIDTH *1.5, 0],
                                outputRange: [-CONTAINER_WIDTH *1.5, 0],
                                extrapolate: Extrapolate.CLAMP,
                            });
                        }else{
                            translateX = interpolate(x, {
                                inputRange: [-CONTAINER_WIDTH *index *1.5, 0],
                                outputRange: [-CONTAINER_WIDTH *index *1.5, 0],
                                extrapolate: Extrapolate.CLAMP,
                            });
                        }
                        const scale = interpolate(positionX, {
                            inputRange: [isDisappearing, isLeft, isRight, isAppearing],
                            outputRange: [0.8, 1, 1, 0.8],
                            extrapolate: Extrapolate.CLAMP,
                        });
                        const opacity = interpolate(positionX, {
                            inputRange: [isDisappearing, isLeft, isRight, isAppearing],
                            outputRange: [0, 1, 1, 0],
                            extrapolate: Extrapolate.CLAMP,
                        });
                        const rotate = interpolate(positionX, {
                            inputRange: [isDisappearing, isLeft, isRight, isAppearing],
                            outputRange: [-.2, 0, 0, .2],
                            extrapolate: Extrapolate.CLAMP,
                        });
                        return (
                            <Animated.View key={index} style={[{ opacity, transform: [{ translateX }, { scale }, {rotate}] }]}>
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
});

export default List;
