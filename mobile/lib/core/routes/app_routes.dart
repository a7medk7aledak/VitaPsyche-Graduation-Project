// app_routes.dart
import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/features/On_Board/on_boarding.dart';
import 'package:flutter_mindmed_project/features/ai_service/service/lina/presentation/view/line_screen.dart';
import 'package:flutter_mindmed_project/features/doctor/presentation/view/ask_doctor_service.dart';
import 'package:flutter_mindmed_project/features/products/presentation/view/all_products_screen.dart';
import 'package:flutter_mindmed_project/features/products/presentation/view/cart_screen.dart';
import 'package:flutter_mindmed_project/features/products/presentation/view/product_details_screen.dart';
import 'package:flutter_mindmed_project/features/splash_screen/presentation/view/splash_screen.dart';
import 'package:flutter_mindmed_project/features/test/presentation/view/depression_scale_result.dart';

import '../../features/ai_service/service/chat_bot/presentation/view/chat_screen.dart';
import '../../features/ai_service/view/ai_service_screen.dart';
import '../../features/artical/data/model_blog.dart';
import '../../features/artical/presentation/view/blog_service.dart';
import '../../features/artical/presentation/view/details_blog.dart';
import '../../features/authentication/presentation/view/authentication.dart';
import '../../features/authentication/presentation/view/signin_screen.dart';
import '../../features/authentication/presentation/view/signup_screen.dart';
import '../../features/doctor/data/doctor_model.dart';
import '../../features/fqas/presentation/view/fqas_service.dart';
import '../../features/home/presentation/view/home_screen.dart';
import '../../features/main_navigation/presentation/view/main_navigation_screen.dart';
import '../../features/more/data/send_to_gmail.dart';
import '../../features/more/presentation/view/about.dart';
import '../../features/more/presentation/view/contact_us.dart';
import '../../features/more/presentation/view/language.dart';
import '../../features/more/presentation/view/more.dart';
import '../../features/profile_user/presentation/view/profile.dart';
import '../../features/test/controller/test_route_agruments.dart';
import '../../features/test/presentation/view/do_test.dart';
import '../../features/test/presentation/view/test_service.dart';

class AppRoutes {
  static const String splashScreen = '/splashScreen';
  static const String onBoardingScreen = '/onBoardingScreen';
  static const String aiServiceScreen = '/aiServiceScreen';
  static const String chatScreen = '/chatScreen';
  static const String linaScreen = '/linaScreen';
  static const String authentication = '/authentication';
  static const String signinScreen = '/signinScreen';
  static const String signupScreen = '/signupScreen';
  static const String mainNavigationScreen = '/mainNavigationScreen';
  static const String homeScreen = '/homeScreen';
  static const String profile = '/profile';
  static const String fqasScreen = '/fqasService';
  static const String blogScreen = '/blogScreen';
  static const String detailsBlog = '/detailsBlog';
  static const String more = '/more';
  static const String about = '/about';
  static const String contactUs = '/contactUs';
  static const String sendToGmail = '/sendToGmail';
  static const String language = '/language';
  static const String doctor = '/doctor';
  static const String testScreen = '/testScreen';
  static const String doTest = '/doTest';
  static const String depressionScaleResult = '/depressionScaleResult';
  static const String productsScreen = '/productsScreen';
  static const String detailsProduct = '/detailsProduct';
  static const String cartScreen = '/cartScreen';
  static const String askDoctor = '/askDoctor';

  static Route<dynamic>? generateRoute(RouteSettings settings) {
    TestRouteArguments? getArguments(RouteSettings settings) {
      if (settings.arguments != null) {
        if (settings.arguments is Map<String, dynamic>) {
          return TestRouteArguments.fromMap(
              settings.arguments as Map<String, dynamic>);
        }
      }
      return null;
    }

    switch (settings.name) {
      case splashScreen:
        return MaterialPageRoute(builder: (_) => const SplachScreen());
      case onBoardingScreen:
        return MaterialPageRoute(builder: (_) => const OnBoardingScreen());
      case aiServiceScreen:
        return MaterialPageRoute(builder: (_) => const AiServiceScreen());
      case chatScreen:
        return MaterialPageRoute(builder: (_) => ChatScreen());
      case linaScreen:
        return MaterialPageRoute(builder: (_) => const LinaScreen(title: ''));
      case authentication:
        return MaterialPageRoute(builder: (_) => const Authentication());
      case signinScreen:
        return MaterialPageRoute(builder: (_) => const SigninScreen());
      case signupScreen:
        return MaterialPageRoute(builder: (_) => const SignupScreen());
      case mainNavigationScreen:
        return MaterialPageRoute(builder: (_) => const MainNavigationScreen());
      case homeScreen:
        return MaterialPageRoute(builder: (_) => const HomeScreen());
      case profile:
        return MaterialPageRoute(builder: (_) => const Profile());
      case fqasScreen:
        return MaterialPageRoute(builder: (_) => const FqasScreen());
      case blogScreen:
        return MaterialPageRoute(builder: (_) => const BlogScreen());
      case detailsBlog:
        final args = settings.arguments as ModelBlog;
        return MaterialPageRoute(
            builder: (_) => const DetailsBlog(),
            settings: RouteSettings(arguments: args));
      case more:
        return MaterialPageRoute(builder: (_) => const More());
      case about:
        return MaterialPageRoute(builder: (_) => const About());
      case contactUs:
        return MaterialPageRoute(builder: (_) => const ContactUs());
      case sendToGmail:
        return MaterialPageRoute(builder: (_) => const SendToGmail());
      case language:
        return MaterialPageRoute(builder: (_) => const Language());
      case doctor:
        return MaterialPageRoute(builder: (_) => Doctor());
      case testScreen:
        return MaterialPageRoute(builder: (_) => const TestScreen());
      case doTest:
        print("Route DoTest Called");
        final args = getArguments(settings);
        if (args?.model == null) {
          return MaterialPageRoute(
            builder: (_) => const Scaffold(
              body: Center(child: Text('Error: Missing test model!')),
            ),
          );
        }
        return MaterialPageRoute(
            builder: (_) {
               print("Building DoTest Screen");
             return const DoTest();
            },
            settings: settings);
      case depressionScaleResult:
        final args = getArguments(settings);
        if (args?.score == null) {
          return MaterialPageRoute(
            builder: (_) => const Scaffold(
              body: Center(child: Text('Error: Missing score data!')),
            ),
          );
        }
        return MaterialPageRoute(
            builder: (_) => const DepressionScaleResult(), settings: settings);
      case productsScreen:
        return MaterialPageRoute(builder: (_) => const ProductsScreen());
      case detailsProduct:
        return MaterialPageRoute(builder: (_) => const DetailsProduct());
      case cartScreen:
        return MaterialPageRoute(builder: (_) => const CartScreen());
      case askDoctor:
        return MaterialPageRoute(builder: (_) => const AskDoctor());
      default:
        return MaterialPageRoute(
          builder: (_) => Scaffold(
            body: Center(
              child: Text('No route defined for ${settings.name}'),
            ),
          ),
        );
    }
  }
}
