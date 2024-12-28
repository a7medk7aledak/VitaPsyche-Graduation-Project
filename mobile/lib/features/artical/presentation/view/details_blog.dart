import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/core/theme/colors.dart';
import 'package:flutter_mindmed_project/features/artical/data/model_blog.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../../../core/const/image_app.dart';
import '../widget/custem_button_back.dart';

class DetailsBlog extends StatelessWidget {
  const DetailsBlog({super.key});
  static String id = 'DetailsBlog';

  Widget _detailsBlog({
    required String imagesBlog,
    required List<String> symptoms,
    required List<String> causes,
    required String treatment,
    required String title,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Stack(
          children: [
            Container(
              width: double.infinity,
              height: 200.h,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(16.r),
                image: DecorationImage(
                  image: NetworkImage(imagesBlog),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            Container(
              width: double.infinity,
              height: 200.h,
              decoration: BoxDecoration(
                color: Colors.black.withOpacity(0.4),
                borderRadius: BorderRadius.circular(16.r),
              ),
              child: Center(
                child: Text(
                  title,
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 28.sp,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
          ],
        ),
        SizedBox(height: 24.h),
        _sectionCard("Symptoms", symptoms),
        SizedBox(height: 16.h),
        _sectionCard("Causes", causes),
        SizedBox(height: 16.h),
        _treatmentSection(treatment),
      ],
    );
  }

  Widget _sectionCard(String title, List<String> items) {
    return Card(
      margin: EdgeInsets.symmetric(horizontal: 16.w),
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12.r)),
      child: Padding(
        padding: EdgeInsets.all(16.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: TextStyle(
                color: textMainColor,
                fontSize: 22.sp,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 12.h),
            Column(
              children: items.map((item) => _listItem(item)).toList(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _listItem(String text) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 6.h),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: EdgeInsets.all(6.w),
            decoration: BoxDecoration(
              color: secoundryColor,
              shape: BoxShape.circle,
            ),
            child: Icon(Icons.check, color: Colors.white, size: 18.sp),
          ),
          SizedBox(width: 10.w),
          Expanded(
            child: Text(
              text,
              style: TextStyle(
                color: Colors.black87,
                fontSize: 18.sp,
                height: 1.5,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _treatmentSection(String treatment) {
    return Card(
      margin: EdgeInsets.symmetric(horizontal: 16.w),
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12.r)),
      child: Padding(
        padding: EdgeInsets.all(16.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Treatment",
              style: TextStyle(
                color: textMainColor,
                fontSize: 22.sp,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 12.h),
            Text(
              treatment,
              style: TextStyle(
                color: Colors.black87,
                fontSize: 18.sp,
                height: 1.5,
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final ModelBlog blog =
        ModalRoute.of(context)!.settings.arguments as ModelBlog;

    return Scaffold(
      extendBodyBehindAppBar: true,
      backgroundColor: primaryColor,
      appBar: AppBar(
        leading: custemButtonBack(context),
        titleSpacing: 0,
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: Row(
          children: [
            Image.asset(
              logoApp,
              height: 50.h,
              width: 40.w,
              fit: BoxFit.cover,
            ),
            Padding(
              padding: const EdgeInsets.only(left: 4).w,
              child: Text(
                'Article Details',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24.sp,
                ),
              ),
            ),
          ],
        ),
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [primaryColor, secoundryColor],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: SingleChildScrollView(
          child: Padding(
            padding: EdgeInsets.symmetric(vertical: 24.h),
            child: _detailsBlog(
              imagesBlog: blog.images,
              causes: blog.causes,
              title: blog.title,
              symptoms: blog.symptoms,
              treatment: blog.treatment,
            ),
          ),
        ),
      ),
    );
  }
}
