# Generated by Django 3.2.9 on 2021-11-13 20:20

import app.utils.helpers
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to=app.utils.helpers.PathAndRename('static/images/')),
        ),
    ]