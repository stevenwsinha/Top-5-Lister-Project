const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommunityListSchema = new Schema (
    {
        name: {type: String, required: true},
        items: {type: Map, required: true},
        views: {type: Number, required: true},
        likes: {type: Number, required: true},
        dislikes: {type: Number, required: true},

    },
    {timestamps: true}
    
)

module.exports = mongoose.model('Community', CommunityListSchema)