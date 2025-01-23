import 'package:flutter/material.dart';
import 'games/color_sorting_game.dart';
import 'games/breathing_game.dart';
import 'games/memory_game.dart';

class GamesHome extends StatelessWidget {
  const GamesHome({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 20),
              Text(
                'ألعاب نفسية',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                      color: Colors.teal[800],
                    ),
              ),
              const SizedBox(height: 10),
              Text(
                'اختر لعبة للبدء',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      color: Colors.grey[600],
                    ),
              ),
              const SizedBox(height: 30),
              Expanded(
                child: GridView.count(
                  crossAxisCount: 2,
                  mainAxisSpacing: 20,
                  crossAxisSpacing: 20,
                  children: [
                    _buildGameCard(
                      context,
                      'ترتيب الألوان',
                      'تحسين التركيز',
                      Icons.palette,
                      Colors.blue[700]!,
                      const ColorSortingGame(),
                    ),
                    _buildGameCard(
                      context,
                      'التنفس المتزامن',
                      'الاسترخاء والهدوء',
                      Icons.air,
                      Colors.green[700]!,
                      const BreathingGame(),
                    ),
                    _buildGameCard(
                      context,
                      'لعبة الذاكرة',
                      'تنشيط الذاكرة',
                      Icons.memory,
                      Colors.purple[700]!,
                      const MemoryGame(),
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

  Widget _buildGameCard(
    BuildContext context,
    String title,
    String subtitle,
    IconData icon,
    Color color,
    Widget game,
  ) {
    return Card(
      child: InkWell(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => game),
          );
        },
        borderRadius: BorderRadius.circular(20),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                icon,
                size: 40,
                color: color,
              ),
              const SizedBox(height: 12),
              Text(
                title,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 4),
              Text(
                subtitle,
                style: TextStyle(
                  fontSize: 12,
                  color: Colors.grey[600],
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
