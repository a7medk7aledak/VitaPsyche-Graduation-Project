import 'dart:convert';

import 'package:flutter/services.dart';

import '../../../models/modelsoftest/adhd.dart';
import '../../../models/modelsoftest/beck_depression_inventory.dart';
import '../../../models/modelsoftest/conner_test.dart';
import '../../../models/modelsoftest/davidson_trauma_scale.dart';
import '../../../models/modelsoftest/depression_test.dart';
import '../../../models/modelsoftest/internet_addiction_scale.dart';
import '../../../models/modelsoftest/personality_disorders_test.dart';
import '../../../models/modelsoftest/question.dart';
import '../../../models/modelsoftest/taylor_anxiety_scale.dart';
import '../../../models/modelsoftest/yale_brown_obsessive_compulsive_scale.dart';

class ReqJsonText {
//ADHDTest
  static Future<List<Question>> loadADHDTestData() async {
    try {
      print("Attempting to load FAQ data... ADHDTest");

      //* Load the string from the asset file
      String jsonString = await rootBundle.loadString(
          'assets/json/json_text/ADHDandImpulsivityDiagnosisScale.json');

      print("JSON string loaded:ADHDTest ");

      //* Decode the JSON string into a map
      Map<String, dynamic> jsonData = json.decode(jsonString);

      print("Data loaded from JSON:ADHDTest done ");

      ADHDTest adhdTest =
          ADHDTest.fromJson(jsonData); // Assuming jsonData is your JSON data
      List<Question> allQuestions = adhdTest.getAllQuestions();
      return allQuestions; // Pass the decoded map directly
    } catch (e) {
      print("Error occurred while loading or decoding JSON:ADHDTest $e");
      rethrow; //! Re-throw the error so it can be handled elsewhere
    }
  }

  //BeckDepressionInventory
  static Future<BeckDepressionInventory>
      loadBeckDepressionInventoryData() async {
    try {
      print("Attempting to load FAQ data... BeckDepressionInventory");

      //* Load the string from the asset file
      String jsonString = await rootBundle
          .loadString('assets/json/json_text/BeckDepressionInventoryEn.json');

      print("JSON string loaded:BeckDepressionInventory ");

      //* Decode the JSON string into a map
      Map<String, dynamic> jsonData = json.decode(jsonString);

      print("Data loaded from JSON:BeckDepressionInventory done ");

      return BeckDepressionInventory.fromJson(
          jsonData); // Pass the decoded map directly
    } catch (e) {
      print(
          "Error occurred while loading or decoding JSON:BeckDepressionInventory $e");
      rethrow; //! Re-throw the error so it can be handled elsewhere
    }
  }

  //ConnerTest
  static Future<ConnerTest> loadConnerTestData() async {
    try {
      print("Attempting to load FAQ data...loadConnerTestData");

      //* Load the string from the asset file
      String jsonString =
          await rootBundle.loadString('assets/json/json_text/ConnersTest.json');

      print("JSON string loaded: loadConnerTestData");

      //* Decode the JSON string into a map
      Map<String, dynamic> jsonData = json.decode(jsonString);

      print("Data loaded from JSON:loadConnerTestData done");

      return ConnerTest.fromJson(jsonData); // Pass the decoded map directly
    } catch (e) {
      print(
          "Error occurred while loading or decoding JSON:loadConnerTestData error $e");
      rethrow; //! Re-throw the error so it can be handled elsewhere
    }
  }

  //DavidsonTraumaScale
  static Future<DavidsonTraumaScale> loadDavidsonTraumaScaleData() async {
    try {
      print("Attempting to load FAQ data...DavidsonTraumaScale");

      //* Load the string from the asset file
      String jsonString = await rootBundle
          .loadString('assets/json/json_text/DavidsonTraumaScaleDSMIVEn.json');

      print("JSON string loaded:DavidsonTraumaScale ");

      //* Decode the JSON string into a map
      Map<String, dynamic> jsonData = json.decode(jsonString);

      print("Data loaded from JSON:DavidsonTraumaScale done ");

      return DavidsonTraumaScale.fromJson(
          jsonData); // Pass the decoded map directly
    } catch (e) {
      print(
          "Error occurred while loading or decoding JSON:DavidsonTraumaScale erroe $e");
      rethrow; //! Re-throw the error so it can be handled elsewhere
    }
  }

