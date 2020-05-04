import pandas as pd
from scipy import sparse
import eel

eel.init('web')

ratings = pd.read_csv('dataset/ratings.csv')
movies = pd.read_csv('dataset/movies.csv')
all_movie = movies['title'].values
new_movie = []
for movie in all_movie:
    split_movie = movie.split()
    split_movie.pop()   
    string = ' '.join(split_movie)
    new_movie.append(string)
movies['movie'] = new_movie


ratings = pd.merge(movies,ratings).drop(['title','genres','timestamp'],axis=1)

userRatings = ratings.pivot_table(index=['userId'],columns=['movie'],values='rating')
userRatings = userRatings.dropna(thresh=10, axis=1).fillna(0,axis=1)

corrMatrix = userRatings.corr(method='pearson')

@eel.expose
def get_similar(movie_name,rating):
    similar_ratings = corrMatrix[movie_name]*(rating-2.5)
    similar_ratings = similar_ratings.sort_values(ascending=False)
    #print(type(similar_ratings))
    return similar_ratings

# romantic_lover = [("(500) Days of Summer (2009)",5)]
# similar_movies = pd.DataFrame()
# for movie,rating in romantic_lover:
#     similar_movies = similar_movies.append(get_similar(movie,rating),ignore_index = True)


# print(similar_movies.sum().sort_values(ascending=False))
# @eel.expose
# def give_movies():
# 	all_movie = movies['title'].values
# 	# print(all_movie)
# 	return all_movie

@eel.expose
def dummy(dummy_param):
	list = get_similar(dummy_param,5).index
	split_list = list[1].split()
	split_list.pop()
	# print("I got a answer: ",split_list)
	return split_list

# @eel.expose
# def generate_qr(data):
#     img = pyqrcode.create(data)
#     buffers = io.BytesIO()
#     img.png(buffers, scale=8)
#     encoded = b64encode(buffers.getvalue()).decode("ascii")
#     print("QR code generation successful.")
#     return "data:image/png;base64, " + encoded




eel.start('index.html', size=(1000, 600))
