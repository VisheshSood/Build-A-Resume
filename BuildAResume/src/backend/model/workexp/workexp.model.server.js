/*
    * 
    * Build A Resume Work Experience API
    *
*/


module.exports = function (app, mongoose, logger) {

    var q = require('q');
    var WorkExpSchema = require('./workexp.schema.server')(app, mongoose);
    var WorkExpModel = mongoose.model('WorkExp', WorkExpSchema);

    var api = {
        createWorkExp:createWorkExp,
        findWorkExpById:findWorkExpById,
        findWorkExpForUser:findWorkExpForUser,
        updateWorkExp:updateWorkExp,
        deleteWorkExp:deleteWorkExp
    };
    return api;

    function createWorkExp(workExp, userId) {
        workExp.userId = userId;
        var deferred = q.defer();
        WorkExpModel.create(workExp, function (err, dbWorkExp) {
            if(err){
                logger.error('Could not create work experience. Error: ' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbWorkExp);
            }
        });
        return deferred.promise;
    }

    function findWorkExpById(workExpId) {
        var deferred = q.defer();
        WorkExpModel.findById(workExpId, function (err, dbWorkExp) {
            if(err){
                logger.error('Could not find work experience for ID: ' + workExpId + " and Error: " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbWorkExp);
            }
        });
        return deferred.promise;
    }

    function findWorkExpForUser(userId) {
        var deferred = q.defer();
        WorkExpModel.find({userId:userId}, function (err, dbWorkExp) {
            if(err){
                logger.error('Could not find work experience for ID: ' + userId + " and Error: " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbWorkExp);
            }
        });
        return deferred.promise;
    }

    function updateWorkExp(workExpId, workExp) {
        var deferred = q.defer();
        WorkExpModel.update({_id:workExpId},{$set:workExp}, function (err, dbWorkExp) {
            if(err) {
                logger.error('Could not update work experience for ID: ' + workExpId + " and Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(dbWorkExp);
            }
        });
        return deferred.promise;
    }

    function deleteWorkExp(workExpId) {
        var deferred = q.defer();
        WorkExpModel.remove({_id:workExpId}, function (err) {
            if(err) {
                logger.error('Could not delete work experience for ID: ' + workExpId + " and Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(200);
            }
        });
        return deferred.promise;
    }
}

