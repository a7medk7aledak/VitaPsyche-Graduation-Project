import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../const/colors.dart';
import 'morescreen/language.dart';
import 'services/fqas/fqas_service.dart';
import 'splash_screen.dart';

class More extends StatelessWidget {
  const More({super.key});

  static const id = 'More';

  // List of menu items
  static final List<Map<String, dynamic>> _moreItems = [
    {
      'title': 'Languages',
      'icon': Icons.translate,
      'onTap': Language.id,
      'color': mainBlueColor,
    },
    {
      'title': 'Ask a Doctor',
      'icon': Icons.question_answer,
      'onTap': Language.id,
      'color': mainBlueColor,
    },
    {
      'title': 'FQAs',
      'icon': Icons.quiz_outlined,
      'onTap': FqasService.id,
      'color': mainBlueColor,
    },
    {
      'title': 'Sign Out',
      'icon': Icons.logout,
      'onTap': SplashScreen.id,
      'color': redColor,
    },
  ];

  // Menu item widget
  Widget _menuItem({
    required String title,
    required IconData icon,
    required VoidCallback onTap,
    Color? color,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Card(
        color: secoundryColor,
        elevation: 2,
        child: Padding(
          padding: EdgeInsets.all(12.0.w),
          child: Row(
            children: [
              Icon(icon, size: 20, color: color),
              SizedBox(width: 26.w),
              Text(
                title,
                style: TextStyle(
                  color: color,
                  fontSize: 20.sp,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: secoundryColor,
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 21.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: 20.h),
            Text(
              'More',
              style: TextStyle(
                color: primaryColor,
                fontSize: 32.sp,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 20.h),
            // Build menu items
            ..._moreItems.map((item) {
              return Padding(
                padding: EdgeInsets.only(bottom: 10.w),
                child: _menuItem(
                  title: item['title'],
                  icon: item['icon'],
                  color: item['color'],
                  onTap: () {
                    Navigator.of(context).pushNamed(item['onTap']);
                  },
                ),
              );
            }).toList(),
          ],
        ),
      ),
    );
  }
}
