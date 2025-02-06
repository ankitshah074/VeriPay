# from modulefinder import Module
# from transformers import pipeline
# from sklearn.metrics.pairwise import cosine_similarity
# import numpy as np

# # NLP for text-based work verification
# def verify_text_work(job_description, submitted_text):
#     nlp = pipeline("feature-extraction")
#     job_embedding = np.mean(nlp(job_description), axis=1)
#     submitted_embedding = np.mean(nlp(submitted_text), axis=1)
#     similarity = cosine_similarity(job_embedding, submitted_embedding)
#     return similarity > 0.8  # Threshold for verification

# # ML for image-based work verification (placeholder)
# def verify_image_work(job_description, image_path):
#     # Use a pre-trained model like ResNet for image verification
#     # Compare features extracted from the image with job description
#     return True  # Placeholder

# Module.exports = { verify_text_work, verify_image_work }

# verify_work.py

from transformers import pipeline
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import sys
import json

# NLP for text-based work verification
def verify_text_work(job_description, submitted_text):
    nlp = pipeline("feature-extraction")
    job_embedding = np.mean(nlp(job_description), axis=1)
    submitted_embedding = np.mean(nlp(submitted_text), axis=1)
    similarity = cosine_similarity(job_embedding, submitted_embedding)
    return similarity > 0.8  # Threshold for verification

# ML for image-based work verification (placeholder)
def verify_image_work(job_description, image_path):
    # Use a pre-trained model like ResNet for image verification
    # Compare features extracted from the image with job description
    return True  # Placeholder

if _name_ == "_main_":
    data = json.loads(sys.stdin.read())
    job_description = data['job_description']
    submitted_text = data['submitted_text']
    image_path = data.get('image_path', None)

    if image_path:
        result = verify_image_work(job_description, image_path)
    else:
        result = verify_text_work(job_description, submitted_text)

    print(json.dumps({"result": result}))