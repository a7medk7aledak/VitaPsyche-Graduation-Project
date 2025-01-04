import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_mindmed_project/features/test/data/test.dart';

class ReqTest {
  static const String kDavidsonTraumaScaleDSMIVEn = 'assets/json/test/free_tests/DavidsonTraumaScaleDSMIVEn.json';
  static const String kADHDandImpulsivityDiagnosisScale = 'assets/json/test/free_tests/ADHDandImpulsivityDiagnosisScale.json';
  static const String kBeckDepressionInventoryEn = 'assets/json/test/free_tests/BeckDepressionInventoryEn.json';
  static const String kInternetAddictionScale = 'assets/json/test/free_tests/InternetAddictionScale.json';
  static const String kTaylorAnxietyScale = 'assets/json/test/free_tests/TaylorAnxietyScale.json';
  static const String kYaleBrownObsessiveCompulsiveScale = 'assets/json/test/free_tests/YaleBrownObsessiveCompulsiveScale.json';
  static const String kConnersTest = 'assets/json/test/paid_tests/ConnersTest.json';
  static const String kDisorderTest = 'assets/json/test/paid_tests/DisorderTest.json';
  static const String kPersonalityDisordersTest = 'assets/json/test/paid_tests/PersonalityDisordersTest.json';

  // This method now accepts a dynamic path to load a specific test
  static Future<Test> loadTest(String testPath) async {
    try {
      // Load the JSON file from the specified path
      final String jsonString = await rootBundle.loadString(testPath);
      final Map<String, dynamic> jsonData = json.decode(jsonString);
      
      // Convert the JSON into a Test object
      return Test.fromJson(jsonData);
    } catch (e) {
      debugPrint('Error loading test data from $testPath: $e');
      rethrow;
    }
  }
}
