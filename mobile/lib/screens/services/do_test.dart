import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../const/colors.dart';
import '../../const/const_image.dart';
import '../../widgets/custem_button_back.dart';

class DoTest extends StatefulWidget {
  const DoTest({super.key});
  static String id = 'do_test';

  @override
  State<DoTest> createState() => _DoTestState();
}

class _DoTestState extends State<DoTest> {
  final String _des =
      "Please read the test items carefully and make sure that the choices apply to you in the last two weeks. There is no right or wrong answer, and you do not need to spend a long time answering them.";
  final String _des2 =
      "Please share the results with your therapist to be absolutely sure of the outcome.";
  int? _character;
  int _index = 0;

  Widget _partOneDetailsTest() {
    return Column(
      children: [
        Row(
          children: [
            Image.asset(ConstImage.test),
            SizedBox(
              width: 12.w,
            ),
            const Text(
              'dataTitle',
              style: TextStyle(
                  color: textMainColor,
                  fontWeight: FontWeight.bold,
                  fontSize: 20),
            ),
          ],
        ),
        Text(
          _des,
          style: const TextStyle(
            color: textThirdColor,
            fontSize: 14,
            fontWeight: FontWeight.bold,
          ),
        ),
        Row(
          children: [
            const Icon(Icons.share),
            SizedBox(
              width: 10.w,
            ),
            Expanded(
              child: Text(
                _des2,
                softWrap: true,
                style: TextStyle(
                  color: textThirdColor,
                  fontSize: 14.sp,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

//Todo :: how change data ? and will see json how req data  ↓
  Widget _item() {
    return Column(
      children: [
        Text(
          '${_index + 1} Quation?',
          style: const TextStyle(
              color: textMainColor, fontSize: 21, fontWeight: FontWeight.bold),
        ),
        SizedBox(
          height: 10.h,
        ),
        Container(
          decoration: BoxDecoration(
              borderRadius: const BorderRadius.all(Radius.circular(12.5)),
              border: Border.all(
                color: primaryColor,
                width: 2,
              )),
          child: Center(
            child: RadioListTile<int>(
              groupValue: _character,
              value: 1,
              title: const Text(
                'ans1',
                style: TextStyle(
                    color: Colors.black,
                    fontWeight: FontWeight.bold,
                    fontSize: 18),
              ),
              onChanged: (value) {
                setState(() {
                  _character = value;
                });
              },
            ),
          ),
        ),
        SizedBox(
          height: 10.h,
        ),
        Container(
          decoration: BoxDecoration(
              borderRadius: const BorderRadius.all(Radius.circular(12.5)),
              border: Border.all(
                color: primaryColor,
                width: 2,
              )),
          child: Center(
            child: RadioListTile<int>(
              groupValue: _character,
              onChanged: (value) {
                setState(() {
                  _character = value;
                });
              },
              value: 2,
              title: const Text(
                'ans1',
                style: TextStyle(
                    color: Colors.black,
                    fontWeight: FontWeight.bold,
                    fontSize: 18),
              ),
            ),
          ),
        ),
        SizedBox(
          height: 10.h,
        ),
        Container(
          decoration: BoxDecoration(
              borderRadius: const BorderRadius.all(Radius.circular(12.5)),
              border: Border.all(
                color: primaryColor,
                width: 2,
              )),
          child: Center(
            child: RadioListTile<int>(
              groupValue: _character,
              onChanged: (value) {
                setState(() {
                  _character = value;
                });
              },
              value: 3,
              title: const Text(
                'ans1',
                style: TextStyle(
                    color: Colors.black,
                    fontWeight: FontWeight.bold,
                    fontSize: 18),
              ),
            ),
          ),
        ),
        SizedBox(
          height: 10.h,
        ),
        Container(
          decoration: BoxDecoration(
              borderRadius: const BorderRadius.all(Radius.circular(12.5)),
              border: Border.all(
                color: primaryColor,
                width: 2,
              )),
          child: Center(
            child: RadioListTile<int>(
              groupValue: _character,
              onChanged: (value) {
                setState(() {
                  _character = value;
                });
              },
              value: 4,
              title: const Text(
                'ans1',
                style: TextStyle(
                    color: Colors.black,
                    fontWeight: FontWeight.bold,
                    fontSize: 18),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _doTest() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12),
      child: Column(
        children: [
          _partOneDetailsTest(),
          IndexedStack(
            index: _index,
            children: List.generate(
              3,
              (index) => _item(),
            ),
          )
        ],
      ),
    );
  }

  Widget _resultScreen() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          height: 15.h,
        ),
        Container(
          margin: const EdgeInsets.symmetric(horizontal: 35).w,
          height: 40.h,
          decoration: BoxDecoration(
            color: fifthColor,
            borderRadius: BorderRadius.circular(12.5.r),
          ),
          child: Center(
            child: Text(
              'Depression Scale',
              style: TextStyle(
                  color: textMainColor,
                  fontSize: 24.sp,
                  fontWeight: FontWeight.bold),
            ),
          ),
        ),
        SizedBox(
          height: 15.h,
        ),
        //*ans/all
        Align(
          alignment: Alignment.center,
          child: Text(
            ' Your result is 7/11',
            style: TextStyle(
                color: Colors.black,
                fontSize: 20.sp,
                fontWeight: FontWeight.bold),
          ),
        ),
        SizedBox(
          height: 15.h,
        ),

        FittedBox(
          child: Row(
            children: [
              Text(
                'normal',
                style: TextStyle(
                  backgroundColor: const Color(0xff6BA56B),
                  color: secoundryColor,
                  fontSize: 18.sp,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                'mild',
                style: TextStyle(
                  backgroundColor: const Color(0xff35706D),
                  color: secoundryColor,
                  fontSize: 18.sp,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                'mode rate',
                softWrap: true,
                style: TextStyle(
                  backgroundColor: const Color(0xffCDC13B),
                  color: secoundryColor,
                  fontSize: 18.sp,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                'severe',
                style: TextStyle(
                  backgroundColor: const Color(0xffE06834).withOpacity(0.91),
                  color: secoundryColor,
                  fontSize: 18.sp,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text(
                'Extreely Severe',
                softWrap: true,
                style: TextStyle(
                  backgroundColor: const Color(0xffE03434).withOpacity(0.91),
                  color: secoundryColor,
                  fontSize: 18.sp,
                  fontWeight: FontWeight.bold,
                ),
              )
            ],
          ),
        ),
        SizedBox(
          height: 15.h,
        ),
        Text(
          'What does that mean?',
          style: TextStyle(
              color: textMainColor,
              fontSize: 20.sp,
              fontWeight: FontWeight.bold),
        ),
        SizedBox(
          height: 5.h,
        ),
        Text(
          'Your depression is severe. You experiencsymptoms of depression most of the time and it disrupts your life to a great extent. You need professional help to overcome this depression that is affecting your life greatly.',
          style: TextStyle(
              color: textSecoundColor,
              fontSize: 14.sp,
              fontWeight: FontWeight.bold),
        ),
        SizedBox(
          height: 25.h,
        ),
        Align(
          alignment: Alignment.center,
          child: Text(
            'Please share the results with your therapist to be absolutely sure of the outcome.',
            textAlign: TextAlign.center,
            style: TextStyle(
                color: fifthColor,
                fontSize: 17.sp,
                fontWeight: FontWeight.bold),
          ),
        ),
        SizedBox(
          height: 25.h,
        ),
        Align(
          alignment: Alignment.center,
          child: Text(
            " You shouldn't try to cope with what you're going through alone. We're here to help! ",
            textAlign: TextAlign.center,
            style: TextStyle(
                color: textMainColor,
                fontSize: 17.sp,
                fontWeight: FontWeight.bold),
          ),
        ),
        SizedBox(
          height: 15.h,
        ),
        Padding(
          padding: const EdgeInsets.all(12.0).w,
          child: Container(
            height: 75,
            padding: const EdgeInsets.all(20).w,
            decoration: BoxDecoration(
                color: fifthColor, borderRadius: BorderRadius.circular(25).r),
            child: Text(
              'Choose your specialist doctor',
              textAlign: TextAlign.center,
              softWrap: true,
              style: TextStyle(
                  color: secoundryColor,
                  fontSize: 24.sp,
                  fontWeight: FontWeight.bold),
            ),
          ),
        ),
        SizedBox(
          height: 15.h,
        ),
      ],
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
        floatingActionButton: FloatingActionButton(
          backgroundColor: primaryColor,
          onPressed: () {
            setState(() {
              if (_index == 10) {
                //! go end screen
              } else {
                _index++;
              }
            });
          },
          child: const Row(
            children: [
              Text(
                'next',
                style: TextStyle(fontSize: 16),
              ),
              Icon(Icons.arrow_forward_ios_rounded)
            ],
          ),
        ),
        body: _doTest());
  }
}
