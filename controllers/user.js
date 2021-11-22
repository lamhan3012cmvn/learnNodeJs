/**
 * We can interact with mongoose in three diffirent ways:
 * [v] Callback
 * [v] Promises
 * [v] Async/await (Promises)
 */

const Deck = require('../models/Deck')
const User = require('../models/User')

const getUser = async (req, res, next) => {
    const {
        userID
    } = req.value.params

    const user = await User.findById(userID)

    return res.status(200).json({
        user
    })
}

const getUserDecks = async (req, res, next) => {
    const {
        userID
    } = req.value.params

    // Get user
    // const user = await User.findById(userID).populate('decks')
    // const user = await User.findById(userID)
    // if (user) {
    //     const decks = await Deck.find({
    //         user: userID
    //     })//[1,2,3,4]
    //     // user={name: 'deck'}
    //     // user.decks = decks
    //     // {name: 'deck',decks:[1,2,3,4]}
    //     user.decks = decks
    // }

    return res.status(200).json({
        decks: user.decks
    })
}

const index = async (req, res, next) => {
    const users = await User.find({})

    return res.status(200).json({
        users
    })
}

const newUser = async (req, res, next) => {
    const newUser = new User(req.value.body)

    await newUser.save()

    return res.status(201).json({
        user: newUser
    })
}

const newUserDeck = async (req, res, next) => {
    const {
        userID
    } = req.value.params
    //1. get params method GET POST PUT DELETE
    //2. get query params method GET POST PUT DELETE

    //3. get body params method POST PUT

    //GET lay data tu server
    //POST tuong data data tu clien save db (Create)
    //PUT tuong data data tu clien save db (Update)
    //DELETE tuong data data tu clien save db (Delete)

    // Create a new deck
    const newDeck = new Deck(req.value.body)

    // Get user from db by collection User
    const user = await User.findById(userID)

    // Assign user as a deck's owner
    // assign user to deck
    newDeck.owner = user

    // Save the deck
    await newDeck.save()

    // Add deck to user's decks array 'decks'
    //Cap nhat data array 'decks' cua user
    user.decks.push(newDeck._id)

    // Save the user
    await user.save()

    res.status(201).json({
        deck: newDeck
    })
}

const replaceUser = async (req, res, next) => {
    // enforce new user to old user
    const {
        userID
    } = req.value.params

    const newUser = req.value.body

    const result = await User.findByIdAndUpdate(userID, newUser)

    return res.status(200).json({
        success: true
    })
}

const updateUser = async (req, res, next) => {
    // number of fields
    const {
        userID
    } = req.value.params

    const newUser = req.value.body

    const result = await User.findByIdAndUpdate(userID, newUser)

    return res.status(200).json({
        success: true
    })
}

module.exports = {
    getUser,
    getUserDecks,
    index,
    newUser,
    newUserDeck,
    replaceUser,
    updateUser
}