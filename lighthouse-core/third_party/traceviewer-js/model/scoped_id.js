/**
Copyright (c) 2016 The Chromium Authors. All rights reserved.
Use of this source code is governed by a BSD-style license that can be
found in the LICENSE file.
**/

require("../base/base.js");
require("./constants.js");

'use strict';

global.tr.exportTo('tr.model', function() {
  function ScopedId(scope, id) {
    if (scope === undefined) {
      throw new Error('Scope should be defined. Use \'' +
                      tr.model.OBJECT_DEFAULT_SCOPE +
                      '\' as the default scope.');
    }
    this.scope = scope;
    this.id = id;
  }

  ScopedId.prototype = {
    toString: function() {
      return '{scope: ' + this.scope + ', id: ' + this.id + '}';
    }
  };

  return {
    ScopedId: ScopedId
  };
});
