// app_routes.dart
import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/features/On_Board/on_boarding.dart';
import 'package:flutter_mindmed_project/features/ai_service/service/lina/presentation/view/line_screen.dart';
import 'package:flutter_mindmed_project/features/doctor/presentation/view/ask_doctor_service.dart';
import 'package:flutter_mindmed_project/features/doctor/presentation/view/doctor_book_screen.dart';
import 'package:flutter_mindmed_project/features/payment/presentation/view/payment_screen.dart';
import 'package:flutter_mindmed_project/features/products/presentation/view/products_screen.dart';
import 'package:flutter_mindmed_project/features/products/presentation/view/cart_screen.dart';
import 'package:flutter_mindmed_project/features/products/presentation/view/product_details_screen.dart';
import 'package:flutter_mindmed_project/features/splash_screen/presentation/view/splash_screen.dart';
import 'package:flutter_mindmed_project/features/test/data/test.dart';
import 'package:flutter_mindmed_project/features/test/presentation/view/depression_scale_result.dart';
import '../../features/ai_service/service/chat_bot/presentation/view/chat_screen.dart';
import '../../features/ai_service/view/ai_service_screen.dart';
import '../../features/artical/data/model_blog.dart';
import '../../features/artical/presentation/view/blog_service.dart';
import '../../features/artical/presentation/view/details_blog.dart';
import '../../features/authentication/presentation/view/authentication.dart';
import '../../features/authentication/presentation/view/signin_screen.dart';
import '../../features/authentication/presentation/view/signup_screen.dart';
import '../../features/doctor/presentation/view/doctor_screen.dart';
import '../../features/fqas/presentation/view/fqas_service.dart';
import '../../features/home/presentation/view/home_screen.dart';
import '../../features/main_navigation/presentation/view/main_navigation_screen.dart';
import '../../features/more/data/send_to_gmail.dart';
import '../../features/more/presentation/view/about.dart';
import '../../features/more/presentation/view/contact_us.dart';
import '../../features/more/presentation/view/language.dart';
import '../../features/more/presentation/view/more.dart';
import '../../features/profile_user/presentation/view/profile.dart';
import '../../features/test/presentation/view/do_test.dart';
import '../../features/test/presentation/view/test_screen.dart';

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
  static const String testScreen = '/testScreen';
  static const String doTest = '/doTest';
  static const String depressionScaleResult = '/depressionScaleResult';
  static const String productsScreen = '/productsScreen';
  static const String detailsProduct = '/detailsProduct';
  static const String cartScreen = '/cartScreen';
  static const String doctor = '/doctor';
  static const String askDoctor = '/askDoctor';
  static const String doctorBookingScreen = '/DoctorBookingScreen';
  static const String paymentScreen = '/paymentScreen';

  static Route<dynamic>? generateRoute(RouteSettings settings) {
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
        return MaterialPageRoute(builder: (_) => DoctorScreen());
      case testScreen:
        return MaterialPageRoute(builder: (_) => const TestScreen());
      case doTest:
        final Test doTest = settings.arguments as Test;
        return MaterialPageRoute(
          builder: (_) {
            print("Building DoTest Screen");
            return DoTest(
              test: doTest,
            );
          },
        );
      case depressionScaleResult:
        final Map doTest = settings.arguments as Map ;

        return MaterialPageRoute(
          builder: (_) => DepressionScaleResult(test: doTest['test'],totalSorce: doTest['totalScore'],),
        );
      case productsScreen:
        return MaterialPageRoute(
          builder: (_) => const ProductsScreen(),
        );
      case detailsProduct:
        final dataDetailsProduct = settings.arguments as Map;

        return MaterialPageRoute(
            builder: (_) => DetailsProduct(
                  title: dataDetailsProduct['title'],
                  about: dataDetailsProduct['about'],
                  image: dataDetailsProduct['image'],
                  price: dataDetailsProduct['price'],
                ));

      case cartScreen:
        return MaterialPageRoute(builder: (_) => const CartScreen());
      case askDoctor:
        return MaterialPageRoute(builder: (_) => const AskDoctor());
      case paymentScreen:
        final dataPrice = settings.arguments as double;
        return MaterialPageRoute(
            builder: (_) => PaymentScreen(
                  price: dataPrice,
                ));

      case doctorBookingScreen:
        return MaterialPageRoute(
          builder: (_) => const DoctorBookingScreen(),
        );
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
