/*
    * 
    * Build A Resume Skills Database Schema
    *
*/

module.exports = function (app, mongoose) {
    var SkillsSchema = mongoose.Schema({
        userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
        languages:[{type:String}],
        technologies:[{type:String}],
        database:[{type:String}],
        softwares:[{type:String}],
        operatingSystems:[{type:String}]
    });
    return SkillsSchema;
}