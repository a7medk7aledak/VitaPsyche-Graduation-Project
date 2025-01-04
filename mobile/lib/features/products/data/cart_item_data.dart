import 'package:flutter_mindmed_project/features/products/data/product_model.dart';

class CartItemData {
  final List<ImageData> image;
  final String title;
  final String seller;
  final double value;
  final List<String> about; // أضف حقل عن المنتج
  int count;
  bool isFavorite;

  CartItemData({
    required this.image,
    required this.title,
    required this.seller,
    required this.value,
    required this.about, // تأكد من ملء هذا الحقل عند إنشاء البيانات
    this.count = 1,
    this.isFavorite = false,
  });
}
