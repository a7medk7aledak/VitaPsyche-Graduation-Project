import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../../../../core/const/animation_gif.dart';

import '../../../../core/routes/app_routes.dart';
import '../../../../core/theme/colors.dart';
import '../../../../core/const/image_app.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
  }

  // Reusable Service Card Widget
  Widget _serviceCard({
    required String title,
    required String subtitle1,
    required String subtitle2,
    required String imagePath,
    VoidCallback? onTap,
    bool clipRoundedImage = false,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Card(
        margin: const EdgeInsets.only(right: 10, bottom: 15, top: 10).w,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(15).r,
          side: const BorderSide(color: primaryColor),
        ),
        elevation: 5,
        color: secoundryColor,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Padding(
              padding: const EdgeInsets.all(10.0).w,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title,
                      style: _textStyle(18.sp, mainBlueColor, FontWeight.bold)),
                  Text(subtitle1,
                      style: _textStyle(14.sp, grayColor, FontWeight.w300)),
                  Text(subtitle2,
                      style: _textStyle(14.sp, grayColor, FontWeight.w300)),
                ],
              ),
            ),
            SizedBox(width: 20.w),
            clipRoundedImage
                ? ClipRRect(
                    borderRadius: BorderRadius.only(
                      bottomRight: const Radius.circular(15).r,
                      topRight: const Radius.circular(15).r,
                    ),
                    child: Image.asset(imagePath, fit: BoxFit.cover),
                  )
                : Image.asset(imagePath, fit: BoxFit.cover),
          ],
        ),
      ),
    );
  }

  // Reusable Header Widget
  Widget _header(String title) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Text(
        title,
        style: _textStyle(24.sp, primaryColor, FontWeight.bold),
      ),
    );
  }

  // Reusable Text Style
  TextStyle _textStyle(double size, Color color, FontWeight weight) {
    return TextStyle(fontSize: size, color: color, fontWeight: weight);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: secoundryColor,
      body: CustomScrollView(
        slivers: [
          // Header Section
          SliverToBoxAdapter(child: _header('Our Service')),

          // ChatBot and Lina Service Section
          SliverToBoxAdapter(
            child: SizedBox(
              height: 180.h,
              child: ListView(
                padding: const EdgeInsets.symmetric(horizontal: 12).w,
                scrollDirection: Axis.horizontal,
                children: [
                  _serviceCard(
                    title: 'Lina Service',
                    subtitle1: 'Click to Treat',
                    subtitle2: 'Yourself',
                    imagePath: AnimationGif.linachatBot,
                    onTap: () =>
                        Navigator.of(context).pushNamed(AppRoutes.linaScreen),
                    clipRoundedImage: true,
                  ),
                  _serviceCard(
                    title: 'ChatBot Service',
                    subtitle1: 'Click to Treat',
                    subtitle2: 'Yourself',
                    imagePath: AnimationGif.chatBot,
                    onTap: () =>
                        Navigator.of(context).pushNamed(AppRoutes.chatScreen),
                  ),
                ],
              ),
            ),
          ),

          // Compunet Services Section
          SliverToBoxAdapter(
            child: SizedBox(
              height: 170.h,
              child: ListView(
                padding: const EdgeInsets.symmetric(horizontal: 8).w,
                scrollDirection: Axis.horizontal,
                children: [
                  _compunetService('Test', AnimationGif.test,
                      onTap: () => Navigator.of(context)
                          .pushNamed(AppRoutes.testScreen)),
                  _compunetService('Blog', AnimationGif.blog,
                      onTap: () => Navigator.of(context)
                          .pushNamed(AppRoutes.blogScreen)),
                  _compunetService('product', AnimationGif.production,
                      onTap: () => Navigator.of(context)
                          .pushNamed(AppRoutes.productsScreen)),
                  _compunetService('FQAs', AnimationGif.fqas,
                      onTap: () => Navigator.of(context)
                          .pushNamed(AppRoutes.fqasScreen)),
                  _compunetService('Ask Doctor', AnimationGif.askDoctor,
                      onTap: () =>
                          Navigator.of(context).pushNamed(AppRoutes.askDoctor)),
                ],
              ),
            ),
          ),

          // Doctors Specialists Section
          SliverToBoxAdapter(child: _header('Doctors Specialists')),
          SliverToBoxAdapter(
            child: SizedBox(
              height: 200.h,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: imagesOfDoctorsSpecialists.length,
                itemBuilder: (context, index) => Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4.0).w,
                  child: _doctorsSpecialistsCard(
                      imagesOfDoctorsSpecialists[index]),
                ),
              ),
            ),
          ),

          // Get Help Section
          SliverToBoxAdapter(child: _header('Get Help')),
          SliverToBoxAdapter(
            child: Column(
              children: [
                _getHelpCard(Icons.support_agent_sharp, 'Talk to Support'),
                _getHelpCard(
                    Icons.help_outline_rounded, 'Get Matched to a Therapist'),
                _getHelpCard(Icons.wechat_sharp, 'Talk to a matching advisor'),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _compunetService(String title, String imagePath,
      {VoidCallback? onTap}) {
    return GestureDetector(
      onTap: onTap,
      child: Card(
        margin: const EdgeInsets.all(10).w,
        shape:
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(15.r)),
        elevation: 5,
        color: secoundryColor,
        child: Column(
          children: [
            SizedBox(height: 10.h),
            Text(title,
                style: _textStyle(18.sp, mainBlueColor, FontWeight.bold)),
            SizedBox(height: 20.h),
            Image.asset(imagePath, width: 140.w, height: 80.h),
          ],
        ),
      ),
    );
  }

  Widget _doctorsSpecialistsCard(String imagePath) {
    return Card(
      color: secoundryColor,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(25)),
      elevation: 2,
      child: Column(
        children: [
          Container(
            decoration: BoxDecoration(
              color: primaryColor,
              borderRadius:
                  BorderRadius.vertical(top: const Radius.circular(15).r),
            ),
            height: 100.h,
            width: 302.w,
            child: Image.asset(imagePath, fit: BoxFit.cover),
          ),
          SizedBox(height: 10.h),
          Text('Sport \n Psychology',
              textAlign: TextAlign.center,
              style: _textStyle(14.sp, mainBlueColor, FontWeight.bold)),
          SizedBox(height: 10.h),
          Text('30 doctors',
              textAlign: TextAlign.center,
              style: _textStyle(12.sp, grayColor, FontWeight.w500)),
        ],
      ),
    );
  }

  Widget _getHelpCard(IconData icon, String title) {
    return Padding(
      padding: const EdgeInsets.all(8.0).w,
      child: Card(
        color: secoundryColor,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(25),
          side: const BorderSide(color: primaryColor),
        ),
        elevation: 2,
        child: ListTile(
          leading: Icon(icon, color: primaryColor, size: 35.sp),
          title: Text(title,
              style: _textStyle(16.sp, mainBlueColor, FontWeight.bold)),
        ),
      ),
    );
  }
}
