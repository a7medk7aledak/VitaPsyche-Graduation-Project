import 'package:flutter/material.dart';

import 'widget/custem_text_field.dart';

class LinaScreen extends StatelessWidget {
  const LinaScreen({super.key});
  static const String id = 'lina';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Column(
        children: [
          Expanded(
            child: Container(
              child: const Text(
                'welcome lina ',
              ),
            ),
          ),
          //rebuild mic and send fi has data or not
         const Padding(
            padding:  EdgeInsets.symmetric(vertical: 4, horizontal: 6),
            child:  CustemTextField(),
          )
        ],
      ),
    );
  }
}
