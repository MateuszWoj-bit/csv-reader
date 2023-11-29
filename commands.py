# part 1 
!pip install matplotlib --quiet
!pip install plotly.express --quiet
!pip install scikit-learn --quiet
!pip install tabulate --quiet
!pip install tiktoken --quiet
!pip install wget --quiet
!pip install openai --quiet

# part 2
import pandas as pd
import os
import wget
import json

csv_file_path = "http://raw.githubusercontent.com/openai/openai-cookbook/main/examples/data/AG_news_samples.csv"
file_path = "AG_news_samples.csv"

if not os.path.exists(file_path):
	wget.download(csv_file_path ,file_path)
	print("File downloaded successfully.")
else: 
	print("File already exists in the local file system.")

# part 3
df = pd.read_csv('AG_news_samples.csv')
df.pop('label_int')
df

# part 4
data = df.values.tolist()
# print(data)

# part 5
%%sql
DROP DATABASE IF EXISTS news;
CREATE DATABASE IF NOT EXISTS news;

# part 6
%%sql
DROP TABLE IF EXISTS news.news_articles;
CREATE TABLE IF NOT EXISTS news.news_articles(
    title TEXT,
    description TEXT,
    label TEXT,
    embedding BLOB
);

# part 7
from sqlalchemy import *
db_connection = create_engine(connection_url).connect() 

# part 8
json_data = [json.dumps(row) for row in data]

# part 9
from openai import OpenAI
client = OpenAI(
  api_key="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"
)
embedded_data = client.embeddings.create(input=json_data, model="text-embedding-ada-002") ['data']

# part 10
combined_data = [tuple(row) + (embedded['embedding'],) for embedded, row in zip(embedded_data, data)]

# part 11
%sql TRUNCATE TABLE news.news_articles

statement = '''
    INSERT INTO news.news_articles (
        title,
        description,
        label,
        embedding
    )
    VALUES (
        %s,
        %s,
        %s,
        JSON_ARRAY_PACK(%s)
    );
'''

for i, row in enumerate(combined_data):
    try:
        title, description, label, embedding = row
        values = (title, description, label, json.dumps(embedding))
        db_connection.exec_driver_sql(statement, values)
    except Exception as e:
        print('Error inserting row {}: {}'.format(i, e))

