/*
    * 
    * Build A Resume Work Database Schema
    *
*/

module.exports = function (app, mongoose) {
    var WorkSchema = mongoose.Schema({
        userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
        jobTitle:{type:String, required:true},
        companyName:{type:String, required:true},
        description: {type:String},
        technologies: [{type:String}],
        startDate:{type:String},
        endDate:{type:String},
        location:{type:String}
    });
    return WorkSchema;
}