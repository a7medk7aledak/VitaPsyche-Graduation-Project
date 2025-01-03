import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/core/routes/app_routes.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../controller/test_route_agruments.dart';
import '../../controller/text_controller.dart';
import '../../../../core/theme/colors.dart';
import '../widget/button_bar_text.dart';

class DoTest extends StatefulWidget {
  const DoTest({super.key});

  @override
  State<DoTest> createState() => _DoTestState();
}

class _DoTestState extends State<DoTest> {
  late String testTitle;
  late dynamic model;
  late TextController _textController;
  int? _character;
  int totalScore = 0;
  List<int> answers = [];
  bool _isInitialized = false;

  final String _description =
      "Please read the test items carefully and make sure that the choices apply to you in the last two weeks. There is no right or wrong answer, and you do not need to spend a long time answering them.";

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (!_isInitialized) {
      _initializeData();
    }
  }

  void _initializeData() {
    // استخدام TestRouteArguments للحصول على البيانات
    final args = TestRouteArguments.fromMap(
      ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>? ?? {},
    );

    // التحقق من وجود البيانات المطلوبة
    if (args.testTitle.isNotEmpty && args.model != null) {
      testTitle = args.testTitle;
      model = args.model;
      _textController = TextController(totalQuestions: model.questions.length);

      // Set up stream listener
      _textController.positionStream.listen((_) {
        if (mounted) {
          setState(() {
            _character = null;
            _textController.isNextOrPrev = false;
          });
        }
      });

      _isInitialized = true;
    }
  }

  @override
  void dispose() {
    if (_isInitialized) {
      _textController.dispose();
    }
    super.dispose();
  }

  void calculateScore() {
    totalScore = answers.fold(0, (prev, score) => prev + score);
  }

  void goToResult() {
    calculateScore();
    Navigator.pushNamed(
      context,
      AppRoutes.depressionScaleResult,
      arguments: {
        'totalScore': totalScore,
      },
    );
  }

  void handleAnswerSelection() {
    if (_character != null) {
      answers.add(_character!);
      _textController.updateResponse(_character!);
    }
    setState(() {
      _character = null;
      _textController.isNextOrPrev = true;
    });
  }

  void onNextTap() {
    if (_character == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Please select an answer before proceeding."),
        ),
      );
      return;
    }

    handleAnswerSelection();

    if (answers.length == model.questions.length) {
      goToResult();
    } else {
      _textController.onTapNext(
        context,
        testTitle: testTitle,
        scoring: model.scoring,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (!_isInitialized) {
      return Scaffold(
        body: Center(
          child: Text(
            "Missing required arguments",
            style: TextStyle(fontSize: 18.sp, color: Colors.red),
          ),
        ),
      );
    }

    return Scaffold(
      backgroundColor: secoundryColor,
      appBar: AppBar(
        foregroundColor: primaryColor,
        titleSpacing: 0,
        centerTitle: true,
        backgroundColor: secoundryColor,
        title: Text(
          'Depression Scale',
          style: TextStyle(color: primaryColor, fontSize: 16.sp),
        ),
      ),
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 12.w),
        child: Column(
          children: [
            Column(
              children: [
                SizedBox(height: 10.h),
                _detailsTest(),
                _testQuestions(),
              ],
            ),
            Spacer(),
            CustomButtonBarOnboardingScreen(
              dotsCount: model.questions.length,
              onTapDotIndicator: _textController.onTapDotIndicator,
              outputDotIndicator: _textController.positionStream,
              outputDotTextStart: _textController.positionStream,
              onTapNext: onNextTap,
              onTapSkip: () {
                handleAnswerSelection();
                _textController.onTapPrev();
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _detailsTest() {
    return Text(
      _description,
      textAlign: TextAlign.center,
      style: TextStyle(
        color: textThirdColor,
        fontSize: 12.sp,
        fontWeight: FontWeight.bold,
      ),
    );
  }

  Widget _testQuestions() {
    return StreamBuilder<int>(
      stream: _textController.positionStream,
      initialData: _textController.currentPositionPage,
      builder: (context, snapshot) {
        int index = snapshot.data ?? 0;
        return IndexedStack(
          index: index,
          children: List.generate(
            model.questions.length,
            (i) => _questionItem(i),
          ),
        );
      },
    );
  }

  Widget _questionItem(int indexValue) {
    List choices = model.questions[indexValue].choices;

    return Padding(
      padding: EdgeInsets.symmetric(vertical: 10.h),
      child: Column(
        children: [
          Padding(
            padding: EdgeInsets.only(bottom: 10.h),
            child: Text(
              model.questions[indexValue].questionText,
              style: TextStyle(
                wordSpacing: 0.1,
                color: textMainColor,
                fontSize: 18.sp,
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.center,
              softWrap: true,
            ),
          ),
          ...choices.map(
            (choice) => Padding(
              padding: EdgeInsets.symmetric(vertical: 5.h),
              child: GestureDetector(
                onTap: () {
                  setState(() {
                    _character = choice.score;
                  });
                },
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(30.r),
                    color: _character == choice.score
                        ? Colors.grey[300]
                        : Colors.transparent,
                    border: Border.all(color: primaryColor, width: 2),
                  ),
                  child: Padding(
                    padding: EdgeInsets.symmetric(
                      vertical: 10.h,
                    ),
                    child: Center(
                      child: Text(
                        choice.text,
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.black,
                          fontWeight: FontWeight.bold,
                          fontSize: 12.sp,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
