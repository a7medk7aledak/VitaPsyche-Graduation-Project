import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_mindmed_project/const/colors.dart';
import 'package:flutter_mindmed_project/services/products/product_details_screen.dart';
import '../../const/const_image.dart';
import 'cart_item_data.dart';
import 'cart_screen.dart';
import 'cubit/cart_cubit.dart';

class AllProductsScreen extends StatefulWidget {
  const AllProductsScreen({super.key});
  static String id = 'products';

  @override
  State<AllProductsScreen> createState() => _AllProductsScreenState();
}

class _AllProductsScreenState extends State<AllProductsScreen> {
  final TextEditingController _searchController = TextEditingController();
  List<Map<String, String>> _products = [];
  List<Map<String, String>> _filteredProducts = [];

  @override
  void initState() {
    super.initState();
    _initializeProducts();
  }

  void _initializeProducts() {
    // Sample product data
    _products = List.generate(
      10,
      (index) => {
        "title": "Product Title $index",
        "price": "${200 + (index * 10)} EGP",
        "image": ConstImage.blog,
      },
    );
    _filteredProducts = List.from(_products); // Initially, show all products
  }

  void _filterProducts(String query) {
    if (query.isEmpty) {
      setState(() {
        _filteredProducts = List.from(_products);
      });
    } else {
      setState(() {
        _filteredProducts = _products
            .where((product) =>
                product["title"]!.toLowerCase().contains(query.toLowerCase()))
            .toList();
      });
    }
  }

  OutlineInputBorder _textFieldBorder() {
    return OutlineInputBorder(
      borderRadius: BorderRadius.circular(22),
      borderSide: BorderSide.none,
    );
  }

  Widget _search() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
      child: customTextField(),
    );
  }

  TextField customTextField() {
    return TextField(
      controller: _searchController,
      onChanged: _filterProducts, // Call _filterProducts on text change
      decoration: InputDecoration(
        suffixIcon: Icon(Icons.search, color: Colors.grey.shade600),
        filled: true,
        fillColor: grayColor.withAlpha(50),
        hintText: 'Search here',
        hintStyle: TextStyle(color: Colors.grey.shade600, fontSize: 16),
        border: _textFieldBorder(),
        enabledBorder: _textFieldBorder(),
        focusedBorder: _textFieldBorder(),
      ),
    );
  }

  Widget _productCard(int index, String title, String price, String imagePath) {
    return GestureDetector(
      onTap: () {
        Navigator.pushNamed(
          context,
          ProductDetailsScreen.id,
          arguments: {
            'title': _filteredProducts[index]["title"],
            'price': double.parse(
                _filteredProducts[index]["price"]!.replaceAll(' EGP', '')),
            'image': _filteredProducts[index]["image"],
          },
        );
      },
      child: Card(
        color: secoundryColor,
        margin: const EdgeInsets.all(8.0),
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Row(
            children: [
              SizedBox(
                height: 85,
                width: 85,
                child: Image(
                  image: AssetImage(imagePath),
                  fit: BoxFit.cover,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        color: mainBlueColor,
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          price,
                          style: const TextStyle(
                            color: mainBlueColor,
                            fontSize: 14,
                          ),
                        ),
                        IconButton(
                          icon: Icon(Icons.add_shopping_cart),
                          onPressed: () {
                            // عند الضغط على الزر، أضف المنتج إلى السلة
                            addToCart(title, price, imagePath);
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('Added to cart successfully!'),
                                duration: Duration(milliseconds: 100),
                              ),
                            );
                          },
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void addToCart(String title, String price, String imagePath) {
    final cartCubit = context.read<CartCubit>();
    final priceValue = double.parse(price.replaceAll(' EGP', ''));

    cartCubit.addToCart(
      CartItemData(
        image: imagePath,
        title: title,
        seller: '@someSeller',
        value: priceValue,
        count: 1,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: secoundryColor,
      appBar: AppBar(
        foregroundColor: primaryColor,
        backgroundColor: secoundryColor,
        centerTitle: true,
        title: const Text(
          'Products',
          style: TextStyle(
            color: primaryColor,
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        actions: [
          IconButton(
            onPressed: () {
              Navigator.of(context).pushNamed(CartScreen.id);
            }, //go screen cart
            icon: const Icon(Icons.shopping_bag_outlined),
          ),
        ],
      ),
      body: Column(
        children: [
          _search(),
          Expanded(
            child: _filteredProducts.isNotEmpty
                ? ListView.builder(
                    itemCount: _filteredProducts.length,
                    itemBuilder: (context, index) {
                      final product = _filteredProducts[index];
                      return _productCard(
                        index,
                        product["title"]!,
                        product["price"]!,
                        product["image"]!,
                      );
                    },
                  )
                : const Center(
                    child: Text(
                      'No products found!',
                      style: TextStyle(fontSize: 16, color: Colors.grey),
                    ),
                  ),
          ),
        ],
      ),
    );
  }
}
