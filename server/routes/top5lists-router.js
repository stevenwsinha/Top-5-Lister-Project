const auth = require('../auth')
const express = require('express')
const Top5ListController = require('../controllers/top5list-controller')
const UserController = require('../controllers/user-controller')
const router = express.Router()

// SINGLE LIST CRUD OPERATIONS
router.post('/home/top5list/', auth.verify, Top5ListController.createTop5List)
router.put('/home/top5list/:id', auth.verify, Top5ListController.updateTop5List)
router.delete('home//top5list/:id', auth.verify, Top5ListController.deleteTop5List)
router.get('home//top5list/:id', auth.verify, Top5ListController.getTop5ListById)

// MULTI LIST RETRIEVAL 
router.get('/home/top5lists', auth.verify, Top5ListController.getTop5Lists)
router.get('/home/:username', Top5ListController.getTop5ListsByUsername)
router.get('home/all', Top5ListController.getAllTop5Lists)
// router.get('home/community', CommunityController.getCommunityLists)

// USER CRUD OPERATIONS
router.get('/logout', UserController.logoutUser)
router.post('/register', UserController.registerUser)
router.get('/loggedIn', UserController.getLoggedIn)
router.post('/login', UserController.loginUser)
module.exports = router