
import { Request, Response } from 'express';
import { SuccessHandler } from '../common/response.handler';
import constants from '../common/constants';
const { httpStatus } = constants;

// get Index route
export const getIndex = async (req: Request, res: Response) => {
    // Check if user is loggedIn returns a boolean
    // const userAuth = req.user? true: null;

    // res.send('these are all the best memes you will ever see');
    try {

        // const videos = await Video.find({}).sort({ publishDate: -1 });
        // res.render('index', {
        //     videos,
        //     title: 'AfroMeme',
        //     userAuth: true
        // });
        SuccessHandler(res, httpStatus.OK, { "msg": "Welcome to afromeme" } )
    } catch (err) {
        console.error(err);
    }
};

export const getIndividual = async (req: Request, res: Response) => {
    //console.log(req.user);
    // const userAuth = req.user? true: null;
    try {
        // const video = await Video.findById(req.params.id);
        // const comments = await Comment.find({video: video.id}).populate('user', ['name']);
// console.log(comments);

        // res.render('videos/individual', {
        //     video,
        //     title: 'Meme description',
        //     userAuth: true,
        //     comments
        // });
        // res.status(200).json({ "msg": "individual post", video, comments });
    } catch(err) {
        console.error(err);
    }
}

export const postComment = async (req: Request, res: Response) => {
    //console.log(req.user);
    // const userAuth = req.user? true: null;

    try {
        // const video = await Video.findById(req.params.id);
        // const comments = await Comment.find({});
        // if(req.body.comment){
        //     const comment = new Comment({
        //         comment: req.body.comment,
        //         video: req.params.id,
        //         // user: req.user.id
        //     });
        //     //   console.log(comment);
        //     const newComment = await comment.save();
        //     res.status(201).json({ "msg": "comment posted", video, comments, newComment });
        // }

// refresh the browser and shows new comments
        // res.redirect('/individual/' + video.id);
    } catch(err) {
        console.error(err);
    }

};