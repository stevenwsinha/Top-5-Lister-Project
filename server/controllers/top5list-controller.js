const Top5List = require('../models/top5list-model');
const User = require('../models/user-model.js')
const mongoose = require('mongoose')

/*
 * CREATE, UPDATE, and DELETE functions for top5lists
 */

//  CREATE A TOP5LIST USING THE FIELDS IN THE REQUEST BODY
createTop5List = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Top 5 List',
        })
    }

    const top5List = new Top5List(body);
    if (!top5List) {
        return res.status(400).json({ success: false, error: err })
    }

    top5List
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                top5List: top5List,
                message: 'Top 5 List Created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Top 5 List Not Created!'
            })
        })
}

/*
 *  UPDATE THE TOP5LIST WITH THE NEW INFORMATION GIVEN IN THE REQUEST BODY
 *  USED TO UPDATE EVERY SINGLE FIELD IN THE TOP5LIST MODEL, INCLUDING TO EDIT, VIEW, LIKE/UNLIKE, OR PUBLISH A LIST
 */
updateTop5List = async (req, res) => {
    const user_id = req.userId;
    let username = "";
    await User.findById({_id: user_id}, (err, user) => {
        if(err) {
            return res.status(400).json({success:false, error:err});
        }
        username = user.username;
    })

    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Top5List.findOne({ _id: req.params.id }, (err, top5List) => {
        console.log("top5List found: " + JSON.stringify(top5List));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }
        if(username !== top5List.owner){
            return res.status(403).json({success: false, error: "You are not authorized to edit this list." });
        }

        top5List.name = body.name
        top5List.items = body.items
        top5List.owner = body.owner
        top5List.views = body.views
        top5List.likes = body.likes
        top5List.dislikes = body.dislikes
        top5List.comments = body.comments
        top5List.isPublished = body.isPublished
        top5List.created = body.created
        top5List
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: top5List._id,
                    message: 'Top 5 List updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Top 5 List not updated!',
                })
            })
    })
}

// DELETE THE LIST WITH ID GIVEN IN REQUEST BODY
deleteTop5List = async (req, res) => {
    const user_id = req.userId;
    let username = "";
    await User.findById({_id: user_id}, (err, user) => {
        if(err) {
            return res.status(400).json({success:false, error:err});
        }
        username = user.username;
    })

    Top5List.findById({ _id: req.params.id }, (err, top5List) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }

        if(username !== top5List.owner){
            return res.status(403).json({success: false, error: "You are not authorized to delete this list."});
        }

        Top5List.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: top5List })
        }).catch(err => console.log(err))
    })
}

// GET THE LIST WITH THE GIVEN ID
getTop5ListById = async (req, res) => {
    const user_id = req.userId;
    let username = "";
    await User.findById({_id: user_id}, (err, user) => {
        if(err) {
            return res.status(401).json({success:false, error:err});
        }
        username = user.username;
    })
    
    await Top5List.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(404).json({ success: false, error: err });
        }
        if(username !== list.owner){
            return res.status(403).json({success: false, error: "You are not authorized to edit this list." });
        }
        return res.status(200).json({ success: true, top5List: list })
    }).catch(err => console.log(err))
}


/* 
 *  OPERATIONS TO RETRIEVE MANY LISTS
 */

//  GET ALL THE LISTS OWNED BY USER WITH THE ID PASSED IN THROUGH THE COOKIE
getTop5Lists = async (req, res) => {
    const user_id = req.userId;
    let username = "";
    await User.findById({_id: user_id}, (err, user) => {
        if(err) {
            return res.status(400).json({success:false, error:err});
        }
        username = user.username;
    })

    await Top5List.find({owner: username}, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, top5Lists: top5Lists })
    }).catch(err => console.log(err))
}

//  GET ALL TOP5LISTS OWNED BY USER WITH USERNAME PASSED IN THROUGH GET QUERY PARAMS
//  GET EVERY TOP5LIST FROM USER WITH USERNAME PASSED IN THROUGH GET QUERY PARAMS
getTop5ListsByUsername = async (req, res) => {
    let requestedUsername = req.params.username;

    await Top5List.find({owner: requestedUsername}, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        for(let i = top5Lists.length-1; i >= 0; i--){
            if(!top5Lists[i].isPublished){
                top5Lists.splice(i,1)
            }
        }
        return res.status(200).json({ success: true, top5Lists: top5Lists })
    }).catch(err => console.log(err))
}

//  GET EVERY TOP5LIST THAT IS PUBLISHED
getAllTop5Lists = async (req, res) => {
    await Top5List.find({}, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        for(let i = top5Lists.length-1; i >= 0; i--){
            if(!top5Lists[i].isPublished){
                top5Lists.splice(i,1)
            }
        }
        return res.status(200).json({ success: true, top5Lists: top5Lists })
    }).catch(err => console.log(err))
}

module.exports = {
    createTop5List,
    updateTop5List,
    deleteTop5List,
    getTop5ListById,
    getTop5Lists,
    getTop5ListsByUsername,
    getAllTop5Lists,
}