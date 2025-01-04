// Custom button widget
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_mindmed_project/features/products/data/product_model.dart';

import '../../../../core/theme/colors.dart';
import '../../data/cart_item_data.dart';
import '../cubit/cart_cubit.dart';
import 'massge_done.dart';

class CustomButtonCard extends StatelessWidget {
  final String title;
  final double price;
  final List<ImageData> image;
  final List<String>about;

  const CustomButtonCard({
    super.key,
    required this.title,
    required this.price,
    required this.image,
     required this.about,
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton.icon(
      onPressed: () {
        context.read<CartCubit>().addToCart(
              CartItemData(
                about: about,
                image: image,
                title: title,
                seller: '@store',
                value: price,
                count: 1,
              ),
            );

         massgeSuccessfully(context);
      },
      icon: const Icon(Icons.shopping_cart_outlined),
      label: const Text('Add to Cart'),
      style: ElevatedButton.styleFrom(
        backgroundColor: primaryColor,
        foregroundColor: secoundryColor,
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      ),
    );
  }
}