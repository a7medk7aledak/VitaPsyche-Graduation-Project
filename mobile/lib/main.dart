import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_mindmed_project/features/On_Board/on_boarding.dart';
import 'package:flutter_mindmed_project/features/ai_service/service/lina/presentation/view/line_screen.dart';
import 'package:flutter_mindmed_project/features/splash_screen/presentation/view/splash_screen.dart';
import 'package:flutter_mindmed_project/features/doctor/presentation/view/ask_doctor_service.dart';
import 'package:flutter_mindmed_project/features/products/presentation/view/all_products_screen.dart';
import 'package:flutter_mindmed_project/features/products/presentation/view/cart_screen.dart';
import 'package:flutter_mindmed_project/features/products/presentation/cubit/cart_cubit.dart';
import 'package:flutter_mindmed_project/features/products/presentation/view/product_details_screen.dart';
import 'package:flutter_mindmed_project/features/test/presentation/view/depression_scale_result.dart';
import 'package:provider/provider.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'features/ai_service/service/chat_bot/presentation/chat_provider.dart';
import 'features/ai_service/service/chat_bot/presentation/view/chat_screen.dart';
import 'features/ai_service/view/ai_service_screen.dart';
import 'features/authentication/presentation/view/authentication.dart';
import 'features/authentication/presentation/view/signin_screen.dart';
import 'features/authentication/presentation/view/signup_screen.dart';
import 'features/main_navigation/presentation/view/main_navigation_screen.dart';
import 'features/home/presentation/view/home_screen.dart';
import 'features/more/presentation/view/more.dart';
import 'features/profile_user/presentation/view/profile.dart';
import 'features/doctor/presentation/view/doctor.dart';
import 'features/fqas/presentation/view/fqas_service.dart';
import 'features/artical/presentation/view/blog_service.dart';
import 'features/artical/presentation/view/details_blog.dart';
import 'features/test/presentation/view/test_service.dart';
import 'features/test/presentation/view/do_test.dart';
import 'features/more/presentation/view/about.dart';
import 'features/more/presentation/view/contact_us.dart';
import 'features/more/data/send_to_gmail.dart';
import 'features/more/presentation/view/language.dart';
import 'features/ai_service/service/chat_bot/data/chat_service.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ChatProvider()),
        BlocProvider(create: (context) => CartCubit()),
        Provider<ChatService>(create: (_) => ChatService()),
      ],
      child: const MyApp(),
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
          theme: ThemeData(
            primarySwatch: Colors.teal, // تغيير اللون الرئيسي للتطبيق
            scaffoldBackgroundColor: Colors.white,
          ),
          initialRoute: '/screen1',
          routes: {
            '/screen1': (context) => const Screen1(),
            '/on_boarding': (context) => const OnBoardingScreen(),
            ChatScreen.id: (context) => ChatScreen(),
            AiServiceScreen.id: (context) => const AiServiceScreen(),
            SplashScreen.id: (context) => const SplashScreen(),
            SigninScreen.id: (context) => const SigninScreen(),
            SignupScreen.id: (context) => const SignupScreen(),
            MainNavigationScreen.id: (context) => const MainNavigationScreen(),
            HomeScreen.id: (context) => const HomeScreen(),
            More.id: (context) => const More(),
            Profile.id: (context) => const Profile(),
            Doctor.id: (context) => Doctor(),
            FqasService.id: (context) => const FqasService(),
            BlogService.id: (context) => const BlogService(),
            DetailsBlog.id: (context) => const DetailsBlog(),
            TestService.id: (context) => const TestService(),
            DoTest.id: (context) => const DoTest(),
            About.id: (context) => const About(),
            ContactUs.id: (context) => const ContactUs(),
            SendToGmail.id: (context) => const SendToGmail(),
            Language.id: (context) => const Language(),
            LinaScreen.id: (context) => const LinaScreen(title: ''),
            DepressionScaleResult.id: (context) =>
                const DepressionScaleResult(),
            AllProductsScreen.id: (context) => const AllProductsScreen(),
            ProductDetailsScreen.id: (context) => const ProductDetailsScreen(),
            CartScreen.id: (context) => const CartScreen(),
            AskDoctorService.id: (context) => const AskDoctorService(),
          },
        );
      },
    );
  }
}
