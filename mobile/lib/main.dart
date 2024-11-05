import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'provider/chat_provider.dart';
import 'screens/chatbot.dart'; 
import 'screens/splash_screen.dart';
import 'screens/signin_screen.dart';
import 'screens/signup_screen.dart';
import 'screens/custem_button_bar.dart';
import 'screens/home_screen.dart';
import 'screens/more.dart';
import 'screens/profile.dart';
import 'screens/doctor.dart';
import 'screens/services/fqas_service.dart';
import 'screens/services/blog_service.dart';
import 'screens/services/details_blog.dart';
import 'screens/services/test_service.dart';
import 'screens/services/do_test.dart';
import 'screens/morescreen/about.dart';
import 'screens/morescreen/contact_us.dart';
import 'screens/morescreen/send_to_gmail.dart';
import 'screens/morescreen/language.dart';
import 'screens/morescreen/products.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ChatProvider()),
      ],
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: const Size(360, 690),
      minTextAdapt: true,
      splitScreenMode: true,
      builder: (context, child) {
        return MaterialApp(
          debugShowCheckedModeBanner: false,
          initialRoute: SplashScreen.id, // Initial route to SplashScreen
          routes: {
            SplashScreen.id: (context) => const SplashScreen(),
            SigninScreen.id: (context) => const SigninScreen(),
            SignupScreen.id: (context) => const SignupScreen(),
            CustemButtonBar.id: (context) => const CustemButtonBar(),
            HomeScreen.id: (context) => const HomeScreen(),
            More.id: (context) => const More(),
            Profile.id: (context) => const Profile(),
            Doctor.id: (context) => const Doctor(),
            ChatScreen.id: (context) => ChatScreen(), 
            FqasService.id: (context) => const FqasService(),
            BlogService.id: (context) => const BlogService(),
            DetailsBlog.id: (context) => const DetailsBlog(),
            TestService.id: (context) => const TestService(),
            DoTest.id: (context) => const DoTest(),
            About.id: (context) => const About(),
            ContactUs.id: (context) => const ContactUs(),
            SendToGmail.id: (context) => const SendToGmail(),
            Language.id: (context) => const Language(),
            Products.id: (context) => const Products(),
          },
        );
      },
    );
  }
}
