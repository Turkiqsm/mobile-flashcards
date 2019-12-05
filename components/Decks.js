import React, { Component } from 'react'
import { StyleSheet,FlatList, Animated,Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import {fetchResults} from '../utils/api';
import {receiveDecks} from '../actions'
import { AppLoading} from 'expo'


class Decks extends Component  {
    state = {
        ready: false,
        bounceValue: new Animated.Value(1),
      }
    componentDidMount () {
        const { dispatch } = this.props
        // const data = getFlashCardData()
        // dispatch(receiveDecks(data))

        fetchResults()
        .then((data) => dispatch(receiveDecks(JSON.parse(data))))
          .then(() => this.setState(() => ({ready: true})))

          animate = ()=>{
            Animated.sequence([
                Animated.timing(bounceValue, { duration: 1000, toValue: 1.04}),
                Animated.spring(bounceValue, { toValue: 1, friction: 4})
              ]).start()
          }
      }
    render() {
        const Decks = Object.values(this.props.Decks).filter(function(x) { return x !== null })
        const {ready,bounceValue} = this.state
        if (ready === false) {
            return <AppLoading />
          }
        return (
            <View style={styles.container}>
            <FlatList
            data={Decks}
            renderItem={({item}) =>                     
            <TouchableOpacity
                key={item.title}             
                onPress={() => this.props.navigation.navigate(
                'DeckDetail',
                { entryId: item.title }
                 )} >
                    <Animated.View style={[styles.direction, {transform: [{scale: bounceValue}]}]}>
                        <Text style={{alignSelf:'center',fontSize:30 ,marginTop:50}}>
                        {item.title}
                        </Text>
                        <Text style={{alignSelf:'center'}}>
                        {item.questions.length} Cards
                        </Text>
                    </Animated.View>
                </TouchableOpacity>
                    }
                keyExtractor={(item, index) => index.toString()}
            >

            </FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffa',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  direction:{
      
  }
});

function mapStateToProps (Decks) {
    return {
        Decks
    }
  }
  export default connect(
    mapStateToProps
  )(Decks)
