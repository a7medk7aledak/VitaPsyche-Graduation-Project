import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/screens/chatbot.dart';
import 'package:flutter_mindmed_project/screens/lina/lina_screen.dart';
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

  void toggleDrawer() {
    if (_controller.isDismissed) {
      _controller.forward();
    } else {
      _controller.reverse();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Widget cardChatBot(onTap) {
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
                  Text(
                    'ChatBot Service',
                    style: TextStyle(
                      fontSize: 18.sp,
                      color: mainBlueColor,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    'Click to Treat',
                    style: TextStyle(
                      fontSize: 14.sp,
                      color: grayColor,
                      fontWeight: FontWeight.w300,
                    ),
                  ),
                  Text(
                    'Yourself',
                    style: TextStyle(
                      fontSize: 14.sp,
                      color: grayColor,
                      fontWeight: FontWeight.w300,
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(width: 20.w),
            Image.asset(
              AnimationGif.chatBot,
              // height: 120.h,
              filterQuality: FilterQuality.high,
              fit: BoxFit.cover,
            ),
          ],
        ),
      ),
    );
  }

  Widget linaChatBot(onTap) {
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
                  Text(
                    'Lina Service',
                    style: TextStyle(
                      fontSize: 18.sp,
                      color: mainBlueColor,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    'Click to Treat',
                    style: TextStyle(
                      fontSize: 14.sp,
                      color: grayColor,
                      fontWeight: FontWeight.w300,
                    ),
                  ),
                  Text(
                    'Yourself',
                    style: TextStyle(
                      fontSize: 14.sp,
                      color: grayColor,
                      fontWeight: FontWeight.w300,
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(width: 20.w),
            ClipRRect(
              borderRadius: BorderRadius.only(
                bottomRight: const Radius.circular(15).r,
                topRight: const Radius.circular(15).r,
              ),
              child: Image.asset(
                AnimationGif.linachatBot,
                // height: 115.h,
                filterQuality: FilterQuality.high,
                fit: BoxFit.cover,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _compunetService(String text, String videoAnimation,
      {void Function()? onTap}) {
    return GestureDetector(
      onTap: onTap,
      child: Card(
        margin: const EdgeInsets.only(right: 10, bottom: 10, top: 8).w,
        elevation: 5,
        color: secoundryColor,
        shape:
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(50.r)),
        child: Column(
          children: [
            SizedBox(height: 10.h),
            Text(
              text,
              style: TextStyle(
                color: mainBlueColor,
                fontSize: 18.sp,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 20.h),
            Image.asset(
              videoAnimation,
              width: 140.w,
              height: 80.h,
            ),
          ],
        ),
      ),
    );
  }

  Widget doctorsSpecialists(String titel) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(25)),
      elevation: 2,
      child: Column(
        children: [
          Container(
            decoration: BoxDecoration(
              color: primaryColor,
              borderRadius: BorderRadius.only(
                topLeft: const Radius.circular(15).r,
                topRight: const Radius.circular(15).r,
              ),
            ),
            height: 100.h,
            width: 302.w,
            child: Image.asset(
              titel,
              fit: BoxFit.cover,
            ),
          ),
          SizedBox(height: 10.h),
          Text(
            'Sport \n Psychology',
            style: TextStyle(
              color: mainBlueColor,
              fontSize: 14.sp,
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 10.h),
          Text(
            '30 doctors',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 12.sp, fontWeight: FontWeight.w500),
          ),
        ],
      ),
    );
  }

  Widget getHelp(IconData getIcon, String title) {
    return Padding(
      padding: const EdgeInsets.all(8.0).w,
      child: Card(
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(25),
            side: const BorderSide(color: primaryColor)),
        elevation: 2,
        child: SizedBox(
          height: 60.h,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16).w,
            child: Row(
              children: [
                Icon(
                  getIcon,
                  color: primaryColor,
                  size: 35.sp,
                ),
                SizedBox(
                  width: 20.w,
                ),
                Text(
                  title,
                  style: TextStyle(
                    color: mainBlueColor,
                    fontSize: 16.sp,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: whiteColor,
      body: CustomScrollView(
        slivers: [
          // Header Section
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Text(
                'Your Service',
                style: TextStyle(
                  fontSize: 24.sp,
                  color: primaryColor,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),

          // ChatBot and Lina Service Section
          SliverToBoxAdapter(
            child: SizedBox(
              height: 180.h,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 12).w,
                child: ListView(
                  physics: const AlwaysScrollableScrollPhysics(),
                  scrollDirection: Axis.horizontal,
                  children: [
                    cardChatBot(() {
                      Navigator.of(context).pushNamed(ChatScreen.id);
                    }),
                    linaChatBot(() {
                      Navigator.of(context).pushNamed(LinaScreen.id);
                    }),
                  ],
                ),
              ),
            ),
          ),

          // Compunet Services Section
          SliverToBoxAdapter(
            child: SizedBox(
              height: 200.h,
              child: Padding(
                padding:
                    const EdgeInsets.symmetric(vertical: 16.0, horizontal: 8).w,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  children: [
                    _compunetService('Test', AnimationGif.test,
                        onTap: () =>
                            Navigator.of(context).pushNamed(TestService.id)),
                    _compunetService(
                      'Blog',
                      AnimationGif.blog,
                      onTap: () =>
                          Navigator.of(context).pushNamed(BlogService.id),
                    ),
                    _compunetService(
                      'Products',
                      AnimationGif.blog, // Change animation to products
                      onTap: () => Navigator.of(context).pushNamed(
                          BlogService.id), // Change location to navigator
                    ),
                  ],
                ),
              ),
            ),
          ),

          // Doctors Specialists Section
          SliverToBoxAdapter(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Text(
                    'Doctors Specialists',
                    style: TextStyle(
                      fontSize: 24.sp,
                      color: primaryColor,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                SizedBox(
                  height: 200.h, // Constrained height
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: imagesOfDoctorsSpecialists.length,
                    itemBuilder: (context, index) => Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 4.0).w,
                      child:
                          doctorsSpecialists(imagesOfDoctorsSpecialists[index]),
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Get Help Section
          SliverToBoxAdapter(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Text(
                    'Get Help',
                    style: TextStyle(
                      fontSize: 24.sp,
                      color: primaryColor,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                Column(
                  children: [
                    getHelp(Icons.support_agent_sharp, 'Talk to Support'),
                    getHelp(Icons.help_outline_rounded,
                        'Get Matched to a Therapist'),
                    getHelp(Icons.wechat_sharp, 'Talk to a matching advisor'),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
