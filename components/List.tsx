import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

interface Movie{
    id: number,
    title: string,
    poster: string,
    note: number
}

interface ListProps {
    movies: Movie[];
}

const List = ({ movies }: ListProps) => {
    return (
        <View style={{width: 165, backgroundColor: "red"}}>
            {movies.map((x) => {
                return (<Text>{x.title}</Text>)
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 32
    }
  });


export default List;
