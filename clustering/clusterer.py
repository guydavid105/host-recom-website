from sklearn.cluster import KMeans
import numpy as np
from collections import defaultdict
import json

'''
Inputs:
str array 'names' - names of movies
float array array 'R' - R[i][j] is the rating given by user j to movie i

Use export_to_json to get json string of the clusters, the example below may output:

e.g: {"2": ["Movie A", "Movie B"], "0": ["Movie C"], "1": ["Movie D", "Movie E"]}


EXAMPLE:

# movie names
name = np.array([
    "Movie A",
    "Movie B",
    "Movie C",
    "Movie D",
    "Movie E"
    ])

    # movie i was given rating of R[i][j] by user j
    # R[i][j] \in [-1,1]
R = np.array([
    [1, 0.6, -1., -0.2],
    [0.2, -1, -1., -0.6],
    [-1, -1, 1., -1],
    [-0.6, 0.6, -0.2, 0.2],
    [-1, -0.2, -1., 0.6]
    ])

obj = Clustering(name,R)
obj.kmeans(3,30,1.0)
print(obj.export_to_json())
obj.place_centroids(3)
obj.assign_clusters()
'''


class Clustering:

    def __init__(self, names, ratings):
        self.names = names
        self.ratings = ratings
        self.n = len(names)
        if len(self.ratings) == 0:
            raise Exception("There must be at least one user")
        self.m = len(ratings[0])
        if self.n != len(self.ratings):
            raise Exception("Number of media should equal number of rows")
        self.centroids = []
        self.clusters = []

    def create_centroids(self, k):
        self.centroids = np.random.uniform(low=-1, high=1, size=(k, self.m))

    def assign_clusters(self):
        #    print(self.ratings)
        f = lambda x: np.argmin(np.sum(np.square(self.centroids - x), axis=1))
        self.clusters = np.apply_along_axis(f, 1, self.ratings)

    #    print(self.centroids)
    #    print(self.clusters)

    def update_centroids(self):
        vals = [[np.zeros(shape=self.m), 0] for i in range(len(self.centroids))]
        for i in range(len(self.clusters)):
            # print(vals[self.clusters[i]][0],"ee")
            # print(self.ratings[i])
            vals[self.clusters[i]][0] += self.ratings[i]
            vals[self.clusters[i]][1] += 1
        self.centroids = [vals[i][0] / vals[i][1] if vals[i][1] != 0 else self.centroids[i] for i in
                          range(len(self.centroids))]

    def perform_iteration(self):
        self.update_centroids()
        self.assign_clusters()

    def find_sse(self):
        return np.sum([np.square(self.ratings[i] - self.centroids[self.clusters[i]]) for i in range(self.n)]) / self.n

    def kmeans(self, k, max_iterations, min_err):

        self.create_centroids(k)
        self.assign_clusters()
        for i in range(max_iterations):
            self.perform_iteration()
            sse = self.find_sse()
            # print(sse)
            if sse < min_err:
                break

    def export_to_json(self):
        d = defaultdict(lambda: [])

        for i in range(self.n):
            d[int(self.clusters[i])].append(name[i])

        return json.dumps(d)

    def get_similar(self,name,num=-1):
        idx=-1
        for i in range(self.n):
            if self.names[i]==name:
                idx=i
                break

        if idx==-1:
            raise Exception("Not found")

        ans = []

        for i in np.random.permutation(self.n):
            if i!=idx and self.clusters[i]==self.clusters[idx]:
                ans.append(self.names[i])
                if len(ans)==num:
                    break

        return ans

