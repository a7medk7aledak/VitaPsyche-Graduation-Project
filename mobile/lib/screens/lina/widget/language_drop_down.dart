import 'package:flutter/material.dart';

class LanguageDropdown extends StatelessWidget {
  final String selectedLocale;
  final ValueChanged<String> onLocaleChanged;

  const LanguageDropdown({
    super.key,
    required this.selectedLocale,
    required this.onLocaleChanged,
  });

  @override
  Widget build(BuildContext context) {
    return DropdownButton<String>(
      value: selectedLocale,
      items: const [
        DropdownMenuItem(value: 'en-US', child: Text('English')),
        DropdownMenuItem(value: 'ar-SA', child: Text('Arabic')),
      ],
      onChanged: (value) {
        if (value != null) {
          onLocaleChanged(value);
        }
      },
    );
  }
}
