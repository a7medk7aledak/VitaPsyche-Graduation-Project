//import 'package:dots_indicator/dots_indicator.dart';
import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/const/colors.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class CustemBottonBarOnboardingscreen extends StatelessWidget {
  const CustemBottonBarOnboardingscreen({
    super.key,
    required this.dotsCount,
    required this.onTapDotIndecator,
    required this.outPutDotIndecator,
    required this.onTapNext,
    required this.onTapSkip,
    required this.outPutDotTextStart,
  });

  final int dotsCount;
  final void Function(int position) onTapDotIndecator;
  final Stream<int> outPutDotIndecator;
  final Stream<int> outPutDotTextStart;
  final GestureTapCallback onTapNext;
  final GestureTapCallback onTapSkip;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              // Skip Button
              InkWell(
                onTap: onTapSkip,
                child: Container(
                  padding:
                      EdgeInsets.symmetric(horizontal: 24.w, vertical: 12.h),
                  decoration: BoxDecoration(
                    color: primaryColor,
                    borderRadius: BorderRadius.circular(25),
                  ),
                  child: Text(
                    'Prev',
                    style: TextStyle(
                      fontWeight: FontWeight.w600,
                      fontSize: 20.sp, // Adjusted for better readability
                      color: secoundryColor,
                    ),
                  ),
                ),
              ),
              // Next Button
              Row(
                children: [
                  StreamBuilder<int>(
                    stream: outPutDotTextStart,
                    builder: (context, snapshot) {
                      return InkWell(
                        onTap: onTapNext,
                        child: Container(
                          padding: EdgeInsets.symmetric(
                              horizontal: 24.w, vertical: 12.h),
                          decoration: BoxDecoration(
                            color: primaryColor,
                            borderRadius: BorderRadius.circular(50),
                          ),
                          child: Text(
                            snapshot.data == null
                                ? 'Next'
                                : snapshot.data == dotsCount - 1
                                    ? 'Submit'
                                    : 'Next',
                            style: TextStyle(
                              fontWeight: FontWeight.w600,
                              fontSize:
                                  20.sp, // Adjusted for better readability
                              color: secoundryColor,
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ],
              ),
            ],
          ),
          // Dots Indicator
          SizedBox(height: 16.h), // Added space between buttons and dots
          SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            scrollDirection: Axis.horizontal,
            child: StreamBuilder<int>(
              stream: outPutDotIndecator,
              builder: (context, snapshot) {
                int position = snapshot.data ?? 0;
                // Ensure that the position is always less than dotsCount
                position = position < dotsCount ? position : dotsCount - 1;

                return Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    FittedBox(
                      child: Text(
                        '${position + 1}/$dotsCount',
                        style: TextStyle(
                          fontSize: 18.sp,
                        ),
                      ),
                    ),
                    // DotsIndicator(
                    //   mainAxisSize: MainAxisSize.min,
                    //   onTap: onTapDotIndecator,
                    //   dotsCount: dotsCount,
                    //   position: position,
                    //   decorator: DotsDecorator(
                    //     size: Size(10.w, 10.h),
                    //     activeSize: Size(12.w, 12.h),
                    //     spacing: const EdgeInsets.all(4).w,
                    //     color: Colors.grey,
                    //     activeColor: primaryColor,
                    //   ),
                    // ),
                  ],
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
