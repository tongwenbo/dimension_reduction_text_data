import string

import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import re
from nltk import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer

PERPLEXITY = 30
g_kernel = 1
EPOCHS = 1000
LR = 50
MOMENTUM = 10


def getKey(item):
    return item[1]


# compute the distance between the neighboors of x1 and return a list of the k neghboors
def k_neighbours(x, x1_index, p_or_q='p'):
    x1 = x[x1_index]
    list_k_neighbours = []
    for i in range(x.shape[0]):
        if i != x1_index:
            xi = x[i]
            if p_or_q == 'p':
                distance = np.exp(-np.linalg.norm(x1 - xi) ** 2 / (2 * g_kernel ** 2))
            else:
                distance = (1 + np.linalg.norm(x1 - xi) ** 2) ** -1
            list_k_neighbours.append([i, distance])

    list_k_neighbours = sorted(list_k_neighbours, key=getKey)
    return list_k_neighbours[:PERPLEXITY]


# compute the similarity pij between two xi,xj in the original space
# divide the distance between xi,xj by the sum of the distances of the k_neightbours where k is the complexity
def compute_pij(x, x1_index, x2_index):
    x1 = x[x1_index]
    x2 = x[x2_index]
    num = np.exp(-np.linalg.norm(x1 - x2) ** 2) / (2 * g_kernel ** 2)
    denom = 0
    list_k_neighbours = k_neighbours(x, x1_index, 'p')
    for i in list_k_neighbours:
        denom += i[1]
    return num / denom


# compute the table p of the xij in the original space
def compute_p(x):
    table = np.zeros((x.shape[0], x.shape[0]))
    for i in range(x.shape[0]):
        for j in range(x.shape[0]):
            if i != j:
                pij = compute_pij(x, i, j)
                pji = compute_pij(x, j, i)
                table[i, j] = (pij + pji) / (2 * x.shape[0])
    return table


# compute the similarity qij between two yi,yj in the new space
# divide the distance between yi,yj by the sum of the distances of the k_neightbours where k is the complexity
def compute_qij(y, y1_index, y2_index):
    y1 = y[y1_index]
    y2 = y[y2_index]
    num = (1 + np.linalg.norm(y1 - y2) ** 2) ** (-1)
    denom = 0
    for i in k_neighbours(y, y1_index, 'q'):
        denom += i[1]
    return num / denom


# compute the table q of the yij in the new space
def compute_q(y):
    table = np.zeros((y.shape[0], y.shape[0]))
    for i in range(y.shape[0]):
        for j in range(y.shape[0]):
            if i != j:
                qij = compute_qij(y, i, j)
                table[i, j] = qij
    return table


# compute the erros between the 2 distributions using the KL-divergence
def kl_divergence(p, q):
    total = 0
    for i in range(p.shape[0]):
        for j in range(q.shape[0]):
            if q[i, j] != 0 and p[i, j] != 0:
                total += p[i, j] * np.log(p[i, j] / q[i, j])
    return total


# apply gradient descent to lower the KL-divergence
def gradient_descent(p, q, y):
    history = np.zeros((p.shape[0], 2, y.shape[1]))
    for iter in range(EPOCHS):
        for i in range(y.shape[0]):
            sum_value = 0
            for j in range(y.shape[0]):
                sum_value += ((y[i] - y[j]) * (p[i, j] - q[i, j]) * (1 + np.linalg.norm(y[i] - y[j] ** 2)) ** -1)
            y[i] -= 4 * LR * sum_value + MOMENTUM * (history[i, 1] - history[i, 0])
            history[i, 0] = history[i, 1]
            history[i, 1] = y[i]
        if iter % 100 == 0:
            q = compute_q(y)
            print(kl_divergence(p, q))
    y -= np.mean(y)
    y /= np.std(y)
    return y


def main():
    lemmatizer = WordNetLemmatizer()
    stop_words = stopwords.words('english')
    stop_words = stop_words + list(string.printable)

    df = pd.read_excel("./paper.xlsx")

    new_df = pd.DataFrame({"author_name": df["AuthorNames-Deduped"], "abstract": df["Abstract"],
                           "paper_type": df["PaperType"], "cite_number": df['PubsCited'], "award": df['Award']})
    # print(new_df)

    for i in range(len(df['PaperType'])):
        if df['PaperType'][i] == "J":
            new_df.at[i, 'paper_type'] = 0
        elif df['PaperType'][i] == "C":
            new_df.at[i, 'paper_type'] = 1
        elif df['PaperType'][i] == "M":
            new_df.at[i, 'paper_type'] = 2

    # replace everything except numbers, letters and spaces
    new_df['cleaned_data'] = new_df["abstract"].apply(lambda x: ' '.join(
        [lemmatizer.lemmatize(word.lower()) for word in word_tokenize(re.sub(r'([^\s\w]|_)+', ' ', str(x)))
         if word.lower() not in stop_words]))
    print(new_df)

    tfidf_model = TfidfVectorizer(
        max_features=30)  # max_features select the top ones ordered by term frequency across the corpus
    tt = pd.DataFrame(tfidf_model.fit_transform(new_df['cleaned_data']).todense())
    tt.columns = sorted(tfidf_model.vocabulary_)
    x = tt.values
    print(x)

    table_p = compute_p(x)
    print(table_p)

    y = x.dot(np.random.rand(x.shape[1], 2))
    y -= np.mean(y)
    y /= np.std(y)
    table_q = compute_q(y)
    y = gradient_descent(table_p, table_q, y)

    scatter = plt.scatter(y[:, 0], y[:, 1], c=new_df['paper_type'], cmap='coolwarm')
    plt.xlabel('d1')
    plt.ylabel('d2')
    plt.legend(handles=scatter.legend_elements()[0], labels=["J", "C", "M"], loc='lower left')
    plt.show()


main()
