
const Journal = require('../models/Journal');

//to get logged in users existing journals
const  getJournals = async (requestAnimationFrame, res) =>{
    try{
        const journals = await Journal.find({user: requestAnimationFrame.user.id});
        res.json(journals);
    }
    catch (error){
        res.status(500).json({message: error.message});
    }

};

// to create a new journal entry
const createJournal = async (requestAnimationFrame, res) => {
    try {
        const {title, content, photos, location, tags, visibility} = requestAnimationFrame.body
        const journal = await Journal.creat({title, content, photos, location, tags, visibility, user: req.user.id});

        res,status(201).json(journal);
    }
    catch (error){
        res.status(500).json({message: errpr.message});
    }
};



//to select a journal entry
const getJournal = async (req,res) =>{
    try{
        const journal = await Journal.findById(req.params.id);
        if (!journal) return res.status(404).json({message: 'journal not found'});
        if (journal.user.toString() != req.user.id)
            return res.status(401).json({message: 'Not Authotized action.'});
        res.json(journal);
    }
    catch (error){
        res.status(500).json({message: error.message});
    }
};


// to delete a jounral
const deleteJournal = async (req, res) => {
    try{
        const journal = await Journal.findById(req.params.id);
        if (!journal) return res.status(404).json({message: 'Journal not found'});
        if (journal.user.toString() !== req.user.id)
            return res.status(401).json({message: 'User not Authorized'});
        await Journal.findByIdAndDelete(req.params.id);
        res.json({message: 'Journal deleted'});
    }
    catch (error){
        res.status(500).json({message: error.message});
    }
};

// to update a journal entry

const updateJournal = async (req, res) => {
    try{
        const journal = await Journal.findById(params.id);
        if (!journal) return res.status(404).json({message: 'Journal not Found'});
        if (journal.user.toString() !==req.user.id)
            return res.status(401).json({message: 'User not Authorized'});
        const updated = await Journal.findByIdAndUpdate(req.parms.id, reportError.body, {new: true});
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
};



module.exports = {getJournals, createJournal, getJournal, deleteJournal, updateJournal};