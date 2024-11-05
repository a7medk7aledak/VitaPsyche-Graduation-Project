import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/const/colors.dart';
import 'package:flutter_mindmed_project/models/model_blog.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../const/const_image.dart';
import '../../widgets/custem_button_back.dart';

class DetailsBlog extends StatelessWidget {
  const DetailsBlog({super.key});
  static String id = 'DetailsBlog';

  Widget _detailsBlog(
      {required String imagesBlog,
      required List<String> symptoms,
      required List<String> causes,
      required String treatment,
      required String title}) {
    return Container(
      color: secoundryColor,
      child: Column(
        children: [
          Image.network(
            imagesBlog,
            width: double.infinity,
            fit: BoxFit.cover,
          ),
          Center(
            child: Text(
              title,
              style: TextStyle(
                  color: textMainColor,
                  fontSize: 24.sp,
                  fontWeight: FontWeight.bold),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8).w,
            child:

                Column(
              children: [
                Text(
                  '$symptoms',
                  style: TextStyle(
                    color: textSecoundColor,
                    fontSize: 16.sp,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const Divider(),
                Text(
                  '$causes',
                  style: TextStyle(
                    color: textSecoundColor,
                    fontSize: 16.sp,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const Divider(),
                Text(
                  treatment,
                  style: TextStyle(
                    color: textSecoundColor,
                    fontSize: 16.sp,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final ModelBlog blog =
        ModalRoute.of(context)!.settings.arguments as ModelBlog;

    return Scaffold(
      backgroundColor: primaryColor,
      appBar: AppBar(
        leading: custemButtonBack(context),
        titleSpacing: 0,
        backgroundColor: Colors.transparent,
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
                'Articals Details',
                style: TextStyle(
                  color: secoundryColor,
                  fontSize: 26.sp,
                ),
              ),
            )
          ],
        ),
      ),
      body: SingleChildScrollView(
        child: ClipRRect(
            borderRadius: BorderRadius.only(topRight: Radius.circular(150.r)),
            child: _detailsBlog(
              //? problem in [] from json
              imagesBlog: blog.images,
              causes: blog.causes,
              title: blog.title,
              symptoms: blog.symptoms,
              treatment: blog.treatment,
            )),
      ),
    );
  }
}
