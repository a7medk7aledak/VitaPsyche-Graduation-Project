import 'package:flutter/material.dart';

import '../../../../core/theme/colors.dart';

class CustomExpansionTile extends StatelessWidget {
  final String title;
  final List<String> items;

  const CustomExpansionTile({
    super.key,
    required this.title,
    required this.items,
  });

  @override
  Widget build(BuildContext context) {
    return Theme(
      data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
      child: Card(
        color: Colors.white,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        elevation: 4,
        child: ExpansionTile(
          title: Text(
            title,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: primaryColor,
            ),
          ),
          children: items
              .map((item) => ListTile(
                    title: Text(item,
                        style: const TextStyle(color: mainBlueColor)),
                  ))
              .toList(),
        ),
      ),
    );
  }
}
