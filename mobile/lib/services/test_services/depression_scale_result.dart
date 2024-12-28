import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../const/colors.dart';
import 'depression_scale_painter.dart';
import 'depression_scoring.dart';

class DepressionScaleResult extends StatelessWidget {
  const DepressionScaleResult({super.key});
  static String id = 'DepressionScaleResult';

  @override
  Widget build(BuildContext context) {
    final args =
        ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?;

    if (args == null) {
      return const Scaffold(
        body: Center(child: Text('Error: Missing score data!')),
      );
    }

    final int score = args['totalScore'] as int? ?? 0;

    final DepressionResult result =
        DepressionScoring.getDepressionResult(score);

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
                      'Your Score: $score',
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
                          painter: DepressionScalePainter(score),
                        ),
                        const SizedBox(height: 30),
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
                          padding: const EdgeInsets.symmetric(horizontal: 20.0).w,
                          child: Text(
                            result.description,
                            style:  TextStyle(fontSize: 16.sp),
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
