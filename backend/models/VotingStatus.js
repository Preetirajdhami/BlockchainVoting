import mongoose from 'mongoose';

const VotingStatusSchema = new mongoose.Schema({
    isVotingActive: { type: Boolean, default: false},

});

export default mongoose.model('VotingStatus', VotingStatusSchema);