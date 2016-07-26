/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/prunecluster_prunecluster/dist/PruneCluster.js                                                             //
// This file is in bare mode and is not in its own closure.                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var __extends = this.__extends || function (d, b) {                                                                    // 1
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];                                                             // 2
    function __() { this.constructor = d; }                                                                            // 3
    __.prototype = b.prototype;                                                                                        // 4
    d.prototype = new __();                                                                                            // 5
};                                                                                                                     // 6
var PruneCluster;                                                                                                      // 7
(function (PruneCluster_1) {                                                                                           // 8
    var ratioForNativeSort = 0.2;                                                                                      // 9
    var Point = (function () {                                                                                         // 10
        function Point() {                                                                                             // 11
        }                                                                                                              // 12
        return Point;                                                                                                  // 13
    })();                                                                                                              // 14
    PruneCluster_1.Point = Point;                                                                                      // 15
    var ClusterObject = (function () {                                                                                 // 16
        function ClusterObject() {                                                                                     // 17
        }                                                                                                              // 18
        return ClusterObject;                                                                                          // 19
    })();                                                                                                              // 20
    PruneCluster_1.ClusterObject = ClusterObject;                                                                      // 21
    var hashCodeCounter = 1;                                                                                           // 22
    var maxHashCodeValue = Math.pow(2, 53) - 1;                                                                        // 23
    var Marker = (function (_super) {                                                                                  // 24
        __extends(Marker, _super);                                                                                     // 25
        function Marker(lat, lng, data, category, weight, filtered) {                                                  // 26
            if (data === void 0) { data = {}; }                                                                        // 27
            if (weight === void 0) { weight = 1; }                                                                     // 28
            if (filtered === void 0) { filtered = false; }                                                             // 29
            _super.call(this);                                                                                         // 30
            this.data = data;                                                                                          // 31
            this.position = { lat: +lat, lng: +lng };                                                                  // 32
            this.weight = weight;                                                                                      // 33
            this.category = category;                                                                                  // 34
            this.filtered = filtered;                                                                                  // 35
            this.hashCode = hashCodeCounter++;                                                                         // 36
        }                                                                                                              // 37
        Marker.prototype.Move = function (lat, lng) {                                                                  // 38
            this.position.lat = +lat;                                                                                  // 39
            this.position.lng = +lng;                                                                                  // 40
        };                                                                                                             // 41
        Marker.prototype.SetData = function (data) {                                                                   // 42
            for (var key in data) {                                                                                    // 43
                this.data[key] = data[key];                                                                            // 44
            }                                                                                                          // 45
        };                                                                                                             // 46
        return Marker;                                                                                                 // 47
    })(ClusterObject);                                                                                                 // 48
    PruneCluster_1.Marker = Marker;                                                                                    // 49
    var Cluster = (function (_super) {                                                                                 // 50
        __extends(Cluster, _super);                                                                                    // 51
        function Cluster(marker) {                                                                                     // 52
            _super.call(this);                                                                                         // 53
            this.stats = [0, 0, 0, 0, 0, 0, 0, 0];                                                                     // 54
            this.data = {};                                                                                            // 55
            if (!marker) {                                                                                             // 56
                this.hashCode = 1;                                                                                     // 57
                if (Cluster.ENABLE_MARKERS_LIST) {                                                                     // 58
                    this._clusterMarkers = [];                                                                         // 59
                }                                                                                                      // 60
                return;                                                                                                // 61
            }                                                                                                          // 62
            if (Cluster.ENABLE_MARKERS_LIST) {                                                                         // 63
                this._clusterMarkers = [marker];                                                                       // 64
            }                                                                                                          // 65
            this.lastMarker = marker;                                                                                  // 66
            this.hashCode = 31 + marker.hashCode;                                                                      // 67
            this.population = 1;                                                                                       // 68
            if (marker.category !== undefined) {                                                                       // 69
                this.stats[marker.category] = 1;                                                                       // 70
            }                                                                                                          // 71
            this.totalWeight = marker.weight;                                                                          // 72
            this.position = {                                                                                          // 73
                lat: marker.position.lat,                                                                              // 74
                lng: marker.position.lng                                                                               // 75
            };                                                                                                         // 76
            this.averagePosition = {                                                                                   // 77
                lat: marker.position.lat,                                                                              // 78
                lng: marker.position.lng                                                                               // 79
            };                                                                                                         // 80
        }                                                                                                              // 81
        Cluster.prototype.AddMarker = function (marker) {                                                              // 82
            if (Cluster.ENABLE_MARKERS_LIST) {                                                                         // 83
                this._clusterMarkers.push(marker);                                                                     // 84
            }                                                                                                          // 85
            var h = this.hashCode;                                                                                     // 86
            h = ((h << 5) - h) + marker.hashCode;                                                                      // 87
            if (h >= maxHashCodeValue) {                                                                               // 88
                this.hashCode = h % maxHashCodeValue;                                                                  // 89
            }                                                                                                          // 90
            else {                                                                                                     // 91
                this.hashCode = h;                                                                                     // 92
            }                                                                                                          // 93
            this.lastMarker = marker;                                                                                  // 94
            var weight = marker.weight, currentTotalWeight = this.totalWeight, newWeight = weight + currentTotalWeight;
            this.averagePosition.lat =                                                                                 // 96
                (this.averagePosition.lat * currentTotalWeight +                                                       // 97
                    marker.position.lat * weight) / newWeight;                                                         // 98
            this.averagePosition.lng =                                                                                 // 99
                (this.averagePosition.lng * currentTotalWeight +                                                       // 100
                    marker.position.lng * weight) / newWeight;                                                         // 101
            ++this.population;                                                                                         // 102
            this.totalWeight = newWeight;                                                                              // 103
            if (marker.category !== undefined) {                                                                       // 104
                this.stats[marker.category] = (this.stats[marker.category] + 1) || 1;                                  // 105
            }                                                                                                          // 106
        };                                                                                                             // 107
        Cluster.prototype.Reset = function () {                                                                        // 108
            this.hashCode = 1;                                                                                         // 109
            this.lastMarker = undefined;                                                                               // 110
            this.population = 0;                                                                                       // 111
            this.totalWeight = 0;                                                                                      // 112
            this.stats = [0, 0, 0, 0, 0, 0, 0, 0];                                                                     // 113
            if (Cluster.ENABLE_MARKERS_LIST) {                                                                         // 114
                this._clusterMarkers = [];                                                                             // 115
            }                                                                                                          // 116
        };                                                                                                             // 117
        Cluster.prototype.ComputeBounds = function (cluster) {                                                         // 118
            var proj = cluster.Project(this.position.lat, this.position.lng);                                          // 119
            var size = cluster.Size;                                                                                   // 120
            var nbX = Math.floor(proj.x / size), nbY = Math.floor(proj.y / size), startX = nbX * size, startY = nbY * size;
            var a = cluster.UnProject(startX, startY), b = cluster.UnProject(startX + size, startY + size);            // 122
            this.bounds = {                                                                                            // 123
                minLat: b.lat,                                                                                         // 124
                maxLat: a.lat,                                                                                         // 125
                minLng: a.lng,                                                                                         // 126
                maxLng: b.lng                                                                                          // 127
            };                                                                                                         // 128
        };                                                                                                             // 129
        Cluster.prototype.GetClusterMarkers = function () {                                                            // 130
            return this._clusterMarkers;                                                                               // 131
        };                                                                                                             // 132
        Cluster.prototype.ApplyCluster = function (newCluster) {                                                       // 133
            this.hashCode = this.hashCode * 41 + newCluster.hashCode * 43;                                             // 134
            if (this.hashCode > maxHashCodeValue) {                                                                    // 135
                this.hashCode = this.hashCode = maxHashCodeValue;                                                      // 136
            }                                                                                                          // 137
            var weight = newCluster.totalWeight, currentTotalWeight = this.totalWeight, newWeight = weight + currentTotalWeight;
            this.averagePosition.lat =                                                                                 // 139
                (this.averagePosition.lat * currentTotalWeight +                                                       // 140
                    newCluster.averagePosition.lat * weight) / newWeight;                                              // 141
            this.averagePosition.lng =                                                                                 // 142
                (this.averagePosition.lng * currentTotalWeight +                                                       // 143
                    newCluster.averagePosition.lng * weight) / newWeight;                                              // 144
            this.population += newCluster.population;                                                                  // 145
            this.totalWeight = newWeight;                                                                              // 146
            this.bounds.minLat = Math.min(this.bounds.minLat, newCluster.bounds.minLat);                               // 147
            this.bounds.minLng = Math.min(this.bounds.minLng, newCluster.bounds.minLng);                               // 148
            this.bounds.maxLat = Math.max(this.bounds.maxLat, newCluster.bounds.maxLat);                               // 149
            this.bounds.maxLng = Math.max(this.bounds.maxLng, newCluster.bounds.maxLng);                               // 150
            for (var category in newCluster.stats) {                                                                   // 151
                if (newCluster.stats.hasOwnProperty(category)) {                                                       // 152
                    if (this.stats.hasOwnProperty(category)) {                                                         // 153
                        this.stats[category] += newCluster.stats[category];                                            // 154
                    }                                                                                                  // 155
                    else {                                                                                             // 156
                        this.stats[category] = newCluster.stats[category];                                             // 157
                    }                                                                                                  // 158
                }                                                                                                      // 159
            }                                                                                                          // 160
            if (Cluster.ENABLE_MARKERS_LIST) {                                                                         // 161
                this._clusterMarkers = this._clusterMarkers.concat(newCluster.GetClusterMarkers());                    // 162
            }                                                                                                          // 163
        };                                                                                                             // 164
        Cluster.ENABLE_MARKERS_LIST = false;                                                                           // 165
        return Cluster;                                                                                                // 166
    })(ClusterObject);                                                                                                 // 167
    PruneCluster_1.Cluster = Cluster;                                                                                  // 168
    function checkPositionInsideBounds(a, b) {                                                                         // 169
        return (a.lat >= b.minLat && a.lat <= b.maxLat) &&                                                             // 170
            a.lng >= b.minLng && a.lng <= b.maxLng;                                                                    // 171
    }                                                                                                                  // 172
    function insertionSort(list) {                                                                                     // 173
        for (var i = 1, j, tmp, tmpLng, length = list.length; i < length; ++i) {                                       // 174
            tmp = list[i];                                                                                             // 175
            tmpLng = tmp.position.lng;                                                                                 // 176
            for (j = i - 1; j >= 0 && list[j].position.lng > tmpLng; --j) {                                            // 177
                list[j + 1] = list[j];                                                                                 // 178
            }                                                                                                          // 179
            list[j + 1] = tmp;                                                                                         // 180
        }                                                                                                              // 181
    }                                                                                                                  // 182
    var PruneCluster = (function () {                                                                                  // 183
        function PruneCluster() {                                                                                      // 184
            this._markers = [];                                                                                        // 185
            this._nbChanges = 0;                                                                                       // 186
            this._clusters = [];                                                                                       // 187
            this.Size = 166;                                                                                           // 188
            this.ViewPadding = 0.2;                                                                                    // 189
        }                                                                                                              // 190
        PruneCluster.prototype.RegisterMarker = function (marker) {                                                    // 191
            if (marker._removeFlag) {                                                                                  // 192
                delete marker._removeFlag;                                                                             // 193
            }                                                                                                          // 194
            this._markers.push(marker);                                                                                // 195
            this._nbChanges += 1;                                                                                      // 196
        };                                                                                                             // 197
        PruneCluster.prototype.RegisterMarkers = function (markers) {                                                  // 198
            var _this = this;                                                                                          // 199
            markers.forEach(function (marker) {                                                                        // 200
                _this.RegisterMarker(marker);                                                                          // 201
            });                                                                                                        // 202
        };                                                                                                             // 203
        PruneCluster.prototype._sortMarkers = function () {                                                            // 204
            var markers = this._markers, length = markers.length;                                                      // 205
            if (this._nbChanges && (!length || this._nbChanges / length > ratioForNativeSort)) {                       // 206
                this._markers.sort(function (a, b) { return a.position.lng - b.position.lng; });                       // 207
            }                                                                                                          // 208
            else {                                                                                                     // 209
                insertionSort(markers);                                                                                // 210
            }                                                                                                          // 211
            this._nbChanges = 0;                                                                                       // 212
        };                                                                                                             // 213
        PruneCluster.prototype._sortClusters = function () {                                                           // 214
            insertionSort(this._clusters);                                                                             // 215
        };                                                                                                             // 216
        PruneCluster.prototype._indexLowerBoundLng = function (lng) {                                                  // 217
            // Inspired by std::lower_bound                                                                            // 218
            var markers = this._markers, it, step, first = 0, count = markers.length;                                  // 219
            while (count > 0) {                                                                                        // 220
                step = Math.floor(count / 2);                                                                          // 221
                it = first + step;                                                                                     // 222
                if (markers[it].position.lng < lng) {                                                                  // 223
                    first = ++it;                                                                                      // 224
                    count -= step + 1;                                                                                 // 225
                }                                                                                                      // 226
                else {                                                                                                 // 227
                    count = step;                                                                                      // 228
                }                                                                                                      // 229
            }                                                                                                          // 230
            return first;                                                                                              // 231
        };                                                                                                             // 232
        PruneCluster.prototype._resetClusterViews = function () {                                                      // 233
            for (var i = 0, l = this._clusters.length; i < l; ++i) {                                                   // 234
                var cluster = this._clusters[i];                                                                       // 235
                cluster.Reset();                                                                                       // 236
                cluster.ComputeBounds(this);                                                                           // 237
            }                                                                                                          // 238
        };                                                                                                             // 239
        PruneCluster.prototype.ProcessView = function (bounds) {                                                       // 240
            var heightBuffer = Math.abs(bounds.maxLat - bounds.minLat) * this.ViewPadding, widthBuffer = Math.abs(bounds.maxLng - bounds.minLng) * this.ViewPadding;
            var extendedBounds = {                                                                                     // 242
                minLat: bounds.minLat - heightBuffer - heightBuffer,                                                   // 243
                maxLat: bounds.maxLat + heightBuffer + heightBuffer,                                                   // 244
                minLng: bounds.minLng - widthBuffer - widthBuffer,                                                     // 245
                maxLng: bounds.maxLng + widthBuffer + widthBuffer                                                      // 246
            };                                                                                                         // 247
            this._sortMarkers();                                                                                       // 248
            this._resetClusterViews();                                                                                 // 249
            var firstIndex = this._indexLowerBoundLng(extendedBounds.minLng);                                          // 250
            var markers = this._markers, clusters = this._clusters;                                                    // 251
            var workingClusterList = clusters.slice(0);                                                                // 252
            for (var i = firstIndex, l = markers.length; i < l; ++i) {                                                 // 253
                var marker = markers[i], markerPosition = marker.position;                                             // 254
                if (markerPosition.lng > extendedBounds.maxLng) {                                                      // 255
                    break;                                                                                             // 256
                }                                                                                                      // 257
                if (markerPosition.lat > extendedBounds.minLat &&                                                      // 258
                    markerPosition.lat < extendedBounds.maxLat &&                                                      // 259
                    !marker.filtered) {                                                                                // 260
                    var clusterFound = false, cluster;                                                                 // 261
                    for (var j = 0, ll = workingClusterList.length; j < ll; ++j) {                                     // 262
                        cluster = workingClusterList[j];                                                               // 263
                        if (cluster.bounds.maxLng < marker.position.lng) {                                             // 264
                            workingClusterList.splice(j, 1);                                                           // 265
                            --j;                                                                                       // 266
                            --ll;                                                                                      // 267
                            continue;                                                                                  // 268
                        }                                                                                              // 269
                        if (checkPositionInsideBounds(markerPosition, cluster.bounds)) {                               // 270
                            cluster.AddMarker(marker);                                                                 // 271
                            clusterFound = true;                                                                       // 272
                            break;                                                                                     // 273
                        }                                                                                              // 274
                    }                                                                                                  // 275
                    if (!clusterFound) {                                                                               // 276
                        cluster = new Cluster(marker);                                                                 // 277
                        cluster.ComputeBounds(this);                                                                   // 278
                        clusters.push(cluster);                                                                        // 279
                        workingClusterList.push(cluster);                                                              // 280
                    }                                                                                                  // 281
                }                                                                                                      // 282
            }                                                                                                          // 283
            var newClustersList = [];                                                                                  // 284
            for (i = 0, l = clusters.length; i < l; ++i) {                                                             // 285
                cluster = clusters[i];                                                                                 // 286
                if (cluster.population > 0) {                                                                          // 287
                    newClustersList.push(cluster);                                                                     // 288
                }                                                                                                      // 289
            }                                                                                                          // 290
            this._clusters = newClustersList;                                                                          // 291
            this._sortClusters();                                                                                      // 292
            return this._clusters;                                                                                     // 293
        };                                                                                                             // 294
        PruneCluster.prototype.RemoveMarkers = function (markers) {                                                    // 295
            if (!markers) {                                                                                            // 296
                this._markers = [];                                                                                    // 297
                return;                                                                                                // 298
            }                                                                                                          // 299
            for (var i = 0, l = markers.length; i < l; ++i) {                                                          // 300
                markers[i]._removeFlag = true;                                                                         // 301
            }                                                                                                          // 302
            var newMarkersList = [];                                                                                   // 303
            for (i = 0, l = this._markers.length; i < l; ++i) {                                                        // 304
                if (!this._markers[i]._removeFlag) {                                                                   // 305
                    newMarkersList.push(this._markers[i]);                                                             // 306
                }                                                                                                      // 307
            }                                                                                                          // 308
            this._markers = newMarkersList;                                                                            // 309
        };                                                                                                             // 310
        PruneCluster.prototype.FindMarkersInArea = function (area) {                                                   // 311
            var aMinLat = area.minLat, aMaxLat = area.maxLat, aMinLng = area.minLng, aMaxLng = area.maxLng, markers = this._markers, result = [];
            var firstIndex = this._indexLowerBoundLng(aMinLng);                                                        // 313
            for (var i = firstIndex, l = markers.length; i < l; ++i) {                                                 // 314
                var pos = markers[i].position;                                                                         // 315
                if (pos.lng > aMaxLng) {                                                                               // 316
                    break;                                                                                             // 317
                }                                                                                                      // 318
                if (pos.lat >= aMinLat && pos.lat <= aMaxLat &&                                                        // 319
                    pos.lng >= aMinLng) {                                                                              // 320
                    result.push(markers[i]);                                                                           // 321
                }                                                                                                      // 322
            }                                                                                                          // 323
            return result;                                                                                             // 324
        };                                                                                                             // 325
        PruneCluster.prototype.ComputeBounds = function (markers) {                                                    // 326
            if (!markers || !markers.length) {                                                                         // 327
                return null;                                                                                           // 328
            }                                                                                                          // 329
            var rMinLat = Number.MAX_VALUE, rMaxLat = -Number.MAX_VALUE, rMinLng = Number.MAX_VALUE, rMaxLng = -Number.MAX_VALUE;
            for (var i = 0, l = markers.length; i < l; ++i) {                                                          // 331
                var pos = markers[i].position;                                                                         // 332
                if (pos.lat < rMinLat)                                                                                 // 333
                    rMinLat = pos.lat;                                                                                 // 334
                if (pos.lat > rMaxLat)                                                                                 // 335
                    rMaxLat = pos.lat;                                                                                 // 336
                if (pos.lng < rMinLng)                                                                                 // 337
                    rMinLng = pos.lng;                                                                                 // 338
                if (pos.lng > rMaxLng)                                                                                 // 339
                    rMaxLng = pos.lng;                                                                                 // 340
            }                                                                                                          // 341
            return {                                                                                                   // 342
                minLat: rMinLat,                                                                                       // 343
                maxLat: rMaxLat,                                                                                       // 344
                minLng: rMinLng,                                                                                       // 345
                maxLng: rMaxLng                                                                                        // 346
            };                                                                                                         // 347
        };                                                                                                             // 348
        PruneCluster.prototype.FindMarkersBoundsInArea = function (area) {                                             // 349
            return this.ComputeBounds(this.FindMarkersInArea(area));                                                   // 350
        };                                                                                                             // 351
        PruneCluster.prototype.ComputeGlobalBounds = function () {                                                     // 352
            return this.ComputeBounds(this._markers);                                                                  // 353
        };                                                                                                             // 354
        PruneCluster.prototype.GetMarkers = function () {                                                              // 355
            return this._markers;                                                                                      // 356
        };                                                                                                             // 357
        PruneCluster.prototype.GetPopulation = function () {                                                           // 358
            return this._markers.length;                                                                               // 359
        };                                                                                                             // 360
        PruneCluster.prototype.ResetClusters = function () {                                                           // 361
            this._clusters = [];                                                                                       // 362
        };                                                                                                             // 363
        return PruneCluster;                                                                                           // 364
    })();                                                                                                              // 365
    PruneCluster_1.PruneCluster = PruneCluster;                                                                        // 366
})(PruneCluster || (PruneCluster = {}));                                                                               // 367
/// <reference path="bower_components/DefinitelyTyped/Leaflet/Leaflet.d.ts"/>                                          // 368
var PruneCluster;                                                                                                      // 369
(function (PruneCluster) {                                                                                             // 370
})(PruneCluster || (PruneCluster = {}));                                                                               // 371
var PruneClusterForLeaflet = (L.Layer ? L.Layer : L.Class).extend({                                                    // 372
    initialize: function (size, clusterMargin) {                                                                       // 373
        var _this = this;                                                                                              // 374
        if (size === void 0) { size = 120; }                                                                           // 375
        if (clusterMargin === void 0) { clusterMargin = 20; }                                                          // 376
        this.Cluster = new PruneCluster.PruneCluster();                                                                // 377
        this.Cluster.Size = size;                                                                                      // 378
        this.clusterMargin = Math.min(clusterMargin, size / 4);                                                        // 379
        this.Cluster.Project = function (lat, lng) {                                                                   // 380
            return _this._map.project(new L.LatLng(lat, lng));                                                         // 381
        };                                                                                                             // 382
        this.Cluster.UnProject = function (x, y) {                                                                     // 383
            return _this._map.unproject(new L.Point(x, y));                                                            // 384
        };                                                                                                             // 385
        this._objectsOnMap = [];                                                                                       // 386
        this.spiderfier = new PruneClusterLeafletSpiderfier(this);                                                     // 387
        this._hardMove = false;                                                                                        // 388
        this._resetIcons = false;                                                                                      // 389
        this._removeTimeoutId = 0;                                                                                     // 390
        this._markersRemoveListTimeout = [];                                                                           // 391
    },                                                                                                                 // 392
    RegisterMarker: function (marker) {                                                                                // 393
        this.Cluster.RegisterMarker(marker);                                                                           // 394
    },                                                                                                                 // 395
    RegisterMarkers: function (markers) {                                                                              // 396
        this.Cluster.RegisterMarkers(markers);                                                                         // 397
    },                                                                                                                 // 398
    RemoveMarkers: function (markers) {                                                                                // 399
        this.Cluster.RemoveMarkers(markers);                                                                           // 400
    },                                                                                                                 // 401
    BuildLeafletCluster: function (cluster, position) {                                                                // 402
        var _this = this;                                                                                              // 403
        var m = new L.Marker(position, {                                                                               // 404
            icon: this.BuildLeafletClusterIcon(cluster)                                                                // 405
        });                                                                                                            // 406
        m.on('click', function () {                                                                                    // 407
            var markersArea = _this.Cluster.FindMarkersInArea(cluster.bounds);                                         // 408
            var b = _this.Cluster.ComputeBounds(markersArea);                                                          // 409
            if (b) {                                                                                                   // 410
                var bounds = new L.LatLngBounds(new L.LatLng(b.minLat, b.maxLng), new L.LatLng(b.maxLat, b.minLng));   // 411
                var zoomLevelBefore = _this._map.getZoom(), zoomLevelAfter = _this._map.getBoundsZoom(bounds, false, new L.Point(20, 20));
                if (zoomLevelAfter === zoomLevelBefore) {                                                              // 413
                    _this._map.fire('overlappingmarkers', {                                                            // 414
                        cluster: _this,                                                                                // 415
                        markers: markersArea,                                                                          // 416
                        center: m.getLatLng(),                                                                         // 417
                        marker: m                                                                                      // 418
                    });                                                                                                // 419
                    _this._map.setView(position, zoomLevelAfter);                                                      // 420
                }                                                                                                      // 421
                else {                                                                                                 // 422
                    _this._map.fitBounds(bounds);                                                                      // 423
                }                                                                                                      // 424
            }                                                                                                          // 425
        });                                                                                                            // 426
        return m;                                                                                                      // 427
    },                                                                                                                 // 428
    BuildLeafletClusterIcon: function (cluster) {                                                                      // 429
        var c = 'prunecluster prunecluster-';                                                                          // 430
        var iconSize = 38;                                                                                             // 431
        var maxPopulation = this.Cluster.GetPopulation();                                                              // 432
        if (cluster.population < Math.max(10, maxPopulation * 0.01)) {                                                 // 433
            c += 'small';                                                                                              // 434
        }                                                                                                              // 435
        else if (cluster.population < Math.max(100, maxPopulation * 0.05)) {                                           // 436
            c += 'medium';                                                                                             // 437
            iconSize = 40;                                                                                             // 438
        }                                                                                                              // 439
        else {                                                                                                         // 440
            c += 'large';                                                                                              // 441
            iconSize = 44;                                                                                             // 442
        }                                                                                                              // 443
        return new L.DivIcon({                                                                                         // 444
            html: "<div><span>" + cluster.population + "</span></div>",                                                // 445
            className: c,                                                                                              // 446
            iconSize: L.point(iconSize, iconSize)                                                                      // 447
        });                                                                                                            // 448
    },                                                                                                                 // 449
    BuildLeafletMarker: function (marker, position) {                                                                  // 450
        var m = new L.Marker(position);                                                                                // 451
        this.PrepareLeafletMarker(m, marker.data, marker.category);                                                    // 452
        return m;                                                                                                      // 453
    },                                                                                                                 // 454
    PrepareLeafletMarker: function (marker, data, category) {                                                          // 455
        if (data.icon) {                                                                                               // 456
            if (typeof data.icon === 'function') {                                                                     // 457
                marker.setIcon(data.icon(data, category));                                                             // 458
            }                                                                                                          // 459
            else {                                                                                                     // 460
                marker.setIcon(data.icon);                                                                             // 461
            }                                                                                                          // 462
        }                                                                                                              // 463
        if (data.popup) {                                                                                              // 464
            var content = typeof data.popup === 'function' ? data.popup(data, category) : data.popup;                  // 465
            if (marker.getPopup()) {                                                                                   // 466
                marker.setPopupContent(content, data.popupOptions);                                                    // 467
            }                                                                                                          // 468
            else {                                                                                                     // 469
                marker.bindPopup(content, data.popupOptions);                                                          // 470
            }                                                                                                          // 471
        }                                                                                                              // 472
    },                                                                                                                 // 473
    onAdd: function (map) {                                                                                            // 474
        this._map = map;                                                                                               // 475
        map.on('movestart', this._moveStart, this);                                                                    // 476
        map.on('moveend', this._moveEnd, this);                                                                        // 477
        map.on('zoomend', this._zoomStart, this);                                                                      // 478
        map.on('zoomend', this._zoomEnd, this);                                                                        // 479
        this.ProcessView();                                                                                            // 480
        map.addLayer(this.spiderfier);                                                                                 // 481
    },                                                                                                                 // 482
    onRemove: function (map) {                                                                                         // 483
        map.off('movestart', this._moveStart, this);                                                                   // 484
        map.off('moveend', this._moveEnd, this);                                                                       // 485
        map.off('zoomend', this._zoomStart, this);                                                                     // 486
        map.off('zoomend', this._zoomEnd, this);                                                                       // 487
        for (var i = 0, l = this._objectsOnMap.length; i < l; ++i) {                                                   // 488
            map.removeLayer(this._objectsOnMap[i].data._leafletMarker);                                                // 489
        }                                                                                                              // 490
        this._objectsOnMap = [];                                                                                       // 491
        this.Cluster.ResetClusters();                                                                                  // 492
        map.removeLayer(this.spiderfier);                                                                              // 493
        this._map = null;                                                                                              // 494
    },                                                                                                                 // 495
    _moveStart: function () {                                                                                          // 496
        this._moveInProgress = true;                                                                                   // 497
    },                                                                                                                 // 498
    _moveEnd: function (e) {                                                                                           // 499
        this._moveInProgress = false;                                                                                  // 500
        this._hardMove = e.hard;                                                                                       // 501
        this.ProcessView();                                                                                            // 502
    },                                                                                                                 // 503
    _zoomStart: function () {                                                                                          // 504
        this._zoomInProgress = true;                                                                                   // 505
    },                                                                                                                 // 506
    _zoomEnd: function () {                                                                                            // 507
        this._zoomInProgress = false;                                                                                  // 508
        this.ProcessView();                                                                                            // 509
    },                                                                                                                 // 510
    ProcessView: function () {                                                                                         // 511
        var _this = this;                                                                                              // 512
        if (!this._map || this._zoomInProgress || this._moveInProgress) {                                              // 513
            return;                                                                                                    // 514
        }                                                                                                              // 515
        var map = this._map, bounds = map.getBounds(), zoom = map.getZoom(), marginRatio = this.clusterMargin / this.Cluster.Size, resetIcons = this._resetIcons;
        var southWest = bounds.getSouthWest(), northEast = bounds.getNorthEast();                                      // 517
        var clusters = this.Cluster.ProcessView({                                                                      // 518
            minLat: southWest.lat,                                                                                     // 519
            minLng: southWest.lng,                                                                                     // 520
            maxLat: northEast.lat,                                                                                     // 521
            maxLng: northEast.lng                                                                                      // 522
        });                                                                                                            // 523
        var objectsOnMap = this._objectsOnMap, newObjectsOnMap = [], markersOnMap = new Array(objectsOnMap.length);    // 524
        for (var i = 0, l = objectsOnMap.length; i < l; ++i) {                                                         // 525
            var marker = objectsOnMap[i].data._leafletMarker;                                                          // 526
            markersOnMap[i] = marker;                                                                                  // 527
            marker._removeFromMap = true;                                                                              // 528
        }                                                                                                              // 529
        var clusterCreationList = [];                                                                                  // 530
        var opacityUpdateList = [];                                                                                    // 531
        var workingList = [];                                                                                          // 532
        for (i = 0, l = clusters.length; i < l; ++i) {                                                                 // 533
            var icluster = clusters[i], iclusterData = icluster.data;                                                  // 534
            var latMargin = (icluster.bounds.maxLat - icluster.bounds.minLat) * marginRatio, lngMargin = (icluster.bounds.maxLng - icluster.bounds.minLng) * marginRatio;
            for (var j = 0, ll = workingList.length; j < ll; ++j) {                                                    // 536
                var c = workingList[j];                                                                                // 537
                if (c.bounds.maxLng < icluster.bounds.minLng) {                                                        // 538
                    workingList.splice(j, 1);                                                                          // 539
                    --j;                                                                                               // 540
                    --ll;                                                                                              // 541
                    continue;                                                                                          // 542
                }                                                                                                      // 543
                var oldMaxLng = c.averagePosition.lng + lngMargin, oldMinLat = c.averagePosition.lat - latMargin, oldMaxLat = c.averagePosition.lat + latMargin, newMinLng = icluster.averagePosition.lng - lngMargin, newMinLat = icluster.averagePosition.lat - latMargin, newMaxLat = icluster.averagePosition.lat + latMargin;
                if (oldMaxLng > newMinLng && oldMaxLat > newMinLat && oldMinLat < newMaxLat) {                         // 545
                    iclusterData._leafletCollision = true;                                                             // 546
                    c.ApplyCluster(icluster);                                                                          // 547
                    break;                                                                                             // 548
                }                                                                                                      // 549
            }                                                                                                          // 550
            if (!iclusterData._leafletCollision) {                                                                     // 551
                workingList.push(icluster);                                                                            // 552
            }                                                                                                          // 553
        }                                                                                                              // 554
        clusters.forEach(function (cluster) {                                                                          // 555
            var m = undefined;                                                                                         // 556
            var data = cluster.data;                                                                                   // 557
            if (data._leafletCollision) {                                                                              // 558
                data._leafletCollision = false;                                                                        // 559
                data._leafletOldPopulation = 0;                                                                        // 560
                data._leafletOldHashCode = 0;                                                                          // 561
                return;                                                                                                // 562
            }                                                                                                          // 563
            var position = new L.LatLng(cluster.averagePosition.lat, cluster.averagePosition.lng);                     // 564
            var oldMarker = data._leafletMarker;                                                                       // 565
            if (oldMarker) {                                                                                           // 566
                if (cluster.population === 1 && data._leafletOldPopulation === 1 && cluster.hashCode === oldMarker._hashCode) {
                    if (resetIcons || oldMarker._zoomLevel !== zoom || cluster.lastMarker.data.forceIconRedraw) {      // 568
                        _this.PrepareLeafletMarker(oldMarker, cluster.lastMarker.data, cluster.lastMarker.category);   // 569
                        if (cluster.lastMarker.data.forceIconRedraw) {                                                 // 570
                            cluster.lastMarker.data.forceIconRedraw = false;                                           // 571
                        }                                                                                              // 572
                    }                                                                                                  // 573
                    oldMarker.setLatLng(position);                                                                     // 574
                    m = oldMarker;                                                                                     // 575
                }                                                                                                      // 576
                else if (cluster.population > 1 && data._leafletOldPopulation > 1 && (oldMarker._zoomLevel === zoom ||
                    data._leafletPosition.equals(position))) {                                                         // 578
                    oldMarker.setLatLng(position);                                                                     // 579
                    if (resetIcons || cluster.population != data._leafletOldPopulation ||                              // 580
                        cluster.hashCode !== data._leafletOldHashCode) {                                               // 581
                        oldMarker.setIcon(_this.BuildLeafletClusterIcon(cluster));                                     // 582
                    }                                                                                                  // 583
                    data._leafletOldPopulation = cluster.population;                                                   // 584
                    data._leafletOldHashCode = cluster.hashCode;                                                       // 585
                    m = oldMarker;                                                                                     // 586
                }                                                                                                      // 587
            }                                                                                                          // 588
            if (!m) {                                                                                                  // 589
                clusterCreationList.push(cluster);                                                                     // 590
                data._leafletPosition = position;                                                                      // 591
                data._leafletOldPopulation = cluster.population;                                                       // 592
                data._leafletOldHashCode = cluster.hashCode;                                                           // 593
            }                                                                                                          // 594
            else {                                                                                                     // 595
                m._removeFromMap = false;                                                                              // 596
                newObjectsOnMap.push(cluster);                                                                         // 597
                m._zoomLevel = zoom;                                                                                   // 598
                m._hashCode = cluster.hashCode;                                                                        // 599
                m._population = cluster.population;                                                                    // 600
                data._leafletMarker = m;                                                                               // 601
                data._leafletPosition = position;                                                                      // 602
            }                                                                                                          // 603
        });                                                                                                            // 604
        for (i = 0, l = objectsOnMap.length; i < l; ++i) {                                                             // 605
            icluster = objectsOnMap[i];                                                                                // 606
            var idata = icluster.data;                                                                                 // 607
            marker = idata._leafletMarker;                                                                             // 608
            if (idata._leafletMarker._removeFromMap) {                                                                 // 609
                var remove = true;                                                                                     // 610
                if (marker._zoomLevel === zoom) {                                                                      // 611
                    var pa = icluster.averagePosition;                                                                 // 612
                    latMargin = (icluster.bounds.maxLat - icluster.bounds.minLat) * marginRatio,                       // 613
                        lngMargin = (icluster.bounds.maxLng - icluster.bounds.minLng) * marginRatio;                   // 614
                    for (j = 0, ll = clusterCreationList.length; j < ll; ++j) {                                        // 615
                        var jcluster = clusterCreationList[j], jdata = jcluster.data;                                  // 616
                        var pb = jcluster.averagePosition;                                                             // 617
                        var oldMinLng = pa.lng - lngMargin, newMaxLng = pb.lng + lngMargin;                            // 618
                        oldMaxLng = pa.lng + lngMargin;                                                                // 619
                        oldMinLat = pa.lat - latMargin;                                                                // 620
                        oldMaxLat = pa.lat + latMargin;                                                                // 621
                        newMinLng = pb.lng - lngMargin;                                                                // 622
                        newMinLat = pb.lat - latMargin;                                                                // 623
                        newMaxLat = pb.lat + latMargin;                                                                // 624
                        if (oldMaxLng > newMinLng && oldMinLng < newMaxLng && oldMaxLat > newMinLat && oldMinLat < newMaxLat) {
                            if (marker._population === 1 && jcluster.population === 1 &&                               // 626
                                marker._hashCode === jcluster.hashCode) {                                              // 627
                                if (resetIcons || jcluster.lastMarker.data.forceIconRedraw) {                          // 628
                                    this.PrepareLeafletMarker(marker, jcluster.lastMarker.data, jcluster.lastMarker.category);
                                    if (jcluster.lastMarker.data.forceIconRedraw) {                                    // 630
                                        jcluster.lastMarker.data.forceIconRedraw = false;                              // 631
                                    }                                                                                  // 632
                                }                                                                                      // 633
                                marker.setLatLng(jdata._leafletPosition);                                              // 634
                                remove = false;                                                                        // 635
                            }                                                                                          // 636
                            else if (marker._population > 1 && jcluster.population > 1) {                              // 637
                                marker.setLatLng(jdata._leafletPosition);                                              // 638
                                marker.setIcon(this.BuildLeafletClusterIcon(jcluster));                                // 639
                                jdata._leafletOldPopulation = jcluster.population;                                     // 640
                                jdata._leafletOldHashCode = jcluster.hashCode;                                         // 641
                                marker._population = jcluster.population;                                              // 642
                                remove = false;                                                                        // 643
                            }                                                                                          // 644
                            if (!remove) {                                                                             // 645
                                jdata._leafletMarker = marker;                                                         // 646
                                marker._removeFromMap = false;                                                         // 647
                                newObjectsOnMap.push(jcluster);                                                        // 648
                                clusterCreationList.splice(j, 1);                                                      // 649
                                --j;                                                                                   // 650
                                --ll;                                                                                  // 651
                                break;                                                                                 // 652
                            }                                                                                          // 653
                        }                                                                                              // 654
                    }                                                                                                  // 655
                }                                                                                                      // 656
                if (remove) {                                                                                          // 657
                    if (!marker._removeFromMap)                                                                        // 658
                        console.error("wtf");                                                                          // 659
                }                                                                                                      // 660
            }                                                                                                          // 661
        }                                                                                                              // 662
        for (i = 0, l = clusterCreationList.length; i < l; ++i) {                                                      // 663
            icluster = clusterCreationList[i],                                                                         // 664
                idata = icluster.data;                                                                                 // 665
            var iposition = idata._leafletPosition;                                                                    // 666
            var creationMarker;                                                                                        // 667
            if (icluster.population === 1) {                                                                           // 668
                creationMarker = this.BuildLeafletMarker(icluster.lastMarker, iposition);                              // 669
            }                                                                                                          // 670
            else {                                                                                                     // 671
                creationMarker = this.BuildLeafletCluster(icluster, iposition);                                        // 672
            }                                                                                                          // 673
            creationMarker.addTo(map);                                                                                 // 674
            creationMarker.setOpacity(0);                                                                              // 675
            opacityUpdateList.push(creationMarker);                                                                    // 676
            idata._leafletMarker = creationMarker;                                                                     // 677
            creationMarker._zoomLevel = zoom;                                                                          // 678
            creationMarker._hashCode = icluster.hashCode;                                                              // 679
            creationMarker._population = icluster.population;                                                          // 680
            newObjectsOnMap.push(icluster);                                                                            // 681
        }                                                                                                              // 682
        window.setTimeout(function () {                                                                                // 683
            for (i = 0, l = opacityUpdateList.length; i < l; ++i) {                                                    // 684
                var m = opacityUpdateList[i];                                                                          // 685
                if (m._icon)                                                                                           // 686
                    L.DomUtil.addClass(m._icon, "prunecluster-anim");                                                  // 687
                if (m._shadow)                                                                                         // 688
                    L.DomUtil.addClass(m._shadow, "prunecluster-anim");                                                // 689
                m.setOpacity(1);                                                                                       // 690
            }                                                                                                          // 691
        }, 1);                                                                                                         // 692
        if (this._hardMove) {                                                                                          // 693
            for (i = 0, l = markersOnMap.length; i < l; ++i) {                                                         // 694
                marker = markersOnMap[i];                                                                              // 695
                if (marker._removeFromMap) {                                                                           // 696
                    map.removeLayer(marker);                                                                           // 697
                }                                                                                                      // 698
            }                                                                                                          // 699
        }                                                                                                              // 700
        else {                                                                                                         // 701
            if (this._removeTimeoutId !== 0) {                                                                         // 702
                window.clearTimeout(this._removeTimeoutId);                                                            // 703
                for (i = 0, l = this._markersRemoveListTimeout.length; i < l; ++i) {                                   // 704
                    map.removeLayer(this._markersRemoveListTimeout[i]);                                                // 705
                }                                                                                                      // 706
            }                                                                                                          // 707
            var toRemove = [];                                                                                         // 708
            for (i = 0, l = markersOnMap.length; i < l; ++i) {                                                         // 709
                marker = markersOnMap[i];                                                                              // 710
                if (marker._removeFromMap) {                                                                           // 711
                    marker.setOpacity(0);                                                                              // 712
                    toRemove.push(marker);                                                                             // 713
                }                                                                                                      // 714
            }                                                                                                          // 715
            if (toRemove.length > 0) {                                                                                 // 716
                this._removeTimeoutId = window.setTimeout(function () {                                                // 717
                    for (i = 0, l = toRemove.length; i < l; ++i) {                                                     // 718
                        map.removeLayer(toRemove[i]);                                                                  // 719
                    }                                                                                                  // 720
                    _this._removeTimeoutId = 0;                                                                        // 721
                }, 300);                                                                                               // 722
            }                                                                                                          // 723
            this._markersRemoveListTimeout = toRemove;                                                                 // 724
        }                                                                                                              // 725
        this._objectsOnMap = newObjectsOnMap;                                                                          // 726
        this._hardMove = false;                                                                                        // 727
        this._resetIcons = false;                                                                                      // 728
    },                                                                                                                 // 729
    FitBounds: function () {                                                                                           // 730
        var bounds = this.Cluster.ComputeGlobalBounds();                                                               // 731
        if (bounds) {                                                                                                  // 732
            this._map.fitBounds(new L.LatLngBounds(new L.LatLng(bounds.minLat, bounds.maxLng), new L.LatLng(bounds.maxLat, bounds.minLng)));
        }                                                                                                              // 734
    },                                                                                                                 // 735
    GetMarkers: function () {                                                                                          // 736
        return this.Cluster.GetMarkers();                                                                              // 737
    },                                                                                                                 // 738
    RedrawIcons: function (processView) {                                                                              // 739
        if (processView === void 0) { processView = true; }                                                            // 740
        this._resetIcons = true;                                                                                       // 741
        if (processView) {                                                                                             // 742
            this.ProcessView();                                                                                        // 743
        }                                                                                                              // 744
    }                                                                                                                  // 745
});                                                                                                                    // 746
/// <reference path="bower_components/DefinitelyTyped/Leaflet/Leaflet.d.ts"/>                                          // 747
var PruneClusterLeafletSpiderfier = (L.Layer ? L.Layer : L.Class).extend({                                             // 748
    _2PI: Math.PI * 2,                                                                                                 // 749
    _circleFootSeparation: 25,                                                                                         // 750
    _circleStartAngle: Math.PI / 6,                                                                                    // 751
    _spiralFootSeparation: 28,                                                                                         // 752
    _spiralLengthStart: 11,                                                                                            // 753
    _spiralLengthFactor: 5,                                                                                            // 754
    _spiralCountTrigger: 8,                                                                                            // 755
    spiderfyDistanceMultiplier: 1,                                                                                     // 756
    initialize: function (cluster) {                                                                                   // 757
        this._cluster = cluster;                                                                                       // 758
        this._currentMarkers = [];                                                                                     // 759
        this._multiLines = !!L.multiPolyline;                                                                          // 760
        this._lines = this._multiLines ?                                                                               // 761
            L.multiPolyline([], { weight: 1.5, color: '#222' }) :                                                      // 762
            L.polyline([], { weight: 1.5, color: '#222' });                                                            // 763
    },                                                                                                                 // 764
    onAdd: function (map) {                                                                                            // 765
        this._map = map;                                                                                               // 766
        this._map.on('overlappingmarkers', this.Spiderfy, this);                                                       // 767
        this._map.on('click', this.Unspiderfy, this);                                                                  // 768
        this._map.on('zoomend', this.Unspiderfy, this);                                                                // 769
    },                                                                                                                 // 770
    Spiderfy: function (data) {                                                                                        // 771
        var _this = this;                                                                                              // 772
        if (data.cluster !== this._cluster) {                                                                          // 773
            return;                                                                                                    // 774
        }                                                                                                              // 775
        this.Unspiderfy();                                                                                             // 776
        var markers = data.markers.filter(function (marker) {                                                          // 777
            return !marker.filtered;                                                                                   // 778
        });                                                                                                            // 779
        this._currentCenter = data.center;                                                                             // 780
        var centerPoint = this._map.latLngToLayerPoint(data.center);                                                   // 781
        var points;                                                                                                    // 782
        if (markers.length >= this._spiralCountTrigger) {                                                              // 783
            points = this._generatePointsSpiral(markers.length, centerPoint);                                          // 784
        }                                                                                                              // 785
        else {                                                                                                         // 786
            if (this._multiLines) {                                                                                    // 787
                centerPoint.y += 10;                                                                                   // 788
            }                                                                                                          // 789
            points = this._generatePointsCircle(markers.length, centerPoint);                                          // 790
        }                                                                                                              // 791
        var polylines = [];                                                                                            // 792
        var leafletMarkers = [];                                                                                       // 793
        var projectedPoints = [];                                                                                      // 794
        for (var i = 0, l = points.length; i < l; ++i) {                                                               // 795
            var pos = this._map.layerPointToLatLng(points[i]);                                                         // 796
            var m = this._cluster.BuildLeafletMarker(markers[i], data.center);                                         // 797
            m.setZIndexOffset(5000);                                                                                   // 798
            m.setOpacity(0);                                                                                           // 799
            this._currentMarkers.push(m);                                                                              // 800
            this._map.addLayer(m);                                                                                     // 801
            leafletMarkers.push(m);                                                                                    // 802
            projectedPoints.push(pos);                                                                                 // 803
        }                                                                                                              // 804
        window.setTimeout(function () {                                                                                // 805
            for (i = 0, l = points.length; i < l; ++i) {                                                               // 806
                leafletMarkers[i].setLatLng(projectedPoints[i])                                                        // 807
                    .setOpacity(1);                                                                                    // 808
            }                                                                                                          // 809
            var startTime = +new Date();                                                                               // 810
            var interval = 42, duration = 290;                                                                         // 811
            var anim = window.setInterval(function () {                                                                // 812
                polylines = [];                                                                                        // 813
                var now = +new Date();                                                                                 // 814
                var d = now - startTime;                                                                               // 815
                if (d >= duration) {                                                                                   // 816
                    window.clearInterval(anim);                                                                        // 817
                    stepRatio = 1.0;                                                                                   // 818
                }                                                                                                      // 819
                else {                                                                                                 // 820
                    var stepRatio = d / duration;                                                                      // 821
                }                                                                                                      // 822
                var center = data.center;                                                                              // 823
                for (i = 0, l = points.length; i < l; ++i) {                                                           // 824
                    var p = projectedPoints[i], diffLat = p.lat - center.lat, diffLng = p.lng - center.lng;            // 825
                    polylines.push([center, new L.LatLng(center.lat + diffLat * stepRatio, center.lng + diffLng * stepRatio)]);
                }                                                                                                      // 827
                _this._lines.setLatLngs(polylines);                                                                    // 828
            }, interval);                                                                                              // 829
        }, 1);                                                                                                         // 830
        this._lines.setLatLngs(polylines);                                                                             // 831
        this._map.addLayer(this._lines);                                                                               // 832
        if (data.marker) {                                                                                             // 833
            this._clusterMarker = data.marker.setOpacity(0.3);                                                         // 834
        }                                                                                                              // 835
    },                                                                                                                 // 836
    _generatePointsCircle: function (count, centerPt) {                                                                // 837
        var circumference = this.spiderfyDistanceMultiplier * this._circleFootSeparation * (2 + count), legLength = circumference / this._2PI, angleStep = this._2PI / count, res = [], i, angle;
        res.length = count;                                                                                            // 839
        for (i = count - 1; i >= 0; i--) {                                                                             // 840
            angle = this._circleStartAngle + i * angleStep;                                                            // 841
            res[i] = new L.Point(Math.round(centerPt.x + legLength * Math.cos(angle)), Math.round(centerPt.y + legLength * Math.sin(angle)));
        }                                                                                                              // 843
        return res;                                                                                                    // 844
    },                                                                                                                 // 845
    _generatePointsSpiral: function (count, centerPt) {                                                                // 846
        var legLength = this.spiderfyDistanceMultiplier * this._spiralLengthStart, separation = this.spiderfyDistanceMultiplier * this._spiralFootSeparation, lengthFactor = this.spiderfyDistanceMultiplier * this._spiralLengthFactor, angle = 0, res = [], i;
        res.length = count;                                                                                            // 848
        for (i = count - 1; i >= 0; i--) {                                                                             // 849
            angle += separation / legLength + i * 0.0005;                                                              // 850
            res[i] = new L.Point(Math.round(centerPt.x + legLength * Math.cos(angle)), Math.round(centerPt.y + legLength * Math.sin(angle)));
            legLength += this._2PI * lengthFactor / angle;                                                             // 852
        }                                                                                                              // 853
        return res;                                                                                                    // 854
    },                                                                                                                 // 855
    Unspiderfy: function () {                                                                                          // 856
        var _this = this;                                                                                              // 857
        for (var i = 0, l = this._currentMarkers.length; i < l; ++i) {                                                 // 858
            this._currentMarkers[i].setLatLng(this._currentCenter).setOpacity(0);                                      // 859
        }                                                                                                              // 860
        var markers = this._currentMarkers;                                                                            // 861
        window.setTimeout(function () {                                                                                // 862
            for (i = 0, l = markers.length; i < l; ++i) {                                                              // 863
                _this._map.removeLayer(markers[i]);                                                                    // 864
            }                                                                                                          // 865
        }, 300);                                                                                                       // 866
        this._currentMarkers = [];                                                                                     // 867
        this._map.removeLayer(this._lines);                                                                            // 868
        if (this._clusterMarker) {                                                                                     // 869
            this._clusterMarker.setOpacity(1);                                                                         // 870
        }                                                                                                              // 871
    },                                                                                                                 // 872
    onRemove: function (map) {                                                                                         // 873
        this.Unspiderfy();                                                                                             // 874
        map.off('overlappingmarkers', this.Spiderfy, this);                                                            // 875
        map.off('click', this.Unspiderfy, this);                                                                       // 876
        map.off('zoomend', this.Unspiderfy, this);                                                                     // 877
    }                                                                                                                  // 878
});                                                                                                                    // 879
//# sourceMappingURL=PruneCluster.js.map                                                                               // 880
