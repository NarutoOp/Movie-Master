import pandas as pd
from scipy import sparse
import eel

eel.init('web')

#Collaborative Filtering
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

@eel.expose
def dummy(param):
	list = get_similar(param,5).index
	return list[1],list[2],list[3],list[4],list[5]
# Collborative filtering end





eel.start('index.html', size=(1000, 600))
