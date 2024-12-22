import 'package:flutter/material.dart';
import 'cart_item_data.dart';

class CartItem extends StatelessWidget {
  final CartItemData data;
  final Function(int count) onUpdateCount;
  final VoidCallback onToggleFavorite;

  const CartItem({
    super.key,
    required this.data,
    required this.onUpdateCount,
    required this.onToggleFavorite,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Row(
          children: [
            Image.asset(
              data.image,
              width: 80,
              height: 80,
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
                      fontSize: 16,
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
                      icon: const Icon(Icons.remove),
                      onPressed: () {
                        if (data.count > 1) {
                          onUpdateCount(data.count - 1);
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
    );
  }
}