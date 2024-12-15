import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/screens/chatbot.dart';
import 'package:flutter_mindmed_project/screens/doctor.dart';
import 'package:flutter_mindmed_project/screens/home_screen.dart';
import 'package:flutter_mindmed_project/screens/more.dart';
import 'package:flutter_mindmed_project/screens/profile.dart';
import 'package:flutter_mindmed_project/screens/signin_screen.dart';
import 'package:flutter_mindmed_project/screens/signup_screen.dart';
import '../const/colors.dart';
import '../widgets/const_image.dart';
import 'auth_service.dart';

class CustemButtonBar extends StatefulWidget {
  const CustemButtonBar({super.key});
  static const id = 'custemButtonBar';

  @override
  State<CustemButtonBar> createState() => _CustemButtonBarState();
}

class _CustemButtonBarState extends State<CustemButtonBar> {
  int _currentIndex = 2;

  final List<Widget> _custemButonBar = [
    ChatScreen(),
    const Doctor(),
    const HomeScreen(),
    const Profile(),
    const More(),
  ];

  List<BottomNavigationBarItem> _bottonBar() {
    return const [
      BottomNavigationBarItem(label: 'ChatBot', icon: Icon(Icons.chat)),
      BottomNavigationBarItem(
          label: 'Doctor', icon: Icon(Icons.person_4_outlined)),
      BottomNavigationBarItem(label: 'Home', icon: Icon(Icons.home)),
      BottomNavigationBarItem(
          label: 'Profile', icon: Icon(Icons.account_box_outlined)),
      BottomNavigationBarItem(label: 'More', icon: Icon(Icons.more_horiz_sharp))
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: secoundryColor,
      appBar: AppBar(
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
        actions: [
          // StreamBuilder for dynamic AppBar actions
          StreamBuilder<bool>(
            stream: AuthService.authState,
            // initialData: false, // Assume not logged in by default
            builder: (context, snapshot) {
              print('snapshoot is ::${snapshot.data}');
              final isLoggedIn = snapshot.data ?? false;

              if (isLoggedIn) {
                // No actions for logged-in users
                return const SizedBox.shrink();
              }

              // Actions for guests
              return Row(
                children: [
                  custemButtonAutocation(context,
                      onpressed: () =>
                          Navigator.of(context).pushNamed(SigninScreen.id),
                      title: 'sign in'),
                  custemButtonAutocation(context,
                      onpressed: () =>
                          Navigator.of(context).pushNamed(SignupScreen.id),
                      title: 'sign up'),
                ],
              );
            },
          ),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        unselectedItemColor: mainBlueColor,
        selectedItemColor: primaryColor,
        backgroundColor: secoundryColor,
        items: _bottonBar(),
        currentIndex: _currentIndex,
        onTap: (int newValue) {
          setState(() {
            _currentIndex = newValue;
          });
        },
      ),
      body: _custemButonBar[_currentIndex],
    );
  }
}

Widget custemButtonAutocation(BuildContext context,
    {required void Function() onpressed, required String title}) {
  return MaterialButton(
    onPressed: onpressed,
    child: Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
      decoration: BoxDecoration(
        border: Border.all(
          color: primaryColor,
        ),
        borderRadius: BorderRadius.circular(7),
      ),
      child: Text(
        title,
        style: const TextStyle(
            color: primaryColor, fontSize: 14, fontWeight: FontWeight.bold),
      ),
    ),
  );
}
