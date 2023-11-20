import * as mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    done: Boolean
});

export default mongoose.model('Todo', TodoSchema);