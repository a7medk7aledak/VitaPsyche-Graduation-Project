import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../core/theme/colors.dart';
import '../../data/req_test.dart';
import '../../data/test.dart';
import '../widget/test_card.dart';

class TestScreen extends StatefulWidget {
  const TestScreen({super.key});

  @override
  _TestScreenState createState() => _TestScreenState();
}

class _TestScreenState extends State<TestScreen> {
  late Future<List<Test>> _testsFuture; // متغير لتحميل جميع البيانات مسبقًا

  // قائمة الاختبارات مع العناوين والمسارات
  final List<Map<String, dynamic>> dummyTests = [
    {
      'title': 'Davidson Trauma Scale',
      'filePath': ReqTest.kDavidsonTraumaScaleDSMIVEn
    },
    {
      'title': 'ADHD Test',
      'filePath': ReqTest.kADHDandImpulsivityDiagnosisScale
    },
    {
      'title': 'Beck Depression Inventory',
      'filePath': ReqTest.kBeckDepressionInventoryEn
    },
    {
      'title': 'Internet Addiction Scale',
      'filePath': ReqTest.kInternetAddictionScale
    },
    {'title': 'Disorder Test', 'filePath': ReqTest.kDisorderTest},
    {'title': 'Taylor Anxiety Scale', 'filePath': ReqTest.kTaylorAnxietyScale},
    {
      'title': 'Yale-Brown Obsessive Compulsive Scale',
      'filePath': ReqTest.kYaleBrownObsessiveCompulsiveScale
    },
    {
      'title': 'Personality Disorders Test',
      'filePath': ReqTest.kPersonalityDisordersTest
    },
    {'title': 'Conners Test', 'filePath': ReqTest.kConnersTest},
  ];

  @override
  void initState() {
    super.initState();
    _testsFuture = _loadAllTests(); // تحميل جميع الاختبارات عند إنشاء الشاشة
  }

  // تحميل جميع الاختبارات مرة واحدة
  Future<List<Test>> _loadAllTests() async {
    List<Test> tests = [];
    for (var testData in dummyTests) {
      try {
        Test test = await ReqTest.loadTest(testData['filePath']);
        tests.add(test);
      } catch (e) {
        debugPrint('Error loading test: ${testData['title']} -> $e');
      }
    }
    return tests;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: secoundryColor,
      appBar: _buildAppBar(),
      body: FutureBuilder<List<Test>>(
        future: _testsFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
                child: CircularProgressIndicator()); // عرض التحميل
          } else if (snapshot.hasError) {
            return Center(
                child: Text('Error loading tests: ${snapshot.error}'));
          } else if (snapshot.hasData) {
            final tests = snapshot.data!;
            return _buildTestsList(tests);
          } else {
            return const Center(child: Text('No tests available.'));
          }
        },
      ),
    );
  }

  // بناء قائمة الاختبارات
  Widget _buildTestsList(List<Test> tests) {
    return SingleChildScrollView(
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: 16.w),
        child: Column(
          children: [
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: tests.length,
              itemBuilder: (context, index) {
                final test = tests[index];
                return TestCard(
                  test: test,
                  title: test.testTitle, // عرض عنوان الاختبار
                  questionCount: test.questions.length, // عدد الأسئلة
                  isPayment: test.payment,
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      foregroundColor: primaryColor,
      backgroundColor: secoundryColor,
      centerTitle: true,
      title: Text(
        'Tests',
        style: TextStyle(
          color: primaryColor,
          fontSize: 26.sp,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}
