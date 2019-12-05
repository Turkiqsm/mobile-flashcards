import React , { Component } from 'react';
import { StyleSheet, Text, View ,TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux'

class Quiz extends Component  {
    state = {
        counter: 0,
        Score: 0,
        finish: false,
        Switch: true,
        questionsLeft : this.props.deck.questions.length
    }
    Switcher = () =>{
        this.setState({Switch: !this.state.Switch})
    }
    Correct = () => {
        if(this.state.counter+1 !== this.state.questionsLeft){
            this.setState(prevState => ({ 
                counter: prevState.counter + 1, 
                Score: prevState.Score + 1, 
                
            }));
        }
        else{
            this.setState(prevState => ({ 
                Score: prevState.Score + 1, 
                finish: true, 
                
            }));
            
        }
        
    }
    Incorrect = () =>{
        if(this.state.counter+1 !== this.state.questionsLeft){
            this.setState(prevState => ({ 
                counter: prevState.counter + 1,                 
            }));
        }
        else{
            this.setState(prevState => ({ 
                finish: true, 
                
            }));
            
        }
    }
    static navigationOptions = ({ navigation }) => {
        const { entryId } = navigation.state.params

    
        return {
          title: entryId
        }
      }
    render() {
        const {counter,Score,Switch,questionsLeft,finish} = this.state
        const cards = this.props.deck.questions.length > 0 ? this.props.deck.questions[counter] : null
        const question =  cards !== 'undefined' ? cards.question : null
        const answer = cards !== null ? cards.answer : null
        return (
            <View class={styles.container}>
            {cards === null ? <View><Text style={styles.Text}>This Deck Is Empty</Text></View>
                            :
                <View >
                    <Text  style={styles.Text} >
                        {counter+1} / {questionsLeft}
                    </Text>
                    <Text  style={styles.Text} >
                       {finish && 'Your Score is' }  {Math.floor((Score/questionsLeft)*100)} %
                    </Text>
                { !finish &&
                    <View>
                    <Text  style={styles.Text} >
                        {Switch ? question : answer}
                    </Text>
                                
                <View style={styles.Actions}>
                    <TouchableOpacity onPress={this.Correct} style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}>
                        <Text style={styles.buttonText}>
                            Correct
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.Incorrect} style={Platform.OS === 'ios' ? styles.iosDelete : styles.aDelete}>
                        <Text style={styles.deleteText}>
                            Incorrect
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.Switcher} style={Platform.OS === 'ios' ? styles.ActionsIos : styles.ActionsA}>
                        <Text style={styles.ActionsText}>
                            {Switch?'Show answer':'Hide Answer'}
                        </Text>
                    </TouchableOpacity>
                </View>
                </View>
                }
                </View>
            }
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
    ActionsA:{
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 30,
        height: 45,
        borderRadius: 2,
        marginLeft: 80,
        marginRight: 80,
        backgroundColor: '#f2f2f2',    
    },
    ActionsIos:{
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 30,
        color: '#f2f2f2',    
    },
    ActionsText:{
            textAlign: 'center',
            color: '#292477'

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
        backgroundColor: '#b71845',
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 30,
        color: '#f2f2f2',
    },
    aDelete: {
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 30,
        height: 45,
        borderRadius: 2,
        marginLeft: 80,
        marginRight: 80,
        backgroundColor: '#b71845',
    },
    AndroidSubmitBtn: {
        backgroundColor: '#292477',
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 30,
        height: 45,
        borderRadius: 2,
        marginLeft: 80,
        marginRight: 80,
      },
      buttonText: {
        textAlign: 'center',
        color: 'white'
      },
      deleteText: {
        textAlign: 'center',
        color: '#f2f2f2'
      },
      Text: {
        textAlign: 'center',
        color: 'black',
        marginTop: 60,
        fontSize: 30
      }
  })
function mapStateToProps (state, { navigation }) {
    const { entryId } = navigation.state.params
  
    return {
      entryId,
      deck: state[entryId],
    }
  }
  
export default connect(
    mapStateToProps,
  )(Quiz)