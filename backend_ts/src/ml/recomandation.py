import nltk
import sys
from nltk.stem import LancasterStemmer
from nltk.corpus import stopwords
from gensim.models.doc2vec import Doc2Vec
#gensim 3.6.0 needed for the trained model to work

#nltk.download('punkt')
#nltk.download("stopwords")

def cleaner(inputText):
  stop_words = set(stopwords.words('english'))
  text = inputText
  tokenizer = nltk.RegexpTokenizer(r'\w+')
  text = tokenizer.tokenize(text.lower())
  stemmer=LancasterStemmer()
  newText = []
  for word in text:
    if not word in stop_words:
      newText.append(stemmer.stem(word))

  return newText

def main(str):
    model = Doc2Vec.load("/Users/somaizsombor/egyetem/is/backend_ts/src/ml/doc2vec_with_id.model")
    sample = str
    clean = cleaner(sample)
    vector = model.infer_vector(clean)
    sims = model.docvecs.most_similar(positive=[vector], topn=6) 
    titles = [data[0] for data in sims[1:]]
    s = ""
    for t in titles:
      s = s + t + "|"
    print(s)
    #return sims

if __name__ == "__main__":
    str = ' '.join(sys.argv[1:])
    main(str)
    #print("almamasdasdfasdfsad")


