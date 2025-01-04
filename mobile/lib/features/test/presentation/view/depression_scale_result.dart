import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/features/test/data/test.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../core/theme/colors.dart';
import '../widget/depression_scale_painter.dart';

class DepressionScaleResult extends StatelessWidget {
  const DepressionScaleResult({
    super.key,
    required this.test,
    required this.totalSorce,
  });
  final Test test;
  final int totalSorce;
  @override
  Widget build(BuildContext context) {
    ScoreRange _getScoreRange(int totalScore, List<ScoreRange> scoreRanges) {
      return scoreRanges.firstWhere(
        (range) => totalScore >= range.range[0] && totalScore <= range.range[1],
      );
    }

    final ScoreRange scoreRange = _getScoreRange(totalSorce, test.scoreRanges);
    return Scaffold(
      appBar: AppBar(
        backgroundColor: secoundryColor,
        foregroundColor: primaryColor,
        centerTitle: true,
        title: Text(
          'Depression Scale',
          style: TextStyle(
              color: primaryColor,
              fontSize: 18.sp,
              fontWeight: FontWeight.bold),
        ),
      ),
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: SafeArea(
          child: Column(
            children: [
              // Results content
              Padding(
                padding: EdgeInsets.all(16.w),
                child: Column(
                  children: [
                    // Score display
                    Text(
                      'Your Score: $totalSorce',
                      style: TextStyle(
                        fontSize: 24.sp,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 8.h),

                    // Category and Visual Display
                    Column(
                      children: [
                        const SizedBox(height: 20),
                        CustomPaint(
                          size: const Size(300, 150), // Adjust size as needed
                          painter: DepressionScalePainter(totalSorce),
                        ),
                        const SizedBox(height: 30),
                        Align(
                          alignment: Alignment.center,
                          child: Text(
                            scoreRange.description,
                            style: const TextStyle(
                              fontSize: 21,
                              color: primaryColor,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                        const Align(
                          alignment: Alignment.topLeft,
                          child: Text(
                            'What does that mean?',
                            style: TextStyle(
                              fontSize: 21,
                              color: mainBlueColor,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                        const SizedBox(height: 10),
                        Padding(
                          padding:
                              const EdgeInsets.symmetric(horizontal: 10.0).w,
                          child: Text(
                            scoreRange.info,
                            style: TextStyle(fontSize: 16.sp),
                          ),
                        ),
                      ],
                    ),

                    SizedBox(height: 24.h),

                    // Action buttons
                    _buildActionButton(
                      'Book An Appointment',
                      onPressed: () {
                        // Implement appointment booking
                      },
                    ),
                    SizedBox(height: 12.h),
                    _buildOutlinedButton(
                      'Talk With AI',
                      onPressed: () {
                        // Implement AI chat navigation
                      },
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildActionButton(String label, {required VoidCallback onPressed}) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        backgroundColor: secoundryColor,
        minimumSize: Size(double.infinity, 48.h),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8.r),
        ),
      ),
      onPressed: onPressed,
      child: Text(
        label,
        style: TextStyle(
          color: primaryColor,
          fontSize: 16.sp,
        ),
      ),
    );
  }

  Widget _buildOutlinedButton(String label, {required VoidCallback onPressed}) {
    return OutlinedButton(
      style: OutlinedButton.styleFrom(
        minimumSize: Size(double.infinity, 48.h),
        side: const BorderSide(color: primaryColor),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8.r),
        ),
      ),
      onPressed: onPressed,
      child: Text(
        label,
        style: TextStyle(
          color: primaryColor,
          fontSize: 16.sp,
        ),
      ),
    );
  }
}
