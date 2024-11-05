import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/screens/morescreen/about.dart';
import 'package:flutter_mindmed_project/screens/morescreen/contact_us.dart';
import 'package:flutter_mindmed_project/screens/morescreen/language.dart';
import 'package:flutter_mindmed_project/screens/morescreen/products.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import '../const/animation_gif.dart';
import '../const/colors.dart';

class More extends StatelessWidget {
  const More({super.key});
  static const id = 'More';

  Widget _item(BuildContext _,
      {required String title,
      required String animation,
      required String navigator}) {
    return GestureDetector(
      onTap: () => Navigator.of(_).pushNamed(navigator),
      child: Container(
        decoration: BoxDecoration(
            color: primaryColor, borderRadius: BorderRadius.circular(20)),
        child: Padding(
          padding: const EdgeInsets.all(12.0).w,
          child: Row(
            children: [
              Image.asset(
                animation,
                height: 40.h,
              ),
              SizedBox(
                width: 21.w,
              ),
              Text(
                title,
                style: TextStyle(
                  color: secoundryColor,
                  fontSize: 24.sp,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const Spacer(),
              Icon(
                Icons.keyboard_double_arrow_right_rounded,
                size: 26.sp,
                color: secoundryColor,
              )
            ],
          ),
        ),
      ),
    );
  }

//*add  nav..
  static final List _itemMore = [
    {
      'title': 'products',
      'animation': AnimationGif.askDoctor,
      'go': Products.id
    },
    {
      'title': 'language',
      'animation': AnimationGif.askDoctor,
      'go': Language.id
    },
    {
      'title': 'join as doctor',
      'animation': AnimationGif.askDoctor,
      'go': About.id
    }, //change next time//!
    {'title': 'about us', 'animation': AnimationGif.askDoctor, 'go': About.id},
    {
      'title': 'contant us',
      'animation': AnimationGif.askDoctor,
      'go': ContactUs.id
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ClipRRect(
        borderRadius: BorderRadius.only(topRight: Radius.circular(150.r)),
        child: Container(
          color: secoundryColor,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 21).w,
            child: Column(
              children: [
                Text(
                  'More',
                  style: TextStyle(
                      color: primaryColor,
                      fontSize: 32.sp,
                      fontWeight: FontWeight.bold),
                ),
                Image.asset(
                  AnimationGif.chatBot,
                  height: 40.h,
                ),
                ...List.generate(
                  _itemMore.length,
                  (index) => Padding(
                    padding: const EdgeInsets.only(bottom: 12).w,
                    child: _item(context,
                        title: _itemMore[index]['title'],
                        animation: _itemMore[index]['animation'],
                        navigator: _itemMore[index]['go']),
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
