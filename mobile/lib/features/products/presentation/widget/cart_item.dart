import 'package:flutter/material.dart';
import 'package:flutter_mindmed_project/core/theme/colors.dart';
import '../../../../core/routes/app_routes.dart';
import '../../data/cart_item_data.dart';

class CartItem extends StatelessWidget {
  final CartItemData data;
  final Function(int count) onUpdateCount;
  final VoidCallback onToggleFavorite;
  final VoidCallback onDelete; // إضافة onDelete كـ بارامتر

  const CartItem({
    super.key,
    required this.data,
    required this.onUpdateCount,
    required this.onToggleFavorite,
    required this.onDelete, // تمرير onDelete هنا
  });

  void _confirmDelete(BuildContext context) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Delete Product'),
        content: const Text('Are you sure you need delete product?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(),
            child: const Text('Cencel'),
          ),
          TextButton(
            onPressed: () {
              Navigator.of(ctx).pop(); // إغلاق نافذة التأكيد
              onDelete(); // استدعاء دالة الحذف
            },
            child: const Text('delete'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.of(context).pushNamed(
          AppRoutes.detailsProduct,
          arguments: {
            'title': data.title,
            'price': data.value,
            'image': data.image,
            'about': data.about,
          },
        );
      },
      child: Card(
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Row(
            children: [
              Image.asset(
                data.image.first.url,
                width: 60,
                height: 60,
                fit: BoxFit.cover,
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      data.title,
                      style: const TextStyle(
                        color: mainBlueColor,
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      data.seller,
                      style: const TextStyle(fontSize: 14, color: Colors.grey),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      '£${data.value.toStringAsFixed(2)}',
                      style: const TextStyle(fontSize: 16, color: Colors.green),
                    ),
                  ],
                ),
              ),
              Column(
                children: [
                  IconButton(
                    icon: Icon(
                      data.isFavorite ? Icons.favorite : Icons.favorite_border,
                      color: data.isFavorite ? Colors.red : Colors.grey,
                    ),
                    onPressed: onToggleFavorite,
                  ),
                  Row(
                    children: [
                      IconButton(
                        icon: data.count == 1
                            ? const Icon(Icons.delete)
                            : const Icon(Icons.remove),
                        onPressed: () {
                          if (data.count > 1) {
                            onUpdateCount(data.count - 1);
                          } else {
                            _confirmDelete(context); // عرض نافذة التأكيد للحذف
                          }
                        },
                      ),
                      Text(
                        data.count.toString(),
                        style: const TextStyle(fontSize: 16),
                      ),
                      IconButton(
                        icon: const Icon(Icons.add),
                        onPressed: () => onUpdateCount(data.count + 1),
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
