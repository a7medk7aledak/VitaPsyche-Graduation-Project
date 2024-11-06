import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/screens/services/blog_service.dart';
import 'package:flutter_mindmed_project/screens/services/fqas_service.dart';
import 'package:flutter_mindmed_project/screens/services/test_service.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import '../widgets/animation_gif.dart';
import '../widgets/colors.dart';
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
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 300),
    );
    _animation = CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
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
        margin: const EdgeInsets.only(right: 20, bottom: 15, top: 10),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(50)),
        elevation: 10,
        color: secoundryColor,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Padding(
              padding: EdgeInsets.all(12.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'ChatBot Service',
                    style: TextStyle(
                      fontSize: 18,
                      color: textMainColor,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    'Click to Treat',
                    style: TextStyle(
                      fontSize: 14,
                      color: textSecoundColor,
                      fontWeight: FontWeight.w300,
                    ),
                  ),
                  Text(
                    'yourself',
                    style: TextStyle(
                      fontSize: 14,
                      color: textSecoundColor,
                      fontWeight: FontWeight.w300,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(width: 40),
            Image.asset(
              AnimationGif.chatBot,
              height: 150,
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
        margin: const EdgeInsets.only(right: 20, bottom: 15, top: 10),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(50)),
        elevation: 10,
        color: secoundryColor,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Padding(
              padding: EdgeInsets.all(12.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'LineaBot Service',
                    style: TextStyle(
                      fontSize: 18,
                      color: textMainColor,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    'Click to Treat',
                    style: TextStyle(
                      fontSize: 14,
                      color: textSecoundColor,
                      fontWeight: FontWeight.w300,
                    ),
                  ),
                  Text(
                    'yourself',
                    style: TextStyle(
                      fontSize: 14,
                      color: textSecoundColor,
                      fontWeight: FontWeight.w300,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(width: 40),
            ClipRRect(
              borderRadius: const BorderRadius.only(
                  bottomRight: Radius.circular(50),
                  topRight: Radius.circular(50)),
              child: Image.asset(
                AnimationGif.linachatBot,
                height: 150,
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
        margin: const EdgeInsets.only(right: 10, bottom: 10, top: 8),
        elevation: 10,
        color: secoundryColor,
        shape:
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(30.r)),
        child: Column(
          children: [
            SizedBox(height: 10.h),
            Text(
              text,
              style: TextStyle(
                color: textMainColor,
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

  Widget _allCompunetService(BuildContext constext) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _compunetService('Test', AnimationGif.test,
                onTap: () => Navigator.of(constext).pushNamed(TestService.id)),
            SizedBox(width: 20.w),
            _compunetService(
              'Blog',
              AnimationGif.blog,
              onTap: () => Navigator.of(constext).pushNamed(BlogService.id),
            ),
          ],
        ),
        SizedBox(height: 15.h),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _compunetService(
              'FQAs',
              AnimationGif.fqas,
              onTap: () => Navigator.of(constext).pushNamed(FqasService.id),
            ),
            SizedBox(width: 20.w),
            _compunetService(
              'Ask Doctor',
              AnimationGif.askDoctor,
            ),
          ],
        ),
      ],
    );
  }

  Widget doctorsSpecialists(String titel) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(25)),
      elevation: 8,
      child: Column(
        children: [
          Container(
            decoration: const BoxDecoration(
              color: primaryColor,
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(25),
                topRight: Radius.circular(25),
              ),
            ),
            height: 100,
            width: 100,
            child: Image.asset(
              titel,
              fit: BoxFit.cover,
            ),
          ),
          const SizedBox(height: 10),
          const Text(
            'Sport \n Psychology',
            style: TextStyle(
              color: textMainColor,
              fontSize: 14,
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 10),
          const Text(
            '30 doctors',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 12, fontWeight: FontWeight.w500),
          ),
        ],
      ),
    );
  }

  Widget getHelp(IconData getIcon, String title) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(25)),
        elevation: 8,
        child: SizedBox(
          height: 60,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                Icon(
                  getIcon,
                  color: primaryColor,
                  size: 35,
                ),
                const SizedBox(
                  width: 20,
                ),
                Text(
                  title,
                  style: const TextStyle(
                    color: textMainColor,
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const Spacer(),
                const Icon(
                  Icons.arrow_forward_ios_rounded,
                  size: 25,
                  color: primaryColor,
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
      backgroundColor: primaryColor,
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.only(left: 13),
              width: double.infinity,
              decoration: const BoxDecoration(
                color: thirdColor,
                borderRadius: BorderRadius.only(topRight: Radius.circular(150)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  const SizedBox(height: 20),
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Text(
                        'Your Service',
                        style: TextStyle(
                          fontSize: 24,
                          color: primaryColor,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                  cardChatBot(

                      //!done but scaffold to solu →
                      //*here problem
                      //import
                      //Navigator.of(context).pushNamed(Chatbot.id)
                      () {}),
                  linaChatBot(

                      //!done but scaffold to solu →
                      //*here problem
                      //import
                      //Navigator.of(context).pushNamed(Chatbot.id)
                      () {}),
                  _allCompunetService(context),
                  const SizedBox(height: 20),
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Text(
                        'Doctors Specialists',
                        style: TextStyle(
                          fontSize: 24,
                          color: primaryColor,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(
                    height: 200,
                    child: ListView.builder(
                      scrollDirection: Axis.horizontal,
                      itemCount: imagesOfDoctorsSpecialists.length,
                      itemBuilder: (context, index) => Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 4),
                        child: doctorsSpecialists(
                            imagesOfDoctorsSpecialists[index]),
                      ),
                    ),
                  ),
                  const Padding(
                    padding: EdgeInsets.only(top: 6.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        Text(
                          'Get Help',
                          style: TextStyle(
                            fontSize: 24,
                            color: primaryColor,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ),
                  Column(
                    children: [
                      getHelp(
                        Icons.support_agent_sharp,
                        'Talk to Support',
                      ),
                      getHelp(
                        Icons.help_outline_rounded,
                        'Get Matched to a Terapist',
                      ),
                      getHelp(
                        Icons.wechat_sharp,
                        'Talk to a matching advisor',
                      ),
                    ],
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
