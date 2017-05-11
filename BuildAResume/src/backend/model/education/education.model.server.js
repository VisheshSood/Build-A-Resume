/*
    * Build A Resume Education Server File
    *
*/

module.exports = function (app, mongoose, logger) {
    var q = require('q');
    var EducationSchema = require('./education.schema.server')(app, mongoose);
    var EducationModel = mongoose.model('Education', EducationSchema);

    var api = {
        createEducation:createEducation,
        findEducationById:findEducationById,
        findEducationForUser:findEducationForUser,
        updateEducation:updateEducation,
        deleteEducation:deleteEducation
    };

    return api;
    
    function createEducation(education) {
        var deferred = q.defer();
        EducationModel.create(education, function (err, dbEducation) {
            if(err){
                logger.error('Education not made. Error:' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbEducation);
            }
        });

        return deferred.promise;
    }

    function findEducationById(educationId) {
        var deferred = q.defer();
        EducationModel.findById(educationId, function (err, dbEducation) {
            if(err){
                logger.error('Could not find education for ID: ' + educationId + " and Error: " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbEducation);
            }
        });
        return deferred.promise;
    }

    function findEducationForUser(userId) {
        var deferred = q.defer();
        EducationModel.find({userId:userId}, function (err, dbEducation) {
            if(err){
                logger.error('Could not find education for ID: ' + educationId + " and Error: " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbEducation);
            }
        });
        return deferred.promise;
    }

    function updateEducation(educationId, education) {
        var deferred = q.defer();
        EducationModel.update({_id:educationId},{$set:education}, function (err, dbEducation) {
            if(err) {
                logger.error('Could not update education for ID: ' + educationId + " and Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(dbEducation);
            }
        });
        return deferred.promise;
    }

    function deleteEducation(educationId) {
        var deferred = q.defer();
        EducationModel.remove({_id:educationId}, function (err) {
            if(err) {
                logger.error("Can not delete education with id " + educationId + " Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(200);
            }
        });
        return deferred.promise;
    }
}

