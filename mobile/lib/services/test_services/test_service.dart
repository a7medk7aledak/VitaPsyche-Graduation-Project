import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/services/test_services/do_test.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../const/colors.dart';
import '../../const/const_image.dart';
import 'req_json_text.dart';

class TestService extends StatefulWidget {
  const TestService({super.key});
  static const String id = 'test';

  @override
  State<TestService> createState() => _TestServiceState();
}

class _TestServiceState extends State<TestService> {
  final String _data = '''
These critical tests help to understand the personality of the person better, as they give an idea about the personality and some indications of the current psychological state. But you should know an expert after getting the results because the tests are not a substitute for him.
  ''';

  List<dynamic> testModels = [];
  bool isLoading = true;
  String errorMessage = '';

  @override
  void initState() {
    super.initState();
    _loadTests();
  }

  Future<void> _loadTests() async {
    try {
      setState(() {
        isLoading = true;
      });

      final beck = await ReqJsonText.loadBeckDepressionInventoryData();
      final conner = await ReqJsonText.loadConnerTestData();
      final davidson = await ReqJsonText.loadDavidsonTraumaScaleData();
      final internet = await ReqJsonText.loadInternetAddictionScaleData();
      final taylor = await ReqJsonText.loadTaylorAnxietyScaleData();
      final yale =
          await ReqJsonText.loadYaleBrownObsessiveCompulsiveScaleData();

      setState(() {
        testModels = [
          {'title': 'Beck Depression Inventory', 'model': beck},
          {'title': 'Conner', 'model': conner},
          {'title': 'Davidson Trauma ', 'model': davidson},
          {'title': 'Internet Addiction ', 'model': internet},
          {'title': 'Taylor Anxiety ', 'model': taylor},
          {'title': 'Yale Brown Obsessive ', 'model': yale},
        ];
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        errorMessage = 'Failed to load tests: $e';
        isLoading = false;
      });
    }
  }

  Widget _testCard(BuildContext context,
      {required String title,
      required int questionCount,
      required dynamic model}) {
    final questions = model?.questions ?? [];

    return Card(
      color: secoundryColor,
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            Row(
              children: [
                Image.asset(ConstImage.sadIdea),
                SizedBox(width: 10.w),
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
                      Navigator.pushNamed(
                        context,
                        DoTest.id,
                        arguments: {
                          'testTitle': title,
                          'model': model,
                          'scoring': scoring,
                        },
                      );
                    } else {
                      print("No questions available.");
                    }
                  },
                  child: Text(
                    'take the test',
                    style: TextStyle(color: secoundryColor, fontSize: 16.sp),
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
      backgroundColor: secoundryColor,
      appBar: AppBar(
        foregroundColor: primaryColor,
        backgroundColor: secoundryColor,
        centerTitle: true,
        title: Text(
          'Tests',
          style: TextStyle(
            color: primaryColor,
            fontSize: 26.sp,
          ),
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
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: textThirdColor,
                  fontWeight: FontWeight.bold,
                  fontSize: 12.sp,
                ),
              ),
              const Row(
                children: [
                  Icon(
                    Icons.done_outline_outlined,
                    color: primaryColor,
                  ),
                  SizedBox(width: 10),
                  Text(
                    'All tests are documented',
                    style: TextStyle(
                      color: primaryColor,
                      fontWeight: FontWeight.bold,
                      fontSize: 14,
                    ),
                  )
                ],
              ),
              SizedBox(height: 12.h),
              isLoading
                  ? const Center(child: CircularProgressIndicator())
                  : errorMessage.isNotEmpty
                      ? Text(errorMessage,
                          style: const TextStyle(color: Colors.red))
                      : ListView.separated(
                          separatorBuilder: (context, index) =>
                              SizedBox(height: 6.h),
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          itemCount: testModels.length,
                          itemBuilder: (context, index) {
                            final testModel = testModels[index];
                            final title = testModel['title'] as String;
                            final model = testModel['model'];
                            final questionCount = model.questions.length;
                            return _testCard(context,
                                title: title,
                                questionCount: questionCount,
                                model: model);
                          },
                        ),
            ],
          ),
        ),
      ),
    );
  }
}
