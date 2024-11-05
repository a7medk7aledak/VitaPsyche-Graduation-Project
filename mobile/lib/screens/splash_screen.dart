import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/screens/custem_button_bar.dart';
import 'package:flutter_mindmed_project/screens/signin_screen.dart';
import 'package:flutter_mindmed_project/screens/signup_screen.dart';
import 'package:flutter_mindmed_project/widgets/colors.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});
  static const id = '/splash';

  @override
  Widget build(BuildContext context) {
    // Get the screen size
    final screenWidth = MediaQuery.of(context).size.width;
    final screenHeight = MediaQuery.of(context).size.height;

    print('Screen width: $screenWidth');
    print('Screen height: $screenHeight');

    double getWidth(double width) {
      return screenWidth * (width / 392.72727272727275);
    }

    double getHeight(double height) {
      return screenHeight * (height / 777.4545454545455);
    }

    return Scaffold(
      body: Stack(
        children: [
          Container(
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/images/splash_screen.png'),
                fit: BoxFit.cover,
              ),
            ),
          ),
          Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Padding(
                  padding: EdgeInsets.only(top: getHeight(200)),
                  child: Text(
                    'Welcome to Mindmed',
                    style: TextStyle(
                      fontSize: getWidth(36),
                      fontWeight: FontWeight.bold,
                      color: primaryColor,
                    ),
                  ),
                ),
                SizedBox(height: getHeight(30)),

                // Buttons
                Column(
                  children: [
                    ElevatedButton(
                      onPressed: () {
                        Navigator.of(context).pushNamed(SigninScreen.id);
                      },
                      child: Text(
                        'Sign in',
                        style: TextStyle(
                            color: secoundryColor, fontSize: getWidth(16)),
                      ),
                      style: ElevatedButton.styleFrom(
                        minimumSize: Size(getWidth(300), getHeight(50)),
                        backgroundColor: primaryColor,
                        elevation: 5,
                        shadowColor: Colors.black,
                      ).copyWith(
                        overlayColor: MaterialStateProperty.resolveWith<Color?>(
                          (Set<MaterialState> states) {
                            if (states.contains(MaterialState.pressed)) {
                              return Color.fromARGB(255, 91, 255, 219);
                            }
                            return null;
                          },
                        ),
                      ),
                    ),
                    SizedBox(height: getHeight(30)),
                    ElevatedButton(
                      onPressed: () {
                        Navigator.of(context).pushNamed(SignupScreen.id);
                      },
                      child: Text(
                        'Sign up',
                        style: TextStyle(
                            color: secoundryColor, fontSize: getWidth(16)),
                      ),
                      style: ElevatedButton.styleFrom(
                        minimumSize: Size(getWidth(300), getHeight(50)),
                        backgroundColor: primaryColor,
                        elevation: 5,
                        shadowColor: Colors.black,
                      ).copyWith(
                        overlayColor: MaterialStateProperty.resolveWith<Color?>(
                          (Set<MaterialState> states) {
                            if (states.contains(MaterialState.pressed)) {
                              return Color.fromARGB(255, 91, 255, 219);
                            }
                            return null;
                          },
                        ),
                      ),
                    ),

                    // OR with lines
                    Padding(
                      padding: EdgeInsets.symmetric(vertical: getHeight(20.0)),
                      child: Row(
                        children: [
                          Expanded(
                            child: Divider(
                              color: Colors.grey,
                              thickness: 1,
                              indent: getWidth(20),
                              endIndent: getWidth(10),
                            ),
                          ),
                          Text(
                            "or",
                            style: TextStyle(
                                color: Colors.grey, fontSize: getWidth(16)),
                          ),
                          Expanded(
                            child: Divider(
                              color: Colors.grey,
                              thickness: 1,
                              indent: getWidth(10),
                              endIndent: getWidth(20),
                            ),
                          ),
                        ],
                      ),
                    ),

                    ElevatedButton(
                      onPressed: () {
                        // Navigate as Guest

                        //!here
                        Navigator.of(context).pushNamed(CustemButtonBar.id);
                      },
                      child: Text(
                        'Continue as Guest',
                        style: TextStyle(
                            color: secoundryColor, fontSize: getWidth(16)),
                      ),
                      style: ElevatedButton.styleFrom(
                        minimumSize: Size(getWidth(300), getHeight(50)),
                        backgroundColor: primaryColor,
                        elevation: 5,
                        shadowColor: Colors.black,
                      ).copyWith(
                        overlayColor: MaterialStateProperty.resolveWith<Color?>(
                          (Set<MaterialState> states) {
                            if (states.contains(MaterialState.pressed)) {
                              return Color.fromARGB(255, 91, 255, 219);
                            }
                            return null;
                          },
                        ),
                      ),
                    ),

                    Padding(
                      padding: EdgeInsets.only(top: getHeight(30)),
                      child: Container(
                        width: getWidth(150),
                        child: Center(
                          child: OutlinedButton(
                            onPressed: () {
                              // Handle language change
                            },
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                // English Flag
                                Image.asset(
                                  'assets/images/download__1_-removebg-preview.png',
                                  width: getWidth(24),
                                  height: getHeight(24),
                                ),
                                SizedBox(width: getWidth(8)),

                                Text(
                                  'English',
                                  style: TextStyle(
                                      color: primaryColor,
                                      fontSize: getWidth(14)),
                                ),
                              ],
                            ),
                            style: OutlinedButton.styleFrom(
                              side: BorderSide(color: primaryColor, width: 2),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(8),
                              ),
                            ),
                          ),
                        ),
                      ),
                    )
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
