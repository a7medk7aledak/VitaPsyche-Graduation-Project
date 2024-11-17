import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/screens/services/test_services/result_text.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../models/modelsoftest/question.dart';
import 'text_controller.dart';
import '../../../const/colors.dart';
import '../../../const/const_image.dart';
import '../../../widgets/custem_button_back.dart';
import 'button_bar_text.dart';

class DoTest extends StatefulWidget {
  const DoTest({super.key});
  static const String id = 'doText';

  @override
  State<DoTest> createState() => _DoTestState();
}

class _DoTestState extends State<DoTest> {
  late String testTitle;
  late dynamic model;

  final String _description =
      "Please read the test items carefully and make sure that the choices apply to you in the last two weeks. There is no right or wrong answer, and you do not need to spend a long time answering them.";

  final TextController _textController = TextController();
  int? _character; // Selected answer for the current question
  int totalScore = 0;
  List<int> answers = [];

  @override
  void initState() {
    super.initState();
    // Reset selection on position change
    _textController.positionStream.listen((_) {
      setState(() {
        _character = null;
        _textController.isNextOrPrev = false;
      });
    });
  }

  @override
  void dispose() {
    _textController.onDispose();
    super.dispose();
  }

  void calculateScore() {
    totalScore = answers.fold(0, (prev, score) => prev + score);
  }

  void goToResult() {
    calculateScore();
    Navigator.pushNamed(
      context,
      ResultText.id,
      arguments: {
        'testTitle': testTitle,
        'totalScore': totalScore,
        'maxScore':
            model.questions.length * 3, // Assuming max score per question
        'scoring': model.scoring, // Ensure scoring implements `getCategory`
      },
    );
  }

  void handleAnswerSelection() {
    if (_character != null) answers.add(_character!);
    setState(() {
      _character = null;
      _textController.isNextOrPrev = true;
    });
  }

  void onNextTap() {
    // Prevent proceeding if no choice is selected
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
        model.questions.length,
        testTitle: testTitle,
        totalScore: totalScore,
        maxScore: model.questions.length * 3,
        scoring: model.scoring,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    // Extract arguments
    final arguments =
        ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?;

    if (arguments == null) {
      return Scaffold(
        body: Center(
          child: Text(
            "Missing required arguments",
            style: TextStyle(fontSize: 18.sp, color: Colors.red),
          ),
        ),
      );
    }

    testTitle = arguments['testTitle'];
    model = arguments['model'];

    return Scaffold(
      appBar: AppBar(
        leading: custemButtonBack(context),
        titleSpacing: 0,
        backgroundColor: primaryColor,
        title: Row(
          children: [
            Image.asset(logoApp, height: 50.h, fit: BoxFit.cover),
            Padding(
              padding: const EdgeInsets.only(left: 4).w,
              child: Text(
                'Tests',
                style: TextStyle(color: secoundryColor, fontSize: 26.sp),
              ),
            ),
          ],
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            _doingTest(),
            SizedBox(
              height: 20.h,
            ),
            CustemBottonBarOnboardingscreen(
              dotsCount: model.questions.length,
              onTapDotIndecator: _textController.onTapDotIndicator,
              outPutDotIndecator: _textController.outPutDataDotIndicator,
              onTapNext: onNextTap, // Use the updated method
              onTapSkip: () {
                handleAnswerSelection();
                _textController.onTapPrev(context);
              },
              outPutDotTextStart: _textController.outPutDataStartText,
            ),
          ],
        ),
      ),
    );
  }

  Widget _doingTest() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12).w,
      child: SingleChildScrollView(
        child: Column(
          children: [
            _detailsTest(),
            StreamBuilder<int>(
              stream: _textController.positionStream,
              initialData: _textController.currentPositionPage,
              builder: (context, snapshot) {
                int index = snapshot.data ?? 0;
                return IndexedStack(
                  index: index,
                  children: List.generate(
                    model.questions.length,
                    (i) => _itemAnswer(i),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _detailsTest() {
    return Column(
      children: [
        Row(
          children: [
            Image.asset(ConstImage.test),
            SizedBox(width: 12.w),
            Expanded(
              child: FittedBox(
                child: Text(
                  testTitle,
                  style: TextStyle(
                      color: textMainColor,
                      fontWeight: FontWeight.bold,
                      fontSize: 18.sp),
                ),
              ),
            ),
          ],
        ),
        Text(
          _description,
          style: const TextStyle(
              color: textThirdColor, fontSize: 14, fontWeight: FontWeight.bold),
        ),
      ],
    );
  }

  Widget _itemAnswer(int indexValue) {
    List<Choice> choices = model.questions[indexValue].choices;

    return Column(
      children: [
        FittedBox(
          child: Text(
            '${indexValue + 1} - ${model.questions[indexValue].questionText}',
            style: TextStyle(
                color: textMainColor,
                fontSize: 21.sp,
                fontWeight: FontWeight.bold),
          ),
        ),
        ...choices.map(
          (choice) => Padding(
            padding: EdgeInsets.only(bottom: 10.h),
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12.5.r),
                border: Border.all(color: primaryColor, width: 2),
              ),
              child: Center(
                child: RadioListTile<int>(
                  groupValue: _character,
                  value: choice.score,
                  title: Text(
                    choice.text,
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 18.sp,
                    ),
                  ),
                  onChanged: (value) {
                    setState(() {
                      _character = value;
                    });
                  },
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
