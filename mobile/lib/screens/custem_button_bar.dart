import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/screens/chatbot.dart';

import 'package:flutter_mindmed_project/screens/doctor.dart';
import 'package:flutter_mindmed_project/screens/home_screen.dart';
import 'package:flutter_mindmed_project/screens/more.dart';
import 'package:flutter_mindmed_project/screens/profile.dart';

import '../widgets/colors.dart';
import '../widgets/const_image.dart';

class CustemButtonBar extends StatefulWidget {
  const CustemButtonBar({super.key});
  static const id = 'custemButtonBar';

  @override
  State<CustemButtonBar> createState() => _CustemButtonBarState();
}

class _CustemButtonBarState extends State<CustemButtonBar>
    with SingleTickerProviderStateMixin {
  int _currentIndex = 2;
  final List<Widget> _custemButonBar = [
    ChatScreen(),
    const Doctor(),
    const HomeScreen(),
    const Profile(),
    const More(),
  ];

  late AnimationController _controller;
  late Animation<double> _drawerAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 300),
    );
    _drawerAnimation =
        Tween<double>(begin: -1.0, end: 0.0).animate(_controller);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

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

  void toggleDrawer() {
    if (_controller.isDismissed) {
      _controller.forward();
    } else {
      _controller.reverse();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: primaryColor,
      appBar: AppBar(
        toolbarHeight: 70,
        automaticallyImplyLeading: false,
        backgroundColor: Colors.transparent,
        leading: IconButton(
          icon: const Icon(Icons.menu,
              size: 40, color: Colors.white), // White menu icon at the top left
          onPressed: toggleDrawer,
        ),
        title: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Vitapsyche',
              style: TextStyle(fontSize: 32, color: secoundryColor),
            ),
            const Spacer(),
            Padding(
              padding: const EdgeInsets.only(right: 60, bottom: 10),
              child: Image.asset(
                logoApp,
                cacheHeight: 90,
                cacheWidth: 80,
              ),
            ),
          ],
        ),
        // actions: [
        //   IconButton(
        //     icon: const Icon(Icons.menu),
        //     onPressed: toggleDrawer,
        //   ),
        // ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        unselectedItemColor: textMainColor,
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
      body: Stack(
        children: [
          _custemButonBar[_currentIndex],
          AnimatedBuilder(
            animation: _drawerAnimation,
            builder: (context, child) {
              return Transform.translate(
                offset: Offset(300 * _drawerAnimation.value, 0),
                child: Opacity(
                  opacity: _controller.value, // Adds smooth opacity transition
                  child: Drawer(
                    child: ListView(
                      padding: EdgeInsets.zero,
                      children: [
                        const DrawerHeader(
                          decoration: BoxDecoration(color: primaryColor),
                          child: Column(
                            children: [
                              Text(
                                'Drawer Header',
                                style: TextStyle(
                                    color: secoundryColor, fontSize: 24),
                              ),
                            ],
                          ),
                        ),
                        ListTile(
                          leading: const Icon(Icons.home),
                          title: const Text('Home'),
                          onTap: () {
                            Navigator.pop(context); // Close the drawer
                          },
                        ),
                        ListTile(
                          leading: const Icon(Icons.person_4_outlined),
                          title: const Text('Doctor'),
                          onTap: () {
                            Navigator.pop(context); // Close the drawer
                          },
                        ),
                        ListTile(
                          leading: const Icon(Icons.person),
                          title: const Text("Profile"),
                          onTap: () {
                            Navigator.pop(context);
                          },
                        ),
                        ListTile(
                          leading: const Icon(Icons.settings),
                          title: const Text("Settings"),
                          onTap: () {
                            Navigator.pop(context);
                          },
                        ),
                        const Spacer(),
                        ListTile(
                          leading: const Icon(Icons.logout),
                          title: const Text("Logout"),
                          onTap: () {
                            Navigator.pop(context);
                          },
                        ),
                      ],
                    ),
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
