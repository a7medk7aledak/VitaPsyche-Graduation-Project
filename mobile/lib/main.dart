import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_mindmed_project/screens/lina/lina_screen.dart';
import 'package:flutter_mindmed_project/screens/services/test_services/depression_scale_result.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:provider/provider.dart';
import 'provider/chat_provider.dart';
import 'screens/chatbot.dart';
import 'screens/custom_button_bar.dart';
import 'screens/doctor.dart';
import 'screens/home_screen.dart';
import 'screens/more.dart';
import 'screens/morescreen/about.dart';
import 'screens/morescreen/contact_us.dart';
import 'screens/morescreen/language.dart';
import 'screens/services/products/all_products_screen.dart';
import 'screens/morescreen/send_to_gmail.dart';
import 'screens/profile.dart';
import 'screens/services/blog/blog_service.dart';
import 'screens/services/blog/details_blog.dart';
import 'screens/services/fqas/fqas_service.dart';
import 'screens/services/products/cart_screen.dart';
import 'screens/services/products/cubit/cart_cubit.dart';
import 'screens/services/products/product_details_screen.dart';
import 'screens/services/test_services/do_test.dart';
import 'screens/services/test_services/test_service.dart';
import 'screens/signin_screen.dart';
import 'screens/signup_screen.dart';
import 'screens/splash_screen.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ChatProvider()),


         BlocProvider(create: (context) => CartCubit()),
      ],
      child:const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

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
            CustomButtonBar.id: (context) => const CustomButtonBar(),
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
            DepressionScaleResult.id: (context) =>
                const DepressionScaleResult(),
            LinaScreen.id: (context) => const LinaScreen(),
            AllProductsScreen.id: (context) => const AllProductsScreen(),
            ProductDetailsScreen.id: (context) => const ProductDetailsScreen(),
            CartScreen.id: (context) => const CartScreen(),
          },
        );
      },
    );
  }
}
