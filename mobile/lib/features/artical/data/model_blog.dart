class ModelBlog {
  String title;
  String images;
  String description;
  List<String> symptoms;
  List<String> causes;
  String treatment;

  ModelBlog({
    required this.title,
    required this.images,
    required this.description,
    required this.symptoms,
    required this.causes,
    required this.treatment,
  });
  factory ModelBlog.fromJson(Map<String, dynamic> json) {
    return ModelBlog(
        title: json['title'],
        images: json['image'],
        description: json['content']['description'],
        symptoms: List<String>.from(json['content']['symptoms']),
        causes: List<String>.from(json['content']['causes']),
        treatment: json['content']['treatment']);
  }
}
