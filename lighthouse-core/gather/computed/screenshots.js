/**
 * @license
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const ComputedArtifact = require('./computed-artifact');
const DevtoolsTimelineModel = require('../../lib/traces/devtools-timeline-model');

class ScreenshotFilmstrip extends ComputedArtifact {

  get name() {
    return 'Screenshots';
  }

  fetchScreenshot(frame) {
    return frame
      .imageDataPromise()
      .then(data => 'data:image/jpg;base64,' + data);
  }

  /**
   * @param {!Array<!Object>} traceData
   * @return {!Promise}
  */
  getScreenshots(traceData) {
    // if (this.cache) {
    //   return this.cache;
    // }

    const model = new DevtoolsTimelineModel(traceData);
    const filmStripFrames = model.filmStripModel().frames();

    const frameFetches = filmStripFrames.map(frame => this.fetchScreenshot(frame));
    return Promise.all(frameFetches).then(images => {
      const result = filmStripFrames.map((frame, i) => ({
        timestamp: frame.timestamp,
        datauri: images[i]
      }));
      this.cache = result;
      return result;
    });
  }

  request(trace) {
    return this.getScreenshots(trace);
  }
}

module.exports = ScreenshotFilmstrip;