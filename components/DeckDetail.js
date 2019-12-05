import React , { Component } from 'react';
import { StyleSheet, Text, View ,TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux'
import {removeDeck} from '../utils/api'
import {addDeck} from '../actions'
import {addCard} from '../actions'

class DeckDetail extends Component  {
    static navigationOptions = ({ navigation }) => {
        const { entryId } = navigation.state.params

    
        return {
          title: entryId
        }
      }
      shouldComponentUpdate (nextProps) {
        return nextProps.deck !== null && !nextProps.deck.title
      }
      handleDelete = ()=>{
        const {goBack,remove, entryId} = this.props
        remove()
        removeDeck(entryId)
        goBack()
      }
    render() {
        const cards = this.props.deck.questions === 'undefined' ? 0 : this.props.deck.questions.length 
        return (
            <View class={styles.container}>
                <View >
                    <Text  style={styles.Text} >
                        {cards} cards
                    </Text>
                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(
                                        'AddCard',{ entryId: this.props.entryId })} 
                                        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}>
                        <Text style={styles.buttonText}>
                            Add Card
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate(
                                        'Quiz',{ entryId: this.props.entryId })} 
                                    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}>
                        <Text style={styles.buttonText}>
                            Start Quiz
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleDelete} style={Platform.OS === 'ios' ? styles.iosDelete : styles.aDelete}>
                        <Text style={styles.deleteText}>
                            Delete
                        </Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
    iosSubmitBtn: {
        backgroundColor: '#292477',
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 30,
    },
    iosDelete: {
        color: '#b71845',
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 30,
        backgroundColor: '#f2f2f2',
    },
    aDelete: {
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    AndroidSubmitBtn: {
        backgroundColor: '#292477',
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        textAlign: 'center',
        color: 'white'
      },
      deleteText: {
        textAlign: 'center',
        color: '#b71845'
      },
      Text: {
        textAlign: 'center',
        color: 'black',
        marginTop: 20
      }
  })
function mapStateToProps (state, { navigation }) {
    const { entryId } = navigation.state.params
  
    return {
      entryId,
      deck: state[entryId],
      goBack: () => navigation.goBack()
    }
  }
  function mapDispatchToProps (dispatch, { navigation }) {
    const { entryId } = navigation.state.params
  
    return {
        remove: () => dispatch(addDeck({
            [entryId]: null
          })),
    }
  }
  
export default connect(
    mapStateToProps,mapDispatchToProps,
  )(DeckDetail)