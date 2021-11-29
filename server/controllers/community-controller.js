const Community = require('../models/community-model')
const mongoose = require('mongoose')


/*
 *  UPDATE FUNCTION FOR COMMUNITY LIS
 */

updateCommunityItems = async (req, res) => {
    const name = req.body.name.toLowerCase()
    const items = req.body.items

    let existingList = await Community.findOne({ name: name });
    if(!existingList) {
        let newList = {
                        name: name,
                        items: new Map(),
                        view: 0,
                        likes: [],
                        dislikes: [],
                        comments: [],
                        }
        existingList = new Community(newList);
        top5List.save().catch(error => {return res.status(400).json({error, message: 'Top 5 List Not Created!'})
        })           
    }

    const map = existingList.items;
    const weights = [5,4,3,2,1];
    for(let i = 0; i < 5; items.length){
        if(map.has(items[i].toLowerCase())){
            map.set( items[i].toLowerCase() , (map.get(items[i].toLowerCase()) + weights[i]) )
        }
        else{
            map.set( (items[i].toLowerCase()) , weights[i] )
        }
    }
    existingList
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: top5List._id,
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
        return res.status(400).json({
            success: false,
            error: 'A list with this name does not exist',
        })
    }

    const map = existingList.items;
    const weights = [5,4,3,2,1];
    for(let i = 0; i < 5; items.length){
        if(map.has(items[i].toLowerCase())){
            if(map.get(items[i].toLowerCase()) - weights[i] <= 0){
                map.delete(items[i].toLowerCase())
            }
            else{
                map.set( items[i].toLowerCase() , (map.get(items[i].toLowerCase()) - weights[i]) )
            }
        }
    }

    existingList
    .save()
    .then(() => {
        console.log("SUCCESS!!!");
        return res.status(200).json({
            success: true,
            id: top5List._id,
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

module.exports = {
    updateCommunityItems,
    removeCommunityItems,
}