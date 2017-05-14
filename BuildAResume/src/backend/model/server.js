module.exports = function (app) {


    //var connectionString = 'mongodb://ec2-34-209-17-36.us-west-2.compute.amazonaws.com:27017/test';
    var connectionString = 'mongodb://127.0.0.1:27017/test';

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

    var logger = require('../logger/logger.server')(app);

    require('./user/user.schema.server')(app, mongoose);
    var userModelAPI = require('./user/user.model.server')(app, mongoose, logger);

    require('./project/project.schema.server')(app, mongoose);
    var projectModelAPI = require('./project/project.model.server')(app, mongoose, logger);

    require('./technicalSkill/technicalSkill.schema.server')(app, mongoose);
    var technicalSkillModelAPI = require('./technicalSkill/technicalSkill.model.server')(app, mongoose, logger);

    require('./education/education.schema.server')(app, mongoose);
    var educationModelAPI = require('./education/education.model.server')(app, mongoose, logger);

    require('./workexp/workexp.schema.server')(app, mongoose);
    var workExpModelAPI = require('./workexp/workexp.model.server')(app, mongoose, logger);

    require('./resume/resume.schema.server')(app,mongoose);
    var resumeModelAPI = require('./resume/resume.model.server')(app,mongoose,logger);

    require('./job/job.schema.server')(app, mongoose);
    var jobModelAPI = require('./job/job.model.server')(app, mongoose, logger);


    var api = {
        userModelAPI : userModelAPI,
        projectModelAPI:projectModelAPI,
        technicalSkillModelAPI:technicalSkillModelAPI,
        educationModelAPI:educationModelAPI,
        workExpModelAPI:workExpModelAPI,
        resumeModelAPI:resumeModelAPI,
        jobModelAPI:jobModelAPI
    };
    return api;
}
