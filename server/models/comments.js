import {model, Schema} from 'mongoose';

const commentSchema = new Schema({
    content:{type:String, required:true},
    blog:{type:Schema.Types.ObjectId, ref:'Blog', required:true},
    user:{type:Schema.Types.ObjectId, ref:'User', required:true},
},
{
    timestamps:true,
});

const Comment = model('Comment', commentSchema);

export default Comment;