import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../../const/colors.dart';
import '../../../widgets/const_image.dart';
import '../../../widgets/custem_button_back.dart';

// import '../../../models/modelsoftest/beck_depression_inventory.dart';
// import '../../../models/modelsoftest/conner_test.dart';
// import '../../../models/modelsoftest/davidson_trauma_scale.dart';
// import '../../../models/modelsoftest/internet_addiction_scale.dart';
// import '../../../models/modelsoftest/taylor_anxiety_scale.dart';
// import '../../../models/modelsoftest/yale_brown_obsessive_compulsive_scale.dart';

class ResultText extends StatelessWidget {
  const ResultText({super.key});
  static const String id = 'resulttext';

  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?;
  if (args == null) {
    return Scaffold(
      body: Center(child: Text('Error: Missing arguments!')),
    );
  }
   
  final String testTitle = args['testTitle'] as String;
  final int totalScore = args['totalScore'] as int;
  final int maxScore = args['maxScore'] as int;
  final scoring = args['scoring']; 
    final String scoreCategory = scoring.getCategory(totalScore);
    
    
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
              child: Text('Tests',
                  style: TextStyle(color: secoundryColor, fontSize: 26.sp)),
            ),
          ],
        ),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(height: 15.h),
          Container(
            padding: const EdgeInsets.all(6).w,
            margin: const EdgeInsets.symmetric(horizontal: 35).w,
            height: 40.h,
            decoration: BoxDecoration(
              color: fifthColor,
              borderRadius: BorderRadius.circular(12.5.r),
            ),
            child: Center(
              child: FittedBox(
                child: Text(
                  testTitle,
                  style: TextStyle(
                      color: textMainColor,
                      fontSize: 24.sp,
                      fontWeight: FontWeight.bold),
                ),
              ),
            ),
          ),
          SizedBox(height: 15.h),
          Align(
            alignment: Alignment.center,
            child: Text(
              'Your result: $totalScore / $maxScore',
              style: TextStyle(
                  color: primaryColor,
                  fontSize: 24.sp,
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
          Align(
            alignment: Alignment.center,
            child: Text(
              scoreCategory,
              style: TextStyle(
                  color: textMainColor,
                  fontSize: 20.sp,
                  fontWeight: FontWeight.bold),
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
      ),
    );
  }
}
