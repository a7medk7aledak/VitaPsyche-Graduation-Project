import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/const/colors.dart';
import 'package:flutter_mindmed_project/models/model_blog.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../../../const/const_image.dart';
import '../../../widgets/custem_button_back.dart';

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
            child: Column(
              children: [
                Align(
                  alignment: Alignment.topLeft,
                  child: Text(
                    'Symptoms',
                    style: TextStyle(
                        color: textMainColor,
                        fontSize: 24.sp,
                        fontWeight: FontWeight.bold),
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: symptoms
                      .map((symptom) => Row(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Padding(
                                padding: EdgeInsets.only(top: 10),
                                child: Icon(
                                  Icons.circle,
                                  size: 15.0,
                                  color: Colors.black,
                                ),
                              ),
                              SizedBox(
                                width: 10.w,
                              ),
                              Expanded(
                                child: Text(
                                  symptom,
                                  softWrap: true,
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 21.sp,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ),
                            ],
                          ))
                      .toList(),
                ),
                Divider(
                  color: Colors.grey,
                  height: 25.h,
                  thickness: 2,
                  endIndent: 20,
                  indent: 20,
                ),
                Align(
                  alignment: Alignment.topLeft,
                  child: Text(
                    'Causes',
                    style: TextStyle(
                        color: textMainColor,
                        fontSize: 24.sp,
                        fontWeight: FontWeight.bold),
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: causes
                      .map((cause) => Row(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Padding(
                                padding: EdgeInsets.only(top: 10),
                                child: Icon(
                                  Icons.circle,
                                  size: 15.0,
                                  color: Colors.black,
                                ),
                              ),
                              const SizedBox(
                                width: 10,
                              ),
                              Expanded(
                                child: Text(
                                  cause,
                                  softWrap: true,
                                  style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 21.sp,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ),
                            ],
                          ))
                      .toList(),
                ),
                Divider(
                  color: Colors.grey,
                  height: 25.h,
                  thickness: 2,
                  endIndent: 20,
                  indent: 20,
                ),
                Align(
                  alignment: Alignment.topLeft,
                  child: Text(
                    'treatment',
                    style: TextStyle(
                        color: textMainColor,
                        fontSize: 24.sp,
                        fontWeight: FontWeight.bold),
                  ),
                ),
                Text(
                  treatment,
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 16.sp,
                    fontWeight: FontWeight.w600,
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
            child: _detailsBlog(
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
