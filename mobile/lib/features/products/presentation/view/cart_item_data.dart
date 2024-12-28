class CartItemData {
  final String image;
  final String title;
  final String seller;
  final double value;
  int count;
  bool isFavorite;

  CartItemData({
    required this.image,
    required this.title,
    required this.seller,
    required this.value,
    this.count = 1,
    this.isFavorite = false,
  });
}