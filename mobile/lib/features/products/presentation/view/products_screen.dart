import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_mindmed_project/core/routes/app_routes.dart';
import 'package:flutter_mindmed_project/core/theme/colors.dart';
import 'package:flutter_mindmed_project/features/products/data/product_model.dart';
import 'package:flutter_mindmed_project/features/products/data/req_json_products.dart';
import '../../data/cart_item_data.dart';
import '../cubit/cart_cubit.dart';
import '../widget/massge_done.dart';

class ProductsScreen extends StatefulWidget {
  const ProductsScreen({super.key});

  @override
  State<ProductsScreen> createState() => _ProductsScreenState();
}

class _ProductsScreenState extends State<ProductsScreen> {
  final TextEditingController _searchController = TextEditingController();

  List<Product> _filteredProducts = [];

  List<Product> _dataProducts = [];

  Future<void> _fetchProdcts() async {
    try {
      List<dynamic> jsonData =
          await ReqJsonProducts.readJsonData(path: 'assets/json/products.json');

      setState(() {
        _dataProducts = jsonData.map((e) => Product.fromJson(e)).toList();
        _filteredProducts =
            List.from(_dataProducts); // Initialize with all products
      });
    } catch (e) {
      print('Error fetching products: $e');
    }
  }

  @override
  void initState() {
    super.initState();
    _fetchProdcts();
  }

  void _filterProducts(String query) {
    if (query.isEmpty) {
      setState(() {
        _filteredProducts = List.from(_dataProducts); // Show all products
      });
    } else {
      setState(() {
        _filteredProducts = _dataProducts
            .where((product) =>
                product.title.toLowerCase().contains(query.toLowerCase()))
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

  Widget _productCard(Product product) {
    return GestureDetector(
      onTap: () {
        Navigator.of(context).pushNamed(
          AppRoutes.detailsProduct,
          arguments: {
            'title': product.title,
            'price': product.price,
            'image': product.images,
            'about':product.about
             // Pass URLs
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
                  //TODO:image here
                  child: Image.asset(product.images.first.url)),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      product.title,
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
                          '${product.price}EGP',
                          style: const TextStyle(
                            color: mainBlueColor,
                            fontSize: 14,
                          ),
                        ),
                        IconButton(
                          icon: const Icon(Icons.add_shopping_cart),
                          onPressed: () {
                            // Add product to the cart
                            addToCart(
                              product.title,
                              product.price,
                              product.images,
                              product.about // Use the `url`
                            );
                            massgeSuccessfully(context);
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

  void addToCart(String title, double price, List<ImageData> imagePath,List<String>about) {
    final cartCubit = context.read<CartCubit>();
    final priceValue = price;

    cartCubit.addToCart(
      CartItemData(
        about:about ,
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
              Navigator.of(context).pushNamed(AppRoutes.cartScreen);
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
                      return _productCard(product);
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
