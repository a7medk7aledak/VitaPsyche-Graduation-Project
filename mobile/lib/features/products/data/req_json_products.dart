import 'dart:convert';
import 'package:flutter/services.dart';

class ReqJsonProducts {
  static Future<List<dynamic>> readJsonData({required String path}) async {
    final String response = await rootBundle.loadString(path);
    final data = json.decode(response);

    if (data is List) {
      // If the root of the JSON is a list
      return data;
    } else if (data is Map<String, dynamic> && data.containsKey('products')) {
      // If the root of the JSON is a map and contains a "products" key
      return data['products'] as List<dynamic>;
    } else {
      throw Exception("Unexpected JSON format");
    }
  }
}
