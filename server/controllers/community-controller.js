const Community = require('../models/community-model')
const mongoose = require('mongoose')


/*
 *  CRUD FUNCTIONS FOR COMMUNITY LISTS
 */

createCommunityList = async (req, res) => {
    const name = req.body.name.toLowerCase()
    const items = req.body.items

    let newList = {
        name: name,
        items: new Map(),
        views: 0,
        likes: [],
        dislikes: [],
        comments: [],
        updated: new Date().toString(),
        }
    weights = [5,4,3,2,1]
    for(let i = 0; i < 5; i++){
        newList.items.set( items[i].toLowerCase(), weights[i])
    }
    let communityList = new Community(newList)
    communityList
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                communityList: communityList,
                message: 'communityList Created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'communityList Not Created!'
            })
        })
    }

updateCommunityList = async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Community.findOne({ _id: req.params.id }, (err, communityList) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Community List not found!',
            })
        }
        
        communityList.views = body.views
        communityList.likes = body.likes
        communityList.dislikes = body.dislikes
        communityList.comments = body.comments
        communityList
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: communityList._id,
                    message: 'Community List updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Community List not updated!',
                })
            })
    })
}

updateCommunityItems = async (req, res) => {
    const name = req.body.name.toLowerCase()
    const items = req.body.items

    let existingList = await Community.findOne({ name: name });
    if(!existingList) {
        return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "Community List could not be found."
                })
    }           

    const map = existingList.items;
    const weights = [5,4,3,2,1];
    for(let i = 0; i < 5; i++){
        if(map.has(items[i].toLowerCase())){
            map.set( items[i].toLowerCase() , (map.get(items[i].toLowerCase()) + weights[i]) )
        }
        else{
            map.set( (items[i].toLowerCase()) , weights[i] )
        }
    }
    existingList.items = map;
    existingList.updated = new Date().toString()
    existingList
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: existingList._id,
                    message: 'Community List updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Community List List not updated!',
                })
            })
}

removeCommunityItems = async (req, res) => {
    const name = req.body.name.toLowerCase()
    const items = req.body.items

    let existingList = await Community.findOne({ name: name });
    if(!existingList) {
        return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "Community List could not be found."
                })
    }        

    const map = existingList.items;
    const weights = [5,4,3,2,1];
    for(let i = 0; i < 5; i++){
        if(map.has(items[i].toLowerCase())){
            if( (map.get(items[i].toLowerCase()) - weights[i]) <= 0){
                map.delete(items[i].toLowerCase())
            }
            else{
                map.set( items[i].toLowerCase() , (map.get(items[i].toLowerCase()) - weights[i]) )
            }
        }
    }
    existingList.items = map
    existingList.updated = new Date().toString()
    existingList
    .save()
    .then(() => {
        console.log("SUCCESS!!!");
        return res.status(200).json({
            success: true,
            id: existingList._id,
            message: 'Community List updated!',
        })
    })
    .catch(error => {
        console.log("FAILURE: " + JSON.stringify(error));
        return res.status(404).json({
            error,
            message: 'Community List List not updated!',
        })
    })
}

getCommunityList = async (req, res) => {
    await Community.find({ name: req.params.name.toLowerCase() }, (err, list) => {
        if (err) {
            return res.status(404).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, communityList: list })
    }).catch(err => console.log(err))
}

getAllCommunityLists = async (req, res) => {
    await Community.find({}, (err, lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, communityLists: lists })
    }).catch(err => console.log(err))
}

module.exports = {
    createCommunityList,
    updateCommunityList,
    updateCommunityItems,
    removeCommunityItems,
    getCommunityList,
    getAllCommunityLists,
}