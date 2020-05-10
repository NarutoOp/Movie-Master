import pandas as pd
from scipy import sparse
import numpy as np
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
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

data = pd.read_csv('dataset\movie_dataset.csv')

columns = ['keywords','cast','genres','director']

for feature in columns:
    data[feature] = data[feature].fillna('') #filling all NaNs with blank string
data['combined_features'] = data.apply(combine_features,axis=1) #applying combined_features() method over each rows of dataframe and storing the combined string in “combined_features” column

cv = CountVectorizer() #creating new CountVectorizer() object
count_matrix = cv.fit_transform(data['combined_features']) #feeding combined strings(movie contents) to CountVectorizer() object

cosine_sim = cosine_similarity(count_matrix)

def get_title_from_index(index):
    return data[data.index == index]['title'].values[0]
def get_index_from_title(title):
    return data[data.title == title]['index'].values[0]


# movie_user_likes = 'Avatar'
# movie_index = get_index_from_title(movie_user_likes)
# similar_movies = list(enumerate(cosine_sim[movie_index]))

def content_based(mov):
    movie_index = get_index_from_title(mov)
    similar_movies = list(enumerate(cosine_sim[movie_index])

eel.start('index.html', size=(1000, 600))
