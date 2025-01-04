import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/core/routes/app_routes.dart';
import 'package:flutter_mindmed_project/features/test/data/test.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../../../core/const/image_app.dart';
import '../../../../core/theme/colors.dart';

class TestCard extends StatelessWidget {
  final String title;
  final int questionCount;
  final bool isPayment;
  final Test test;
  const TestCard({
    super.key,
    required this.title,
    required this.questionCount,
    required this.isPayment,
    required this.test,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: isPayment ? 4 : 10,
      color: secoundryColor,
      margin: EdgeInsets.symmetric(vertical: 8.h),
      child: Padding(
        padding: EdgeInsets.all(16.w),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                Image.asset(
                  ImageApp.test,
                  height: 50,
                  width: 50,
                ),
                Expanded(
                  child: Text(
                    title,
                    softWrap: true,
                    style: TextStyle(
                      color: mainBlueColor,
                      fontWeight: FontWeight.bold,
                      fontSize: 16.sp,
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(
              height: 10.h,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                Text(
                  '$questionCount Questions',
                  style: TextStyle(
                    color: textThirdColor,
                    fontSize: 14.sp,
                  ),
                ),
                Text(
                  'Every 2week',
                  style: TextStyle(
                    color: textThirdColor,
                    fontSize: 14.sp,
                  ),
                ),
              ],
            ),
            _buildButton(
              () {
                Navigator.of(context).pushNamed(AppRoutes.doTest,arguments: test);
              },
            )
          ],
        ),
      ),
    );
  }

  _buildButton(void Function() onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: double.infinity,
        decoration: BoxDecoration(
          color: isPayment ? mainBlueColor : primaryColor,
          borderRadius: BorderRadius.circular(12.5),
        ),
        padding: const EdgeInsets.symmetric(vertical: 10).w,
        child: Text(
          isPayment ? 'payment the test ' : 'take the test',
          textAlign: TextAlign.center,
          style: const TextStyle(
              color: secoundryColor, fontWeight: FontWeight.bold, fontSize: 16),
        ),
      ),
    );
  }
}
