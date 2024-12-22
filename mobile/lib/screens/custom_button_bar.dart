import 'package:flutter/material.dart';
import '../const/colors.dart';
import '../const/const_image.dart';
import 'chatbot.dart';
import 'doctor.dart';
import 'home_screen.dart';
import 'profile.dart';
import 'more.dart';
import 'signin_screen.dart';
import 'signup_screen.dart';

class CustomButtonBar extends StatefulWidget {
  const CustomButtonBar({super.key});
  static const id = 'customButtonBar';

  @override
  State<CustomButtonBar> createState() => _CustomButtonBarState();
}

class _CustomButtonBarState extends State<CustomButtonBar> {
  int _currentIndex = 2;

  final List<Widget> _pages = [
    ChatScreen(),
    const Doctor(),
    const HomeScreen(),
    const Profile(),
    const More(),
  ];

  List<BottomNavigationBarItem> _buildBottomBarItems() {
    return const [
      BottomNavigationBarItem(label: 'ChatBot', icon: Icon(Icons.chat)),
      BottomNavigationBarItem(
          label: 'Doctor', icon: Icon(Icons.person_4_outlined)),
      BottomNavigationBarItem(label: 'Home', icon: Icon(Icons.home)),
      BottomNavigationBarItem(
          label: 'Profile', icon: Icon(Icons.account_box_outlined)),
      BottomNavigationBarItem(
          label: 'More', icon: Icon(Icons.more_horiz_sharp)),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: secoundryColor,
      appBar: _buildAppBar(context),
      bottomNavigationBar: _buildBottomNavBar(),
      body: _pages[_currentIndex],
    );
  }

  AppBar _buildAppBar(BuildContext context) {
    return AppBar(
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
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Vitapsyche',
            style: TextStyle(
              fontSize: 25,
              color: primaryColor,
              fontWeight: FontWeight.bold,
            ),
          ),
          Text(
            'clear your mind, calm your heart',
            style: TextStyle(
              fontSize: 8,
              color: mainBlueColor,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
      actions: [
        _buildAuthButton(
          title: 'Sign In',
          onPressed: () => Navigator.of(context).pushNamed(SigninScreen.id),
        ),
        _buildAuthButton(
          title: 'Sign Up',
          onPressed: () => Navigator.of(context).pushNamed(SignupScreen.id),
        ),
      ],
    );
  }

  BottomNavigationBar _buildBottomNavBar() {
    return BottomNavigationBar(
      type: BottomNavigationBarType.fixed,
      unselectedItemColor: mainBlueColor,
      selectedItemColor: primaryColor,
      backgroundColor: secoundryColor,
      currentIndex: _currentIndex,
      items: _buildBottomBarItems(),
      onTap: (int newIndex) {
        setState(() => _currentIndex = newIndex);
      },
    );
  }

  Widget _buildAuthButton(
      {required String title, required VoidCallback onPressed}) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4),
      child: MaterialButton(
        onPressed: onPressed,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
          decoration: BoxDecoration(
            border: Border.all(color: primaryColor),
            borderRadius: BorderRadius.circular(7),
          ),
          child: Text(
            title,
            style: const TextStyle(
              color: primaryColor,
              fontSize: 14,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ),
    );
  }
}
