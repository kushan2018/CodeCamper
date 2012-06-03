﻿define(['amplify'],
    function (amplify) {
        var
            init = function () {
                amplify.request.define('favorites', 'ajax', {
                    url: '/api/favorites/{personId}',
                    dataType: 'json',
                    type: 'GET'
                    //cache:
                });

                amplify.request.define('attendanceAdd', 'ajax', {
                    url: '/api/attendance',
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8'
                });

                // DELETE /api/attendance/?pid=2&sid=1
                amplify.request.define('attendanceDelete', 'ajax', {
                    url: '/api/attendance/?pid={personId}&sid={sessionId}',
                    dataType: 'json',
                    type: 'DELETE',
                    contentType: 'application/json; charset=utf-8'
                });
            },
            
            getAttendance = function(callbacks, personId) {
                return amplify.request({
                    resourceId: "favorites",
                    data: { personId: personId },
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            
            addAttendance = function(callbacks, data) {
                return amplify.request({
                    resourceId: "attendanceAdd",
                    data: data,
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            
            deleteAttendance = function(callbacks, personId, sessionId) {
                return amplify.request({
                    resourceId: "attendanceDelete",
                    data: {
                        personId: personId,
                        sessionId: sessionId,
                    },
                    success: callbacks.success,
                    error: callbacks.error
                });
            };

    init();
    
    return {
        getAttendance: getAttendance,
        addAttendance: addAttendance,
        deleteAttendance: deleteAttendance
    };
});