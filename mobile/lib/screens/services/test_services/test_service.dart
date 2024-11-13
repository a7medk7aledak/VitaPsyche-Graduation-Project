import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/screens/services/test_services/do_test.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../const/colors.dart';
import '../../../const/const_image.dart';
import '../../../widgets/custem_button_back.dart';
import '../../../screens/services/test_services/req_json_text.dart';

class TestService extends StatefulWidget {
  const TestService({super.key});
  static String id = 'test';

  @override
  State<TestService> createState() => _TestServiceState();
}

class _TestServiceState extends State<TestService> {
  final String _data = '''
These critical tests help to understand the personality of the person better, as they give an idea about the personality and some indications of the current psychological state. But you should know an expert after getting the results because the tests are not a substitute for him.
  ''';

  List<dynamic> testModels = [];

  @override
  void initState() {
    super.initState();
    _loadTests();
  }

  Future<void> _loadTests() async {
    try {
      // Load all tests
      // final adhd = await ReqJsonText.loadADHDTestData();
      final beck = await ReqJsonText.loadBeckDepressionInventoryData();
      final conner = await ReqJsonText.loadConnerTestData();
      final davidson = await ReqJsonText.loadDavidsonTraumaScaleData();
      final internet = await ReqJsonText.loadInternetAddictionScaleData();
      final personality = await ReqJsonText.loadPersonalityDisordersTestData();
      final taylor = await ReqJsonText.loadTaylorAnxietyScaleData();
      final yale =
          await ReqJsonText.loadYaleBrownObsessiveCompulsiveScaleData();

      setState(() {
        testModels = [
          // {'title': 'Beck Depression Inventory', 'model': adhd},
          {'title': 'Beck Depression Inventory', 'model': beck},
          {'title': 'Conner', 'model': conner},
          {'title': 'Davidson Trauma Scale', 'model': davidson},
          {'title': 'Internet Addiction Scale', 'model': internet},
          {'title': 'Personality Disorders Test', 'model': personality},
          {'title': 'Taylor Anxiety Scale', 'model': taylor},
          {'title': 'Yale Brown Obsessive Compulsive Scale', 'model': yale},
        ];
      });
    } catch (e) {
      print("Error loading tests: $e");
    }
  }

  Widget _testCard(BuildContext _,
      {required String title,
      required int questionCount,
      required dynamic model}) {
    final questions = model?.questions ?? []; // Fallback to empty list if null

    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12.5),
        border: Border.all(
          width: 2,
          color: Colors.black,
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            Row(
              children: [
                Image.asset(ConstImage.sadIdea),
                SizedBox(
                  width: 10.w,
                ),
                FittedBox(
                  child: Text(
                    title,
                    style: const TextStyle(
                      color: textMainColor,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Text(
                  '$questionCount questions',
                  style: const TextStyle(
                    color: Colors.grey,
                    fontSize: 16,
                    fontWeight: FontWeight.w400,
                  ),
                ),
                const Text(
                  'every 2 weeks',
                  style: TextStyle(
                    color: Colors.grey,
                    fontSize: 16,
                    fontWeight: FontWeight.w400,
                  ),
                ),
              ],
            ),
            Padding(
              padding:
                  const EdgeInsets.symmetric(horizontal: 10, vertical: 12).w,
              child: SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: button2Color,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12.5).r,
                    ),
                  ),
                  onPressed: () {
                    if (questions.isNotEmpty) {
                      final scoring = model.scoring ?? {};
                      print("Model for $title: $model");
                      print("Scoring for $title: ${model.scoring}");
// Ensure scoring is not null
                      Navigator.pushNamed(
                        _,
                        DoTest.id,
                        arguments: {
                          'testTitle': title,
                          'model': model,
                          'scoring': scoring, // Pass scoring safely
                        },
                      );
                    } else {
                      print("No questions available.");
                    }
                  },
                  child: Text(
                    'Take the test',
                    style: TextStyle(color: secoundryColor, fontSize: 20.sp),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: custemButtonBack(context),
        titleSpacing: 0,
        backgroundColor: primaryColor,
        title: Row(
          children: [
            Image.asset(
              logoApp,
              height: 60.h,
              width: 50.w,
              fit: BoxFit.cover,
            ),
            Padding(
              padding: const EdgeInsets.only(left: 4).w,
              child: Text(
                'Tests',
                style: TextStyle(
                  color: secoundryColor,
                  fontSize: 26.sp,
                ),
              ),
            )
          ],
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16).w,
          child: Column(
            children: [
              Text(
                _data,
                softWrap: true,
                style: const TextStyle(
                    color: textThirdColor,
                    fontWeight: FontWeight.bold,
                    fontSize: 14),
              ),
              const Row(
                children: [
                  Icon(Icons.done_outline_outlined),
                  SizedBox(width: 10),
                  Text(
                    'All tests are documented',
                    style: TextStyle(
                        color: textThirdColor,
                        fontWeight: FontWeight.bold,
                        fontSize: 14),
                  )
                ],
              ),
              SizedBox(height: 12.h),
              ListView.separated(
                separatorBuilder: (context, index) => SizedBox(height: 6.h),
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: testModels.length,
                itemBuilder: (context, index) {
                  final testModel = testModels[index];
                  final title = testModel['title'] as String;
                  final model = testModel['model'];
                  final questionCount = model.questions.length;
                  return _testCard(context,
                      title: title, questionCount: questionCount, model: model);
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
