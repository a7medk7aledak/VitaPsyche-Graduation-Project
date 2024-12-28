import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../../core/theme/colors.dart';
import '../../../../core/const/image_app.dart';
import 'cart_screen.dart';
import 'cart_item_data.dart';
import '../cubit/cart_cubit.dart';

// Custom button widget
class CustomButtonCard extends StatelessWidget {
  final String title;
  final double price;
  final String image;

  const CustomButtonCard({
    Key? key,
    required this.title,
    required this.price,
    required this.image,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton.icon(
      onPressed: () {
        context.read<CartCubit>().addToCart(
              CartItemData(
                image: image,
                title: title,
                seller: '@store',
                value: price,
                count: 1,
              ),
            );

        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Added to cart successfully!'),
            duration: Duration(seconds: 2),
          ),
        );
      },
      icon: const Icon(Icons.shopping_cart_outlined),
      label: const Text('Add to Cart'),
      style: ElevatedButton.styleFrom(
        backgroundColor: primaryColor,
        foregroundColor: Colors.white,
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      ),
    );
  }
}

class ProductDetailsScreen extends StatefulWidget {
  static String id = 'ProductDetails';

  const ProductDetailsScreen({super.key});

  @override
  State<ProductDetailsScreen> createState() => _ProductDetailsScreenState();
}

class _ProductDetailsScreenState extends State<ProductDetailsScreen> {
  int _currentImageIndex = 0;
  final PageController _pageController = PageController();
  Timer? _autoPageTimer;
  List<String> _images = []; // Initialize with an empty list

  @override
  void initState() {
    super.initState();

    // Use a Future.delayed to wait until context is available
    Future.delayed(Duration.zero, () {
      final args =
          ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>? ??
              {};
      final image = args['image'];

      // Initialize _images and start the timer
      setState(() {
        _images = [
          image ?? ImageApp.blog,
          ImageApp.fqas,
          ImageApp.sadIdea,
          ImageApp.test,
        ];
      });

      _startAutoPageChange();
    });
  }

  @override
  void dispose() {
    _pageController.dispose();
    _autoPageTimer?.cancel();
    super.dispose();
  }

  void _startAutoPageChange() {
    _autoPageTimer = Timer.periodic(const Duration(seconds: 4), (timer) {
      if (_images.isNotEmpty) {
        setState(() {
          _currentImageIndex = (_currentImageIndex + 1) % _images.length;
          print('Timer tick: $_currentImageIndex'); // Debugging
        });

        if (mounted) {
          _pageController.animateToPage(
            _currentImageIndex,
            duration: const Duration(milliseconds: 300),
            curve: Curves.easeInOut,
          );
          print('Animating to page: $_currentImageIndex'); // Debugging
        }
      } else {
        print('Images are empty, skipping timer'); // Debugging
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final args =
        ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>? ??
            {};
    final title = args['title'] ?? 'Product Details';
    final price = args['price'] ?? 60.00;

    return Scaffold(
      backgroundColor: secoundryColor,
      appBar: AppBar(
        foregroundColor: primaryColor,
        backgroundColor: secoundryColor,
        centerTitle: true,
        title: Text(
          title,
          style: const TextStyle(
            color: primaryColor,
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        actions: [
          IconButton(
            onPressed: () => Navigator.of(context).pushNamed(CartScreen.id),
            icon: const Icon(Icons.shopping_bag_outlined),
          ),
        ],
      ),
      body: _images.isEmpty
          ? const Center(
              child:
                  CircularProgressIndicator()) // Show a loader while images are being initialized
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      color: mainBlueColor,
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 16),
                  SizedBox(
                    height: 300,
                    child: PageView.builder(
                      controller: _pageController,
                      itemCount: _images.length,
                      onPageChanged: (index) {
                        setState(() {
                          _currentImageIndex = index;
                        });
                      },
                      itemBuilder: (context, index) {
                        return Image.asset(
                          _images[index],
                          fit: BoxFit.cover,
                        );
                      },
                    ),
                  ),
                  const SizedBox(height: 8),
                  _buildThumbnails(),
                  const SizedBox(height: 16),
                  const Text(
                    'About this product:',
                    style: TextStyle(
                      color: primaryColor,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    '- Easy to use\n'
                    '- Provides endless hours of fun and entertainment\n'
                    '- Improves imagination and creativity\n'
                    '- Perfect for developing imagination and manual dexterity\n'
                    '- Enhances motor skills and hand-eye coordination',
                    style: TextStyle(
                      color: grayColor,
                      fontSize: 16,
                    ),
                  ),
                  const SizedBox(height: 20),
                  Row(
                    children: [
                      Text(
                        'EGP ${price.toStringAsFixed(2)}',
                        style: const TextStyle(
                          color: primaryColor,
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const Spacer(),
                      CustomButtonCard(
                        title: title,
                        price: price,
                        image: _images.first,
                      ),
                    ],
                  ),
                ],
              ),
            ),
    );
  }

  Widget _buildThumbnails() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: _images.asMap().entries.map((entry) {
        return GestureDetector(
          onTap: () {
            setState(() {
              _currentImageIndex = entry.key;
              _pageController.animateToPage(
                entry.key,
                duration: const Duration(milliseconds: 300),
                curve: Curves.easeInOut,
              );
            });
          },
          child: Container(
            margin: const EdgeInsets.symmetric(horizontal: 4),
            padding: const EdgeInsets.all(2),
            decoration: BoxDecoration(
              border: Border.all(
                color: _currentImageIndex == entry.key
                    ? Colors.green
                    : Colors.grey,
              ),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Image.asset(
              entry.value,
              width: 60,
              height: 60,
              fit: BoxFit.cover,
            ),
          ),
        );
      }).toList(),
    );
  }
}
