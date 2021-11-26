const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        owner: {type: String, required: true},
        views: {type: Number, required: true},
        likes: {type: [ObjectId], required: true},
        dislikes: {type: [ObjectId], required: true},
        comments: {type: [Object], required: true},
        isPublished: {type: Boolean, required: true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
