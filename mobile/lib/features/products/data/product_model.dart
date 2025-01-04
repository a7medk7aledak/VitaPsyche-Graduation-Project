class Product {
  final String id;
  final String title;
  final String subTitle;
  final String category;
  final double price;
  final List<String> about;
  final List<ImageData> images;//

  Product( {
    required this.id,
    required this.title,
    required this.subTitle,
   required this.category,
    required this.price,
    required this.about,
    required this.images,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'],
      title: json['title'],
      subTitle: json['subTitle'] ?? '',
      category: json['category'],
      price: json['price'],
      about: List<String>.from(json['about']),
      images: (json['images'] as List)
          .map((image) => ImageData.fromJson(image))
          .toList(),
    );
  }

 
}

class ImageData {
  final String? id;
  final String url;
  final String? type;

  ImageData({
     this.id,
    required this.url,
     this.type,
  });

  factory ImageData.fromJson(Map<String, dynamic> json) {
    return ImageData(
      id: json['id'],
      url: json['url'],
      type: json['type'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'url': url,
      'type': type,
    };
  }
}
