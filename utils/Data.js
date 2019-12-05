import React from 'react'
import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo'
import { AsyncStorage } from 'react-native'


export const FLASHCARD_STORAGE_KEY = 'flashCard:app'

export function getFlashCardData (card) {
    const data = {
            React: {
              title: 'React',
              questions: [
                {
                  question: 'What is React?',
                  answer: 'A library for managing user interfaces'
                },
                {
                  question: 'Where do you make Ajax requests in React?',
                  answer: 'The componentDidMount lifecycle event'
                }
              ]
            },
            JavaScript: {
              title: 'JavaScript',
              questions: [
                {
                  question: 'What is a closure?',
                  answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
              ]
            }
          
    }
    AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
    // AsyncStorage.clear(FLASHCARD_STORAGE_KEY)
    return typeof card === 'undefined'
    ? data
    : data[card]
}