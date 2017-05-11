/*
    * 
    * Build A Resume Jobs Server File
    *
*/

module.exports = function (app, mongoose, logger) {

    var q = require('q');
    var JobSchema = require('./job.schema.server.js')(app, mongoose);
    var JobModel = mongoose.model('Job', JobSchema);

    var api = {
        createJob:createJob,
        findJobById:findJobById,
        findJobForUser:findJobForUser,
        updateJob:updateJob,
        deleteJob:deleteJob
    };
    return api;
    
    function createJob(job) {
        var deferred = q.defer();
        JobModel.create(job, function (err, dbJob) {
            if(err){
                logger.error('Job was not created. Error: ' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbJob);
            }
        });
        return deferred.promise;
    }

    function findJobById(jobId) {
        var deferred = q.defer();
        JobModel.findById(jobId, function (err, dbJob) {
            if(err){
                logger.error('Could not find job for ID: ' + jobId + "Error: " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbJob);
            }
        });
        return deferred.promise;
    }

    function findJobForUser(userId) {
        var deferred = q.defer();
        JobModel.find({userId:userId}, function (err, dbJob) {
            if(err && !dbJob){
                logger.error('Could not find job for ID: ' + userId + " and Error: " + err);

                deferred.reject(err);
            } else {
                deferred.resolve(dbJob);
            }
        });
        return deferred.promise;
    }

    function updateJob(jobId, job) {

        var deferred = q.defer();
        JobModel.update({_id:jobId},{$set:job}, function (err, dbJob) {
            if(err) {
                logger.error('Could not update job for ID: ' + jobId + " and Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(job);
            }
        });
        return deferred.promise;
    }

    function deleteJob(jobId) {
        var deferred = q.defer();
        JobModel.remove({_id:jobId}, function (err) {
            if(err) {
                logger.error('Could not delete job for ID: ' + jobId + " and Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(200);
            }
        });
        return deferred.promise;
    }
}

