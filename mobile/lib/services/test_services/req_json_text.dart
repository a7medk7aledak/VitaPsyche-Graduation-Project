import 'dart:convert';
import 'package:flutter/services.dart';
import 'package:flutter_mindmed_project/models/model__of_test/asset_path.dart';
import 'package:flutter_mindmed_project/models/model__of_test/piad/conner.dart';
import '../../models/model__of_test/free/adhd.dart' as adhd;
import '../../models/model__of_test/free/beck_depression_inventory.dart';
import '../../models/model__of_test/free/davidson_trauma.dart';
import '../../models/model__of_test/free/internet_addiction.dart';
import '../../models/model__of_test/free/taylor_anxiety.dart';
import '../../models/model__of_test/free/ybocs.dart';
import '../../models/model__of_test/piad/depression.dart';
class ReqJsonText {
  // Generic method to load data from JSON
  static Future<T> loadTestData<T>(String assetPath, T Function(Map<String, dynamic>) fromJson) async {
    try {
      // Load the string from the asset file
      String jsonString = await rootBundle.loadString(assetPath);

      // Decode the JSON string into a map
      Map<String, dynamic> jsonData = json.decode(jsonString);

      // Use the fromJson function to parse the JSON into the specific model
      return fromJson(jsonData);
    } catch (e) {
      rethrow; //! Re-throw the error to handle it elsewhere
    }
  }

  // Specific test methods using the generic method

  static Future<List<adhd.Question>> loadADHDTestData() async {
    return loadTestData(
      AssetPath.kADHDandImpulsivityDiagnosisScale,
      (jsonData) => adhd.ADHDDiagnosisScale.fromJson(jsonData).getAllQuestions(),
    );
  }

  static Future<BeckDepressionInventory> loadBeckDepressionInventoryData() async {
    return loadTestData(
      AssetPath.kBeckDepressionInventoryEn,
      BeckDepressionInventory.fromJson,
    );
  }

  static Future<ConnersTest> loadConnerTestData() async {
    return loadTestData(
      AssetPath.kConnersTest,
      ConnersTest.fromJson,
    );
  }

  static Future<DavidsonTraumaScale> loadDavidsonTraumaScaleData() async {
    return loadTestData(
      AssetPath.kDavidsonTraumaScaleDSMIVEn,
      DavidsonTraumaScale.fromJson,
    );
  }

  static Future<DepressionTest> loadDepressionTestData() async {
    return loadTestData(
      AssetPath.kDisorderTest,
      DepressionTest.fromJson,
    );
  }

  static Future<InternetAddictionScale> loadInternetAddictionScaleData() async {
    return loadTestData(
      AssetPath.kInternetAddictionScale,
      InternetAddictionScale.fromJson,
    );
  }

  static Future<TaylorAnxietyScale> loadTaylorAnxietyScaleData() async {
    return loadTestData(
      AssetPath.kTaylorAnxietyScale,
      TaylorAnxietyScale.fromJson,
    );
  }

  static Future<YBOCS> loadYaleBrownObsessiveCompulsiveScaleData() async {
    return loadTestData(
      AssetPath.kYaleBrownObsessiveCompulsiveScale,
      YBOCS.fromJson,
    );
  }
}
