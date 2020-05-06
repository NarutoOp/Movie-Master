import pandas as pd

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

main = userRatings.iloc[1,:].index



file1 = open("myfile.txt","a")  
# \n is placed to indicate EOL (End of Line) 
for element in main:
	file1.write('"')
	file1.write(element)
	file1.write('"')
	file1.write(',')
	# file1.write('\n')
file1.close()
