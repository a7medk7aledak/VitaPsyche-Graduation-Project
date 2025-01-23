import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';
import 'music_track.dart'; // استيراد نموذج MusicTrack

class PlayerScreen extends StatefulWidget {
  final MusicTrack musicTrack;

  PlayerScreen({required this.musicTrack});

  @override
  _PlayerScreenState createState() => _PlayerScreenState();
}

class _PlayerScreenState extends State<PlayerScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  final AudioPlayer _audioPlayer = AudioPlayer();

  bool isPlaying = false;
  double volume = 0.5;
  int timerDuration = 0;
  Duration _duration = Duration.zero;
  Duration _position = Duration.zero;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: 450),
    );

    _setupAudioPlayer();
  }

  void _setupAudioPlayer() {
    _audioPlayer.setVolume(volume);

    _audioPlayer.playerStateStream.listen((state) {
      setState(() {
        isPlaying = state.playing;
      });
    });

    _audioPlayer.positionStream.listen((pos) {
      setState(() {
        _position = pos;
      });
    });

    _audioPlayer.durationStream.listen((dur) {
      setState(() {
        _duration = dur ?? Duration.zero;
      });
    });

    _audioPlayer.setAsset(widget.musicTrack.audioPath);
  }

  @override
  void dispose() {
    _audioPlayer.dispose();
    _animationController.dispose();
    super.dispose();
  }

  Future<void> _playMusic() async {
    if (isPlaying) {
      await _audioPlayer.pause();
      _animationController.reverse();
    } else {
      await _audioPlayer.play();
      _animationController.forward();
    }
  }

  void _setTimer(int minutes) {
    setState(() {
      timerDuration = minutes;
    });
    if (minutes > 0) {
      Future.delayed(Duration(minutes: minutes), () {
        if (mounted) {
          _audioPlayer.pause();
          setState(() {
            timerDuration = 0;
          });
        }
      });
    }
  }

  String _formatDuration(Duration duration) {
    String twoDigits(int n) => n.toString().padLeft(2, '0');
    final minutes = twoDigits(duration.inMinutes.remainder(60));
    final seconds = twoDigits(duration.inSeconds.remainder(60));
    return "$minutes:$seconds";
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        title: Text(
          "Now Playing",
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
        centerTitle: true,
        elevation: 0,
        backgroundColor: Theme.of(context).primaryColor,
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
            child: SingleChildScrollView(
              padding: EdgeInsets.all(20),
              child: Column(
                children: [
                  Hero(
                    tag: 'music_image_${widget.musicTrack.title}',
                    child: Container(
                      width: 200,
                      height: 200,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(20),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black12,
                            blurRadius: 8,
                            offset: Offset(0, 4),
                          ),
                        ],
                        image: DecorationImage(
                          image: AssetImage(widget.musicTrack.image),
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                  ),
                  SizedBox(height: 20),
                  Text(
                    widget.musicTrack.title,
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: Colors.black87,
                    ),
                  ),
                  SizedBox(height: 8),
                  Text(
                    widget.musicTrack.subtitle,
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.grey[600],
                    ),
                  ),
                  SizedBox(height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        _formatDuration(_position),
                        style: TextStyle(color: Colors.grey[600]),
                      ),
                      Expanded(
                        child: Slider(
                          value: _position.inSeconds.toDouble(),
                          max: _duration.inSeconds.toDouble(),
                          onChanged: (value) {
                            _audioPlayer.seek(
                              Duration(seconds: value.toInt()),
                            );
                          },
                        ),
                      ),
                      Text(
                        _formatDuration(_duration),
                        style: TextStyle(color: Colors.grey[600]),
                      ),
                    ],
                  ),
                  SizedBox(height: 8),
                  Row(
                    children: [
                      Icon(
                        Icons.volume_down,
                        color: Theme.of(context).primaryColor,
                      ),
                      Expanded(
                        child: Slider(
                          value: volume,
                          onChanged: (value) {
                            setState(() {
                              volume = value;
                              _audioPlayer.setVolume(value);
                            });
                          },
                        ),
                      ),
                      Icon(
                        Icons.volume_up,
                        color: Theme.of(context).primaryColor,
                      ),
                    ],
                  ),
                  SizedBox(height: 16),
                  Wrap(
                    spacing: 12,
                    children: [5, 10, 15, 30].map((minutes) {
                      final isSelected = timerDuration == minutes;
                      return Container(
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(20),
                          color: isSelected
                              ? Theme.of(context).primaryColor
                              : Colors.grey[200],
                        ),
                        child: InkWell(
                          borderRadius: BorderRadius.circular(20),
                          onTap: () => _setTimer(minutes),
                          child: Padding(
                            padding: EdgeInsets.symmetric(
                              horizontal: 16,
                              vertical: 8,
                            ),
                            child: Text(
                              '$minutes minutes',
                              style: TextStyle(
                                color:
                                    isSelected ? Colors.white : Colors.black87,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _playMusic,
        backgroundColor: Theme.of(context).primaryColor,
        child: Icon(
          isPlaying ? Icons.pause_rounded : Icons.play_arrow_rounded,
          size: 36,
          color: Colors.white,
        ),
      ),
    );
  }
}
