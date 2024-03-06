import numpy as np

import clusterer

movienames = []

mid_idx = {}

mrl=None

with open("ml-latest-small/movies.csv","r",encoding="utf-8") as f:
    mrl = f.readlines()[1:]
    cnt=0
    for i in range(len(mrl)):
        line = mrl[i].split(",")
        mid_idx[int(line[0])]=cnt
        cnt+=1



localId_to_imdb = {}

with open("ml-latest-small/links.csv", "r", encoding="utf-8") as f:
    rl = f.readlines()[1:]
    for i in rl:
        line = i.split(",")
        localId_to_imdb[mid_idx[int(line[0])]] = int(line[1])

movienames = [localId_to_imdb[mid_idx[int(i.split(",")[0])]] for i in mrl]
ratings = np.zeros(shape=(len(movienames),700))

with open("ml-latest-small/ratings.csv","r",encoding="utf-8") as f:
    for i in f.readlines()[1:]:
        line = i.split(',')
        ratings[mid_idx[int(line[1])]][int(line[0])-1] = float(line[2])*0.4 - 1

#print(movienames)
#print(ratings)


obj = clusterer.Clustering(movienames,ratings)
obj.kmeans(100,40,0.1)
jsonstring = obj.export_to_json()

with open("clusters_output.json", "w") as f:
    f.write(jsonstring)

