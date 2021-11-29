const Community = require('../models/community-model')
const mongoose = require('mongoose')


/*
 *  CRUD FUNCTIONS FOR COMMUNITY LISTS
 */

createCommunityList = async (req, res) => {
    console.log("\n")
    console.log(req.body)
    console.log("\n")
    const name = req.body.name.toLowerCase()
    const items = req.body.items

    let newList = {
        name: name,
        items: new Map(),
        views: 0,
        likes: [],
        dislikes: [],
        comments: [],
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

module.exports = {
    createCommunityList,
    updateCommunityItems,
    removeCommunityItems,
    getCommunityList,
}