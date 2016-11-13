# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models


class Msl(models.Model):
    id = models.IntegerField(db_column='ID', primary_key=True, blank=True)  # Field name made lowercase.
    rok = models.IntegerField(db_column='ROK', blank=True, null=True)  # Field name made lowercase.
    kolo = models.IntegerField(db_column='KOLO', blank=True, null=True)  # Field name made lowercase.
    misto = models.TextField(db_column='MISTO', blank=True, null=True)  # Field name made lowercase.
    tym = models.TextField(db_column='TYM', blank=True, null=True)  # Field name made lowercase.
    l = models.FloatField(db_column='L', blank=True, null=True)  # Field name made lowercase.
    p = models.FloatField(db_column='P', blank=True, null=True)  # Field name made lowercase.
    l2 = models.FloatField(db_column='L2', blank=True, null=True)  # Field name made lowercase.
    p2 = models.FloatField(db_column='P2', blank=True, null=True)  # Field name made lowercase.
    body = models.IntegerField(db_column='BODY', blank=True, null=True)  # Field name made lowercase.
    kategorie = models.TextField(db_column='KATEGORIE', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'MSL'
