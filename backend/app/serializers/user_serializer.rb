class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :firstname, :lastname, :isStoreManager, :favorites_count, :favorites, :reviews_count, :reviews, :products

  def favorites 
    favs = object.favorites.map do |fav|
      @product = Product.find_by(id: fav.product_id)
    end 
    fav_ids = object.favorites.map do |fav|
      fav.product_id
    end 
    { favorites: favs, fav_ids: fav_ids}
  end 

  def reviews 
    reviews = object.reviews.map do |rev|
      { product_id: rev.product_id,
        title: rev.product_title,
        rating: rev.rating }
    end
    reviews
  end

  def favorites_count
    object.favorites_count
  end

  def reviews_count
    object.reviews_count
  end
end
