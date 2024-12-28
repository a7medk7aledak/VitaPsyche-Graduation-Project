import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/const/colors.dart';
import 'package:flutter_mindmed_project/screens/Lyna_Model.dart';
import 'package:flutter_mindmed_project/screens/chat_screen.dart';
import 'package:flutter_mindmed_project/screens/doctor.dart';
import 'package:flutter_mindmed_project/screens/home_screen.dart';
import 'package:flutter_mindmed_project/screens/more.dart';
import '../const/const_image.dart';

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
    Doctor(),
    ChatScreen(),
    const HomeScreen(),
    const LynaModel(title: 'Lyna Model'),
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
      BottomNavigationBarItem(
          label: 'Doctor', icon: Icon(Icons.person_4_outlined)),
      BottomNavigationBarItem(label: 'ChatBot', icon: Icon(Icons.chat)),
      BottomNavigationBarItem(label: 'Home', icon: Icon(Icons.home)),
      BottomNavigationBarItem(
          label: 'Lina', icon: Icon(Icons.add_reaction_sharp)),
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
        title: Column(
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
        // actions: [
        //   // StreamBuilder for dynamic AppBar actions
        //   StreamBuilder<bool>(
        //     stream: AuthService.authState,
        //     // initialData: false, // Assume not logged in by default
        //     builder: (context, snapshot) {
        //       final isLoggedIn = snapshot.data ?? false;

        //       if (isLoggedIn) {
        //         // No actions for logged-in users
        //         return const SizedBox.shrink();
        //       }

        //       // Actions for guests
        //       return Row(
        //         children: [
        //           custemButtonAutocation(context,
        //               onpressed: () =>
        //                   Navigator.of(context).pushNamed(SigninScreen.id),
        //               title: 'sign in'),
        //           custemButtonAutocation(context,
        //               onpressed: () =>
        //                   Navigator.of(context).pushNamed(SignupScreen.id),
        //               title: 'sign up'),
        //         ],
        //       );
        //     },
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
                        DrawerHeader(
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
