import 'package:flutter/material.dart';
import '../../../../core/theme/colors.dart';
import '../../data/data_payment.dart';
import '../widget/animation_done.dart';

class PaymentScreen extends StatefulWidget {
  const PaymentScreen({super.key, required this.price});
  final double price;
  @override
  // ignore: library_private_types_in_public_api
  _PaymentScreenState createState() => _PaymentScreenState();
}

class _PaymentScreenState extends State<PaymentScreen> {
  String selectedAddress = 'Home';
  String selectedPayment = 'VitaPsyche Wallet';

  void _confirmDelete(BuildContext context) {
    showDialog(
      context: context,
      barrierDismissible: false, // منع الإغلاق أثناء التحميل
      builder: (context) => Dialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: loadingBuy(),
        ),
      ),
    );
  }

  PreferredSizeWidget? _buildAppBar() {
    return AppBar(
      foregroundColor: primaryColor,
      backgroundColor: secoundryColor,
      centerTitle: true,
      title: const Text(
        'Check Out',
        style: TextStyle(
          color: primaryColor,
          fontSize: 21,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  Widget _buildFooter() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 21, horizontal: 10),
      decoration: BoxDecoration(
        color: secoundryColor,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, -3),
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            '-${widget.price.toStringAsFixed(2)} EGP', //amount ---
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          Row(
            children: [
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                    backgroundColor: redColor,
                    padding: const EdgeInsets.symmetric(
                        horizontal: 24, vertical: 12),
                    shape: RoundedRectangleBorder(
                      side: BorderSide(color: Colors.transparent),
                      borderRadius: BorderRadius.circular(12),
                    )),
                onPressed: () {
                  // Handle cancel logic
                  Navigator.of(context).pop();
                },
                child: const Text(
                  'Cancel',
                  style: TextStyle(color: secoundryColor),
                ),
              ),
              const SizedBox(width: 10),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: primaryColor,
                  padding:
                      const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                onPressed: () {
                  // Add checkout animation logic
                  _confirmDelete(context);
                },
                child: const Text(
                  'Done',
                  style: TextStyle(
                      color: secoundryColor,
                      fontSize: 16,
                      fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Shopping to',
                style: TextStyle(
                  color: mainBlueColor,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 10),
              ...addresses.map((address) {
                // final isSelected = address['title'] == selectedAddress;
                return Card(
                  // color: isSelected
                  //     ? primaryColor.withOpacity(0.8)
                  //     : secoundryColor,

                  color: secoundryColor,
                  elevation: 2,
                  margin: const EdgeInsets.symmetric(vertical: 8),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: ListTile(
                    title: Text(
                      address['title']!,
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(address['phone']!),
                        Text(address['address']!),
                      ],
                    ),
                    leading: Radio<String>(
                      value: address['title']!,
                      groupValue: selectedAddress,
                      onChanged: (value) {
                        setState(() {
                          selectedAddress = value!;
                        });
                      },
                    ),
                    trailing: IconButton(
                      icon: const Icon(Icons.edit),
                      onPressed: () {
                        // Handle edit logic
                      },
                    ),
                  ),
                );
              }),
              const Text(
                'Payment Method',
                style: TextStyle(
                  color: mainBlueColor,
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 10),
              ...paymentMethods.map((method) {
                final bool isSelected = method['name'] == selectedPayment;
                return Card(
                  color: secoundryColor,
                  elevation: isSelected ? 6 : 2,
                  margin: const EdgeInsets.symmetric(vertical: 8),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: ListTile(
                    contentPadding: const EdgeInsets.all(16),
                    leading: Image.asset(
                      method['icon']!,
                      width: 40,
                      height: 40,
                      fit: BoxFit.contain,
                    ),
                    title: Text(
                      method['name']!,
                      style: TextStyle(
                        fontWeight:
                            isSelected ? FontWeight.bold : FontWeight.normal,
                        color: isSelected ? primaryColor : mainBlueColor,
                      ),
                    ),
                    trailing: Radio<String>(
                      value: method['name']!,
                      groupValue: selectedPayment,
                      onChanged: (value) {
                        setState(() {
                          selectedPayment = value!;
                        });
                      },
                    ),
                  ),
                );
              }),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
      bottomNavigationBar: _buildFooter(),
    );
  }
}
