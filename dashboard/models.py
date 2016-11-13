from django.db import models

# Create your models here.
class Result(models.Model):
	rok = models.IntegerField()
	kolo = models.IntegerField()
	misto = models.CharField(max_length=100)
	tym = models.CharField(max_length=100)
	L = models.FloatField()
	P = models.FloatField()
	L2 = models.FloatField()
	P2 = models.FloatField()
	body = models.IntegerField()
	kategorie = models.CharField(max_length=100)