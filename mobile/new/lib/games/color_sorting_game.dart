import 'package:flutter/material.dart';

class ColorSortingGame extends StatefulWidget {
  const ColorSortingGame({Key? key}) : super(key: key);

  @override
  ColorSortingGameState createState() => ColorSortingGameState();
}

class ColorSortingGameState extends State<ColorSortingGame> {
  late List<Color> colors;
  bool isCorrect = false;

  @override
  void initState() {
    super.initState();
    _initializeColors();
  }

  void _initializeColors() {
    colors = [
      const Color(0xFF1A237E), // أزرق داكن جداً
      const Color(0xFF3949AB), // أزرق داكن
      const Color(0xFF5C6BC0), // أزرق متوسط
      const Color(0xFF7986CB), // أزرق فاتح
      const Color(0xFF9FA8DA), // أزرق فاتح جداً
    ];
    colors.shuffle();
  }

  bool _checkOrder() {
    for (int i = 0; i < colors.length - 1; i++) {
      if (colors[i].computeLuminance() < colors[i + 1].computeLuminance()) {
        return false;
      }
    }
    return true;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('ترتيب الألوان'),
        elevation: 0,
        backgroundColor: Colors.transparent,
        foregroundColor: Colors.black,
      ),
      body: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(20),
            margin: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withOpacity(0.1),
                  spreadRadius: 5,
                  blurRadius: 10,
                ),
              ],
            ),
            child: Column(
              children: [
                const Icon(Icons.lightbulb_outline,
                    size: 40, color: Colors.amber),
                const SizedBox(height: 16),
                const Text(
                  'رتب الألوان من الأغمق إلى الأفتح',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 8),
                Text(
                  'اسحب وأفلت البطاقات لترتيبها',
                  style: TextStyle(
                    fontSize: 14,
                    color: Colors.grey[600],
                  ),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          ),
          Expanded(
            child: ReorderableListView(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              onReorder: (oldIndex, newIndex) {
                setState(() {
                  if (newIndex > oldIndex) {
                    newIndex -= 1;
                  }
                  final Color item = colors.removeAt(oldIndex);
                  colors.insert(newIndex, item);
                  isCorrect = _checkOrder();
                });
              },
              children: colors
                  .map((color) => Container(
                        key: ValueKey(color),
                        height: 70,
                        margin: const EdgeInsets.only(bottom: 12),
                        decoration: BoxDecoration(
                          color: color,
                          borderRadius: BorderRadius.circular(15),
                          boxShadow: [
                            BoxShadow(
                              color: color.withOpacity(0.3),
                              spreadRadius: 2,
                              blurRadius: 5,
                              offset: const Offset(0, 3),
                            ),
                          ],
                        ),
                      ))
                  .toList(),
            ),
          ),
          if (isCorrect)
            Container(
              margin: const EdgeInsets.all(20),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.green[50],
                borderRadius: BorderRadius.circular(15),
                border: Border.all(color: Colors.green[200]!),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: const [
                  Icon(Icons.check_circle, color: Colors.green),
                  SizedBox(width: 8),
                  Text(
                    'أحسنت! لقد رتبت الألوان بشكل صحيح',
                    style: TextStyle(
                      color: Colors.green,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          Padding(
            padding: const EdgeInsets.all(20),
            child: ElevatedButton.icon(
              onPressed: () {
                setState(() {
                  _initializeColors();
                  isCorrect = false;
                });
              },
              icon: const Icon(Icons.refresh),
              label: const Text('إعادة اللعب'),
              style: ElevatedButton.styleFrom(
                minimumSize: const Size(double.infinity, 50),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
