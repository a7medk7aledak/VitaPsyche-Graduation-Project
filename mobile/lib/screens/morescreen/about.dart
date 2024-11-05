import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/const/colors.dart';
import 'package:flutter_mindmed_project/const/image_human.dart';
import 'package:flutter_mindmed_project/widgets/custem_button_back.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class About extends StatelessWidget {
  const About({super.key});
  static String id = 'about';

  final String _doc = """
We are ten engineers, our goal is to help individuals understand their problems and behaviors, as well as to develop effective strategies for coping with the mental health challenges they face. We also seek to identify the optimal treatment method for a wide range of mental health conditions. """;

  Widget _gridItem(String name) {
    return GridTile(
      footer: Container(
        color: Colors.black45,
        child: FittedBox(
          child: Text(
            name,
            textAlign: TextAlign.center,
            style: TextStyle(color: secoundryColor, fontSize: 21.sp),
          ),
        ),
      ),
      child: Image.asset(
        ImageHuman.mohammed,
        fit: BoxFit.cover,
      ),
    );
  }

  Widget _custemCardGridItem() {
    return GridView.builder(
      physics: const NeverScrollableScrollPhysics(),
      shrinkWrap: true,
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 10.w,
        mainAxisSpacing: 10.h,
      ),
      itemCount: 10,
      itemBuilder: (context, index) {
        return _gridItem('Mohammed Abd El-Fatah');
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: primaryColor,
      body: Padding(
        padding: const EdgeInsets.only(left: 20, right: 20, bottom: 20).w,
        child: SafeArea(
          child: ClipRRect(
            borderRadius: BorderRadius.all(Radius.circular(25.r)),
            child: Scaffold(
              backgroundColor: secoundryColor,
              appBar: AppBar(
                leading: custemButtonBack(context),
                title: Text(
                  'About us',
                  style: TextStyle(
                      color: primaryColor,
                      fontSize: 26.sp,
                      fontWeight: FontWeight.bold),
                ),
              ),
              body: Padding(
                padding: const EdgeInsets.all(6.0).w,
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      Text(
                        _doc,
                        style: TextStyle(
                            color: textSecoundColor,
                            fontSize: 16.sp,
                            fontWeight: FontWeight.bold),
                      ),
                      _custemCardGridItem(),
                      SizedBox(
                        height: 10.h,
                      )
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
