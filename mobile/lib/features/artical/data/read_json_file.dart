import 'dart:convert';

import 'package:flutter/services.dart' as root_bundle;

class ReadJsonFile {
  static Future<List<dynamic>> readJsonData({required String path}) async {
    final jsonData = await root_bundle.rootBundle.loadString(path);
    final data = jsonDecode(jsonData);
    return data;
  }
}
