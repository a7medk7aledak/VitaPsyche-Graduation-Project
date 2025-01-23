import 'package:flutter/material.dart';
import 'player_screen.dart';
import 'music_track.dart';
import 'mood_tracker_screen.dart';
import 'daily_challenge_screen.dart';

class HomeScreen extends StatelessWidget {
  final List<MusicTrack> musicTracks = [
    MusicTrack(
      title: "Ocean Waves",
      subtitle: "Relaxing sounds of the ocean",
      icon: Icons.waves,
      image: 'assets/ocean.jpg',
      audioPath: 'assets/audio/ocean.mp3',
    ),
    // ... باقي الـ musicTracks كما هي
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        title: Text(
          "Therapeutic Music",
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
        centerTitle: true,
        elevation: 0,
        backgroundColor: Theme.of(context).primaryColor,
        actions: [
          IconButton(
            icon: Icon(Icons.star),
            onPressed: () {
              Navigator.pushNamed(context, '/daily_challenge');
            },
          ),
          IconButton(
            icon: Icon(Icons.mood),
            onPressed: () {
              Navigator.pushNamed(context, '/mood_tracker');
            },
          ),
          PopupMenuButton(
            icon: Icon(Icons.more_vert),
            itemBuilder: (BuildContext context) => <PopupMenuEntry>[
              PopupMenuItem(
                child: ListTile(
                  leading: Icon(Icons.mood),
                  title: Text('Mood Tracker'),
                  onTap: () {
                    Navigator.pop(context);
                    Navigator.pushNamed(context, '/mood_tracker');
                  },
                ),
              ),
              PopupMenuItem(
                child: ListTile(
                  leading: Icon(Icons.star),
                  title: Text('Daily Challenge'),
                  onTap: () {
                    Navigator.pop(context);
                    Navigator.pushNamed(context, '/daily_challenge');
                  },
                ),
              ),
              PopupMenuItem(
                child: ListTile(
                  leading: Icon(Icons.videogame_asset),
                  title: Text('Games'),
                  onTap: () {
                    Navigator.pop(context);
                    Navigator.pushNamed(context, '/games'); // توجيه إلى الألعاب
                  },
                ),
              ),
            ],
          ),
        ],
      ),
      body: Column(
        children: [
          Container(
            height: 20,
            decoration: BoxDecoration(
              color: Theme.of(context).primaryColor,
              borderRadius: BorderRadius.vertical(bottom: Radius.circular(30)),
            ),
          ),
          Expanded(
            child: ListView.builder(
              physics: BouncingScrollPhysics(),
              padding: EdgeInsets.only(top: 16),
              itemCount: musicTracks.length,
              itemBuilder: (context, index) {
                return Card(
                  margin: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                  elevation: 4,
                  shadowColor: Theme.of(context).primaryColor.withOpacity(0.4),
                  child: InkWell(
                    borderRadius: BorderRadius.circular(20),
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => PlayerScreen(
                            musicTrack: musicTracks[index],
                          ),
                        ),
                      );
                    },
                    child: Container(
                      height: 100,
                      padding: EdgeInsets.all(12),
                      child: Row(
                        children: [
                          Hero(
                            tag: 'music_image_${musicTracks[index].title}',
                            child: Container(
                              width: 76,
                              height: 76,
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(15),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black12,
                                    blurRadius: 8,
                                    offset: Offset(0, 4),
                                  ),
                                ],
                                image: DecorationImage(
                                  image: AssetImage(musicTracks[index].image),
                                  fit: BoxFit.cover,
                                ),
                              ),
                            ),
                          ),
                          SizedBox(width: 16),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  musicTracks[index].title,
                                  style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                    color: Colors.black87,
                                  ),
                                ),
                                SizedBox(height: 4),
                                Text(
                                  musicTracks[index].subtitle,
                                  style: TextStyle(
                                    fontSize: 14,
                                    color: Colors.grey[600],
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Icon(
                            Icons.play_arrow_rounded,
                            size: 30,
                            color: Theme.of(context).primaryColor,
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