  //DepressionTest
  static Future<DepressionTest> loadDepressionTestData() async {
    try {
      print("Attempting to load FAQ data...loadDepressionTestData");

      //* Load the string from the asset file
      String jsonString = await rootBundle
          .loadString('assets/json/json_text/DisorderTest.json');

      print("JSON string loaded:loadDepressionTestData ");

      //* Decode the JSON string into a map
      Map<String, dynamic> jsonData = json.decode(jsonString);

      print("Data loaded from JSON:loadDepressionTestData done ");

      return DepressionTest.fromJson(jsonData); // Pass the decoded map directly
    } catch (e) {
      print(
          "Error occurred while loading or decoding JSON: loadDepressionTestData error$e");
      rethrow; //! Re-throw the error so it can be handled elsewhere
    }
  }

  //InternetAddictionScale
  static Future<InternetAddictionScale> loadInternetAddictionScaleData() async {
    try {
      print("Attempting to load FAQ data...loadInternetAddictionScaleData");

      //* Load the string from the asset file
      String jsonString = await rootBundle
          .loadString('assets/json/json_text/InternetAddictionScale.json');

      print("JSON string loaded: loadInternetAddictionScaleData");

      //* Decode the JSON string into a map
      Map<String, dynamic> jsonData = json.decode(jsonString);

      print("Data loaded from JSON:loadInternetAddictionScaleData done ");

      return InternetAddictionScale.fromJson(
          jsonData); // Pass the decoded map directly
    } catch (e) {
      print(
          "Error occurred while loading or decoding JSON:loadInternetAddictionScaleData error $e");
      rethrow; //! Re-throw the error so it can be handled elsewhere
    }
  }

  //PersonalityDisordersTest
  static Future<PersonalityDisordersTest>
      loadPersonalityDisordersTestData() async {
    try {
      print("Attempting to load FAQ data...loadPersonalityDisordersTestData");

      //* Load the string from the asset file
      String jsonString = await rootBundle
          .loadString('assets/json/json_text/PersonalityDisordersTest.json');

      print("JSON string loaded: loadPersonalityDisordersTestData");

      //* Decode the JSON string into a map
      Map<String, dynamic> jsonData = json.decode(jsonString);

      print("Data loaded from JSON:loadPersonalityDisordersTestData done ");

      return PersonalityDisordersTest.fromJson(
          jsonData); // Pass the decoded map directly
    } catch (e) {
      print(
          "Error occurred while loading or decoding JSON:loadPersonalityDisordersTestData error $e");
      rethrow; //! Re-throw the error so it can be handled elsewhere
    }
  }

  //TaylorAnxietyScale
  static Future<TaylorAnxietyScale> loadTaylorAnxietyScaleData() async {
    try {
      print("Attempting to load FAQ data...loadTaylorAnxietyScaleData");

      //* Load the string from the asset file
      String jsonString = await rootBundle
          .loadString('assets/json/json_text/TaylorAnxietyScale.json');

      print("JSON string loaded: loadTaylorAnxietyScaleData");

      //* Decode the JSON string into a map
      Map<String, dynamic> jsonData = json.decode(jsonString);

      print("Data loaded from JSON:loadTaylorAnxietyScaleData done ");

      return TaylorAnxietyScale.fromJson(
          jsonData); // Pass the decoded map directly
    } catch (e) {
      print(
          "Error occurred while loading or decoding JSON:loadTaylorAnxietyScaleData error $e");
      rethrow; //! Re-throw the error so it can be handled elsewhere
    }
  }

  //YaleBrownObsessiveCompulsiveScale
  static Future<YaleBrownObsessiveCompulsiveScale>
      loadYaleBrownObsessiveCompulsiveScaleData() async {
    try {
      print(
          "Attempting to load FAQ data...loadYaleBrownObsessiveCompulsiveScaleData");

      //* Load the string from the asset file
      String jsonString = await rootBundle.loadString(
          'assets/json/json_text/YaleBrownObsessiveCompulsiveScale.json');

      print("JSON string loaded:loadYaleBrownObsessiveCompulsiveScaleData ");

      //* Decode the JSON string into a map
      Map<String, dynamic> jsonData = json.decode(jsonString);

      print(
          "Data loaded from JSON:loadYaleBrownObsessiveCompulsiveScaleData done ");

      return YaleBrownObsessiveCompulsiveScale.fromJson(
          jsonData); // Pass the decoded map directly
    } catch (e) {
      print(
          "Error occurred while loading or decoding JSON:loadYaleBrownObsessiveCompulsiveScaleData erroe $e");
      rethrow; //! Re-throw the error so it can be handled elsewhere
    }
  }
}
