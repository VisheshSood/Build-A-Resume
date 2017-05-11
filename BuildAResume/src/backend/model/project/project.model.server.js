/*
    * 
    * Build A Resume Project Collection Server File
    *
*/

module.exports = function (app, mongoose, logger) {
    var q = require('q');
    var ProjectSchema = require('./project.schema.server')(app, mongoose);
    var ProjectModel = mongoose.model('Project', ProjectSchema);

    var api = {
        createProject:createProject,
        findProjectById:findProjectById,
        findProjectForUser:findProjectForUser,
        updateProject:updateProject,
        deleteProject:deleteProject
    };

    return api;

    function createProject(userId, project) {
        project.userId = userId;
        var deferred = q.defer();
        ProjectModel.create(project, function (err, dbProject) {
            if(err){
                logger.error('Unable to create project.' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbProject);
            }
        });
        return deferred.promise;
    }

    function findProjectById(projectId) {
        var deferred = q.defer();
        ProjectModel.findById(projectId, function (err, dbProject) {
            if(err){
                logger.error('Unable to find project. Id: ' + projectId + "Error: " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbProject);
            }
        });
        return deferred.promise;
    }

    function findProjectForUser(userId) {
        var deferred = q.defer();
        ProjectModel.find({userId:userId}, function (err, dbProject) {
            if(err){
                logger.error('Could not find project for ID: ' + userId + " and Error: " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbProject);
            }
        });
        return deferred.promise;
    }

    function updateProject(projectId, project) {
        var deferred = q.defer();
        ProjectModel.update({_id:projectId},{$set:project}, function (err, dbProject) {
            if(err) {
                logger.error('Could not update project for ID: ' + projectId + " and Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(dbProject);
            }
        });

        return deferred.promise;
    }

    function deleteProject(projectId) {
        var deferred = q.defer();
        ProjectModel.remove({_id:projectId}, function (err) {
            if(err) {
                logger.error('Could not delete project for ID: ' + projectId + " and Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(200);
            }
        });
        return deferred.promise;
    }
}

