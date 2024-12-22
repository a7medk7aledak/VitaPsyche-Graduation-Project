import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/screens/chatbot.dart';
import 'package:flutter_mindmed_project/screens/lina/lina_screen.dart';
import 'package:flutter_mindmed_project/screens/services/products/all_products_screen.dart';
import 'package:flutter_mindmed_project/screens/services/blog/blog_service.dart';
import 'package:flutter_mindmed_project/screens/services/test_services/test_service.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../const/colors.dart';
import '../widgets/animation_gif.dart';
import '../widgets/const_image.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});
  static const String id = 'HomeScreen';

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 300),
    );
  }

  void toggleDrawer() =>
      _controller.isDismissed ? _controller.forward() : _controller.reverse();

  @override
  void dispose() {
    _controller.dispose();
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
        margin: const EdgeInsets.only(right: 20, bottom: 15, top: 10).w,
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
          SliverToBoxAdapter(child: _header('Your Service')),

          // ChatBot and Lina Service Section
          SliverToBoxAdapter(
            child: SizedBox(
              height: 180.h,
              child: ListView(
                padding: const EdgeInsets.symmetric(horizontal: 12).w,
                scrollDirection: Axis.horizontal,
                children: [
                  _serviceCard(
                    title: 'ChatBot Service',
                    subtitle1: 'Click to Treat',
                    subtitle2: 'Yourself',
                    imagePath: AnimationGif.chatBot,
                    onTap: () => Navigator.of(context).pushNamed(ChatScreen.id),
                  ),
                  _serviceCard(
                    title: 'Lina Service',
                    subtitle1: 'Click to Treat',
                    subtitle2: 'Yourself',
                    imagePath: AnimationGif.linachatBot,
                    onTap: () => Navigator.of(context).pushNamed(LinaScreen.id),
                    clipRoundedImage: true,
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
                      onTap: () =>
                          Navigator.of(context).pushNamed(TestService.id)),
                  _compunetService('Blog', AnimationGif.blog,
                      onTap: () =>
                          Navigator.of(context).pushNamed(BlogService.id)),
                  _compunetService('product', AnimationGif.production,
                      onTap: () => Navigator.of(context)
                          .pushNamed(AllProductsScreen.id)),
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
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(50.r)),
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
