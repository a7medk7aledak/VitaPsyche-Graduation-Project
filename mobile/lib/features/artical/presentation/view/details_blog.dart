import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/core/theme/colors.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../data/model_blog.dart';

class DetailsBlog extends StatelessWidget {
  const DetailsBlog({super.key});

  Widget _detailsBlog({
    required String imagesBlog,
    required List<String> symptoms,
    required List<String> causes,
    required String treatment,
    required String title,
    required String dec,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _blogImage(imagesBlog),
        _buildInfoCard("Description", dec),
        SizedBox(height: 24.h),
        _sectionCard("Symptoms", symptoms),
        SizedBox(height: 16.h),
        _sectionCard("Causes", causes),
        SizedBox(height: 16.h),
        _treatmentSection(treatment),
      ],
    );
  }

  Widget _blogImage(String imagesBlog) {
    return Hero(
      tag: imagesBlog, // Use the same tag here
      child: Image.network(
        imagesBlog,
        height: 200.h,
        width: double.infinity,
        fit: BoxFit.cover,
        loadingBuilder: (context, child, loadingProgress) {
          if (loadingProgress == null) {
            return child;
          }
          return Center(
            child: CircularProgressIndicator(
              value: loadingProgress.expectedTotalBytes != null
                  ? loadingProgress.cumulativeBytesLoaded /
                      (loadingProgress.expectedTotalBytes ?? 1)
                  : null,
            ),
          );
        },
        errorBuilder: (context, error, stackTrace) {
          return const Center(
            child: Icon(Icons.error, color: Colors.red),
          );
        },
      ),
    );
  }

  Widget _sectionCard(String title, List<String> items) {
    return Card(
      color: secoundryColor,
      margin: EdgeInsets.symmetric(horizontal: 16.w),
      elevation: 6,
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
              children: items.asMap().entries.map((entry) {
                return _listItem(entry.value, entry.key);
              }).toList(),
            )
          ],
        ),
      ),
    );
  }

  Widget _listItem(String text, int index) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 6.h),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Expanded(
            child: Text(
              '${index + 1}- $text',
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

  Widget _buildInfoCard(String title, String content) {
    return Card(
      color: secoundryColor,
      margin: EdgeInsets.symmetric(horizontal: 16.w),
      elevation: 6,
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
            Text(
              content,
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

  Widget _treatmentSection(String treatment) {
    return _buildInfoCard("Treatment", treatment);
  }

  @override
  Widget build(BuildContext context) {
    final ModelBlog blog =
        ModalRoute.of(context)!.settings.arguments as ModelBlog;
    return Scaffold(
      backgroundColor: secoundryColor,
      appBar: AppBar(
        backgroundColor: secoundryColor.withOpacity(0.9),
        elevation: 0,
        foregroundColor: primaryColor,
        title: Text(
          blog.title,
          style: TextStyle(
            color: primaryColor,
            fontSize: 24.sp,
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: _detailsBlog(
          dec: blog.description,
          imagesBlog: blog.images,
          causes: blog.causes,
          title: blog.title,
          symptoms: blog.symptoms,
          treatment: blog.treatment,
        ),
      ),
    );
  }
}
