/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec'),
    Exif = require('./Exif');

var exifExport = {};

// Tack on the Camera Constants to the base camera plugin.
for (var key in Exif) {
    exifExport[key] = Exif[key];
}

/**
 * Set location in JPEG Exif.
 *
 * @param {Function} successCallback
 * @param {Function} errorCallback
 * @param {Object} options
 */
exifExport.setLocation = function(successCallback, errorCallback, options) {
    argscheck.checkArgs('fFO', 'Exif.setLocation', arguments);
    options = options || {};
    var getValue = argscheck.getValue;

    var fileName = getValue(options.fileName, "");
    var latitude = getValue(options.latitude, "NaN");
    var longitude = getValue(options.longitude, "NaN");

    var args = [fileName, latitude, longitude];

    exec(successCallback, errorCallback, "Exif", "setlocation", args);
};

module.exports = exifExport;
