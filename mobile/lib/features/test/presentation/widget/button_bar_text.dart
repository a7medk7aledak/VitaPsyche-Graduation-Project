import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/core/theme/colors.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class CustomButtonBarOnboardingScreen extends StatelessWidget {
  const CustomButtonBarOnboardingScreen({
    super.key,
    required this.dotsCount,
    required this.onTapDotIndicator,
    required this.outputDotIndicator,
    required this.onTapNext,
    required this.onTapSkip,
    required this.outputDotTextStart,
  });

  final int dotsCount;
  final void Function(int position) onTapDotIndicator;
  final Stream<int> outputDotIndicator;
  final Stream<int> outputDotTextStart;
  final GestureTapCallback onTapNext;
  final GestureTapCallback onTapSkip;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          _buildDotIndicator(),
          SizedBox(height: 12.h), // Space between buttons and dots
          // Row for Skip and Next/Submit Buttons
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              // Skip Button (Shown only if not on the first page)
              StreamBuilder<int>(
                stream: outputDotTextStart,
                builder: (context, snapshot) {
                  int position = snapshot.data ?? 0;
                  return position > 0
                      ? _buildSkipButton()
                      : const SizedBox(); // Hide Skip button on the first page
                },
              ),
              // Next/Submit Button
              _buildNextButton(),
            ],
          ),
        ],
      ),
    );
  }

  // Skip Button Widget
  Widget _buildSkipButton() {
    return InkWell(
      onTap: onTapSkip,
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 24.w, vertical: 12.h),
        decoration: BoxDecoration(
          color: primaryColor,
          borderRadius: BorderRadius.circular(25),
        ),
        child: Text(
          'Prev',
          style: TextStyle(
            fontWeight: FontWeight.w600,
            fontSize: 12.sp,
            color: secoundryColor,
          ),
        ),
      ),
    );
  }

  // Next/Submit Button Widget
  Widget _buildNextButton() {
    return StreamBuilder<int>(
      stream: outputDotTextStart,
      builder: (context, snapshot) {
        int position = snapshot.data ?? 0;
        String buttonText = (position == dotsCount - 1) ? 'Submit' : 'Next';

        return InkWell(
          onTap: onTapNext,
          child: Container(
            padding: EdgeInsets.symmetric(horizontal: 24.w, vertical: 12.h),
            decoration: BoxDecoration(
              color: primaryColor,
              borderRadius: BorderRadius.circular(50),
            ),
            child: Text(
              buttonText,
              style: TextStyle(
                fontWeight: FontWeight.w600,
                fontSize: 12.sp,
                color: secoundryColor,
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildDotIndicator() {
    return IntrinsicHeight(
      child: StreamBuilder<int>(
        stream: outputDotIndicator,
        builder: (context, snapshot) {
          int position = snapshot.data ?? 0;
          position = position < dotsCount ? position : dotsCount - 1;

          return Column(
            children: [
              linearQuestionAndAnswer(
                  position.toDouble() + 1, dotsCount.toDouble()),
              SizedBox(height: 4.h), // Add spacing
              FittedBox(
                child: Text(
                  'question ${position + 1} of $dotsCount',
                  style: TextStyle(fontSize: 10.sp),
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  Widget linearQuestionAndAnswer(double question, double totalQuestion) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(4),
      child: Container(
        decoration: BoxDecoration(border: Border.all(color: primaryColor)),
        child: LinearProgressIndicator(
          value: question / totalQuestion,
          backgroundColor: secoundryColor,
          valueColor: const AlwaysStoppedAnimation<Color>(primaryColor),
          minHeight: 5,
        ),
      ),
    );
  }
}
