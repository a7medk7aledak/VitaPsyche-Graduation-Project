import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/core/theme/colors.dart';
import 'package:flutter_mindmed_project/features/ai_service/service/chat_bot/presentation/view/chat_screen.dart';
import 'package:flutter_mindmed_project/features/home/presentation/view/home_screen.dart';
import 'package:flutter_mindmed_project/features/more/presentation/view/more.dart';
import '../../../../core/const/image_app.dart';
import '../../../../core/routes/app_routes.dart';
import '../../../doctor/presentation/view/doctor_screen.dart';

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});
  

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen>
    with SingleTickerProviderStateMixin {
  int _currentIndex = 0;
  late PageController _pageController;

  final List<Widget> _pages = [
    const HomeScreen(),
    DoctorScreen(),
    ChatScreen(),
    const More(),
  ];

  @override
  void initState() {
    super.initState();
    _pageController = PageController(initialPage: _currentIndex);
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  List<BottomNavigationBarItem> _bottomBar() {
    return const [
      BottomNavigationBarItem(label: 'Home', icon: Icon(Icons.home)),
      BottomNavigationBarItem(
          label: 'Doctor', icon: Icon(Icons.person_4_outlined)),
      BottomNavigationBarItem(label: 'AI', icon: Icon(Icons.chair_outlined)),
      BottomNavigationBarItem(label: 'More', icon: Icon(Icons.more_horiz_sharp))
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: secoundryColor,
      appBar: AppBar(
        backgroundColor: secoundryColor,
        scrolledUnderElevation: 0,
        elevation: 0,
        toolbarHeight: 70,
        leading: Image.asset(
          logoApp,
          cacheHeight: 90,
          cacheWidth: 80,
        ),
        titleSpacing: 0,
        title: const Column(
          children: [
            Text(
              'Vitapsyche',
              style: TextStyle(
                  fontSize: 25,
                  color: primaryColor,
                  fontWeight: FontWeight.bold),
            ),
            Text(
              'clear your mind, calm your heart',
              style: TextStyle(
                  fontSize: 8,
                  color: mainBlueColor,
                  fontWeight: FontWeight.bold),
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        unselectedItemColor: textMainColor,
        selectedItemColor: primaryColor,
        backgroundColor: secoundryColor,
        items: _bottomBar(),
        currentIndex: _currentIndex,
        onTap: (int newValue) {
          if (newValue == 2) {
            // If the AI button is tapped
            Navigator.pushNamed(context, AppRoutes.chatScreen);
          } else {
            setState(() {
              _currentIndex = newValue;
              _pageController.jumpToPage(
                  newValue); // Sync PageView with BottomNavigationBar
            });
          }
        },
      ),
      body: PageView(
        controller: _pageController,
        onPageChanged: (int index) {
          if (index == 2) {
            // If the AI button is tapped
            Navigator.pushNamed(context, AppRoutes.chatScreen);
          } else {
            setState(() {
              _currentIndex = index;
              _pageController
                  .jumpToPage(index); // Sync PageView with BottomNavigationBar
            });
          }
        },
        children: _pages,
      ),
    );
  }
}
