# backend/ourworks/models.py
from django.db import models

class OurWork(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='ourworks_images/', blank=True)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
