import 'package:flutter/material.dart';

import '../../../../core/theme/colors.dart';

Future<void> _simulateLoading() async {
    // محاكاة تحميل لمدة 5 ثوانٍ
    await Future.delayed(const Duration(seconds: 5));
  }

  Widget loadingBuy() {
    return FutureBuilder(
      future: _simulateLoading(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          // أثناء التحميل
          return const Column(
            mainAxisAlignment: MainAxisAlignment.center,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'Waiting please...',
                style: TextStyle(color: mainBlueColor, fontSize: 16),
              ),
              SizedBox(height: 20),
              CircularProgressIndicator.adaptive(
                backgroundColor: primaryColor,
                valueColor: AlwaysStoppedAnimation(
                  grayColor,
                ),
              ),
            ],
          );
        } else if (snapshot.connectionState == ConnectionState.done) {
          
          WidgetsBinding.instance.addPostFrameCallback((_) {
            Future.delayed(const Duration(seconds: 3), () {
              Navigator.pop(context); 
            });
          });
          return const Column(
            mainAxisAlignment: MainAxisAlignment.center,
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.check_circle, color: Colors.green, size: 50),
              SizedBox(height: 10),
              Text(
                'Process completed successfully!',
                style: TextStyle(
                    color: Colors.green,
                    fontSize: 16,
                    fontWeight: FontWeight.bold),
              ),
            ],
          );
        } else {
          return const SizedBox();
        }
      },
    );
  }