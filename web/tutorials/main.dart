// Copyright (c) 2016, SnowGremlin. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

library ThreeDart.web.tutorials;

import 'dart:html' as html;
import 'dart:convert' as convert;

import 'package:ThreeDart/Tokenizer.dart' as Tokenizer;

part 'shellPage.dart';

part 'page0.dart';

void main() {
  try {
    page0();
  } catch (ex) {
    print(ex);
  }
}
